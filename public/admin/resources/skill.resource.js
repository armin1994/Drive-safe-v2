(function (angular) {
    'use strict';

    function skillFN($resource) {
        //URL of the API
        var url = "https://drive-safe-app-v2.herokuapp.com/api/skill/:id";
        var params = {
            id: "@_id"
        };
        var customMethods = {
            'update': {
                method: "PUT"
            }
        };
        var Skill = $resource(url, params, customMethods);
        return Skill;
    }
    skillFN.$inject = ['$resource'];
    angular.module('app').factory('Skill', skillFN);
})(angular);