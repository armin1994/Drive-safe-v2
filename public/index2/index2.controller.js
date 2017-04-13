(function (angular) {
    'use strict';
    function index2ControllerFN($scope,$rootScope,$state,angularLoad,Session) {
        $scope.user = {};
        $scope.user = Session.get();
        $scope.$on('$viewContentLoaded', function (event, toState, toParams, fromState, fromParams) {
            // do something
            $scope.user = Session.get();
        });
    }
    index2ControllerFN.$inject = ['$scope','$rootScope','$state','angularLoad','Session'];
    angular.module('app').controller('Index2Controller', index2ControllerFN);
})(angular);