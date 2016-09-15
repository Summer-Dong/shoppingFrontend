angular.module('shoppingFrontend')
    .service('printReceiptServ', function(paymentService, cartServ) {
        var my = this;
        my.printClickFlag = false;

        my.printReceipt = function() {
            paymentService.calcuPayment();
            my.printClickFlag = true;
            cartServ.itemInCart = [];
        };


        /*打印小票*/
        // my.printClickFlag = false;
        // my.printReceipt = function() {
        //     paymentService.getPayment({
        //             items: my.cartServ.res
        //         })
        //         .then(function(result) {
        //             my.payment = result;
        //             my.printClickFlag = true;
        //         })
        //         .then(function() {
        //             my.cartServ.itemInCart = [];
        //         });
        // };


    });