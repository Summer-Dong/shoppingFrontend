'use strict';

/**
 * @ngdoc function
 * @Summer shoppingFrontend.controller:MainCtrl
 * @2016-7-19
 * # MainCtrl
 * Controller of the shoppingFrontend
 */
angular.module('shoppingFrontend')
  	.controller('MainCtrl', function(itemService) {
        var vm = this;
        
        itemService.getItems()
            .then(function(result) {
                vm.items = result;
            });
    
});
