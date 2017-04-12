(function (angular) {
    'use strict';
    function ControllerFN($scope, $state, Session,Reservation) {
        $scope.user = Session.get();
        $scope.reservations = [];
        $scope.promise = Reservation.getReservations({id:$scope.user._id}).$promise.then((data)=>{
            $scope.reservations = data;
            Session.saveReservations(data);
        });
        $scope.remove = (id)=>{
            var temp = new Reservation({_id:id});
            temp.$remove().then((data)=>{
                demo.showSwal('success-remove-reservation');
                var index = $scope.reservations.map(x=>x._id).indexOf(id);
                $scope.reservations.splice(index,1);
            });
        }
    }
    ControllerFN.$inject = ['$scope','$state','Session','Reservation'];
    angular.module('app').controller('ReservationController', ControllerFN);
})(angular);