/**
 * Created by Nick Gregorio, 100514374
 * Created for Cloud Computing (UOIT)
 * January 30th, 2017
 */
(function(){
    'use strict';
    angular.module('myApp',['ngRoute']).config(function($locationProvider, $routeProvider){
        $locationProvider.hashPrefix('');
        $routeProvider //Handles all the routes sent in the front end (changing views, not affecting the backend)

        .when('/store/:type', {
            templateUrl:'/views/store.html'
        })
        .when('/cart', {
          templateUrl:'/views/cart.html'  
        })

        .otherwise({
            redirectTo: function(params, currentPath){
                return '/';
            }
        })
        .when('/', {
            templateUrl:"/views/register.html"
        })
    });

})();