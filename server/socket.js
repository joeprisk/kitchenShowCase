module.exports = function (server, Images, config) {

	var io         = require('socket.io').listen(server),
		clients    = [];

	// Do some stuff
	// Socket.io Config
	io.set('log level', 1);


	// Socket.io Server
	io.sockets.on('connection', function (client) {

		clients.push(client);
		client.emit('images', Images.list);

		client.on("url", function (data) {

			io.sockets.emit("url", data.url);

		});

		client.on('imageDir', function(data) {

			config.imageDir = data.imageDir;

			Images.load();


			io.sockets.emit('images', Images.list);
		});

	});

	return io;

};