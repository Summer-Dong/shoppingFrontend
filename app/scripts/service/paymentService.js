angular.module('shoppingFrontend')
    // .service('paymentService', ['$http', 'webConfig', function($http, webConfig) {
    .service('paymentService', ['cartServ', 'itemService', 'hasDiscountServ', function(cartServ, itemService, hasDiscountServ) {

        var my = this;

        itemService.getItems()
            .then(function(result) {
                my.itemService = result;
            });
        my.cartServ = cartServ;
        my.hasDiscountServ = hasDiscountServ;

        my.calcuPayment = function() {
            //购物清单结果初始化
            my.payment = new Object();
            my.payment.threeForTwoItems = [];
            my.payment.total = 0;
            my.payment.sale = 0;
            my.payment.resultItems = [];

            // 将购物车信息每一项分离为barcode和amount两项，
            angular.forEach(my.cartServ.res, function(item, index) {
                if (item.indexOf("-") > 0) {
                    var pos = item.indexOf("-");
                    my.payment.resultItems.push({
                        barcode: item.slice(0, pos),
                        amount: item.slice(pos + 1, item.length)
                    });
                } else {
                    my.payment.resultItems.push({
                        barcode: item.toString(),
                        amount: 1
                    });
                }
            });

            //将购物归类,并完善每一物品的信息
            angular.forEach(my.payment.resultItems, function(item, index) {
                var that = item;

                angular.forEach(my.itemService, function(item, index) {
                    if (item.barcode == that.barcode) {
                        that.name = item.name;
                        that.price = item.price;
                        that.unit = item.unit;
                        that.total = (that.price) * (that.amount);
                        that.save = null;

                        my.payment.total += that.total;
                    }
                });


                //满足买二送一
                if (my.hasDiscountServ.hasDiscountOne(item) == true && item.amount > 2) {
                    my.payment.threeForTwoItems.push(item);
                }
                //满足95折
                else if (my.hasDiscountServ.hasDiscountTwo(item) == true) {
                    item.save = (item.total * 0.05).toFixed(2);

                    my.payment.total -= (+item.save);
                    my.payment.sale += (+item.save);
                }
            });

            //计算满二送一的物品的优惠数量及相应的优惠
            angular.forEach(my.payment.threeForTwoItems, function(item, index) {
                item.saleAmount = Math.floor((item.amount / 3));
                my.payment.total -= (item.saleAmount * item.price);

                my.payment.sale += (item.saleAmount * item.price);
            });

        };

        // my.getPayment = function(paymentRequest) {
        //     return $http.post(webConfig.api.host + "payment", paymentRequest)
        //         .then(function(res) {
        //             return res.data;
        //         })
        // };
    }]);