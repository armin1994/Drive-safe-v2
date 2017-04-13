(function (angular) {
    'use strict';
    function ControllerFN($scope, $state, User) {
        $scope.user = {};
        $scope.register = function () {
            $scope.user.image = "";
            var temp = new User($scope.user);
            temp.$register().then(function (data) {
                if (data.status){
                demo.showSwal('success-registration');
                $state.go('login');
                }
                else{
                    var message = "Error username or email already exist"
                    demo.showNotification('top','center',message,4,0);
                }
            });
        }
    }

    ControllerFN.$inject = ['$scope', '$state', 'User'];
    angular.module('app').controller('RegisterController', ControllerFN);
})(angular);