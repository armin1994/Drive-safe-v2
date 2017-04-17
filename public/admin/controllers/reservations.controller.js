(function (angular) {
    'use strict';
    function ControllerFN($scope,Reservation,Session,$state) {

        $scope.reservations = [];

        Reservation.query().$promise.then((data)=>{
            $scope.reservations = data;
        });

        $scope.remove = (id)=>{
            var temp = new Reservation({_id:id});
            temp.$remove().then((data)=>{
                var index = $scope.reservations.map(x=>x._id).indexOf(id);
                $scope.reservations.splice(index,1);
            });
        }





    }
    ControllerFN.$inject = ['$scope','Reservation','Session','$state'];
    angular.module('app').controller('ReservationsController', ControllerFN);
})(angular);