(function (angular) {
    'use strict';

    function ControllerFn($scope,$rootScope,$state,Session) {
        $rootScope.cart = Session.getCart();
        $scope.logOut = ()=>{
            Session.destroy();
            $state.go('login');
        }
    }
    ControllerFn.$inject = ['$scope','$rootScope','$state','Session'];
    angular.module("app").controller("HeaderController", ControllerFn);
})(angular);