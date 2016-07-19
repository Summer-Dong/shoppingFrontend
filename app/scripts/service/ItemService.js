angular.module('shoppingFrontend')
    .service('itemService', ['$http', 'webConfig', function($http, webConfig) {
        var self = this;

        self.getItems = function() {
            return $http.get(webConfig.api.host + "item")
                .then(function(response) {
                    return response.data;
                })
        };
    }]);
