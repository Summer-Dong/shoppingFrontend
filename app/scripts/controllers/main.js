'use strict';

/**
 * @ngdoc function
 * @Summer shoppingFrontend.controller:MainCtrl
 * @2016-7-19
 * # MainCtrl
 * Controller of the shoppingFrontend
 */
angular.module('shoppingFrontend')
    .controller('MainCtrl', function(itemService, rulesService, hasDiscountServ, cartServ, printReceiptServ) {
        var vm = this;
        
        itemService.getItems()
            .then(function(result) {
                vm.items = result;
            });
        rulesService.getRules()
            .then(function(result) {
                vm.rules = result;
            });

        /*检查某商品是否参与"95折优惠"活动，如参与，有绿色标识*/
        vm.hasDiscountTwo = hasDiscountServ.hasDiscountTwo;

        /*检查某商品是否参与"买二赠一"活动，如参与，有红色标识,当参与两种活动时，默认此活动*/
        vm.hasDiscountOne = hasDiscountServ.hasDiscountOne;
        
        /*清空购物车，添加到购物车，提交购物车信息*/ 
        vm.cartServ = cartServ;

        /*打印小票*/
        vm.printReceiptServ = printReceiptServ;
    });