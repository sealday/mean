/**
 * Created by seal on 15-6-29.
 */
var meanApp = angular.module('mean', [
    'ui.router',
    'ngAnimate',
    'home',
    'list'
]);

meanApp.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'partials/home/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        })
        .state('list', {
            url: '/list',
            templateUrl: 'partials/list/list.html',
            controller: 'ListController',
            controllerAs: 'list'
        });
});



