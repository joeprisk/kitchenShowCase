(function() {
  'use strict';

  angular.module('ShowCase', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',

    //btford.angular-soket-io
    'btford.socket-io',

    //  angular-owl-carousel
    'angular-owl-carousel',

    // controller namespace
    'ShowCase.controller'
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$stateProvider','$urlRouterProvider', '$locationProvider'];

  function config($stateProvider, $urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');

    $stateProvider
    .state('home', {
      url: "/",
      templateUrl: 'templates/home.html',
      controller: 'SliderController',
      controllerAs: 'Slider'
    })
  }

  function run() {
    FastClick.attach(document.body);
  }

})();
