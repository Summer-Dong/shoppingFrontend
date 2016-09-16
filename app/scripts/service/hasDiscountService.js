angular.module('shoppingFrontend')
    .service('hasDiscountServ', ['rulesService', function(rulesService) {
        var self = this;
        rulesService.getRules()
            .then(function(result) {
                self.rules = result;
            });

         self.hasDiscountOne = function(item) {
            return _.chain(self.rules)
                .dropRight(self.rules, 1)
                .map(function(item) {
                    return item.barcodes;
                })
                .flatten()
                .some(function(barcode) {
                    return item.barcode === barcode;
                })
                .value();
        };
        self.hasDiscountTwo = function(item) {
            return _.chain(self.rules)
                .drop(self.rules, 1)
                .map(function(item) {
                    return item.barcodes;
                })
                .flatten()
                .some(function(barcode) {
                    return item.barcode === barcode;
                })
                .value();
        };
    }]);
