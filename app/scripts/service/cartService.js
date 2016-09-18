angular.module('shoppingFrontend')
    .service('cartServ', ['hasDiscountServ', function(hasDiscountServ) {
        var self = this;
        self.hasDiscountServ=hasDiscountServ;
        /*itemInCart用于记录购物车中已有商品*/
        self.itemInCart = []; 

        /*根据商品点击事件添加购物车中不存在的商品*/
        self.addToCart = function(item) {
            var result = _.chain(self.itemInCart)
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
                self.itemInCart.push(addItem);
            }
        };

        /*检查购物车是否为空，如果为空，将显示空购物车提示*/
        self.cartIsEmpty = function() {
            return !self.itemInCart.length;
        }  

        /*清空购物车*/
        self.clearCart = function() {
            self.itemInCart = [];
        };

        /*提交购物车信息*/
        self.commits = function() {
            self.res = _.chain(self.itemInCart)
                .filter(function(item) {
                    return item.amount;
                })
                .map(function(item) {
                    return item.amount === 1 ? item.barcode : (item.barcode + '-' + item.amount);
                })
                .value();
        };

    }]);