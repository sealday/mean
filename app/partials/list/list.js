var list = angular.module('list', []);

<<<<<<< HEAD
meanApp.factory('itemService', function ($http) {
=======
/**
 * itemService 是一个服务,单例模式,也就是整个应用中只会存在一个实例
 *
 * 这一点区别于下面的ListController,后者会在每一次访问的时候重新实例化一次
 */
meanApp.factory('itemService', function($http){
>>>>>>> c97d085612846fd0e82966820079c113c2c3bd8c
    var instance = {};
    instance.items = [];
    this.$http = $http;

    instance.refresh = function () {
        $http.get('/items').success(function (data) {
            console.log(data);
            instance.items.length = 0;
            angular.forEach(data, function (item) {
                instance.items.push(item);
            });
        });
    }

    instance.additem = function (item) {
        $http.post('/items', {item: item}).success(function () {
            $http.get('/items').success(function (items) {
                instance.items.length = 0;
                angular.forEach(items, function (item) {
                    instance.items.push(item);
                });
            });
        })
    }

    instance.refresh();
    return instance;
});

list.controller('ListController', function (itemService) {
    this.items = itemService.items;
    this.refresh = itemService.refresh;
    this.additem = itemService.additem;
});