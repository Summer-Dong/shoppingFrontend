angular.module('shoppingFrontend')
    .service('paymentService', ['$http', 'webConfig', function($http, webConfig) {
        var self = this;

        /*取到main.js中cartList的值并传给后台，同时后台根据传过去的值生成返回数据而后生成小票*/
        self.getPayment = function(paymentRequest) {
            return $http.post(webConfig.api.host + "payment", paymentRequest)
                .then(function(res) {
                    return res.data;
                })
        };
    }]);
