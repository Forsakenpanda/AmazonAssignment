(function(){
    'use strict';
    /**
     * Created by 100514374 on February 19th, 2017
     * Controller for registration and logging in. 
     */
    angular.module('myApp').controller('bodyController', bodyController);
    function bodyController($scope, $rootScope, $http){
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