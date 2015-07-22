/**
 * Created by Yaoh on 2015/7/2.
 */


/*
 * 配置前端
 * ...*/
angular
    .module('mean')
    .factory('authInterceptor', authInterceptor)
    .config(routerConfig)
    .config(config);


function authInterceptor($window) {
    return {
        request: request
    };

    function request(config) {
        console.log('config');
        console.log(config);
        if (JSON.parse($window.localStorage.getItem('localUser')) == null) {
            config.headers["access_token"] = null;
            config.headers["group"] = null;
            config.headers["function"] = null;
        }
        else {
            config.headers["access_token"] = JSON.parse($window.localStorage.getItem('localUser')).access_token;
            config.headers["group"] = JSON.parse($window.localStorage.getItem('localUser')).group;
            config.headers["function"] = JSON.parse($window.localStorage.getItem('localUser')).function;
        }
        return config;
    }
}

function config($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');

}

function routerConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/components/home/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        })
        .state('user', {
            url: '/user',
            templateUrl: '/components/user/user.html',
            controller: 'UserController',
            controllerAs: 'user'
        })
        .state('user.details', {
            url: '/:id',
            templateUrl: '/components/user/user.details.html',
            controller: 'UserDetailsController',
            controllerAs: 'user'
        })
        .state('funtest', {
            url: '/funtest',
            templateUrl: '/components/funtest/fun.html',
            controller: 'FunController',
            controllerAs: 'fun'
        });

}