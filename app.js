
var config = require('./config'),
	app    = require('./server/app')(config),
	Images = require('./server/images')(config),
	routes = require('./server/routes')(app, config),
	server = require('http').createServer(app),
	socket = require('./server/socket'),
	io = socket(server, Images, config);

Images.load();

server.listen(app.get('port'), function () {
	console.log('Kitchen Pi is running on port ' + app.get('port'));
});




