const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

const server = http.createServer(function(req, res) {
  let filePath = '.' + req.url;
  
  // Set the default file to serve
  if (filePath === './') {
    filePath = './home.html';
  }
//wwww
  // Determine the file extension
  const extname = path.extname(filePath);
  let contentType = 'text/html';

  // Map the file extension to the appropriate content type
  switch (extname) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
  }

  // Read the file and serve it
  fs.readFile(filePath, function(error, content) {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Error: File Not Found');
      } else {
        res.writeHead(500);
        res.end('Error: Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, function(error) {
  if (error) {
    console.log('Something went wrong', error);
  } else {
    console.log('Server is listening on port ' + port);
  }
});
