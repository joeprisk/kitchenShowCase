(function() {

	'use strict';

	angular.module('ShowCase')
		.factory('Socket', Socket);

	Socket.$inject = ['socketFactory'];

	function Socket(socketFactory) {

		return socketFactory();
	}
})();