'use strict';

/**
 * @ngdoc function
 * @Summer shoppingFrontend.controller:MainCtrl
 * @2016-7-19
 * # footer
 * directive of the shoppingFrontend
 */
angular.module('shoppingFrontend')
    .directive( 'goodsInCart', function () {
        return {
            restrict: 'EA',
            templateUrl: '../../views/main/goodsInCart.html',
            replace: false
        };
    });