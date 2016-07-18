'use strict';

/**
 * @ngdoc overview
 * @name yeomanSourceApp
 * @description
 * # yeomanSourceApp
 *
 * Main module of the application.
 */
angular
  .module('shoppingFrontend', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
