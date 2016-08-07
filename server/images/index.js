module.exports = function (_config_) {

	var fs     = require('fs'),
		Images = {},
		config = _config_;

	Images.list = [];
	Images.load = load;
	Images.random = random;

	return Images;

	/**
	 * Load the images from within a folder into an array
	 *
	 * @param callback
	 */
	function load(callback) {

		reset();

		fs.readdir(
			config.imageDir, function (error, files) {

				files.forEach(addImageToList);

				typeof callback == 'function' && callback();
			}
		);
	}

	function random() {

		var index = Math.floor(Math.random() * (Images.list.length));

		return Images.list[index];
	}

	/**
	 * Add the string to the list if its an image
	 *
	 * @param image
	 */
	function addImageToList(image) {

		(
			isImageString(image)
		) && Images.list.push(image);

	}

	/**
	 * Make Sure that fileString is a string
	 * then check for existence of image extention
	 *
	 * @param fileString
	 * @returns {boolean}
	 */
	function isImageString(fileString) {

		fileString += "";

		return (
			/(jpg|gif|pngjpeg)$/.test(fileString.toLowerCase())
		);

	}

	function reset() {

		Images.list = [];
	}

};