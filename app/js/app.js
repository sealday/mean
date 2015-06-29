/**
 * Created by seal on 15-6-29.
 */
var meanApp = angular.module('mean', ['ui.router', 'ngAnimate']);

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

meanApp.controller('HomeController', function(){

});

meanApp.controller('ListController', function(itemService){
    this.items = itemService.items;
});