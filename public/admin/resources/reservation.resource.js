(function (angular) {
    'use strict';

    function reservationFN($resource) {
        //URL of the API
        var url = "https://drive-safe-app-v2.herokuapp.com/api/reservation/:id";
        var params = {
            id: "@_id"
        };
        var customMethods = {
            'update': {
                method: "PUT"
            }
        };
        var Reservation = $resource(url, params, customMethods);
        return Reservation;
    }
    reservationFN.$inject = ['$resource'];
    angular.module('app').factory('Reservation', reservationFN);
})(angular);