// MockInterviewApp.js - All-in-one AI Mock Interview component with Tailwind CSS
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
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
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch
} from '@chakra-ui/react';
import { FaPlay, FaStop, FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

// API base URL - change this to your backend server URL
const API_BASE_URL = 'http://localhost:3001/api/v1/interview';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies/auth
});

const MockInterview = () => {
  // State variables
  const [step, setStep] = useState('setup');
  const [topic, setTopic] = useState('');
  const [experience, setExperience] = useState('beginner');
  const [numQuestions, setNumQuestions] = useState(5);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [interview, setInterview] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [timer, setTimer] = useState(0);
  const [videoEnabled, setVideoEnabled] = useState(true);

  // Refs
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  
  // Toast for notifications
  const toast = useToast();

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const accentColor = useColorModeValue('yellow.500', 'yellow.400');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const formBg = useColorModeValue('white', 'gray.700');
  const lightBg = useColorModeValue('gray.50', 'gray.600');
  const yellowBg = useColorModeValue('yellow.50', 'yellow.900');
  const greenBg = useColorModeValue('green.50', 'green.900');

  // Experience options
  const experienceOptions = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
    { value: 'advanced', label: 'Advanced (3-5 years)' },
    { value: 'expert', label: 'Expert (5+ years)' }
  ];

  // Common interview topics
  const topicSuggestions = [
    'React.js',
    'Node.js',
    'JavaScript',
    'Python',
    'Data Science',
    'Machine Learning',
    'Cloud Computing',
    'DevOps',
    'Full Stack Development',
    'Software Engineering',
    'Product Management'
  ];

  // Initialize speech recognition if available
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognitionRef = useRef(null);
  
  useEffect(() => {
    // Setup speech recognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event) => {
        let interimTranscription = '';
        let finalTranscription = transcription;
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscription += transcript + ' ';
          } else {
            interimTranscription += transcript;
          }
        }
        
        setTranscription(finalTranscription + interimTranscription);
      };
      
      recognitionRef.current.onend = () => {
        console.log("Speech recognition ended");
        // Auto-restart recognition if we're still in recording mode
        if (isRecording) {
          try {
            recognitionRef.current.start();
            console.log("Speech recognition restarted");
          } catch (e) {
            console.log('Recognition already started');
          }
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        
        if (event.error === 'not-allowed') {
          setError('Microphone access was denied. Please allow microphone access to use this feature.');
        } else if (event.error === 'network') {
          // Common network error - don't display to user, just retry
          console.log('Network error with speech recognition, restarting...');
          
          // Wait a moment then try to restart
          setTimeout(() => {
            if (isRecording && recognitionRef.current) {
              try {
                recognitionRef.current.stop();
                setTimeout(() => {
                  recognitionRef.current.start();
                  console.log("Restarted speech recognition after network error");
                }, 1000);
              } catch (e) {
                console.log('Error restarting speech recognition:', e);
              }
            }
          }, 2000);
        }
      };
    } else {
      console.warn('Speech recognition is not supported in this browser');
    }
    
    return () => {
      // Cleanup
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.log('Recognition already stopped');
        }
      }
      stopMediaTracks();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [transcription, isRecording]);

  // Reset states when step changes
  useEffect(() => {
    if (step === 'setup') {
      stopMediaTracks();
      setInterview(null);
      setAnswers([]);
      setTranscription('');
      setFeedback(null);
      setCurrentQuestionIndex(0);
      setTimer(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    
    if (step === 'recording' && interview) {
      // Initialize camera and audio
      initMediaDevices();
    }
  }, [step]);

  // Stop media tracks when component unmounts
  useEffect(() => {
    return () => {
      stopMediaTracks();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Initialize camera and audio
  const initMediaDevices = async () => {
    try {
      stopMediaTracks(); // Clean up any existing streams
      
      // Set up media constraints based on videoEnabled state
      const constraints = { 
        audio: true,
        video: videoEnabled ? { width: 640, height: 480 } : false
      };
      
      console.log('Requesting media with constraints:', constraints);
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Media stream obtained:', stream);
      
      // Save the stream
      streamRef.current = stream;
      
      // Only set up video if it's enabled
      if (videoEnabled && videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Only notify about microphone access
      console.log('Microphone permission granted');
      
      // Set up timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing media devices:', error);
      setError(`Could not access your ${videoEnabled ? 'camera and ' : ''}microphone. Please ensure they are connected and permissions are granted.`);
    }
  };

  // Stop media tracks
  const stopMediaTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Toggle video
  const toggleVideo = () => {
    const newVideoEnabled = !videoEnabled;
    setVideoEnabled(newVideoEnabled);
    
    // Reinitialize media devices with new settings
    if (step === 'recording') {
      initMediaDevices();
    }
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Start recording
  const startRecording = async () => {
    if (!recognitionRef.current) {
      setError('Speech recognition is not supported in your browser.');
      return;
    }
    
    setTranscription('');
    setIsRecording(true);
    
    try {
      recognitionRef.current.start();
      console.log('Speech recognition started');
      
      toast({
        title: 'Recording started',
        description: 'Speak clearly into your microphone',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Could not start recording. Please refresh and try again.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    setIsRecording(false);
    
    try {
      recognitionRef.current.stop();
      console.log('Speech recognition stopped');
      
      // Save the answer
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = transcription.trim();
      setAnswers(newAnswers);
      
      toast({
        title: 'Recording stopped',
        description: 'Your answer has been saved',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  // Start the interview
  const startInterview = async () => {
    if (!topic) {
      setError('Please select or enter a topic');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Make API call to create interview
      const response = await api.post('/create', {
        topic,
        experience,
        numQuestions
      });
      
      const interviewData = response.data;
      console.log('Interview created:', interviewData);
      
      // Initialize answers array with empty strings
      const initialAnswers = Array(interviewData.questions.length).fill('');
      
      setInterview(interviewData);
      setAnswers(initialAnswers);
      setStep('recording');
      
    } catch (error) {
      console.error('Error creating interview:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Server error: ${error.response.data.message || 'Failed to create interview'}`);
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your connection.');
        
        // For demo/testing when backend is not available
        console.log('Using mock data for interview');
        
        // Create mock interview for testing
        const mockInterview = {
          _id: 'mock-interview-id',
          topic,
          experience,
          questions: [
            {
              question: `What are the core principles of ${topic}?`,
              idealAnswer: `The core principles of ${topic} include concepts like [specific principles]. A good answer would explain each of these in detail with practical examples.`
            },
            {
              question: `How do you handle error scenarios in ${topic}?`,
              idealAnswer: `Error handling in ${topic} typically involves strategies like [error handling approaches]. Best practices include implementing proper logging, user-friendly error messages, and graceful degradation.`
            },
            {
              question: `What are the latest developments in ${topic} you find most exciting?`,
              idealAnswer: `Recent developments in ${topic} include [new features/trends]. A strong candidate would show awareness of these advancements and explain how they solve real-world problems.`
            },
            {
              question: `How would you architect a system using ${topic} for high scalability?`,
              idealAnswer: `For high scalability with ${topic}, consider [architecture patterns]. Key factors include statelessness, horizontal scaling, caching strategies, and database optimization.`
            },
            {
              question: `How do you stay updated with the latest trends in ${topic}?`,
              idealAnswer: `Professionals stay updated on ${topic} through resources like official documentation, community forums, conferences, blogs, and hands-on practice with new features.`
            }
          ]
        };
        
        const initialAnswers = Array(mockInterview.questions.length).fill('');
        setInterview(mockInterview);
        setAnswers(initialAnswers);
        setStep('recording');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Move to next question
  const nextQuestion = () => {
    // If we're on the last question, submit the interview
    if (currentQuestionIndex === interview.questions.length - 1) {
      submitInterview();
      return;
    }
    
    // Save the answer if we're recording
    if (isRecording) {
      stopRecording();
    }
    
    setCurrentQuestionIndex(prev => prev + 1);
    setTranscription('');
  };

  // Move to previous question
  const prevQuestion = () => {
    if (isRecording) {
      stopRecording();
    }
    
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
    setTranscription(answers[currentQuestionIndex - 1] || '');
  };

  // Submit interview for feedback
  const submitInterview = async () => {
    if (isRecording) {
      stopRecording();
    }
    
    setLoading(true);
    
    try {
      // Submit answers to API
      const response = await api.post(`/${interview._id}/submit`, {
        answers
      });
      
      const feedbackData = response.data.feedback;
      console.log('Feedback received:', feedbackData);
      
      setFeedback(feedbackData);
      setStep('feedback');
      
    } catch (error) {
      console.error('Error submitting interview:', error);
      
      if (error.response) {
        setError(`Server error: ${error.response.data.message || 'Failed to submit answers'}`);
      } else if (error.request) {
        setError('No response from server. Please check your connection.');
        
        // For demo/testing when backend is not available
        console.log('Using mock data for feedback');
        
        // Create mock feedback for testing
        const mockFeedback = {
          overallScore: 7.5,
          summary: `Overall, you demonstrated a good understanding of ${topic}. Your answers were generally well-structured and showed technical knowledge. Areas for improvement include providing more specific examples and going deeper into technical details where appropriate.`,
          questionFeedback: interview.questions.map((q, i) => ({
            question: q.question,
            userAnswer: answers[i] || "No answer provided",
            idealAnswer: q.idealAnswer,
            feedback: answers[i] 
              ? `Your answer covered the main points about ${topic}. You could improve by being more specific about [technical details]. Good job mentioning [something from their answer].` 
              : "No answer was provided for this question.",
            score: answers[i] ? 7 + Math.random() * 2 : 5
          }))
        };
        
        setFeedback(mockFeedback);
        setStep('feedback');
      } else {
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Start a new interview
  const startNewInterview = () => {
    setStep('setup');
  };

  // Render setup screen
  const renderSetup = () => {
    return (
      <Box 
        bg={bgColor} 
        p={8} 
        borderRadius="xl" 
        boxShadow="xl"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <VStack spacing={6} align="stretch">
          <Heading size="lg">Interview Setup</Heading>
          
          <FormControl isRequired>
            <FormLabel>Interview Topic</FormLabel>
            <Select 
              placeholder="Select a topic or type your own"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              size="lg"
              bg={formBg}
              borderColor={borderColor}
              _hover={{ borderColor: accentColor }}
            >
              {topicSuggestions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Select>
            
            {topic === 'Custom' && (
              <Input
                mt={4}
                placeholder="Enter custom topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                size="lg"
                borderColor={borderColor}
                _hover={{ borderColor: accentColor }}
              />
            )}
          </FormControl>
          
          <FormControl>
            <FormLabel>Experience Level</FormLabel>
            <Select 
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              size="lg"
              bg={formBg}
              borderColor={borderColor}
              _hover={{ borderColor: accentColor }}
            >
              {experienceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel>Number of Questions</FormLabel>
            <NumberInput 
              defaultValue={5} 
              min={3} 
              max={10}
              onChange={(valueString) => setNumQuestions(parseInt(valueString))}
              value={numQuestions}
              size="lg"
            >
              <NumberInputField 
                bg={formBg}
                borderColor={borderColor}
                _hover={{ borderColor: accentColor }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="video-toggle" mb="0">
              Enable webcam during interview
            </FormLabel>
            <Switch 
              id="video-toggle" 
              colorScheme="yellow"
              isChecked={videoEnabled}
              onChange={toggleVideo}
            />
          </FormControl>
          
          <Box 
            p={4} 
            bg={lightBg} 
            borderRadius="md"
            borderLeftWidth="4px"
            borderLeftColor={accentColor}
          >
            <Text>
              <strong>How it works:</strong> You'll be asked a series of questions about {topic || "your selected topic"}. 
              Answer each question by speaking into your microphone. Your answers will be transcribed automatically.
              After the interview, you'll receive detailed feedback on your performance.
            </Text>
          </Box>
          
          <Button
            colorScheme="yellow"
            size="lg"
            onClick={startInterview}
            rightIcon={<FaPlay />}
            isLoading={loading}
            loadingText="Creating Interview"
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
    if (!interview) return null;
    
    return (
      <Box 
        bg={bgColor} 
        p={6} 
        borderRadius="xl" 
        boxShadow="xl"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <VStack spacing={5} align="stretch">
          <Flex justify="space-between" align="center" wrap="wrap">
            <Heading size="md" color={accentColor}>
              {interview.topic} Interview 
              <Badge ml={2} colorScheme="yellow">{experience}</Badge>
            </Heading>
            
            <HStack>
              <Badge colorScheme="blue">
                Question {currentQuestionIndex + 1} of {interview.questions.length}
              </Badge>
              
              <Badge colorScheme={isRecording ? "red" : "gray"}>
                {isRecording ? "Recording" : "Not Recording"}
              </Badge>
              
              <Badge>
                Time: {formatTime(timer)}
              </Badge>
            </HStack>
          </Flex>
          
          <Progress 
            value={(currentQuestionIndex / interview.questions.length) * 100} 
            colorScheme="yellow" 
            borderRadius="full" 
            size="sm" 
          />
          
          {/* Video display area (if video is enabled) */}
          {videoEnabled && (
            <Flex 
              justify="center" 
              borderRadius="md" 
              overflow="hidden"
              borderWidth="1px"
              borderColor={borderColor}
              boxShadow="sm"
              bg="black"
              position="relative"
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ 
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'contain'
                }}
              />
              
              <Button
                position="absolute"
                bottom="10px"
                right="10px"
                size="sm"
                colorScheme={videoEnabled ? "red" : "green"}
                leftIcon={videoEnabled ? <FaVideoSlash /> : <FaVideo />}
                onClick={toggleVideo}
                opacity="0.8"
                _hover={{ opacity: 1 }}
              >
                {videoEnabled ? "Disable" : "Enable"} Video
              </Button>
            </Flex>
          )}
          
          {/* Question */}
          <Box 
            borderWidth="1px" 
            borderColor={borderColor} 
            borderRadius="md" 
            p={4}
            bg={formBg}
          >
            <Text fontWeight="bold" mb={2}>Question:</Text>
            <Text fontSize="lg">{interview.questions[currentQuestionIndex].question}</Text>
          </Box>
          
          {/* Transcription/Answer */}
          <Box>
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontWeight="bold">
                {isRecording ? "Transcription (Live)" : "Your Answer"}:
              </Text>
              {isRecording && (
                <Badge colorScheme="red" p={1} borderRadius="full" px={3}>
                  <Flex align="center" gap={2}>
                    <Box
                      w="8px"
                      h="8px"
                      borderRadius="full"
                      bg="red.500"
                      animation="pulse 1.5s infinite"
                      sx={{
                        "@keyframes pulse": {
                          "0%": { opacity: 1 },
                          "50%": { opacity: 0.4 },
                          "100%": { opacity: 1 }
                        }
                      }}
                    />
                    Recording
                  </Flex>
                </Badge>
              )}
            </Flex>
            
            {isRecording ? (
              <Box 
                borderWidth="1px" 
                borderColor={borderColor} 
                borderRadius="md" 
                p={4}
                minH="150px"
                bg={formBg}
                overflowY="auto"
              >
                {transcription || <Text color="gray.500">Speak now... (your answer will appear here)</Text>}
              </Box>
            ) : (
              <Textarea
                value={answers[currentQuestionIndex] || ''}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[currentQuestionIndex] = e.target.value;
                  setAnswers(newAnswers);
                }}
                placeholder="Your answer will appear here. You can also type or edit it manually."
                minH="120px"
                resize="vertical"
              />
            )}
          </Box>
          
          <HStack spacing={4} justify="space-between">
            <Button
              leftIcon={<FaArrowLeft />}
              onClick={prevQuestion}
              isDisabled={currentQuestionIndex === 0 || isRecording}
              variant="outline"
            >
              Previous
            </Button>
            
            <HStack>
              {!isRecording ? (
                <Button
                  colorScheme="red"
                  leftIcon={<FaMicrophone />}
                  onClick={startRecording}
                >
                  Start Recording
                </Button>
              ) : (
                <Button
                  colorScheme="gray"
                  leftIcon={<FaMicrophoneSlash />}
                  onClick={stopRecording}
                >
                  Stop Recording
                </Button>
              )}
            </HStack>
            
            <Button
              rightIcon={<FaArrowRight />}
              colorScheme="yellow"
              onClick={nextQuestion}
              isDisabled={isRecording}
            >
              {currentQuestionIndex < interview.questions.length - 1 ? 'Next' : 'Finish & Submit'}
            </Button>
          </HStack>
        </VStack>
      </Box>
    );
  };

  // Render feedback screen
  const renderFeedback = () => {
    if (!feedback) return null;
    
    return (
      <Box 
        bg={bgColor} 
        p={8} 
        borderRadius="xl" 
        boxShadow="xl"
        borderWidth="1px"
        borderColor={borderColor}
        w="100%"
      >
        <VStack spacing={8} align="stretch">
          <Heading size="lg" textAlign="center" color={accentColor}>
            Interview Feedback
          </Heading>
          
          <Box 
            p={6} 
            bg={lightBg}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Heading size="md" mb={4}>
              Overall Score: 
              <Badge 
                ml={2} 
                fontSize="lg" 
                colorScheme={
                  feedback.overallScore >= 8 ? "green" : 
                  feedback.overallScore >= 6 ? "yellow" : "red"
                }
                p={2}
                borderRadius="md"
              >
                {feedback.overallScore}/10
              </Badge>
            </Heading>
            
            <Text fontWeight="medium" mb={2}>Summary:</Text>
            <Text>{feedback.summary}</Text>
          </Box>
          
          <Heading size="md" mb={2}>
            Question-by-Question Feedback
          </Heading>
          
          {feedback.questionFeedback.map((qf, index) => (
            <Box 
              key={index}
              p={4} 
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="md"
              mb={4}
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Heading size="sm">Question {index + 1}</Heading>
                <Badge 
                  colorScheme={
                    qf.score >= 8 ? "green" : 
                    qf.score >= 6 ? "yellow" : "red"
                  }
                >
                  Score: {qf.score}/10
                </Badge>
              </Flex>
              
              <Text fontWeight="medium" mb={1}>Question:</Text>
              <Text mb={3}>{qf.question}</Text>
              
              <Text fontWeight="medium" mb={1}>Your Answer:</Text>
              <Text 
                mb={3} 
                p={2} 
                bg={lightBg}
                borderRadius="md"
              >
                {qf.userAnswer || "No answer provided"}
              </Text>
              
              <Text fontWeight="medium" mb={1}>Feedback:</Text>
              <Text 
                p={2} 
                borderLeftWidth="4px"
                borderLeftColor={accentColor}
                bg={yellowBg}
                mb={3}
                borderRadius="md"
              >
                {qf.feedback}
              </Text>
              
              <Divider my={3} />
              
              <Text fontWeight="medium" mb={1}>Ideal Answer:</Text>
              <Text 
                p={2} 
                borderLeftWidth="4px"
                borderLeftColor="green.400"
                bg={greenBg}
                borderRadius="md"
              >
                {qf.idealAnswer}
              </Text>
            </Box>
          ))}
          
          <Button
            colorScheme="yellow"
            size="lg"
            onClick={startNewInterview}
            rightIcon={<FaArrowRight />}
            mt={4}
          >
            Start New Interview
          </Button>
        </VStack>
      </Box>
    );
  };

  return (
    <Container maxW="container.lg" py={12}>
      <VStack spacing={8} align="stretch">
        <Heading 
          textAlign="center" 
          size="xl"
          bgGradient="linear(to-r, yellow.400, yellow.600)"
          bgClip="text"
        >
          AI Mock Interview
        </Heading>
        
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <Text>{error}</Text>
          </Alert>
        )}
        
        {loading && (
          <Flex justify="center" p={8}>
            <VStack>
              <Spinner color={accentColor} size="xl" />
              <Text mt={4}>
                {step === 'setup' ? 'Creating your interview...' : 
                 step === 'feedback' ? 'Analyzing your answers...' : 
                 'Loading...'}
              </Text>
            </VStack>
          </Flex>
        )}
        
        {!loading && (
          <>
            {step === 'setup' && renderSetup()}
            {step === 'recording' && renderRecording()}
            {step === 'feedback' && renderFeedback()}
          </>
        )}
      </VStack>
    </Container>
  );
};

export default MockInterview;