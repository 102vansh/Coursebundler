// MockInterviewApp.js - All-in-one AI Mock Interview component with Tailwind CSS
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Webcam from 'react-webcam';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Select,
  FormControl,
  FormLabel,
  Input,
  Flex,
  useColorModeValue,
  Spinner,
  Badge,
  Progress,
  useToast,
  Alert,
  AlertIcon,
  Divider,
  Textarea
} from '@chakra-ui/react';
import { FaPlay, FaStop, FaMicrophone, FaVideo, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const MockInterview = () => {
  // State variables
  const [step, setStep] = useState('setup'); // setup, recording, feedback, complete
  const [topic, setTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [experience, setExperience] = useState('Intermediate');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAnswers, setRecordedAnswers] = useState([]);
  const [transcriptText, setTranscriptText] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [overallFeedback, setOverallFeedback] = useState(null);
  const [timer, setTimer] = useState(120); // 2 minutes per question
  
  // References
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  
  // Hooks
  const toast = useToast();
  
  // Topics for selection
  const topics = [
    'React.js',
    'JavaScript',
    'Node.js',
    'Full Stack Development',
    'Data Structures & Algorithms',
    'System Design',
    'Machine Learning',
    'Python',
    'Java',
    'Custom'
  ];
  
  // Experience levels
  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  
  // Color schemes
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const accentColor = useColorModeValue('yellow.500', 'yellow.400');
  
  // Clean up resources on component unmount
  useEffect(() => {
    return () => {
      stopMediaTracks();
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);
  
  // Stop all media tracks
  const stopMediaTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };
  
  // Mock questions for development
  const getMockQuestions = (selectedTopic) => {
    const finalTopic = selectedTopic === 'Custom' ? customTopic : selectedTopic;
    
    return [
      {
        question: `Explain the core concepts of ${finalTopic} and why they're important.`,
        idealAnswer: `A good answer would cover the fundamental principles of ${finalTopic}, including key features, architecture, and real-world applications.`
      },
      {
        question: `What are some common challenges when working with ${finalTopic}, and how do you address them?`,
        idealAnswer: `Challenges include scalability, performance optimization, and integration. These can be addressed through proper architecture, caching strategies, and following best practices.`
      },
      {
        question: `How does ${finalTopic} compare to other similar technologies in the industry?`,
        idealAnswer: `${finalTopic} offers advantages such as [specific benefits], but has limitations in [specific areas] compared to alternatives like [competitors].`
      },
      {
        question: `Describe a complex problem you solved using ${finalTopic}.`,
        idealAnswer: `A good answer would describe the problem context, approach taken, implementation details, challenges faced, and the final results achieved.`
      },
      {
        question: `How do you keep up with the latest developments in ${finalTopic}?`,
        idealAnswer: `Staying current involves following authoritative resources, participating in communities, reading documentation, taking courses, and building personal projects.`
      }
    ];
  };
  
  // Start the interview setup
  const handleStartInterview = () => {
    if (!topic) {
      setError('Please select a topic');
      return;
    }
    
    if (topic === 'Custom' && !customTopic) {
      setError('Please enter a custom topic');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // For development, use mock data
    setTimeout(() => {
      const selectedTopic = topic === 'Custom' ? customTopic : topic;
      const mockQuestions = getMockQuestions(selectedTopic);
      
      setQuestions(mockQuestions);
      setRecordedAnswers(new Array(mockQuestions.length).fill(null));
      setCurrentQuestionIndex(0);
      setStep('recording');
      setLoading(false);
      
      toast({
        title: 'Interview Ready',
        description: `Your ${selectedTopic} interview has been prepared`,
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    }, 1000);
  };
  
  // Initialize camera and microphone
  const initializeMediaDevices = async () => {
    try {
      // First stop any existing media tracks
      stopMediaTracks();
      
      // Request new media stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Reset recording chunks
      chunksRef.current = [];
      
      return true;
    } catch (err) {
      console.error("Media device error:", err);
      setError(`Camera/microphone access error: ${err.message}`);
      return false;
    }
  };
  
  // Start recording
  const startRecording = async () => {
    try {
      setError(null);
      
      // Initialize media devices first
      const initialized = await initializeMediaDevices();
      if (!initialized) return;
      
      // Create media recorder
      try {
        mediaRecorderRef.current = new MediaRecorder(streamRef.current, {
          mimeType: 'video/webm;codecs=vp9,opus'
        });
      } catch (e) {
        // Fallback if preferred codec not supported
        mediaRecorderRef.current = new MediaRecorder(streamRef.current);
      }
      
      // Set up event handlers
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        // Process the recorded chunks
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        // Store the answer for this question
        const newAnswers = [...recordedAnswers];
        newAnswers[currentQuestionIndex] = {
          blob,
          url,
          text: generateMockTranscription(topic, currentQuestionIndex)
        };
        setRecordedAnswers(newAnswers);
        
        // Generate simulated feedback
        processAnswer();
      };
      
      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // Start timer
      setTimer(120);
      timerIntervalRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error("Recording error:", err);
      setError(`Recording error: ${err.message}`);
    }
  };
  
  // Stop recording
  const stopRecording = () => {
    try {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      
      setIsRecording(false);
    } catch (err) {
      console.error("Stop recording error:", err);
      setError(`Error stopping recording: ${err.message}`);
    }
  };
  
  // Generate mock transcription (simulating speech-to-text)
  const generateMockTranscription = (selectedTopic, questionIndex) => {
    const topicName = selectedTopic === 'Custom' ? customTopic : selectedTopic;
    
    const transcriptions = [
      `${topicName} is a powerful technology that offers several key features. First, it provides a robust framework for building scalable applications. Second, it has excellent documentation and community support. Finally, it integrates well with other technologies in the ecosystem.`,
      
      `When working with ${topicName}, I often encounter challenges related to performance optimization. I address these by implementing proper caching strategies, code splitting, and following best practices. Another common issue is managing state, which I solve by using appropriate state management patterns.`,
      
      `Compared to alternatives, ${topicName} offers better developer experience and performance. While some technologies might have more features, ${topicName} strikes a good balance between functionality and simplicity. Its ecosystem is also more mature compared to newer alternatives.`,
      
      `I once worked on a project where we needed to process large amounts of data in real-time using ${topicName}. The challenge was maintaining performance while handling concurrent connections. I implemented a solution using efficient algorithms and optimization techniques, which resulted in a 40% performance improvement.`,
      
      `To stay current with ${topicName}, I regularly follow official documentation, participate in online communities, attend webinars, and build personal projects to experiment with new features. I also read technical blogs from industry experts and contribute to open-source projects when possible.`
    ];
    
    return transcriptions[questionIndex] || `This is a sample answer about ${topicName} for question ${questionIndex + 1}.`;
  };
  
  // Process the answer and provide feedback
  const processAnswer = () => {
    setLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      const mockFeedback = {
        score: Math.floor(Math.random() * 3) + 7, // 7-9 range
        technicalAccuracy: `Your explanation of ${topic} concepts was accurate and demonstrated good understanding of the fundamentals.`,
        communicationClarity: `You communicated your thoughts clearly and with good structure. Consider using more specific examples to illustrate key points.`,
        positives: [
          "Strong technical knowledge demonstrated",
          "Well-structured response",
          "Good explanation of core concepts"
        ],
        improvements: [
          "Could provide more specific examples",
          "Consider addressing edge cases",
          "Elaborate more on practical applications"
        ],
        suggestions: [
          "Practice explaining complex topics in simpler terms",
          "Prepare concrete examples from your experience",
          "Focus on highlighting problem-solving approaches"
        ]
      };
      
      setFeedback(mockFeedback);
      setStep('feedback');
      setLoading(false);
      
      // Also update transcript
      setTranscriptText(recordedAnswers[currentQuestionIndex]?.text || '');
    }, 2000);
  };
  
  // Move to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFeedback(null);
      setStep('recording');
    } else {
      // Complete the interview
      completeInterview();
    }
  };
  
  // Complete the interview and generate overall feedback
  const completeInterview = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockOverallFeedback = {
        overallScore: 8,
        strengths: [
          "Strong technical knowledge",
          "Clear communication style",
          "Structured responses to complex questions"
        ],
        weaknesses: [
          "Could provide more specific examples",
          "Some answers lacked depth in certain areas",
          "Occasionally used technical jargon without explanation"
        ],
        technicalEvaluation: `You demonstrated solid understanding of ${topic} principles and concepts. Your technical knowledge appears up-to-date with current industry standards.`,
        communicationEvaluation: "Your communication was clear and well-structured. You articulated complex ideas effectively, though sometimes could benefit from more concise explanations.",
        recommendations: [
          "Practice explaining technical concepts to non-technical audiences",
          "Prepare more diverse examples from your experience",
          "Focus on connecting theoretical knowledge to practical applications"
        ]
      };
      
      setOverallFeedback(mockOverallFeedback);
      setStep('complete');
      setLoading(false);
    }, 3000);
  };
  
  // Reset to start new interview
  const resetInterview = () => {
    setStep('setup');
    setTopic('');
    setCustomTopic('');
    setExperience('Intermediate');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setRecordedAnswers([]);
    setFeedback(null);
    setOverallFeedback(null);
    stopMediaTracks();
  };
  
  // Render setup screen
  const renderSetup = () => {
    return (
      <Box 
        bg={bgColor} 
        p={6} 
        borderRadius="lg" 
        boxShadow="lg"
        borderWidth="1px"
        borderColor={borderColor}
        w="100%"
      >
        <VStack spacing={6} align="stretch">
          <Heading size="md" textAlign="center">
            Create Your Mock Interview
          </Heading>
          
          <FormControl isRequired>
            <FormLabel>Interview Topic</FormLabel>
            <Select 
              value={topic} 
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Select a topic"
              colorScheme="yellow"
            >
              {topics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Select>
          </FormControl>
          
          {topic === 'Custom' && (
            <FormControl isRequired>
              <FormLabel>Custom Topic</FormLabel>
              <Input 
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="Enter your topic"
              />
            </FormControl>
          )}
          
          <FormControl>
            <FormLabel>Experience Level</FormLabel>
            <Select 
              value={experience} 
              onChange={(e) => setExperience(e.target.value)}
              colorScheme="yellow"
            >
              {experienceLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </Select>
          </FormControl>
          
          <Button 
            colorScheme="yellow" 
            size="lg" 
            onClick={handleStartInterview}
            isDisabled={!topic || (topic === 'Custom' && !customTopic)}
            mt={4}
          >
            Start Interview
          </Button>
        </VStack>
      </Box>
    );
  };
  
  // Render recording screen
  const renderRecording = () => {
    return (
      <Box w="100%">
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          gap={6}
        >
          {/* Question Section */}
          <Box 
            flex="1"
            bg={bgColor} 
            p={6} 
            borderRadius="lg" 
            boxShadow="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <VStack spacing={4} align="stretch">
              <Flex justify="space-between" align="center">
                <Badge colorScheme="yellow">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </Badge>
                <HStack>
                  <Badge colorScheme="purple">{topic}</Badge>
                  <Badge colorScheme="blue">{experience}</Badge>
                </HStack>
              </Flex>
              
              <Heading size="md">
                {questions[currentQuestionIndex]?.question}
              </Heading>
              
              {isRecording && (
                <>
                  <Box mt={4}>
                    <Flex justify="space-between" mb={1}>
                      <Text fontSize="sm">Time Remaining:</Text>
                      <Text fontSize="sm" fontWeight="bold">{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</Text>
                    </Flex>
                    <Progress 
                      value={(timer / 120) * 100} 
                      colorScheme={timer < 30 ? "red" : "yellow"} 
                      size="sm" 
                      borderRadius="full"
                    />
                  </Box>
                </>
              )}
              
              {recordedAnswers[currentQuestionIndex] && !isRecording && (
                <Box mt={4}>
                  <Text fontWeight="bold">Your Answer:</Text>
                  <Box 
                    mt={2} 
                    p={4} 
                    bg={useColorModeValue('gray.50', 'gray.700')} 
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor={borderColor}
                    height="150px"
                    overflowY="auto"
                  >
                    <Text>{recordedAnswers[currentQuestionIndex].text}</Text>
                  </Box>
                </Box>
              )}
            </VStack>
          </Box>
          
          {/* Video Section */}
          <Box 
            flex="1"
            bg={bgColor} 
            borderRadius="lg" 
            boxShadow="lg"
            borderWidth="1px"
            borderColor={borderColor}
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <Box position="relative" bg="black" flex="1" minH="300px">
              <video 
                ref={videoRef}
                autoPlay 
                muted 
                playsInline
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              
              {isRecording && (
                <Badge 
                  position="absolute" 
                  top="10px" 
                  right="10px"
                  colorScheme="red"
                  display="flex"
                  alignItems="center"
                  px={2}
                  py={1}
                >
                  <Box 
                    w="8px" 
                    h="8px" 
                    borderRadius="full" 
                    bg="red.500" 
                    mr={2}
                    animation="pulse 1.5s infinite" 
                  />
                  Recording
                </Badge>
              )}
            </Box>
            
            <Flex p={4} justify="center" bg={useColorModeValue('gray.100', 'gray.700')}>
              {!isRecording ? (
                <Button 
                  leftIcon={<FaPlay />} 
                  colorScheme="red" 
                  onClick={startRecording}
                >
                  Start Recording
                </Button>
              ) : (
                <Button 
                  leftIcon={<FaStop />} 
                  colorScheme="gray" 
                  onClick={stopRecording}
                >
                  Stop Recording
                </Button>
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>
    );
  };
  
  // Render feedback screen
  const renderFeedback = () => {
    return (
      <Box w="100%">
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          gap={6}
        >
          {/* Question and Answer Section */}
          <Box 
            flex="1"
            bg={bgColor} 
            p={6} 
            borderRadius="lg" 
            boxShadow="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <VStack spacing={4} align="stretch">
              <Flex justify="space-between" align="center">
                <Badge colorScheme="yellow">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </Badge>
                <HStack>
                  <Badge colorScheme="purple">{topic}</Badge>
                  <Badge colorScheme="blue">{experience}</Badge>
                </HStack>
              </Flex>
              
              <Box>
                <Text fontWeight="bold">Question:</Text>
                <Text mt={1}>{questions[currentQuestionIndex]?.question}</Text>
              </Box>
              
              <Box>
                <Text fontWeight="bold">Your Answer:</Text>
                <Box 
                  mt={2} 
                  p={4} 
                  bg={useColorModeValue('gray.50', 'gray.700')} 
                  borderRadius="md"
                  height="150px"
                  overflowY="auto"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Text>{transcriptText}</Text>
                </Box>
              </Box>
            </VStack>
          </Box>
          
          {/* Feedback Section */}
          <Box 
            flex="1"
            bg={bgColor} 
            p={6} 
            borderRadius="lg" 
            boxShadow="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <VStack spacing={5} align="stretch">
              <Heading size="md" textAlign="center">
                AI Feedback
              </Heading>
              
              <Flex justify="center">
                <Badge 
                  colorScheme={feedback?.score >= 8 ? "green" : feedback?.score >= 6 ? "yellow" : "red"}
                  fontSize="xl" 
                  py={1} 
                  px={3} 
                  borderRadius="md"
                >
                  Score: {feedback?.score}/10
                </Badge>
              </Flex>
              
              <Box>
                <Text fontWeight="bold">Technical Accuracy:</Text>
                <Text mt={1}>{feedback?.technicalAccuracy}</Text>
              </Box>
              
              <Box>
                <Text fontWeight="bold">Communication:</Text>
                <Text mt={1}>{feedback?.communicationClarity}</Text>
              </Box>
              
              <Divider />
              
              <Box>
                <Text fontWeight="bold">Strengths:</Text>
                <VStack align="start" mt={2} pl={4}>
                  {feedback?.positives.map((positive, idx) => (
                    <Text key={idx}>• {positive}</Text>
                  ))}
                </VStack>
              </Box>
              
              <Box>
                <Text fontWeight="bold">Areas for Improvement:</Text>
                <VStack align="start" mt={2} pl={4}>
                  {feedback?.improvements.map((improvement, idx) => (
                    <Text key={idx}>• {improvement}</Text>
                  ))}
                </VStack>
              </Box>
              
              <Divider />
              
              <Flex justify="center">
                <Button 
                  colorScheme="yellow" 
                  rightIcon={<FaArrowRight />}
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Interview'}
                </Button>
              </Flex>
            </VStack>
          </Box>
        </Flex>
      </Box>
    );
  };
  
  // Render complete interview screen
  const renderComplete = () => {
    return (
      <Box 
        bg={bgColor} 
        p={6} 
        borderRadius="lg" 
        boxShadow="lg"
        borderWidth="1px"
        borderColor={borderColor}
        w="100%"
      >
        <VStack spacing={6} align="stretch">
          <Heading size="lg" textAlign="center" color={accentColor}>
            Interview Complete!
          </Heading>
          
          <Text textAlign="center">
            You've completed your mock interview on {topic === 'Custom' ? customTopic : topic} at {experience} level.
          </Text>
          
          {overallFeedback && (
            <Box 
              p={6} 
              bg={useColorModeValue('yellow.50', 'yellow.900')} 
              borderRadius="md"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <VStack spacing={5} align="stretch">
                <Flex justify="center">
                  <Badge 
                    colorScheme="yellow" 
                    fontSize="2xl" 
                    py={2} 
                    px={4} 
                    borderRadius="md"
                  >
                    Overall Score: {overallFeedback.overallScore}/10
                  </Badge>
                </Flex>
                
                <Box>
                  <Heading size="sm" mb={2}>Key Strengths:</Heading>
                  <VStack align="stretch" pl={4}>
                    {overallFeedback.strengths.map((strength, index) => (
                      <HStack key={index} align="start">
                        <Text color="green.500">•</Text>
                        <Text>{strength}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
                
                <Box>
                  <Heading size="sm" mb={2}>Areas for Improvement:</Heading>
                  <VStack align="stretch" pl={4}>
                    {overallFeedback.weaknesses.map((weakness, index) => (
                      <HStack key={index} align="start">
                        <Text color="red.500">•</Text>
                        <Text>{weakness}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
                
                <Divider />
                
                <Box>
                  <Heading size="sm" mb={2}>Technical Evaluation:</Heading>
                  <Text>{overallFeedback.technicalEvaluation}</Text>
                </Box>
                
                <Box>
                  <Heading size="sm" mb={2}>Communication Evaluation:</Heading>
                  <Text>{overallFeedback.communicationEvaluation}</Text>
                </Box>
                
                <Box>
                  <Heading size="sm" mb={2}>Recommendations:</Heading>
                  <VStack align="stretch" pl={4}>
                    {overallFeedback.recommendations.map((recommendation, index) => (
                      <HStack key={index} align="start">
                        <Text color="blue.500">→</Text>
                        <Text>{recommendation}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </Box>
          )}
          
          <Button 
            colorScheme="yellow" 
            size="lg" 
            onClick={resetInterview}
          >
            Start a New Interview
          </Button>
        </VStack>
      </Box>
    );
  };
  
  // Main render
  return (
    <Container maxW="6xl" py={8}>
      {loading && (
        <Flex 
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="overlay"
          bg="rgba(0,0,0,0.7)"
          justify="center"
          align="center"
          direction="column"
        >
          <Spinner size="xl" color="yellow.400" mb={4} />
          <Text color="white" fontSize="lg">
            {step === 'setup' ? 'Preparing your interview...' :
             step === 'recording' ? 'Processing your answer...' :
             'Analyzing your performance...'}
          </Text>
        </Flex>
      )}
      
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center" size="xl" color="yellow.500">
          AI Mock Interview
        </Heading>
        
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <Text>{error}</Text>
          </Alert>
        )}
        
        {step === 'setup' && renderSetup()}
        {step === 'recording' && renderRecording()}
        {step === 'feedback' && renderFeedback()}
        {step === 'complete' && renderComplete()}
      </VStack>
    </Container>
  );
};

export default MockInterview;