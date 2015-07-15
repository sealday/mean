angular.module('user', [])
    .controller('UserController', UserController)
    .factory('userService', userService);


//防止混淆后注入失败
userService.$inject = ['$http'];
function userService($http) {
    var instance = {};

    instance.items = [];
    instance.refresh = refresh;
    instance.additem = additem;
    instance.refresh();

    return instance;

    function refresh() {
        $http.get('/users').success(function (data) {
            console.log(data);
            instance.items.length = 0;
            angular.forEach(data, function (item) {
                instance.items.push(item);
            });
        });
    }

    function additem(item) {
        $http.post('/users', {item: item}).success(function () {
            $http.get('/users').success(function (items) {
                instance.items.length = 0;
                angular.forEach(items, function (item) {
                    instance.items.push(item);
                });
            });
        })
    }
}


UserController.$inject = ['userService'];
function UserController(userService) {
    this.items = userService.items;
    this.refresh = userService.refresh;
    this.additem = userService.additem;
}
