angular.module('shoppingFrontend')
    .service('printReceiptServ', function(cartServ, paymentService) {
        var self = this;
        self.cartServ = cartServ;

        /*打印小票*/
        self.printClickFlag = false;
        self.printReceipt = function() {
            paymentService.getPayment({
                    items: self.cartServ.res
                })
                .then(function(result) {
                    self.payment = result;
                    self.printClickFlag = true;
                })
                .then(function() {
                    self.cartServ.itemInCart = [];
                });
        };
    });
