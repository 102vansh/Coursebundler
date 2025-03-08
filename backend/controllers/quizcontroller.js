const Quiz = require('../models/quiz.model');
const axios = require('axios');

exports.generateQuiz = async (req, res) => {
    try {
      const { topic, numberOfQuestions = 10 } = req.body;
      const userId = req.user.id; // Assuming authenticated user
  
      if (!topic) {
        return res.status(400).json({ message: 'Topic is required' });
      }
  
      // Prompt for Gemini to generate quiz questions
      const promptText = `Generate a quiz with ${numberOfQuestions} multiple-choice questions about "${topic}". 
      For each question, provide 4 options and mark the correct answer. 
      Format the response as a JSON array with objects having the structure: 
      { 
        "question": "Question text", 
        "options": ["option1", "option2", "option3", "option4"], 
        "correctAnswer": "correct option text" 
      }`;
  
      // Send request directly to Gemini API
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
      let quizData;
      try {
        // Look for JSON array in the response
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          quizData = JSON.parse(jsonMatch[0]);
        } else {
          quizData = JSON.parse(responseText);
        }
      } catch (error) {
        console.error('Failed to parse quiz data:', error);
        return res.status(500).json({ 
          message: 'Failed to generate quiz', 
          error: 'Could not parse AI response into valid quiz format'
        });
      }
  
      // Validate quiz data structure
      if (!Array.isArray(quizData) || quizData.length === 0) {
        return res.status(500).json({ 
          message: 'Failed to generate quiz', 
          error: 'AI did not return a valid quiz format'
        });
      }
  
      // Save quiz to database
      const newQuiz = new Quiz({
        topic,
        questions: quizData,
        createdBy: userId,
      });
  
      await newQuiz.save();
      
      return res.status(201).json({
        message: 'Quiz generated successfully',
        quiz: newQuiz
      });
    } catch (error) {
      console.error('Quiz generation error:', error.response?.data || error.message);
      res.status(500).json({ 
        message: 'Error generating quiz',
        error: error.response?.data?.error?.message || error.message
      });
    }
  };