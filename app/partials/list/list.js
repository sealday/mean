var list = angular.module('list', []);

meanApp.factory('itemService', function ($http) {
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