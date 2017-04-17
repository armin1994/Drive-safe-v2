(function (angular) {
    'use strict';

    function categoryFN($resource) {
        //URL of the API
        var url = "https://drive-safe-app-v2.herokuapp.com/api/category/:id";
        var params = {
            id: "@_id"
        };
        var customMethods = {
            'update': {
                method: "PUT"
            }
        };
        var Category = $resource(url, params, customMethods);
        return Category;
    }
    categoryFN.$inject = ['$resource'];
    angular.module('app').factory('Category', categoryFN);
})(angular);