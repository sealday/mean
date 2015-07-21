/**
 * Created by Yaoh on 2015/7/12.
 */
angular
    .module('mean')
    .factory('signService', signService);

signService.$inject = ['$http', '$q', '$window'];

/* @ngInject */
function signService($http, $q, $window) {

    var service = {
        signed: false,
        register: register,
        signin: signin,
        signout: signout,
        init: init,
        name: null
    };

    init();
    return service;

    function init() {
        var temp = $window.localStorage.getItem('signed');
        if (temp == "true") {
            service.signed = true;
            service.name = JSON.parse($window.localStorage.getItem('localUser')).username;
        }
    }

    function signin(username, password) {
        return $q(function (resolve, reject) {
            console.log('service\n' + username);
            console.log('service\n' + password);
            $http.post('/signin', {username: username, password: password}).success(function (result) {
                service.signed = true;
                $window.localStorage.setItem('localUser', JSON.stringify(result.value));
                $window.localStorage.setItem('signed', true);
                service.name = JSON.parse($window.localStorage.getItem('localUser')).username;
                console.dir(JSON.parse($window.localStorage.getItem('localUser')));
                resolve('sign in success');
            }).error(function () {
                reject('sign in failure');
            });
        });
    }

    function signout() {
        service.signed = false;
        $window.localStorage.removeItem('signed');
        $window.localStorage.removeItem('localUser');
    }

    function register(username, password) {
        return $q(function (resolve, reject) {
            console.log('service\n' + username);
            console.log('service\n' + password);
            $http.post('/register', {username: username, password: password}).success(function () {
                resolve('register success');
            }).error(function () {
                reject('register failure');
            });
        });
    }
}
