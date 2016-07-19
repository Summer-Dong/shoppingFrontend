'use strict';

describe('Controller: MainCtrl', function() {

    // load the controller's module
    beforeEach(module('shoppingFrontend'));

    var mainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        $httpBackend.whenGET('http://localhost:8080/item').respond([{
            "barcode": "ITEM00000",
            "name": "可口可乐",
            "unit": "瓶",
            "category": "食品",
            "subCategory": "碳酸饮料",
            "price": 3.0
        }]);

        $httpBackend.whenGET('http://localhost:8080/rules').respond([{
            "type": 1,
            "name": "满一百减十块",
            "barcodes": [
                "ITEM00000",
                "ITEM00001",
                "ITEM00003",
                "ITEM00006",
                "ITEM00008"
            ]
        }]);

         mainCtrl = $controller('MainCtrl', {
            $scope: scope
        });

    }));

    it('should get all items to init item list', inject(function($httpBackend) {

        //given
        $httpBackend.flush();
        //then
        expect(mainCtrl.items.length).toBe(1);
        expect(mainCtrl.items[0].name).toBe("可口可乐");
        expect(mainCtrl.items[0].barcode).toBe("ITEM00000");
    }));

    it('should get all rules', inject(function($httpBackend) {
        //given
        $httpBackend.flush();
        //then
        expect(mainCtrl.rules.length).toBe(1);
        expect(mainCtrl.rules[0].name).toBe("满一百减十块");
        expect(mainCtrl.rules[0].barcodes.length).toBe(5);
    }));

   

});

