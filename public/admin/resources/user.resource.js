(function (angular) {
    'use strict';

    function userFN($resource) {
        //URL of the API
        var url = "https://drive-safe-app-v2.herokuapp.com/api/user/:id";
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
                url: "https://drive-safe-app-v2.herokuapp.com/api/user/fb/:id"
            }
        };
        var User = $resource(url, params, customMethods);
        return User;
    }
    userFN.$inject = ['$resource'];
    angular.module('app').factory('User', userFN);
})(angular);