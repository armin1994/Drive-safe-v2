(function (angular) {
    'use strict';
    function ControllerFN($scope,$state,User,Session) {
        $scope.user = angular.copy(Session.get());
        $scope.password = "";

        $scope.submit = ()=>{
            
            if ($scope.password=="")
                delete $scope.user.password;
            else
                $scope.user.password = $scope.password;
            var temp = new User($scope.user);
            temp.$update().then((data)=>{

                demo.showSwal('success-edit-profile');
                Session.save($scope.user);
                $state.go('profile');
            });
        }
    }
    ControllerFN.$inject = ['$scope','$state','User','Session'];
    angular.module('app').controller('EditProfileController', ControllerFN);
})(angular);