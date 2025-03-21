const os = require('os');
const pty = require('node-pty');
const path = require('path');
const fs = require('fs');

// Create a sandbox directory for terminal operations
const SANDBOX_DIR = path.join(os.tmpdir(), 'lms-terminal-sandbox');

// Ensure the sandbox directory exists
if (!fs.existsSync(SANDBOX_DIR)) {
    fs.mkdirSync(SANDBOX_DIR, { recursive: true });
    
    // Copy some example files to the sandbox for students to practice with
    const exampleFiles = [
        { name: 'example.txt', content: 'This is an example text file.\nYou can practice commands like cat, grep, and more with this file.' },
        { name: 'hello.sh', content: '#!/bin/bash\necho "Hello, World!"\necho "This is a simple bash script."' },
        { name: 'data.csv', content: 'id,name,age\n1,John,25\n2,Alice,30\n3,Bob,22\n4,Carol,28' }
    ];
    
    exampleFiles.forEach(file => {
        fs.writeFileSync(path.join(SANDBOX_DIR, file.name), file.content);
    });
    
    // Create a few directories
    fs.mkdirSync(path.join(SANDBOX_DIR, 'documents'), { recursive: true });
    fs.mkdirSync(path.join(SANDBOX_DIR, 'images'), { recursive: true });
    fs.mkdirSync(path.join(SANDBOX_DIR, 'scripts'), { recursive: true });
    
    // Add some content to the directories
    fs.writeFileSync(path.join(SANDBOX_DIR, 'documents', 'readme.md'), '# README\nThis is a markdown file in the documents directory.');
    fs.writeFileSync(path.join(SANDBOX_DIR, 'scripts', 'count.sh'), '#!/bin/bash\nfor i in {1..10}; do\n  echo $i\n  sleep 1\ndone');
}

// List of allowed commands
const ALLOWED_COMMANDS = [
    'ls', 'cd', 'pwd', 'cat', 'echo', 'mkdir', 'touch', 'rm', 'cp', 'mv',
    'grep', 'find', 'wc', 'sort', 'uniq', 'head', 'tail', 'less', 'more',
    'diff', 'chmod', 'chown', 'date', 'cal', 'clear', 'history', 'man',
    'help', 'nano', 'vi', 'vim', 'exit', 'whoami', 'uname', 'ps', 'kill',
    'du', 'df', 'free', 'top', 'htop', 'ping', 'traceroute', 'netstat',
    'ifconfig', 'ip', 'ssh', 'scp', 'wget', 'curl', 'tar', 'gzip', 'gunzip',
    'zip', 'unzip', 'awk', 'sed', 'cut', 'paste', 'tr', 'tee', 'xargs'
];

// List of disallowed commands (for extra security)
const DISALLOWED_COMMANDS = [
    'sudo', 'su', 'apt', 'apt-get', 'yum', 'dnf', 'pacman', 'npm', 'pip',
    'rm -rf /', 'rm -rf *', 'rm -rf ~', 'rm -rf .', 'shutdown', 'reboot',
    'init', 'systemctl', 'service', 'iptables', 'firewall-cmd', 'chroot',
    'dd', 'mkfs', 'fdisk', 'parted', 'mount', 'umount', 'ssh-keygen'
];

// Initialize terminal sessions
const terminals = {};

// Setup socket.io for terminal
const setupTerminalSocket = (io) => {
    // Use the default namespace instead of a custom one
    console.log('Setting up terminal socket handlers');
    
    io.on('connection', (socket) => {
        console.log('Socket connected:', socket.id);
        
        // Check if this is a terminal connection
        socket.on('terminal:init', () => {
        console.log(`Terminal client connected: ${socket.id}`);
        
        // Create a new terminal process
        const term = pty.spawn('bash', [], {
            name: 'xterm-color',
            cols: 80,
            rows: 24,
            cwd: SANDBOX_DIR,
            env: {
                ...process.env,
                HOME: SANDBOX_DIR,
                TERM: 'xterm-color'
            }
        });
        
        // Store the terminal
        terminals[socket.id] = term;
        
        // Handle terminal output
        term.onData((data) => {
            socket.emit('output', data);
        });
        
        // Handle client input with command filtering
        socket.on('input', (data) => {
            // Check if the input contains a disallowed command
            const inputStr = data.toString();
            
            // Only check commands when Enter key is pressed
            if (inputStr === '\r') {
                const currentCommand = term.currentCommand?.trim() || '';
                
                // Check if the command is disallowed
                const isDisallowed = DISALLOWED_COMMANDS.some(cmd => 
                    currentCommand.startsWith(cmd) || 
                    currentCommand.includes(` ${cmd} `) || 
                    currentCommand.endsWith(` ${cmd}`)
                );
                
                if (isDisallowed) {
                    socket.emit('output', '\r\n\x1b[1;31mError: This command is not allowed for security reasons.\x1b[0m\r\n');
                    term.write('\r\n');
                    return;
                }
                
                // Reset current command
                term.currentCommand = '';
            } else if (data === '\u007f') { // Backspace
                // Handle backspace for command tracking
                if (term.currentCommand && term.currentCommand.length > 0) {
                    term.currentCommand = term.currentCommand.slice(0, -1);
                }
            } else if (data === '\u0003') { // Ctrl+C
                // Reset current command on Ctrl+C
                term.currentCommand = '';
            } else {
                // Track the current command
                term.currentCommand = (term.currentCommand || '') + data;
            }
            
            // Send the input to the terminal
            term.write(data);
        });
        
        // Handle terminal resize
        socket.on('resize', (size) => {
            if (terminals[socket.id]) {
                terminals[socket.id].resize(size.cols, size.rows);
            }
        });
        
        // Handle client disconnect
        socket.on('disconnect', () => {
            console.log(`Terminal client disconnected: ${socket.id}`);
            
            // Kill the terminal process
            if (terminals[socket.id]) {
                terminals[socket.id].kill();
                delete terminals[socket.id];
            }
            });
        });
        
        // Log general connection
        socket.emit('server:ready', { message: 'Terminal server is ready' });
    });
};

module.exports = { setupTerminalSocket };
