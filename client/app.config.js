/**
 * Created by Yaoh on 2015/7/2.
 */


/*
 * 配置前端
 * ...*/
angular
    .module('mean')
    .config(routerConfig);


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
        .state('userlist', {
            url: '/userlist',
            templateUrl: '/components/user/user.list.html',
            controller: 'UserController',
            controllerAs: 'user'
        });

}