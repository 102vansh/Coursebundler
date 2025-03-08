import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import {
  Box,
  Container,
  Flex,
  Select,
  Button,
  Text,
  Heading,
  useColorModeValue,
  HStack,
  Icon,
  Badge,
  Divider,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Kbd,
  VStack,
  IconButton,
  Tooltip,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton
} from "@chakra-ui/react";
import {
  FaPlay,
  FaCog,
  FaCode,
  FaSave,
  FaDownload,
  FaUndo,
  FaRedo,
  FaInfoCircle,
  FaTerminal
} from "react-icons/fa";

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState("vs-dark");
  const [error, setError] = useState(null);
  const toast = useToast();

  // Colors based on theme
  const editorBg = useColorModeValue('gray.50', 'gray.900');
  const outputBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const accentColor = useColorModeValue('yellow.500', 'yellow.400');
  const secondaryBg = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  // Sample starter code for each language
  const starterCode = {
    javascript: "// JavaScript Example\nconsole.log('Hello, World!');\n\n// Try creating a function\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('Developer'));",
    python: "# Python Example\nprint('Hello, World!')\n\n# Try creating a function\ndef greet(name):\n    return f'Hello, {name}!'\n\nprint(greet('Developer'))",
    java: "// Java Example\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n        System.out.println(greet(\"Developer\"));\n    }\n\n    public static String greet(String name) {\n        return \"Hello, \" + name + \"!\";\n    }\n}",
    cpp: "// C++ Example\n#include <iostream>\n#include <string>\n\nstd::string greet(std::string name) {\n    return \"Hello, \" + name + \"!\";\n}\n\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    std::cout << greet(\"Developer\") << std::endl;\n    return 0;\n}",
    go: "// Go Example\npackage main\n\nimport \"fmt\"\n\nfunc greet(name string) string {\n    return \"Hello, \" + name + \"!\"\n}\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n    fmt.Println(greet(\"Developer\"))\n}",
  };

  // Update code when language changes
  useEffect(() => {
    if (starterCode[language]) {
      setCode(starterCode[language]);
    } else {
      setCode("// Write your code here");
    }
  }, [language]);

  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  // Improved function to extract output from user code
  const getSimulatedOutput = (code, language) => {
    let output = "[Simulated Mode - Network connection unavailable]\n";
    
    try {
      // Try to extract print/log statements from the code
      switch (language) {
        case 'javascript':
          // Extract console.log statements
          const jsLogMatches = code.match(/console\.log\((.*?)\);/g);
          if (jsLogMatches && jsLogMatches.length > 0) {
            jsLogMatches.forEach(match => {
              // Simple string extraction - this won't handle complex expressions
              const content = match.replace(/console\.log\(/, '').replace(/\);$/, '');
              
              // Handle basic string literals
              if (content.startsWith("'") && content.endsWith("'")) {
                output += content.substring(1, content.length - 1) + '\n';
              } else if (content.startsWith('"') && content.endsWith('"')) {
                output += content.substring(1, content.length - 1) + '\n';
              } else if (content.startsWith('`') && content.endsWith('`')) {
                output += content.substring(1, content.length - 1) + '\n';
              } else {
                output += "[Simulated value for: " + content + "]\n";
              }
            });
          } else {
            output += "Your code executed successfully but had no output.\n";
            output += "Tip: Use console.log() to see output in JavaScript.\n";
          }
          break;
          
        case 'python':
          // Extract print statements
          const pyPrintMatches = code.match(/print\((.*?)\)/g);
          if (pyPrintMatches && pyPrintMatches.length > 0) {
            pyPrintMatches.forEach(match => {
              const content = match.replace(/print\(/, '').replace(/\)$/, '');
              
              if (content.startsWith("'") && content.endsWith("'")) {
                output += content.substring(1, content.length - 1) + '\n';
              } else if (content.startsWith('"') && content.endsWith('"')) {
                output += content.substring(1, content.length - 1) + '\n';
              } else if (content.startsWith('f') && content.includes("'")) {
                output += "[Formatted string: " + content + "]\n";
              } else {
                output += "[Simulated value for: " + content + "]\n";
              }
            });
          } else {
            output += "Your code executed successfully but had no output.\n";
            output += "Tip: Use print() to see output in Python.\n";
          }
          break;
          
        case 'java':
          // Extract System.out.println statements
          const javaPrintMatches = code.match(/System\.out\.println\((.*?)\);/g);
          if (javaPrintMatches && javaPrintMatches.length > 0) {
            javaPrintMatches.forEach(match => {
              const content = match.replace(/System\.out\.println\(/, '').replace(/\);$/, '');
              if (content.startsWith('"') && content.endsWith('"')) {
                output += content.substring(1, content.length - 1) + '\n';
              } else {
                output += "[Simulated value for: " + content + "]\n";
              }
            });
          } else {
            output += "Your code executed successfully but had no output.\n";
            output += "Tip: Use System.out.println() to see output in Java.\n";
          }
          break;
          
        case 'cpp':
          // Extract cout statements
          const cppPrintMatches = code.match(/cout\s*<<\s*(.*?)\s*(<<?|;)/g);
          if (cppPrintMatches && cppPrintMatches.length > 0) {
            let line = "";
            cppPrintMatches.forEach(match => {
              const content = match.replace(/cout\s*<<\s*/, '').replace(/\s*(<<?|;)$/, '');
              
              if (content.includes('endl')) {
                line += "\n";
                output += line;
                line = "";
              } else if (content.startsWith('"') && content.endsWith('"')) {
                line += content.substring(1, content.length - 1);
              } else {
                line += "[Value: " + content + "]";
              }
            });
            if (line) output += line + "\n";
          } else {
            output += "Your code executed successfully but had no output.\n";
            output += "Tip: Use std::cout << \"text\" << std::endl; to see output in C++.\n";
          }
          break;
          
        case 'go':
          // Extract fmt.Println statements
          const goPrintMatches = code.match(/fmt\.Println\((.*?)\)/g);
          if (goPrintMatches && goPrintMatches.length > 0) {
            goPrintMatches.forEach(match => {
              const content = match.replace(/fmt\.Println\(/, '').replace(/\)$/, '');
              
              if (content.startsWith('"') && content.endsWith('"')) {
                output += content.substring(1, content.length - 1) + '\n';
              } else {
                output += "[Simulated value for: " + content + "]\n";
              }
            });
          } else {
            output += "Your code executed successfully but had no output.\n";
            output += "Tip: Use fmt.Println() to see output in Go.\n";
          }
          break;
          
        default:
          output += "Code execution simulated. No actual compilation or execution occurred.\n";
      }
      
      output += "\n[Note: This is a simulated output. Real execution is unavailable.]\n";
      
      return output;
    } catch (err) {
      return output + "Simulated execution completed, but couldn't parse output patterns.\n" +
             "Your code syntax may be complex for the simulator to understand.\n";
    }
  };

  const handleRunCode = async () => {
    if (!code.trim()) {
      toast({
        title: "Empty Code",
        description: "Please write some code before running",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsRunning(true);
    setOutput("Running code...");
    setError(null);

    try {
      // Map language to Piston's runtime name
      const languageMap = {
        javascript: "node",
        typescript: "typescript",
        python: "python",
        java: "java",
        cpp: "cpp",
        go: "go",
        html: "html",
        css: "css",
      };

      const runtime = languageMap[language];
      if (!runtime) {
        setOutput("Error: Unsupported language");
        setIsRunning(false);
        return;
      }

      try {
        // First try running locally on our endpoint if it exists
        try {
          const localResponse = await axios.post("/api/v1/code/execute", {
            language: runtime,
            code: code
          }, {
            timeout: 5000
          });
          
          if (localResponse.data && localResponse.data.run) {
            setOutput(localResponse.data.run.output || "Program executed successfully with no output");
            toast({
              title: "Code Executed",
              description: "Your code ran successfully!",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setIsRunning(false);
            return;
          }
        } catch (localError) {
          // Local endpoint not available, continue to external API
          console.log("Local execution not available, trying external API");
        }
        
        // Try external API as fallback
        const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
          language: runtime,
          version: "*", 
          files: [
            {
              content: code,
            },
          ],
        }, {
          timeout: 8000
        });

        if (response.data.run) {
          setOutput(response.data.run.output || "Program executed successfully with no output");
          toast({
            title: "Code Executed",
            description: "Your code ran successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          setOutput("Error: Unable to execute code");
          toast({
            title: "Execution Failed",
            description: "Unable to execute code",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (apiError) {
        console.error("API execution error:", apiError);
        
        // Fall back to simulated output
        setError({
          title: "Network Error",
          message: "Could not connect to code execution service. Using simulated output instead."
        });
        
        // Get simulated output based on the current language
        const simulatedOutput = getSimulatedOutput(code, language);
        setOutput(simulatedOutput);
        
        toast({
          title: "Using Simulated Output",
          description: "Network connection to code service failed. Showing example output.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("General execution error:", error);
      setOutput(`Error: ${error.message || "An unknown error occurred"}`);
      setError({
        title: "Execution Error",
        message: error.message || "An unknown error occurred"
      });
      
      toast({
        title: "Execution Failed",
        description: error.message || "An unknown error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Handle keyboard shortcut Ctrl+Enter to run code
  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      handleRunCode();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [code, language]); // Re-add event listener when code or language changes

  return (
    <Box bg={editorBg} minH="100vh" py={6} onKeyDown={handleKeyDown}>
      <Container maxW="container.xl" h="calc(100vh - 12rem)">
        {/* Header */}
        <Flex 
          justify="space-between" 
          align="center" 
          mb={4} 
          pb={4} 
          borderBottom="1px" 
          borderColor={borderColor}
        >
          <HStack spacing={4}>
            <Icon as={FaCode} color={accentColor} boxSize={6} />
            <Heading size="lg" color={textColor}>Code Editor</Heading>
            <Badge colorScheme="yellow" fontSize="0.8em" px={2} py={1} borderRadius="full">
              Beta
            </Badge>
          </HStack>
          
          <HStack spacing={3}>
            <Tooltip label="Save your code (Coming soon)">
              <IconButton
                icon={<FaSave />}
                aria-label="Save code"
                colorScheme="gray"
                isDisabled
              />
            </Tooltip>
            
            <Tooltip label="Editor settings">
              <Menu>
                <MenuButton as={IconButton} icon={<FaCog />} variant="ghost" />
                <MenuList>
                  <MenuItem onClick={() => setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')}>
                    Toggle Editor Theme
                  </MenuItem>
                  <MenuItem isDisabled>Font Size</MenuItem>
                  <MenuItem isDisabled>Line Numbers</MenuItem>
                </MenuList>
              </Menu>
            </Tooltip>
          </HStack>
        </Flex>

        {/* Error Alert */}
        {error && (
          <Alert status="warning" mb={4} borderRadius="md">
            <AlertIcon />
            <Box flex="1">
              <AlertTitle mr={2}>{error.title}</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Box>
            <CloseButton 
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setError(null)}
            />
          </Alert>
        )}

        {/* Editor Area */}
        <Flex h={error ? "calc(100% - 80px)" : "full"} gap={4} direction={{ base: "column", md: "row" }}>
          {/* Code Editor Panel */}
          <Box 
            flex="3" 
            borderRadius="md" 
            overflow="hidden" 
            borderWidth="1px" 
            borderColor={borderColor}
            boxShadow="md"
          >
            <Flex 
              bg={secondaryBg} 
              p={3} 
              justify="space-between" 
              align="center" 
              borderBottomWidth="1px" 
              borderColor={borderColor}
            >
              <HStack>
                <Text fontWeight="medium" color={textColor}>Language:</Text>
                <Select
                  value={language}
                  onChange={handleLanguageChange}
                  variant="filled"
                  size="sm"
                  width="150px"
                  bg={outputBg}
                  _hover={{ bg: outputBg }}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="go">Go</option>
                </Select>
              </HStack>
              
              <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
                <Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd>
                <Text fontSize="xs">to run</Text>
              </HStack>
            </Flex>
            
            <Box h="calc(100% - 3.5rem)">
              <Editor
                height="100%"
                language={language}
                value={code}
                theme={theme}
                onChange={handleEditorChange}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                  tabSize: 2,
                }}
              />
            </Box>
          </Box>

          {/* Output Panel */}
          <Box 
            flex="2" 
            borderRadius="md" 
            borderWidth="1px" 
            borderColor={borderColor}
            boxShadow="md"
            display="flex"
            flexDirection="column"
          >
            <Flex 
              bg={secondaryBg} 
              p={3} 
              justify="space-between" 
              align="center" 
              borderBottomWidth="1px" 
              borderColor={borderColor}
            >
              <HStack>
                <Icon as={FaTerminal} color={accentColor} />
                <Text fontWeight="medium" color={textColor}>Output</Text>
              </HStack>
              
              <Button
                leftIcon={<FaPlay />}
                colorScheme="yellow"
                size="sm"
                onClick={handleRunCode}
                isLoading={isRunning}
                loadingText="Running"
              >
                Run Code
              </Button>
            </Flex>
            
            <Box 
              flex="1" 
              bg={outputBg} 
              p={4} 
              overflowY="auto" 
              fontFamily="monospace"
              fontSize="sm"
              position="relative"
              whiteSpace="pre-wrap"
              color={textColor}
            >
              {output || (
                <Flex 
                  direction="column" 
                  align="center" 
                  justify="center" 
                  h="full" 
                  color="gray.500"
                  textAlign="center"
                >
                  <Icon as={FaInfoCircle} boxSize={6} mb={2} />
                  <Text>Click "Run Code" to see the output here</Text>
                  <Text fontSize="sm" mt={2}>
                    Execution happens in a secure environment
                  </Text>
                </Flex>
              )}
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default CodeEditor;