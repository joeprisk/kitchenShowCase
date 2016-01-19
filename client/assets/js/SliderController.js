(function() {

	'use strict';

	angular.module('ShowCase')
		.controller('SliderController', SliderController);

	SliderController.$inject = ['Socket'];

	function SliderController(Socket) {

		var vm = this;

		vm.owlCarousel = {
			items:              1,
			loop:               true,
			margin:             10,
			nav:                true,
			//autoplay:           true,
			navSpeed:           500,
			autoplaySpeed:      500,
			autoplayHoverPause: true,
			navText:            ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			responsive:         {
				0:    {
					nav: true
				},
				641: {
					nav: true
				},
				1441: {
					nav:    true
				}
			}

		};

		vm.images = [];

		Socket.on('images', function(data) {

			angular.copy(data, vm.images);
		});
	}
})();