'use strict';

/**
 * @ngdoc function
 * @Summer shoppingFrontend.controller:MainCtrl
 * @2016-7-19
 * # header
 * directive of the shoppingFrontend
 */
angular.module('shoppingFrontend')
    .directive( 'header', function () {
        return {
            restrict: 'EA',
            templateUrl: '../../views/nav/header.html',
            replace: false
        };
    });