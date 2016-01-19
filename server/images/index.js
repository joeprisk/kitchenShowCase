var fs = require('fs'),
	Images = {};

Images.list = [];
Images.load = load;
Images.random = random;

function load() {

	fs.readdir('/Users/joeprisk/Pictures', function (error, images) {

		images.forEach(addImageToList);
	});
}

function addImageToList(image) {

	(isImageString(image)) && Images.list.push(image);

}

function random() {

	return '/image/' + Images.list[getRandomInt(0, Images.list.length - 1)];

}


function getRandomInt(min, max) {

	return Math.floor(Math.random() * (max - min + 1) + min);
}

function isImageString(imageString) {

	if (imageString) {

		var extensions = ['jpg', 'png', 'gif'],
			extension = imageString.substr(imageString.length - 3);

		return extensions.indexOf(extension) !== -1;

	}
}

module.exports = Images;