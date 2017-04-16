(function (angular) {
    'use strict';

    function FN($resource) {
        //URL of the API
        var url = "api/scenario/:id";
        var params = {
            id: "@_id"
        };
        var customMethods = {
            'getRate': {
                method: "GET",
                url: "api/scenario/success-rate/:id"
            }
        };
        var Rest = $resource(url, params, customMethods);
        return Rest;
    }

    FN.$inject = ["$resource"];
    angular.module("app").factory('Scenario', FN);
})(angular);