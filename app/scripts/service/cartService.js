angular.module('shoppingFrontend')
    .service('cartServ', ['hasDiscountServ', function(hasDiscountServ) {
        var self = this;
        self.hasDiscountServ=hasDiscountServ;
        /*itemInCart用于记录购物车中已有商品*/
        self.itemInCart = []; 

        /*根据商品点击事件添加购物车中不存在的商品*/
        self.addToCart = function(item) {
            var result = _.chain(self.itemInCart)
                .map(function(o) {
                    return o.barcode;
                })
                .flatten()
                .some(function(barcode) {
                    return item.barcode === barcode;
                })
                .value();

            if (!result) {
                var addItem = angular.copy(item);
                addItem.amount = 1;
                self.itemInCart.push(addItem);
            }
        };


        /*检查购物车是否为空，如果为空，将显示空购物车提示*/
        self.cartIsEmpty = function() {
            return !self.itemInCart.length;
        }  

        /*清空购物车*/
        self.clearCart = function() {
            self.itemInCart = [];
        };

        /*提交购物车信息*/
        self.commits = function() {
            self.res = _.chain(self.itemInCart)
                .filter(function(item) {
                    return item.amount;
                })
                .map(function(item) {
                    return item.amount === 1 ? item.barcode : (item.barcode + '-' + item.amount);
                })
                .value();

            // //获取购物车信息，对信息进行操作
            // // console.log(self.res);

            // // 将购物车信息每一项分离为barcode和unit两项，
            // self.result = [];
            // self.res.forEach(function(item, index, array){
            //     if(item.indexOf("-")>0){
            //         var pos = item.indexOf("-");
            //         self.result.push({barcode:item.slice(0,pos),unit:item.slice(pos+1,item.length)})
            //     }else{
            //         self.result.push({barcode:item.toString(),unit:1});
            //     }
            // });
            // console.log(self.res);

            // //将购物归类
            // self.onsaleOne = [];
            // self.onsaleTwo = [];
            // self.normalGoods = [];
            // self.result.forEach(function(item, index, array){
            //     if(self.hasDiscountServ.hasDiscountOne(item)==true)
            //         self.onsaleOne.push(item);
            //     else if(self.hasDiscountServ.hasDiscountTwo(item)==true)
            //         self.onsaleTwo.push(item);
            //     else
            //         self.normalGoods.push(item);
            // });

            // console.log(self.onsaleOne);
            // console.log(self.onsaleTwo);
            // console.log(self.normalGoods);

           
        };

    }]);