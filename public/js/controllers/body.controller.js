(function(){
    'use strict';
    angular.module('myApp').controller('bodyController', bodyController);
    function bodyController($scope, $rootScope, $http){
        console.log("Loaded");
        $scope.info = {
            username:"",
            password:"",
            credits:0
        }
        $scope.loginInfo={
            username:"",
            password:""
        }
        $scope.submit = function(){
            $http({
                url: '/register',
                method: 'POST',
                data: $scope.info
            }).then(function(response){
                alert(response.data.message);
                
            })
        }

        $scope.login =function() {
            $http({
                url:'/login',
                method:'POST',
                data:{user:$scope.loginInfo.username, pass:$scope.loginInfo.password}
            }).then(function(response){
                console.log("Response");
                if(response.data.message){
                    $scope.error = response.data.message;
                } else {
                    $scope.error="";
                    alert("Logged in!");
                    $rootScope.user.name=response.data.username;
                    $rootScope.user.credits=response.data.credits;
                    $rootScope.user.id=response.data.userID;
                    $rootScope.loggedIn=true;
                }
            })
        }
    }
})();