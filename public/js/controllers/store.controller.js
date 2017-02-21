(function() {
    'use strict';
    /**
     * Created by 100514374 on February 19th, 2017
     * Controller for the store fronts  
     */
    angular.module('myApp').controller('storeController', storeController);

    function storeController($scope,$rootScope, $routeParams, $location){
        if(!$rootScope.loggedIn){
            alert("Please log in first");
            $location.path('/');
        }
        $scope.type = $routeParams.type;
        $scope.add = function(product){
            for (var i = 0; i < $rootScope.cart.length; i++) {
                if ($rootScope.cart[i].name === product.name){
                    $rootScope.cart[i].quantity++;
                    return;
                }
            }
            $rootScope.cart.push({
                name:product.name,
                price:product.price,
                quantity:1
            });
        }

    }
})();