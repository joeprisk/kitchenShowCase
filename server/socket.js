module.exports = function (server, Images, config) {

	var io         = require('socket.io').listen(server),
		imageDelay = 1000,// * 60,// * 5, // one second * 60 * 5 = 5 minutes
		clients    = [];

	// Do some stuff
	// Socket.io Config
	io.set('log level', 1);


	// Socket.io Server
	io.sockets.on('connection', function (client) {

		clients.push(client);

		client.on("url", function (data) {

			io.sockets.emit("url", data.url);

		});

		client.on('imageDir', function(data) {

			config.imageDir = data.imageDir;

			Images.load();

			io.sockets.emit('images', Images.list);
		})

	});

	runTheLoop();

	function runTheLoop() {

		// do stuff that needs to be done


		// setTimeout
		setTimeout(doStuff, imageDelay);
		// do it again
	}

	function doStuff() {

		if (clients.length) {

			clients.forEach(function (client) {

				var open = false,
					image = Images.random();

				Object.keys(client.manager.open).forEach(function (key) {
					open = client.manager.open[key];
				});

				open && client.emit('image', image);

			});
		}

		runTheLoop();
	}

	return io;

};