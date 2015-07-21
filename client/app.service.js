/**
 * Created by Yaoh on 2015/7/12.
 */
angular
    .module('mean')
    .factory('signService', signService);

signService.$inject = ['$http', '$q'];

/* @ngInject */
function signService($http, $q) {

    var service = {
        signed: false,
        register: register,
        signin: signin,
        signout: signout,
        name: null
    };

    return service;

    function signin(username, password) {
        return $q(function (resolve, reject) {
            console.log('service\n' + username);
            console.log('service\n' + password);
            $http.post('/signin', {username: username, password: password}).success(function () {
                service.signed = true;
                service.name = username;
                resolve('sign in success');
            }).error(function () {
                reject('sign in failure');
            });
        });
    }


    function signout() {
        service.signed = false;
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
