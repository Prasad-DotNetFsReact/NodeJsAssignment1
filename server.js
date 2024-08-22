const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');

// Port number
const port = 3005;

// File path
const filePath = path.join(__dirname, 'file.txt');

// Create file and write initial content
fs.writeFileSync(filePath, 'this is first line of the file');

// Create and start the server
http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Read file content
        const fileContent = fs.readFileSync(filePath, 'utf8');
        // Get system information
        const currentDir = __dirname;
        const creationDate = fs.statSync(filePath).birthtime;
        const osName = os.type();
        const freeMemory = os.freemem();

        // Respond with details
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Server has started at port no ${port}\n\n` +
                `File content: ${fileContent}\n\n` +
                `Current directory: ${currentDir}\n` +
                `Date of file creation: ${creationDate}\n` +
                `Name of the OS: ${osName}\n` +
                `Free memory: ${freeMemory}\n`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}).listen(port, () => {
    console.log(`Server has started at port no ${port}`);
});

