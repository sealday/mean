angular.module('list', [])
    .factory('itemService', itemService)
    .controller('ListController', ListController);

//防止混淆后注入失败
itemService.$inject('$http');
function itemService($http) {
    var instance = {};

    instance.items = [];
    instance.refresh = refresh;
    instance.additem = additem;
    instance.refresh();

    return instance;

    function refresh() {
        $http.get('/items').success(function (data) {
            console.log(data);
            instance.items.length = 0;
            angular.forEach(data, function (item) {
                instance.items.push(item);
            });
        });
    }

    function additem(item) {
        $http.post('/items', {item: item}).success(function () {
            $http.get('/items').success(function (items) {
                instance.items.length = 0;
                angular.forEach(items, function (item) {
                    instance.items.push(item);
                });
            });
        })
    }
}


ListController.$inject('itemService');
function ListController(itemService) {
    this.items = itemService.items;
    this.refresh = itemService.refresh;
    this.additem = itemService.additem;
}
