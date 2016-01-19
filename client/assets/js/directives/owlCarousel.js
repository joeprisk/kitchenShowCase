(
	function () {
		'use strict';

		angular
		.module("angular-owl-carousel", [])
		.directive("owlCarousel", owlCarousel)
		.directive('owlCarouselItem', owlCarouselItem);

		function owlCarousel() {

			controller.$inject = ['$scope', '$timeout'];
			return {
				scope:      {
					owlCarousel: '='
				},
				link:       link,
				controller: controller
			};

			function link(scope, element, attrs) {

				var owl;
				scope.loadOwlCarousel = initialize;

				function initialize() {

					angular.isObject(scope.owlCarousel) &&
					(

						owl = element.owlCarousel(scope.owlCarousel)
					);

				}

			}

			function controller($scope, $timeout) {

				var vm = this;

				/**
				 * This needs to be like this as the function doesn't exist at time of creation
				 *
				 * $timeout makes everything happen as it should within thew same digest cycle
				 */
				vm.loadOwlCarousel = function () {

					console.log('make a new slider');

					$timeout(
						$scope.loadOwlCarousel,
						2000
					);
				}

			}
		}

		function owlCarouselItem() {

			return {
				transclude: false,
				require:    '^owlCarousel',
				link:       link
			};

			function link(scope, element, attrs, owlController) {

				scope.$last && owlController.loadOwlCarousel();

			}
		}

	}
)();