/**
 * Created by seal on 15-6-29.
 */
var meanApp = angular.module('mean', ['ui.router', 'ngAnimate']);

meanApp.controller('HomeController', function(){

});

meanApp.controller('ListController', function(){
    this.items = [
        'They failed by only one vote',
        'Too little, too late',
        'Setting an example',
        'Opposition weakness'
    ];
});