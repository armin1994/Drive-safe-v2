(function (angular) {
    'use strict';
    function ControllerFN($scope,$rootScope,$state,Session) {
        Session.destroy();
        $state.go('login');
    }
    ControllerFN.$inject = ['$scope','$rootScope','$state','Session'];
    angular.module('app').controller('LogoutController', ControllerFN);
})(angular);