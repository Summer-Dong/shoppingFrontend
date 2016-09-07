'use strict';

/**
 * @ngdoc function
 * @Summer shoppingFrontend.controller:MainCtrl
 * @2016-7-19
 * # footer
 * directive of the shoppingFrontend
 */
angular.module('shoppingFrontend')
    .directive( 'onSaleGoods', function () {
        return {
            restrict: 'EA',
            templateUrl: '../../views/main/onSaleGoods.html',
            replace: false
        };
    });