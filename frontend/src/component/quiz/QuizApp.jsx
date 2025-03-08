// src/components/quiz/QuizApp.jsx - Consolidated quiz component with all functionality
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  Progress,
  useToast,
  useColorModeValue,
  Badge,
  Circle,
  IconButton,
  Divider,
  useDisclosure,
  ScaleFade,
  SlideFade,
  Tooltip,
  Image,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaLightbulb, 
  FaArrowRight, 
  FaRedo, 
  FaCheck, 
  FaTimes, 
  FaRocket,
  FaSearch
} from 'react-icons/fa';
import confetti from 'canvas-confetti';

// Wrapper component for motion effects
const MotionBox = motion(Box);

const QuizApp = () => {
  const [step, setStep] = useState('form'); // form, quiz, results
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [topic, setTopic] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();
  
  // Move all color mode hooks to the top level
  const cardBg = useColorModeValue('white', 'gray.800');
  const gradientBg = useColorModeValue(
    'linear(to-r, purple.400, pink.400)', 
    'linear(to-r, purple.600, pink.600)'
  );
  const highlightColor = useColorModeValue('purple.500', 'purple.300');
  const secondaryBg = useColorModeValue('gray.50', 'gray.700');
  const optionDefaultBg = useColorModeValue('gray.50', 'gray.700');
  const containerBg = useColorModeValue('white', 'gray.800');
  
  useEffect(() => {
    if (step === 'results') {
      // Trigger confetti on good results
      const score = calculateScore();
      const percentage = (score / quiz.questions.length) * 100;
      
      if (percentage >= 70) {
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#9F7AEA', '#ED64A6']
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#9F7AEA', '#ED64A6']
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        
        frame();
      }
    }
  }, [step, quiz]);

  // Generate quiz based on user input
  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:3001/api/v1/quiz/genquiz', {
        topic: topic.trim(),
        numberOfQuestions: 10
      });
      
      setQuiz(response.data.quiz);
      setUserAnswers(new Array(response.data.quiz.questions.length).fill(''));
      setStep('quiz');
      onToggle(); // Trigger animation
      
      toast({
        title: 'Quiz Generated!',
        description: `Get ready to test your knowledge on ${topic}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
    } catch (error) {
      console.error('Error generating quiz:', error);
      setError(error.response?.data?.message || 'Failed to generate quiz. Please try again.');
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to generate quiz. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    console.log("Option selected:", option);
    setSelectedOption(option);
  };

  // Save the user's answer and move to the next question
  const handleNext = () => {
    // First save the current answer
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selectedOption;
    setUserAnswers(updatedAnswers);
    
    if (currentQuestion < quiz.questions.length - 1) {
      // Move to the next question
      setCurrentQuestion(currentQuestion + 1);
      // Clear the selected option for the new question
      setSelectedOption('');
      // Reset the success animation state
      setShowSuccessAnimation(false);
    } else {
      // If this was the last question, show the results
      setStep('results');
    }
  };

  // Calculate the user's score
  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  // Restart the quiz process
  const handleRestart = () => {
    setStep('form');
    setQuiz(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setTopic('');
    setSelectedOption('');
    setError('');
  };

  // LoadingSpinner Component
  const LoadingSpinner = ({ message = 'Loading...' }) => {
    return (
      <Flex 
        direction="column" 
        align="center" 
        justify="center" 
        minH="60vh"
        p={8}
      >
        <Box 
          position="relative"
          w="150px"
          h="150px"
          mb={6}
        >
          <Circle
            size="120px"
            position="absolute"
            top="15px"
            left="15px"
            bg={highlightColor}
            opacity={0.7}
            zIndex={1}
            as={motion.div}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
          <Circle
            size="150px"
            position="absolute"
            top="0"
            left="0"
            borderWidth="4px"
            borderColor={`${highlightColor} transparent ${highlightColor} transparent`}
            as={motion.div}
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </Box>
        <Heading
          bgGradient={gradientBg}
          bgClip="text"
          fontSize="xl"
          fontWeight="bold"
        >
          {message}
        </Heading>
        <Text mt={4} color="gray.500">
          Our AI is crafting your perfect quiz...
        </Text>
      </Flex>
    );
  };

  // QuizForm Component
  const renderQuizForm = () => {
    return (
      <SlideFade in={true} offsetY="30px">
        <Box
          bg={cardBg}
          borderRadius="xl"
          overflow="hidden"
          boxShadow="2xl"
        >
          <Box
            bgGradient={gradientBg}
            px={6}
            py={5}
            position="relative"
            overflow="hidden"
          >
            <Heading color="white" fontSize={{ base: "xl", md: "2xl" }} zIndex={2} position="relative">
              AI Quiz Creator
            </Heading>
            <Text color="whiteAlpha.800" mt={1} zIndex={2} position="relative">
              Test your knowledge with custom AI-generated quizzes!
            </Text>
            
            {/* Decorative elements */}
            <Circle 
              position="absolute" 
              size="100px" 
              top="-20px" 
              right="-20px" 
              bg="whiteAlpha.200"
            />
            <Circle 
              position="absolute" 
              size="60px" 
              bottom="-10px" 
              left="30%" 
              bg="whiteAlpha.200"
            />
          </Box>
          
          <Box p={{ base: 5, md: 8 }}>
            <Text color="gray.600" mb={6}>
              Enter any topic and our AI will generate a personalized quiz just for you.
              Try topics like "JavaScript Basics", "World History", or "Machine Learning"!
            </Text>
            
            <form onSubmit={handleGenerateQuiz}>
              <VStack spacing={6} align="stretch">
                <FormControl>
                  <InputGroup size="lg">
                    <Input
                      placeholder="Enter quiz topic..."
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      borderRadius="full"
                      borderWidth="2px"
                      borderColor={highlightColor}
                      focusBorderColor="pink.400"
                      _hover={{ borderColor: "pink.300" }}
                      pr="4.5rem"
                    />
                    <InputRightElement width="4.5rem">
                      <FaSearch color="gray.300" />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                
                <Button
                  type="submit"
                  bgGradient={gradientBg}
                  color="white"
                  size="lg"
                  borderRadius="full"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  _active={{
                    transform: "translateY(0)",
                    boxShadow: "md",
                  }}
                  leftIcon={<FaRocket />}
                  isLoading={isLoading}
                  loadingText="Generating Quiz"
                >
                  Create My Quiz
                </Button>
              </VStack>
            </form>
            
            <Box mt={12}>
              <Heading size="sm" mb={4} color="gray.600">
                Popular Topics
              </Heading>
              <Flex flexWrap="wrap" gap={2}>
                {['JavaScript', 'History', 'Science', 'Music', 'Movies', 'Sports'].map(suggestion => (
                  <Badge
                    key={suggestion}
                    px={3}
                    py={1}
                    borderRadius="full"
                    colorScheme="purple"
                    cursor="pointer"
                    onClick={() => setTopic(suggestion)}
                    _hover={{ transform: "scale(1.05)" }}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Box>
        </Box>
      </SlideFade>
    );
  };

  // Quiz Question Component
  const renderQuizQuestion = () => {
    const question = quiz.questions[currentQuestion];
    
    console.log("Current Question:", currentQuestion);
    console.log("Total Questions:", quiz.questions.length);
    console.log("Selected Option:", selectedOption);
    console.log("Button should be disabled:", !selectedOption);
    
    return (
      <ScaleFade initialScale={0.9} in={true}>
        <Box
          bg={cardBg}
          borderRadius="xl"
          overflow="hidden"
          boxShadow="xl"
        >
          <Box
            bgGradient={gradientBg}
            px={6}
            py={5}
          >
            <Heading color="white" fontSize={{ base: "xl", md: "2xl" }}>
              {quiz.topic}
            </Heading>
            <Text color="whiteAlpha.800" mt={1}>
              Question {currentQuestion + 1} of {quiz.questions.length}
            </Text>
          </Box>
          
          <Box p={{ base: 5, md: 8 }}>
            <Progress
              value={(currentQuestion / quiz.questions.length) * 100}
              size="sm"
              colorScheme="purple"
              borderRadius="full"
              mb={8}
            />
            
            <Box mb={10}>
              <Heading size="md" mb={6}>
                {question.question}
              </Heading>
              
              <VStack spacing={3} align="stretch">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    data-option={option}
                    variant={selectedOption === option ? "solid" : "outline"}
                    colorScheme={selectedOption === option ? "purple" : "gray"}
                    size="lg"
                    justifyContent="flex-start"
                    borderRadius="md"
                    py={6}
                    px={5}
                    _hover={{
                      transform: selectedOption !== option ? "translateY(-2px)" : "none",
                      boxShadow: selectedOption !== option ? "md" : "none",
                    }}
                    position="relative"
                    overflow="hidden"
                    isDisabled={showSuccessAnimation}
                  >
                    <Circle
                      size="30px"
                      bg={selectedOption === option ? "white" : "gray.100"}
                      color={selectedOption === option ? "purple.500" : "gray.600"}
                      mr={4}
                      fontWeight="bold"
                    >
                      {String.fromCharCode(65 + index)}
                    </Circle>
                    <Text fontWeight={selectedOption === option ? "bold" : "normal"}>
                      {option}
                    </Text>
                  </Button>
                ))}
              </VStack>
            </Box>
            
            <Flex justify="space-between">
              <Button
                variant="outline"
                onClick={handleRestart}
                leftIcon={<FaRedo />}
                colorScheme="gray"
              >
                Restart
              </Button>
              
              {currentQuestion < quiz.questions.length - 1 ? (
                <Button
                  onClick={handleNext}
                  rightIcon={<FaArrowRight />}
                  bgGradient={gradientBg}
                  color="white"
                  isDisabled={!selectedOption}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "md",
                  }}
                >
                  Next Question
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    const updatedAnswers = [...userAnswers];
                    updatedAnswers[currentQuestion] = selectedOption || "";
                    setUserAnswers(updatedAnswers);
                    setStep('results');
                  }}
                  rightIcon={<FaArrowRight />}
                  bgGradient={gradientBg}
                  color="white"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "md",
                  }}
                >
                  See Results
                </Button>
              )}
            </Flex>
          </Box>
        </Box>
      </ScaleFade>
    );
  };

  // Quiz Results Component
  const renderQuizResults = () => {
    const score = calculateScore();
    const percentage = (score / quiz.questions.length) * 100;
    
    const getGradeColor = () => {
      if (percentage >= 80) return 'green.500';
      if (percentage >= 60) return 'yellow.500';
      return 'red.500';
    };
    
    const getFeedback = () => {
      if (percentage >= 90) return "Excellent! You've mastered this topic!";
      if (percentage >= 80) return "Great job! You have a strong understanding.";
      if (percentage >= 70) return "Well done! You know this topic well.";
      if (percentage >= 60) return "Good effort! You're on the right track.";
      if (percentage >= 50) return "You passed! Keep studying to improve.";
      if (percentage >= 30) return "Almost there. A bit more study will help.";
      return "Keep practicing. You'll improve with more study!";
    };

    return (
      <SlideFade in={true} offsetY="30px">
        <Box
          bg={cardBg}
          borderRadius="xl"
          overflow="hidden"
          boxShadow="2xl"
        >
          <Box
            bgGradient={gradientBg}
            px={6}
            py={5}
          >
            <Heading color="white" fontSize={{ base: "xl", md: "2xl" }}>
              Quiz Results
            </Heading>
            <Text color="whiteAlpha.800" mt={1}>
              {quiz.topic}
            </Text>
          </Box>
          
          <Box p={{ base: 5, md: 8 }}>
            <Flex 
              direction="column" 
              align="center" 
              mb={10}
              p={6}
              bg={secondaryBg}
              borderRadius="xl"
            >
              <Circle 
                size="150px" 
                bg={containerBg}
                boxShadow="lg"
                mb={4}
              >
                <VStack spacing={0}>
                  <Heading 
                    size="3xl" 
                    color={getGradeColor()}
                  >
                    {Math.round(percentage)}%
                  </Heading>
                  <Text color="gray.500" fontSize="sm">Score</Text>
                </VStack>
              </Circle>
              
              <Heading size="md" mb={2}>
                {score} out of {quiz.questions.length} correct
              </Heading>
              
              <Text textAlign="center" color="gray.600">
                {getFeedback()}
              </Text>
            </Flex>
            
            <Divider mb={8} />
            
            <Heading size="md" mb={6} color="gray.700">
              Question Review
            </Heading>
            
            <VStack spacing={6} align="stretch" mb={8}>
              {quiz.questions.map((question, index) => {
                const isCorrect = userAnswers[index] === question.correctAnswer;
                
                return (
                  <Box 
                    key={index} 
                    borderWidth="1px"
                    borderRadius="lg"
                    p={5}
                    bg={isCorrect ? 'green.50' : 'red.50'}
                    borderColor={isCorrect ? 'green.200' : 'red.200'}
                    position="relative"
                    overflow="hidden"
                  >
                    {/* Indicator icon */}
                    <Flex 
                      position="absolute" 
                      top="0" 
                      right="0" 
                      p={2}
                    >
                      {isCorrect ? (
                        <Circle size="32px" bg="green.100">
                          <FaCheck color="green" />
                        </Circle>
                      ) : (
                        <Circle size="32px" bg="red.100">
                          <FaTimes color="red" />
                        </Circle>
                      )}
                    </Flex>
                    
                    <Heading size="sm" mb={3}>
                      Question {index + 1}: {question.question}
                    </Heading>
                    
                    <VStack align="stretch" spacing={2} mt={4}>
                      {question.options.map((option, optionIndex) => (
                        <Flex 
                          key={optionIndex} 
                          p={3}
                          borderRadius="md"
                          align="center"
                          bg={
                            option === question.correctAnswer
                              ? 'green.100'
                              : option === userAnswers[index] && !isCorrect
                                ? 'red.100'
                                : optionDefaultBg
                          }
                          borderWidth={option === userAnswers[index] ? '2px' : '1px'}
                          borderColor={
                            option === question.correctAnswer
                              ? 'green.300'
                              : option === userAnswers[index] && !isCorrect
                                ? 'red.300'
                                : 'gray.200'
                          }
                        >
                          <Box mr={3}>
                            {option === question.correctAnswer ? (
                              <Circle size="24px" bg="green.400" color="white">
                                <FaCheck size="12px" />
                              </Circle>
                            ) : option === userAnswers[index] && !isCorrect ? (
                              <Circle size="24px" bg="red.400" color="white">
                                <FaTimes size="12px" />
                              </Circle>
                            ) : (
                              <Circle size="24px" bg="gray.200">
                                {String.fromCharCode(65 + optionIndex)}
                              </Circle>
                            )}
                          </Box>
                          <Text>{option}</Text>
                        </Flex>
                      ))}
                    </VStack>
                  </Box>
                );
              })}
            </VStack>
            
            <Flex justify="center" mt={10}>
              <Button
                onClick={handleRestart}
                leftIcon={<FaRedo />}
                bgGradient={gradientBg}
                color="white"
                size="lg"
                borderRadius="full"
                px={8}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Create Another Quiz
              </Button>
            </Flex>
          </Box>
        </Box>
      </SlideFade>
    );
  };

  // Main render function
  if (isLoading) {
    return (
      <Container maxW="4xl" py={12}>
        <LoadingSpinner message="Generating your quiz..." />
      </Container>
    );
  }

  return (
    <Container maxW="4xl" py={12}>
      {error && (
        <Box 
          mb={6} 
          p={4} 
          borderRadius="lg" 
          bg="red.50" 
          borderLeft="4px solid" 
          borderColor="red.500"
        >
          <Flex align="center">
            <Box color="red.500" mr={3}>
              <FaTimes />
            </Box>
            <Text color="red.600">{error}</Text>
          </Flex>
        </Box>
      )}
      
      {step === 'form' && renderQuizForm()}
      {step === 'quiz' && quiz && renderQuizQuestion()}
      {step === 'results' && quiz && renderQuizResults()}
    </Container>
  );
};

export default QuizApp;