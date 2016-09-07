angular.module('shoppingFrontend')
    .service('printReceiptServ', function(cartServ, paymentService) {
        var self = this;
        self.cartServ = cartServ;
        self.paymentService = paymentService;

        /*打印小票*/
        self.printClickFlag = false;
        self.printReceipt = function() {
            self.paymentService.getPayment({
                    items: self.res
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
