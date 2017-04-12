(function (angular) {
    'use strict';
    function index2ControllerFN($scope,$state,angularLoad,Session) {
        angularLoad.loadScript('./assets/js/material-dashboard.js');
        $scope.user = {};
        $scope.user = Session.get();
        $scope.$on('$viewContentLoaded', function (event, toState, toParams, fromState, fromParams) {
            // do something
            $scope.user = Session.get();
        });
    }
    index2ControllerFN.$inject = ['$scope','$state','angularLoad','Session'];
    angular.module('app').controller('Index2Controller', index2ControllerFN);
})(angular);