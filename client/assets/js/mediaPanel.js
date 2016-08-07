
var yahoo = {
	clientId: 'dj0yJmk9ODlUTXdWU0FIdXVxJmQ9WVdrOVQxWjBaR2gzTldFbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD04OA--',
	secret: '9250b8033ffdef9df88093ff350365fd8765e11d'
};
// https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D35560&format=json&diagnostics=true&callback=
(function (global, http) {
	'use strict';

	http = http();

	global.mediaPanel = function () {

		var settings = {},
			api      = {},
			html     = {};

		api.init          = init;
		api.runPhoto      = updatePhoto;
		api.runTime       = updateTime;
		api.runWeather    = updateWeather;

		settings.timeChange    =    1000;  // One second
		settings.photoChange   =   30000;  // Thirty seconds
		settings.weatherChange =  900000;  // 15 minutes
		settings.eventChange   = 3600000;  // 1 hour

		html.date        = document.querySelectorAll('.date')[0];
		html.time        = document.querySelectorAll('.time')[0];
		html.calendar    = document.querySelectorAll('#calendar');
		html.weather     = document.querySelectorAll('#weather');
		html.photoLayer1 = document.querySelectorAll('#background-underlay-1')[0];
		html.photoLayer2 = document.querySelectorAll('#background-underlay-2')[0];

		return api;

		function init(_settings_) {

			_settings_ = _settings_ || {};

			for(var field in _settings_) {
				settings[field] = _settings_[field];
			}

			return api;
		}

		/**
		 * Update the time and date every second
		 *
		 */
		function updateTime() {
			var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			var now = new Date();

			var day = now.getDay();
			var date = now.getDate();
			var month = now.getMonth();
			//var year = now.getFullYear();

			var dateString = days[day] + ', ' + months[month] + ' ' + date;

			var hours = now.getHours();
			var minutes = now.getMinutes();
			var seconds = now.getSeconds();

			if (settings.timeFormat == 12) {
				hours = hours % 12;
				hours = hours ? hours : 12; // the hour '0' should be '12'
			}

			minutes = minutes < 10 ? '0' + minutes : minutes;
			var time = hours + ' : ' + minutes + ' : ';
			seconds = seconds < 10 ? '0' + seconds : seconds;

			html.date.innerHTML = dateString;
			html.time.innerHTML = time + '<span class="sec">' + seconds + '</span>';

			setTimeout(function () {
				updateTime();
			}, settings.timeChange);

			return api;
		}

		/**
		 * Update events every hour
		 *
		 */
		function updateEvents() {
			html.calendar.load(settings['route'] + '/events', function () {
				$(window).resize();
			});

			// 1 hour
			setTimeout(function () {
				updateEvents();
			}, settings.eventChange);

			return api;
		}

		/**
		 * Update weather every 15 minutes
		 *
		 */
		function updateWeather() {

			http
				.call('get', 'https://query.yahooapis.com/v1/public/yql?u=c&q=select item.condition.text, units from weather.forecast where woeid in (select woeid from geo.places(1) where text=\'st agnes, cornwall\')&u=c&format=json')
				.then(function(data) {

					var units         = data.data.query.results.channel.units;
					var forecastItems = data.data.query.results.channel.item;

					console.log('units :: ', units);
					console.log('forecast items :: ', forecastItems);
				});//.getJSON(yahoo.query, function(weather) {



			// });

			// 15 minutes
			setTimeout(function () {
				updateWeather();
			}, settings.weatherChange);

			return api;
		}

		/**
		 * Update background photo periodically
		 *
		 */
		function updatePhoto() {

			var top    = html.photoLayer2,
				bottom = html.photoLayer1;

			if(html.photoLayer1.className.indexOf('top') > -1) {
				top    = html.photoLayer1;
				bottom = html.photoLayer2;
			}

			http
				.call('get', 'image')
				.then(function(data) {

					var image = new Image();

					image.onload = function() {

						bottom.src = data.data.url;

						fadeOut(top, function () {

							top.className = 'bottom';
							bottom.className = 'top';

							fadeIn(bottom);

						});
					};

					image.src = data.data.url;
				}, function(error) {
					console.log('something went wrong');
				});

			setTimeout(function () {
				updatePhoto();
			}, settings.photoChange);

			return api;
		}

		// fade out

		function fadeOut(el, completeFn){
			el.style.opacity = 1;

			(function fade() {
				if ((el.style.opacity -= .1) < 0) {
					el.style.display = "none";

					completeFn()
				} else {
					requestAnimationFrame(fade);
				}
			})();
		}

// fade in

		function fadeIn(el, display){
			el.style.opacity = 0;
			el.style.display = display || "block";

			(function fade() {
				var val = parseFloat(el.style.opacity);
				if (!((val += .1) > 1)) {
					el.style.opacity = val;
					requestAnimationFrame(fade);
				}
			})();
		}

	};


})(this, function() {

	var http = {};

	http.call = call;

	return http;

	function call(method, url, options) {

		method = method.toUpperCase();

		return new Promise(function(resolve, reject) {

			var xhr = new XMLHttpRequest();
			xhr.open(method, url, true);

			xhr.onload = function () {
				if (this.status >= 200 && this.status < 400) {
					// Success!
					resolve({
						status: xhr.status,
						data: JSON.parse(xhr.response)
					})
				} else {
					// We reached our target server, but it returned an error

					reject({
						status: xhr.status
					})

				}
			};

			xhr.onerror = function () {
				// There was a connection error of some sort
				reject({
					status: xhr.status
				})
			};

			xhr.send();
		});
	}
});