(function (angular) {
    'use strict';
    function ControllerFN($scope,$state,User) {
        $scope.user = {};
        $scope.register = function(){
            var temp = new User($scope.user);
            temp.$register().then(function(data){
                console.log(data);
                demo.showSwal('success-registration');
               $state.go('login');
            });
        }
    }
    ControllerFN.$inject = ['$scope','$state','User'];
    angular.module('app').controller('RegisterController', ControllerFN);
})(angular);