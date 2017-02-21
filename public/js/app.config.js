/**
 * Created by Nick Gregorio, 100514374
 * Created for Cloud Computing (UOIT)
 * January 30th, 2017
 */
(function(){
    'use strict';
    angular.module('myApp',['ngRoute']).config(function($locationProvider, $routeProvider){
        $locationProvider.hashPrefix('');
        $routeProvider

        .when('/store/:type', {
            templateUrl:'/views/store.html'
        })
        .when('/cart', {
          templateUrl:'/views/cart.html'  
        })

        .otherwise({
            redirectTo: function(params, currentPath){
                console.log(currentPath);
                console.log("Otherwise hit");
                return '/';
            }
        })
        .when('/', {
            templateUrl:"/views/register.html"
        })
    });

})();