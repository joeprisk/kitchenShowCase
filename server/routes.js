
module.exports = function (app, config) {
//Routes
	app.get('/', function (req, res) {

		console.log('The url : ', req.url);
		res.sendfile(config.dirname + '/public/index.html');
	});

	app.get('/remote', function (req, res) {
		res.sendfile(config.dirname + '/public/remote.html');
	});

	app.get('/image/*', function (request, response) {

		var urlName = request.route.params[0];

		response.sendfile(config.imageDir + urlName);
	});
}