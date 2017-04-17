(function (angular) {
    'use strict';

    function scenarioFN($resource) {
        //URL of the API
        var url = "https://drive-safe-app-v2.herokuapp.com/api/scenario/:id";
        var params = {
            id: "@_id"
        };
        var customMethods = {
            'update': {
                method: "PUT"
            }
        };
        var Scenario = $resource(url, params, customMethods);
        return Scenario;
    }
    scenarioFN.$inject = ['$resource'];
    angular.module('app').factory('Scenario', scenarioFN);
})(angular);