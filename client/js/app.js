/**
 * Created by seal on 15-6-29.
 */
var meanApp = angular.module('mean', [
    'ui.router',
    'ngAnimate',
    'home',
    'list'
]);

/**
 * 配置前端路由
 */
meanApp.config(function($stateProvider, $urlRouterProvider){
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
});



