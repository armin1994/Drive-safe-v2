(function (angular) {
    'use strict';
    function ControllerFN($scope,User,Skill,Category,Review,Reservation,Scenario,Session,$state) {
        $scope.users = [];
        $scope.skills = [];
        $scope.categories = [];
        $scope.reviews = [];
        $scope.reservations = [];
        $scope.scenarios = [];

        User.query().$promise.then((data)=>{
            $scope.users = data;
        });
        Skill.query().$promise.then((data)=>{
            $scope.skills = data;
        });
        Category.query().$promise.then((data)=>{
            $scope.categories = data;
        });
        Review.query().$promise.then((data)=>{
            $scope.reviews = data;
        });
        Reservation.query().$promise.then((data)=>{
            $scope.reservations = data;
        });
        Scenario.query().$promise.then((data)=>{
            $scope.scenarios = data;
        });


    }
    ControllerFN.$inject = ['$scope','User','Skill','Category','Review','Reservation','Scenario','Session','$state'];
    angular.module('app').controller('DashboardController', ControllerFN);
})(angular);