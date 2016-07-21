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
      "name": "95折",
      "barcodes": [
        "ITEM00000",
        "ITEM00001",
        "ITEM00003",
        "ITEM00006",
        "ITEM00008"
      ]
    }]);

    $httpBackend.whenPOST('http://localhost:8080/payment').respond(
      {
        "resultItems":
        [{
          "name":"凉拌猪耳朵",
          "unit":"两",
          "amount":1,
          "price":5.0,
          "total":5.0,
          "save":null
        },{
          "name":"苹果",
          "unit":"斤",
          "amount":3,
          "price":5.0,
          "total":14.25,
          "save":"节省0.75(元)"
        },{
          "name":"趣多多",
          "unit":"条",
          "amount":1,
          "price":6.0,
          "total":6.0,
          "save":null
        },{
          "name":"可口可乐",
          "unit":"瓶",
          "amount":3,
          "price":3.0,
          "total":6.0,
          "save":null
        },{
          "name":"乐事薯片",
          "unit":"袋",
          "amount":3,
          "price":3.5,
          "total":7.0,
          "save":null
        }],
      "threeForTwoItems":
      [{
          "name":"可口可乐",
          "unit":"瓶",
          "amount":1
          },{
          "name":"乐事薯片",
          "unit":"袋",
          "amount":1
        }],
        "sale":"7.25",
        "total":"38.25"
        }
    );


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
    expect(mainCtrl.rules[0].name).toBe("95折");
    expect(mainCtrl.rules[0].barcodes.length).toBe(5);
  }));

   it('should get all payments', inject(function($httpBackend) {
    // given 
    mainCtrl.itemInCart = ["ITEM00000-3","ITEM00001-3","ITEM00002-3","ITEM00003","ITEM00005"];

    // when
    mainCtrl.commits();
    mainCtrl.printReceipt();
    $httpBackend.flush();
    
    // then
    expect(mainCtrl.payment.resultItems.length).toBe(5);
    expect(mainCtrl.payment.resultItems[1].save).toBe("节省0.75(元)");
    expect(mainCtrl.payment.total).toBe("38.25");
    expect(mainCtrl.payment.sale).toBe("7.25");
    expect(mainCtrl.payment.threeForTwoItems.length).toBe(2);
  }));

});
