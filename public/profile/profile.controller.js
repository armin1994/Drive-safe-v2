(function (angular) {
    'use strict';
    function ControllerFN($scope,$state,User,Session) {
        $scope.user = Session.get();
    }
    ControllerFN.$inject = ['$scope','$state','User','Session'];
    angular.module('app').controller('ProfileController', ControllerFN);
})(angular);