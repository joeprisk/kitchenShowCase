

module.exports = function(config) {

	var path    = require('path'),
		express = require('express'),
		app     = express();

	// all environments
	app.set('port', process.env.TEST_PORT || 8080);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(path.join(config.dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}

	return app;
};