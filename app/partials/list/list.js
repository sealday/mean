var list = angular.module('list', []);

/**
 * itemService 是一个服务,单例模式,也就是整个应用中只会存在一个实例
 *
 * 这一点区别于下面的ListController,后者会在每一次访问的时候重新实例化一次
 */
meanApp.factory('itemService', function($http){
    var instance = {};

    instance.items = [];

    instance.refresh = function() {
        $http.get('/items').success(function(data) {
            console.log(data);
            instance.items.length = 0;
            angular.forEach(data, function(item) {
                instance.items.push(item);
            });
        });
    }

    instance.refresh();

    return instance;
});

list.controller('ListController', function(itemService){
    this.items = itemService.items;
});