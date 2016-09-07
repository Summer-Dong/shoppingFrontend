'use strict';

/**
 * @ngdoc function
 * @Summer shoppingFrontend.controller:MainCtrl
 * @2016-7-19
 * # footer
 * directive of the shoppingFrontend
 */
angular.module('shoppingFrontend')
    .directive( 'receipt', function () {
        return {
            restrict: 'EA',
            templateUrl: '../../views/main/receipt.html',
            replace: false
        };
    });