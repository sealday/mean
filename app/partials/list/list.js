var list = angular.module('list', []);

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