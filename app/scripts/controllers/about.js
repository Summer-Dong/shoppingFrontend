'use strict';

/**
 * @ngdoc function
 * @Summer shoppingFrontend.controller:AboutCtrl
 * @2016-7-20
 * # AboutCtrl
 * Controller of the yeomanSourceApp
 */
angular.module('shoppingFrontend')
  .controller(['AboutCtrl','whenActive'], function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
