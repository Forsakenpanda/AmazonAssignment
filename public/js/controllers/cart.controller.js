(function() {
    'use strict';

    angular.module('myApp').controller('cartController', cartController);
    function cartController($scope, $rootScope, $http, $location){
        if(!$rootScope.loggedIn){
            alert("Please log in first");
            $location.path('/');
        }
        $scope.total = calcTotal();

        function calcTotal(){
            var total = 0;
            for(var i = 0; i < $rootScope.cart.length; i++){
                total += ($rootScope.cart[i].price * $rootScope.cart[i].quantity);
                console.log(total);
            }
            return total;
        }

        $scope.purchase = function() {
            if ($scope.total <= $rootScope.user.credits){
                $rootScope.user.credits -=$scope.total;
                alert("Purchase accepted. You have " + $rootScope.user.credits + " remaining");
                $http({
                    url:'updateCredits',
                    method:'POST',
                    data:$rootScope.user
                }).then(function(response){
                    console.log(response);
                })
            } else {
                alert("Insufficient Credits");
            }
        }
    }
})();