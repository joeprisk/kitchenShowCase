
module.exports = function (app, config, Images) {
//Routes

	app.get('/image/*', function (request, response) {

		var urlName = request.route.params[0];

		response.sendfile(config.imageDir + urlName);
	});

	app.get('/image', function (request, response) {

		response.send(JSON.stringify({url: '/image/' + Images.random()}));
	})
}