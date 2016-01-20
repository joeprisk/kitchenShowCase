module.exports = function (server, Images, config) {

	var io         = require('socket.io').listen(server),
		clients    = [],
		ioPublic   = {};

	ioPublic.images = sendImages;
	ioPublic.url    = sendUrl;

	// Do some stuff
	// Socket.io Config
	io.set('log level', 1);

	// Socket.io Server
	io.sockets.on('connection', function (client) {

		addClient(client);

		client.on("url", sendUrl);

		client.on('imageDir', function(data) {

			config.imageDir = data.imageDir;

			Images.load(sendImages);


		});

	});

	return ioPublic;

	function addClient(client) {

		clients.push(client);
		client.emit('images', Images.list);
	}

	function sendUrl(data) {

		io.sockets.emit("url", data.url);
	}

	function sendImages() {

		io.sockets.emit('images', Images.list);
	}

};

