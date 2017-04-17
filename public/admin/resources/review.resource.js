(function (angular) {
    'use strict';

    function reviewFN($resource) {
        //URL of the API
        var url = "https://drive-safe-app-v2.herokuapp.com/api/review/:id";
        var params = {
            id: "@_id"
        };
        var customMethods = {
            'update': {
                method: "PUT"
            }
        };
        var Review = $resource(url, params, customMethods);
        return Review;
    }
    reviewFN.$inject = ['$resource'];
    angular.module('app').factory('Review', reviewFN);
})(angular);