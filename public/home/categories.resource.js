(function (angular) {
    'use strict';

    function FN($resource) {
        //URL of the API
        var url = "api/category/:id";
        var params = {
            id: "@_id"
        };
        var customMethods = {
        };
        var Rest = $resource(url, params, customMethods);
        return Rest;
    }
    FN.$inject = ["$resource"];
    angular.module("app").factory('Category', FN);
})(angular);