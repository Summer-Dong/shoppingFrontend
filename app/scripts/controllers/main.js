'use strict';

/**
 * @ngdoc function
 * @Summer shoppingFrontend.controller:MainCtrl
 * @2016-7-19
 * # MainCtrl
 * Controller of the shoppingFrontend
 */
angular.module('shoppingFrontend')
  	.controller('MainCtrl', function(itemService, rulesService) {
        var vm = this;
        vm.itemInCart = []; /*itemInCart用于记录购物车中已有商品*/
        
        itemService.getItems()
            .then(function(result) {
                vm.items = result;
            });
    	rulesService.getRules()
            .then(function(result) {
                vm.rules = result;
            });


        /*根据商品点击事件添加购物车中不存在的商品*/
        vm.addToCart = function(item) {
            var result = _.chain(vm.itemInCart)
                .map(function(o) {
                    return o.barcode;
                })
                .flatten()
                .some(function(barcode) {
                    return item.barcode === barcode;
                })
                .value();

            if (!result) {
                var addItem = angular.copy(item);
                addItem.amount = 1;
                vm.itemInCart.push(addItem);
            }
        };
});
