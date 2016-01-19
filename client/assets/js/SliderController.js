(function() {

	'use strict';

	console.log('something happened');

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
			autoplay:           true,
			navSpeed:           2000,
			autoplaySpeed:      2000,
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
					nav:    true,
					items:  2,
					center: true
				}
			}

		};

		vm.images = [1,2,56,4,45,6];

		Socket.on('images', function(data) {

			console.log(data);

			angular.copy(data, vm.images);
		});


	}
})();