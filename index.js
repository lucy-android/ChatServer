const express = require('express'),
      http = require('http'),
      app = express(),
      server = http.createServer(app),
      { Server } = require('socket.io'),
      io = new Server(server);

app.get('/', (req, res) => {
  res.send('Chat Server is running on port 3000');
});

server.listen(3000, () => {
  console.log('Node app is running on port 3000');
});