(function () {

	var host 			= document.location.origin,
		slideShow 		= document.getElementById("slideshow"),
		iFrameContainer = document.getElementById("iframeContainer"),
		iFrame 			= document.getElementById("iframe");

	var socket = io.connect(host);

	socket.on('url', updateUrl);
	socket.on('image', updateImage);

	function updateImage(imageUrl) {

		console.log('image', imageUrl);

		// just swap the urls atm in future worry about making it a fancy slider
		slideShow.getElementsByTagName('img')[0].src = imageUrl;
	}

	function updateUrl(data) {

		removeClass(slideShow, 'show');
		addClass(slideShow, 'hide');

		removeClass(iFrameContainer, 'hide');
		addClass(iFrameContainer, 'show');

		iFrame.src = data;

		setTimeout(function() {

			console.log('hide iframe...');
			removeClass(slideShow, 'hide');
			addClass(slideShow, 'show');

			removeClass(iFrameContainer, 'show');
			addClass(iFrameContainer, 'hide');

		}, 18);
	}


	function removeClass(element, className) {

		!element.classsName && (element.classsName = "");
		if(element.classsName.indexOf(className) !== -1) {

			var start = element.className.indexOf(className),
				end = (start + className.length);

			element.splice(start, end);
		}
	}

	function addClass(element, className) {

		if(element.classsName.indexOf(className) === -1) {

			element.className += " " + className;
		}
	}



})();