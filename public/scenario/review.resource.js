(function (angular) {
    'use strict';

    function FN($resource) {
        //URL of the API
        var url = "api/review/:id";
        var params = {
            id: "@_id"
        };
        var customMethods = {
            'getReviews': {
                method: "GET",
                url: "api/review/:id",
                isArray : true
            }
        };
        var Rest = $resource(url, params, customMethods);
        return Rest;
    }
    FN.$inject = ["$resource"];
    angular.module("app").factory('Review', FN);
})(angular);