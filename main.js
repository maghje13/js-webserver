// This code creates a simple local web server using Node.js

// Import the required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port number for the server
const port = 3000;

// Create a server and handle incoming requests
const server = http.createServer((req, res) => {
  // Set the content type based on the file extension
  const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif'
  };

  // Get the file path from the URL
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  // Get the file extension
  const extname = path.extname(filePath);

  // Set the content type for the response
  res.setHeader('Content-Type', contentType[extname] || 'text/html');

  // Read the file and send it in the response
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        fs.readFile('./404.html', (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end('Server Error: ' + err.code);
      }
    } else {
      // Successful response
      res.writeHead(200);
      res.end(content, 'utf-8');
    }
  });
});

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});