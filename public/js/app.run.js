/**
 * Created by Nick Gregorio, 100514374
 * Created for Cloud Computing (UOIT)
 * January 30th, 2017
 */
(function(){
    'use strict';
    angular.module('myApp').run(run);
    //Set up the rootScope variable for cross-controller use
    function run($rootScope, $interval, $http){
        $rootScope.loggedIn = false;
        $rootScope.user={
            name:"",
            credits:0,
            id:-1
        }
        $rootScope.userCount=0;
        $rootScope.products={};
        $rootScope.cart=[];


        function getProducts(){
            $http({
                url:'/getProducts',
                method:"GET"
            }).then(function(response){
                $rootScope.products=response.data;
            })
        }
        


        function getCount(){
            $http({
                url:'/getCount',
                method:"GET",
            }).then(function(response){
                $rootScope.count = response.data;
            })   
        }

        //Get the products and count of active users immediately, and get the count of users every 5 seconds to keep track.
        getCount();
        getProducts();
        $interval(function(){
            getCount();
        }, 5000);
    }
})();