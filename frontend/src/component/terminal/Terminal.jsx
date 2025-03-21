import React, { useEffect, useRef, useState } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { io } from 'socket.io-client';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Button,
  Select,
  Badge,
  Tooltip,
  IconButton,
  useToast,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Kbd,
  Icon
} from '@chakra-ui/react';
import {
  FaTerminal,
  FaInfoCircle,
  FaCog,
  FaEraser,
  FaDownload,
  FaQuestion,
  FaCode,
  FaLock,
  FaUnlock
} from 'react-icons/fa';

import 'xterm/css/xterm.css';

const Terminal = () => {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const socketRef = useRef(null);
  const fitAddonRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [terminalTheme, setTerminalTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(14);
  const [error, setError] = useState(null);
  const [readOnly, setReadOnly] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const toast = useToast();

  // Colors based on theme
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const accentColor = useColorModeValue('yellow.500', 'yellow.400');
  const secondaryBg = useColorModeValue('gray.100', 'gray.700');

  // Setup socket event listeners function
  const setupSocketListeners = () => {
    if (!socketRef.current) return;
    
    // Handle connection events
    socketRef.current.on('connect', () => {
      console.log('Socket connected, initializing terminal...');
      // Initialize the terminal session
      socketRef.current.emit('terminal:init');
      
      setIsConnected(true);
      setIsLoading(false);
      setError(null);
      setConnectionAttempts(0);
      
      if (xtermRef.current) {
        xtermRef.current.writeln('\x1b[1;32mConnected to terminal server.\x1b[0m');
        xtermRef.current.writeln('\x1b[1;34m╔════════════════════════════════════════════════════════╗\x1b[0m');
        xtermRef.current.writeln('\x1b[1;34m║                 Welcome to Linux Terminal               ║\x1b[0m');
        xtermRef.current.writeln('\x1b[1;34m╚════════════════════════════════════════════════════════╝\x1b[0m');
        xtermRef.current.writeln('Type commands to get started. Type \x1b[1;33mhelp\x1b[0m for available commands.');
        xtermRef.current.writeln('');
      }
    });
    
    // Handle disconnection
    socketRef.current.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
      setError('Disconnected from terminal server. Please try reconnecting.');
      
      if (xtermRef.current) {
        xtermRef.current.writeln('\x1b[1;31mDisconnected from terminal server.\x1b[0m');
      }
    });
    
    // Handle connection errors
    socketRef.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      setIsConnected(false);
      setIsLoading(false);
      setError(`Connection error: ${err.message}. Please try reconnecting.`);
      setConnectionAttempts(prev => prev + 1);
      
      if (xtermRef.current) {
        xtermRef.current.writeln(`\x1b[1;31mConnection error: ${err.message}\x1b[0m`);
      }
    });
    
    // Handle output from server
    socketRef.current.on('output', (data) => {
      if (xtermRef.current) {
        xtermRef.current.write(data);
      }
    });
    
    // Handle error messages from server
    socketRef.current.on('error', (errorMsg) => {
      setError(errorMsg);
      toast({
        title: 'Terminal Error',
        description: errorMsg,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
    
    // Handle command history
    socketRef.current.on('history', (history) => {
      console.log('Command history received:', history);
    });
  };

  // Terminal commands tutorial
  const basicCommands = [
    { cmd: 'ls', desc: 'List directory contents' },
    { cmd: 'cd [dir]', desc: 'Change directory' },
    { cmd: 'pwd', desc: 'Print working directory' },
    { cmd: 'mkdir [dir]', desc: 'Create a directory' },
    { cmd: 'touch [file]', desc: 'Create an empty file' },
    { cmd: 'cat [file]', desc: 'Display file contents' },
    { cmd: 'cp [src] [dest]', desc: 'Copy files/directories' },
    { cmd: 'mv [src] [dest]', desc: 'Move/rename files/directories' },
    { cmd: 'rm [file]', desc: 'Remove files' },
    { cmd: 'clear', desc: 'Clear terminal screen' },
    { cmd: 'echo [text]', desc: 'Display text' },
    { cmd: 'grep [pattern] [file]', desc: 'Search for patterns in files' },
    { cmd: 'man [command]', desc: 'Display manual for command' },
  ];

  useEffect(() => {
    // Initialize terminal
    if (!xtermRef.current && terminalRef.current) {
      // Create terminal instance
      xtermRef.current = new XTerm({
        cursorBlink: true,
        fontSize: fontSize,
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        theme: terminalTheme === 'dark' 
          ? {
              background: '#1a202c',
              foreground: '#eeeeee',
              cursor: '#f6ad55',
              selectionBackground: '#2D3748',
            }
          : {
              background: '#f8f9fa',
              foreground: '#1a202c',
              cursor: '#f6ad55',
              selectionBackground: '#E2E8F0',
            }
      });

      // Create fit addon to make terminal responsive
      fitAddonRef.current = new FitAddon();
      xtermRef.current.loadAddon(fitAddonRef.current);
      
      // Add web links addon to make URLs clickable
      const webLinksAddon = new WebLinksAddon();
      xtermRef.current.loadAddon(webLinksAddon);

      // Open terminal in the container
      xtermRef.current.open(terminalRef.current);
      
      // Use the setupSocketListeners function defined at component level
      
      // Connect to WebSocket server
      console.log('Attempting to connect to terminal server...');
      
      // Create socket connection
      socketRef.current = io('http://localhost:3002', {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
      
      // Set up all socket event listeners
      setupSocketListeners();
      
      // Handle user input
      xtermRef.current.onData((data) => {
        if (!readOnly && isConnected) {
          socketRef.current.emit('input', data);
        }
      });

      // Resize terminal to fit container
      const resizeTerminal = () => {
        if (fitAddonRef.current) {
          setTimeout(() => {
            fitAddonRef.current.fit();
            if (socketRef.current && isConnected) {
              const dimensions = {
                cols: xtermRef.current.cols,
                rows: xtermRef.current.rows
              };
              socketRef.current.emit('resize', dimensions);
            }
          }, 100);
        }
      };

      // Resize terminal on window resize
      window.addEventListener('resize', resizeTerminal);
      resizeTerminal();

      // Clean up on unmount
      return () => {
        window.removeEventListener('resize', resizeTerminal);
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
        if (xtermRef.current) {
          xtermRef.current.dispose();
        }
      };
    }
  }, [terminalTheme, fontSize]);

  // Update terminal theme when theme changes
  useEffect(() => {
    if (xtermRef.current) {
      xtermRef.current.options.theme = terminalTheme === 'dark' 
        ? {
            background: '#1a202c',
            foreground: '#eeeeee',
            cursor: '#f6ad55',
            selectionBackground: '#2D3748',
          }
        : {
            background: '#f8f9fa',
            foreground: '#1a202c',
            cursor: '#f6ad55',
            selectionBackground: '#E2E8F0',
          };
      xtermRef.current.options.fontSize = fontSize;
    }
  }, [terminalTheme, fontSize]);

  // Clear terminal
  const clearTerminal = () => {
    if (xtermRef.current) {
      xtermRef.current.clear();
    }
  };

  // Toggle read-only mode
  const toggleReadOnly = () => {
    setReadOnly(!readOnly);
    toast({
      title: readOnly ? 'Terminal Unlocked' : 'Terminal Locked',
      description: readOnly ? 'You can now enter commands' : 'Terminal is now in read-only mode',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  // Download terminal content
  const downloadTerminalContent = () => {
    if (xtermRef.current) {
      const content = xtermRef.current.buffer.active.getLine(0).translateToString();
      const element = document.createElement('a');
      const file = new Blob([content], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = 'terminal_session.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };
  
  // Handle manual reconnection
  const handleReconnect = () => {
    setIsLoading(true);
    setError(null);
    
    // Clean up existing socket if any
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current.removeAllListeners();
    }
    
    // Create new socket connection
    socketRef.current = io('http://localhost:3002', {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    
    setupSocketListeners();
    
    // Display reconnection message
    if (xtermRef.current) {
      xtermRef.current.writeln('\x1b[1;33mAttempting to reconnect to terminal server...\x1b[0m');
    }
    
    toast({
      title: 'Reconnecting',
      description: 'Attempting to reconnect to terminal server...',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="lg" color={textColor}>
            <Icon as={FaTerminal} mr={2} color={accentColor} />
            Linux Terminal
          </Heading>
          <HStack spacing={2}>
            <Select 
              size="sm" 
              width="120px"
              value={terminalTheme}
              onChange={(e) => setTerminalTheme(e.target.value)}
            >
              <option value="dark">Dark Theme</option>
              <option value="light">Light Theme</option>
            </Select>
            <Select 
              size="sm" 
              width="100px"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
            >
              <option value="12">12px</option>
              <option value="14">14px</option>
              <option value="16">16px</option>
              <option value="18">18px</option>
            </Select>
            <Tooltip label="Clear Terminal">
              <IconButton
                aria-label="Clear Terminal"
                icon={<FaEraser />}
                onClick={clearTerminal}
                size="sm"
              />
            </Tooltip>
            <Tooltip label={readOnly ? "Unlock Terminal" : "Lock Terminal"}>
              <IconButton
                aria-label="Toggle Read Only"
                icon={readOnly ? <FaLock /> : <FaUnlock />}
                onClick={toggleReadOnly}
                size="sm"
              />
            </Tooltip>
            <Tooltip label="Download Session">
              <IconButton
                aria-label="Download Session"
                icon={<FaDownload />}
                onClick={downloadTerminalContent}
                size="sm"
              />
            </Tooltip>
            <Tooltip label="Show Help">
              <IconButton
                aria-label="Show Help"
                icon={<FaQuestion />}
                onClick={() => setShowTutorial(!showTutorial)}
                size="sm"
              />
            </Tooltip>
          </HStack>
        </Flex>

        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            <AlertTitle mr={2}>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            <Button ml={4} colorScheme="red" size="sm" onClick={handleReconnect}>
              Reconnect
            </Button>
            <CloseButton 
              position="absolute" 
              right="8px" 
              top="8px" 
              onClick={() => setError(null)}
            />
          </Alert>
        )}
        
        {!isConnected && !isLoading && !error && (
          <Alert status="warning" mb={4}>
            <AlertIcon />
            <AlertTitle mr={2}>Disconnected</AlertTitle>
            <AlertDescription>Terminal is disconnected from the server.</AlertDescription>
            <Button ml={4} colorScheme="yellow" size="sm" onClick={handleReconnect}>
              Reconnect
            </Button>
          </Alert>
        )}

        {showTutorial && (
          <Box 
            p={4} 
            bg={secondaryBg} 
            borderRadius="md" 
            mb={4}
          >
            <Flex justify="space-between" align="center" mb={2}>
              <Heading size="sm">Basic Linux Commands</Heading>
              <CloseButton onClick={() => setShowTutorial(false)} />
            </Flex>
            <Divider mb={3} />
            <Flex flexWrap="wrap">
              {basicCommands.map((cmd, index) => (
                <Box key={index} p={2} width={["100%", "50%", "33%"]}>
                  <Kbd>{cmd.cmd}</Kbd> - {cmd.desc}
                </Box>
              ))}
            </Flex>
          </Box>
        )}

        <Box 
          position="relative"
          height="500px" 
          borderRadius="md"
          border="1px solid"
          borderColor={borderColor}
          overflow="hidden"
        >
          {isLoading && (
            <Flex 
              position="absolute" 
              top="0" 
              left="0" 
              right="0" 
              bottom="0" 
              bg="rgba(0,0,0,0.7)" 
              zIndex="10"
              justify="center"
              align="center"
              color="white"
            >
              <Text>Connecting to terminal server...</Text>
            </Flex>
          )}
          <Box 
            ref={terminalRef} 
            height="100%" 
            width="100%" 
            bg={terminalTheme === 'dark' ? '#1a202c' : '#f8f9fa'}
          />
        </Box>

        <Flex justifyContent="space-between" alignItems="center">
          <HStack>
            <Badge 
              colorScheme={isConnected ? "green" : "red"}
              variant="subtle"
              px={2}
              py={1}
              borderRadius="full"
            >
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
            {!isConnected && !isLoading && (
              <Button size="xs" colorScheme="blue" onClick={handleReconnect}>
                Reconnect
              </Button>
            )}
          </HStack>
          <Text fontSize="sm" color="gray.500">
            <Icon as={FaInfoCircle} mr={1} />
            Practice Linux commands safely in this sandbox environment
          </Text>
        </Flex>
      </VStack>
    </Container>
  );
};

export default Terminal;
