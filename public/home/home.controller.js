(function (angular) {
    'use strict';

    function ControllerFn($scope,$state,Session,Scenario,angularLoad) {
        Scenario.query().$promise.then((data)=>{
            $scope.scenarios = data;
        })
    }
    ControllerFn.$inject = ['$scope','$state','Session','Scenario','angularLoad'];
    angular.module("app").controller("HomeController", ControllerFn);
})(angular);