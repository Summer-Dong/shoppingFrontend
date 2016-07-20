angular.module('shoppingFrontend')
    .service('paymentService', ['$http', 'webConfig', function($http, webConfig) {
        var self = this;

        self.getPayment = function(paymentRequest) {
            return $http.post(webConfig.api.host + "payment", paymentRequest)
                .then(function(res) {
                    return res.data;
                })
        };
    }]);
