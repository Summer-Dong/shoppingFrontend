'use strict';


describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('shoppingFrontend'));

  var mainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($rootScope, $controller, $httpBackend) {
    scope = $rootScope.$new();
    $httpBackend.whenGET('http://localhost:8081/item').respond([{
      "barcode": "ITEM00000",
      "name": "可口可乐",
      "unit": "瓶",
      "category": "食品",
      "subCategory": "碳酸饮料",
      "price": 3.0
    }]);

    $httpBackend.whenGET('http://localhost:8081/rules').respond(
      [{
        "name":"买二赠一",
        "type":1,
        "barcodes":
        [
          "ITEM00000",
          "ITEM00001",
          "ITEM00003",
          "ITEM00006",
          "ITEM00008"
        ]},{
          "name":"95折",
          "type":2,
          "barcodes":
          [
            "ITEM00002",
            "ITEM00004",
            "ITEM00006",
            "ITEM00008",
            "ITEM00009"
          ]}
        ]);

    // $httpBackend.whenPOST('http://localhost:8081/payment').respond(
    //   {
    //     "resultItems":
    //     [{
    //       "name":"凉拌猪耳朵",
    //       "unit":"两",
    //       "amount":1,
    //       "price":5.0,
    //       "total":5.0,
    //       "save":null
    //     },{
    //       "name":"苹果",
    //       "unit":"斤",
    //       "amount":3,
    //       "price":5.0,
    //       "total":14.25,
    //       "save":"节省0.75(元)"
    //     },{
    //       "name":"趣多多",
    //       "unit":"条",
    //       "amount":1,
    //       "price":6.0,
    //       "total":6.0,
    //       "save":null
    //     },{
    //       "name":"可口可乐",
    //       "unit":"瓶",
    //       "amount":3,
    //       "price":3.0,
    //       "total":6.0,
    //       "save":null
    //     },{
    //       "name":"乐事薯片",
    //       "unit":"袋",
    //       "amount":3,
    //       "price":3.5,
    //       "total":7.0,
    //       "save":null
    //     }],
    //   "threeForTwoItems":
    //   [{
    //       "name":"可口可乐",
    //       "unit":"瓶",
    //       "amount":1
    //       },{
    //       "name":"乐事薯片",
    //       "unit":"袋",
    //       "amount":1
    //     }],
    //     "sale":"7.25",
    //     "total":"38.25"
    //     }
    // );

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
    expect(mainCtrl.rules.length).toBe(2);
    expect(mainCtrl.rules[0].name).toBe("买二赠一");
    expect(mainCtrl.rules[0].barcodes.length).toBe(5);
    expect(mainCtrl.rules[1].type).toBe(2);
  }));

  //  it('should get all payments', inject(function($httpBackend) {
  //   // given 
  //   mainCtrl.cartServ.itemInCart = ["ITEM00000-3","ITEM00001-3","ITEM00002-3","ITEM00003","ITEM00005"];

  //   // when
  //   mainCtrl.cartServ.commits();
  //   mainCtrl.printReceiptServ.printReceipt();
  //   // $httpBackend.flush();
    
  //   // then
  //   expect(mainCtrl.paymentService.payment.resultItems.length).toBe(5);
  //   expect(mainCtrl.paymentService.payment.resultItems[1].save).toBe("节省0.75(元)");
  //   expect(mainCtrl.paymentService.payment.resultItems[2].save).toBe(null);
  //   expect(mainCtrl.paymentService.payment.threeForTwoItems.length).toBe(2);
  //   expect(mainCtrl.paymentService.payment.threeForTwoItems[0].amount).toBe(1);
  //   expect(mainCtrl.paymentService.payment.total).toBe("38.25");
  //   expect(mainCtrl.paymentService.payment.sale).toBe("7.25");
    
  // }));

});
