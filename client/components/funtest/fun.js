angular.module('funtest', [])
    .controller('FunController', FunController)
    .factory('funService', funService);


//防止混淆后注入失败
funService.$inject = ['$http'];
function funService($http) {
    var instance = {};

    instance.words = [];
    instance.refresh = refresh;
    instance.addword = addword;
    instance.refresh();

    return instance;

    function refresh() {
        $http.get('/words').success(function (data) {
            console.log(data);
            instance.words.length = 0;
            angular.forEach(data, function (item) {
                instance.words.push(item);
            });
        });
    }

    function addword(word) {
        $http.post('/words', {word: word}).success(function () {
            $http.get('/words').success(function (words) {
                instance.words.length = 0;
                angular.forEach(words, function (word) {
                    instance.words.push(word);
                });
            });
        })
    }
}


FunController.$inject = ['funService'];
function FunController(funService) {
    this.words = funService.words;
    this.refresh = funService.refresh;
    this.addword = funService.addword;
}
