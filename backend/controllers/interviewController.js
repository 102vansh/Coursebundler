 
 
 
 // server/controllers/interviewController.js
const Interview = require('../models/Interview');
const axios = require('axios');

// Create a new mock interview
exports.createInterview = async (req, res) => {
  try {
    const { topic, experience } = req.body;
    const userId = req.user.id;

    if (!topic || !experience) {
      return res.status(400).json({ message: 'Topic and experience are required' });
    }

    // Generate interview questions using Gemini API
    const promptText = `Generate a technical interview for a ${topic} role with ${experience} years of experience. 
    Create exactly 10 challenging questions that test technical knowledge and problem-solving abilities.
    For each question, also provide an ideal answer that would demonstrate strong expertise.
    Format your response as a JSON array with exactly 10 objects, each having "question" and "idealAnswer" properties.
    Focus on technical questions specific to ${topic} and avoid generic questions.`;

    // Call Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: promptText,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract content from API response
    const responseText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Parse the response to extract the JSON
    let questions;
    try {
      // Look for JSON array in the response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]);
      } else {
        questions = JSON.parse(responseText);
      }
      
      // Ensure we have exactly 10 questions
      questions = questions.slice(0, 10);
    } catch (error) {
      console.error('Failed to parse interview questions:', error);
      return res.status(500).json({ 
        message: 'Failed to generate interview questions',
        error: 'Could not parse AI response'
      });
    }

    // Create new interview document
    const newInterview = new Interview({
      topic,
      experience,
      questions,
      user: userId,
      answers: []
    });

    const savedInterview = await newInterview.save();
    res.status(201).json(savedInterview);
  } catch (error) {
    console.error('Error creating interview:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
};

// Get a specific interview
exports.getInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    
    // Check if user is authorized to access this interview
    if (interview.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json(interview);
  } catch (error) {
    console.error('Error getting interview:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all interviews for a user
exports.getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(interviews);
  } catch (error) {
    console.error('Error getting interviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Submit interview answers and get feedback
exports.submitInterview = async (req, res) => {
  try {
    const { answers } = req.body;
    const interviewId = req.params.id;
    
    const interview = await Interview.findById(interviewId);
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    
    // Check if user is authorized
    if (interview.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Process each answer and get feedback
    const processedAnswers = [];
    let totalScore = 0;
    
    for (let i = 0; i < interview.questions.length; i++) {
      const question = interview.questions[i];
      const userAnswer = answers[i] || "No answer provided";
      
      // Get feedback for this answer using Gemini API
      const feedbackPrompt = `Evaluate this interview answer for a ${interview.topic} position:
      
      Question: ${question.question}
      
      Ideal Answer: ${question.idealAnswer}
      
      Candidate's Answer: ${userAnswer}
      
      Provide detailed, constructive feedback on the answer. Assess technical accuracy, completeness, and clarity.
      Also give a score from 1-10 (10 being perfect).
      
      Format your response as a JSON object with these properties:
      {
        "feedback": "your detailed feedback here",
        "score": numeric_score
      }`;
      
      let feedbackResponse;
      let parsedFeedback = { feedback: "Unable to generate feedback", score: 5 };
      
      try {
        feedbackResponse = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: feedbackPrompt,
                  },
                ],
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        const feedbackText = feedbackResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        // Try to parse JSON from response
        const jsonMatch = feedbackText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedFeedback = JSON.parse(jsonMatch[0]);
        }
      } catch (error) {
        console.error(`Error getting feedback for question ${i}:`, error);
      }
      
      // Add to processed answers
      processedAnswers.push({
        questionIndex: i,
        userAnswer,
        feedback: parsedFeedback.feedback,
        score: parsedFeedback.score
      });
      
      totalScore += parsedFeedback.score;
    }
    
    // Calculate overall score
    const overallScore = Math.round((totalScore / interview.questions.length) * 10) / 10;
    
    // Get overall feedback
    let overallFeedback = "Interview feedback not available";
    
    try {
      const overallPrompt = `Provide a comprehensive assessment of this candidate's performance in a ${interview.topic} interview.
      
      The candidate scored an average of ${overallScore}/10 across all questions.
      
      Summarize the strengths and weaknesses demonstrated throughout the interview, and provide constructive advice for improvement.
      Focus on technical skills, communication clarity, and problem-solving abilities.
      Limit your response to 2-3 paragraphs.`;
      
      const overallResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: overallPrompt,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      overallFeedback = overallResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text || overallFeedback;
    } catch (error) {
      console.error('Error getting overall feedback:', error);
    }
    
    // Update interview with answers and feedback
    interview.answers = processedAnswers;
    interview.completed = true;
    interview.overallFeedback = overallFeedback;
    interview.overallScore = overallScore;
    
    await interview.save();
    const feedback = {
      overallScore,
      summary: overallFeedback,
      questionFeedback: processedAnswers.map((answer, index) => ({
        question: interview.questions[index].question,
        userAnswer: answer.userAnswer,
        idealAnswer: interview.questions[index].idealAnswer,
        feedback: answer.feedback,
        score: answer.score
      }))
    };
    
    res.json({ success: true, feedback });
  } catch (error) {
    console.error('Error submitting interview:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an interview
exports.deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    
    // Check if user is authorized
    if (interview.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await interview.remove();
    res.json({ message: 'Interview removed' });
  } catch (error) {
    console.error('Error deleting interview:', error);
    res.status(500).json({ message: 'Server error' });
  }
};