(function (angular) {
    'use strict';
    function ControllerFN($scope, $state, Session,Reservation,Scenario) {
        $scope.reservations = Session.getReservations();
        $scope.reservation = $scope.reservations[$state.params.idReservation];
        $scope.scenarioReservation = $scope.reservation.scenarios[$state.params.idScenario];
        Scenario.getRate({id:$scope.scenarioReservation.scenario._id}).$promise.then((data)=>{
            $scope.rate = data.rate;
        });
        $scope.remove = ()=>{
            var index = $scope.reservation.scenarios.map(x=>x._id).indexOf($scope.scenarioReservation._id);
            $scope.reservation.scenarios.splice(index,1);
            var temp = new Reservation($scope.reservation);
            temp.$update().then((data)=>{
                demo.showSwal('success-remove-from-reservation');
                Session.saveReservations($scope.reservations);
                $state.go('reservationDetails',{id:$state.params.idReservation});
            });
        }
    }
    ControllerFN.$inject = ['$scope','$state','Session','Reservation','Scenario'];
    angular.module('app').controller('ReservationScenarioController', ControllerFN);
})(angular);