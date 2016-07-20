'use strict';

/**
 * @ngdoc function
 * @Summer shoppingFrontend.controller:MainCtrl
 * @2016-7-19
 * # MainCtrl
 * Controller of the shoppingFrontend
 */
angular.module('shoppingFrontend')
  	.controller('MainCtrl', function(itemService, rulesService, paymentService) {
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

        /*检查某商品是否参与"买二赠一"活动，如参与，有皮粉色标识*/
        vm.hasDiscountOne = function(item) {
            return _.chain(vm.rules)
                .map(function(item) {
                    return item.barcodes;
                })
                .flatten()
                .some(function(barcode) {
                    return item.barcode === barcode;
                })
                .value();
        };
        /*检查某商品是否参与"95折优惠"活动，如参与，有绿色标识*/
        // vm.hasDiscountTwo = function(item) {
        //     return _.chain(vm.rules)
        //         .drop(function(array){
        //             return array[1];
        //         })
        //         .map(function(item) {
        //             return item.barcodes;
        //         })
        //         .flatten()
        //         .some(function(barcode) {
        //             return item.barcode === barcode;
        //         })
        //         .value();
        // };
        
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

        /*检查购物车是否为空，如果为空，将显示空购物车提示*/
        vm.cartIsEmpty = function() {
            return !vm.itemInCart.length;
        }

        /*清空购物车*/
        vm.clearCart = function() {
            vm.itemInCart = [];
        };

        /*提交购物车信息*/
        vm.commits = function(){
            vm.res= _.chain(vm.itemInCart)
                .filter(function(item) {
                    return item.amount;
                })
                .map(function(item) {
                    return item.amount === 1 ? item.barcode : (item.barcode + '-' + item.amount);
                })
                .value();
        }; 

        /*打印小票*/
        vm.printClickFlag = false;
        vm.printReceipt = function() {
            paymentService.getPayment({ items: vm.res })
                .then(function(result) {
                    vm.payment = result;
                    vm.printClickFlag = true;
                })
                .then(function() {
                    vm.itemInCart = [];
                });
        };
    }


);
