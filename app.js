var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (client) {
	client.on('join', function (nickname) {
		// Sets the nickname associated to the client
		client.nickname = nickname;
		console.log(client.nickname + " is connected.");
	});
	client.on('messages', function (message) {
		// Get the nickname of the client before broadcasting message
		var nickname = client.nickname;
		// Broadcast the message (the client who sent don't receive the broadcast)
		client.broadcast.emit("messages", nickname + ": " + message);
		// Send the same message to the cliente back to the client
		client.emit("messages", nickname + ": " + message);
		console.log(nickname + " send: " + message);
	});
});

app.get('/', function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
server.listen(8080);
console.log("Server running at http://localhost:8080/");
