(function (angular) {
    'use strict';

    function userFN($resource) {
        //URL of the API
        var url = "api/user/:id";
        var params = {
            id: "@_id"
        };
        var customMethods = {
            'update': {
                method: "PUT"
            }
            , 'login': {
                method: "POST"
                , params: {
                    id: "login"
                }
            }
            , 'register': {
                method: "POST"
                , params: {
                    id: "register"
                }
            }
            ,'fb': {
                method: "GET",
                url: "api/user/fb/:id"
            }
        };
        var User = $resource(url, params, customMethods);
        return User;
    }
    userFN.$inject = ["$resource"];
    angular.module("app").factory('User', userFN);
})(angular);