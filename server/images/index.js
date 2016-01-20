var fs = require('fs'),
	Images = {},
	config;

Images.list = [];
Images.load = load;

function load() {

	fs.readdir(config.imageDir, function (error, images) {

		images.forEach(addImageToList);
	});
}

function addImageToList(image) {

	(isImageString(image)) && Images.list.push(image);

}

function isImageString(imageString) {

	if (imageString) {

		var extensions = ['jpg', 'png', 'gif'],
			extension = imageString.substr(imageString.length - 3);

		return extensions.indexOf(extension) !== -1;

	}
}

module.exports = function(_config_) {

	config = _config_;
	return Images;
}