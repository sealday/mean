/**
 * Created by Yaoh on 2015/7/2.
 */


/*
* 配置前端
* ...*/
angular
    .module('mean')
    .config(routerConfig);



function routerConfig($urlRouterProvider,$stateProvider){
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/components/home/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        })
        .state('list', {
            url: '/list',
            templateUrl: '/components/list/list.html',
            controller: 'ListController',
            controllerAs: 'list'
        });

}