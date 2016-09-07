'use strict';

/**
 * @ngdoc function
 * @Summer shoppingFrontend.controller:MainCtrl
 * @2016-7-19
 * # footer
 * directive of the shoppingFrontend
 */
angular.module('shoppingFrontend')
    .directive( 'direction', function () {
        return {
            restrict: 'EA',
            templateUrl: '../../views/main/direction.html',
            replace: false
        };
    });