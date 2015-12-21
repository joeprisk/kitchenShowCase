var express    	= require("express"),
	bodyParser 	= require("body-parser"),
	app        	= express(),
    exec  		= require('child_process').exec;

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.post('/openBrowser', function (request, response) {

	var statusCode = 200;

	try {

		openBrowser(request.body.url);

	} catch(e) {

		statusCode = 500;

	}

	response.sendStatus(statusCode);

});

app.listen(3000);

function openBrowser(url) {

	if(!url) {

		throw new Error;
	}

	// Fucking Die all chrome, go in with the sledge hammer
	exec('killall -9 "Google Chrome"', function(error, stdout, stderr) {

		console.log('chrome has been killed, time to reopen');

		exec('open -a "Google Chrome" --args --kiosk ' + url, function(error, stdout, stderr) {

			console.log('Chrome should have been opened');
		});
		// do nothing
	});

}