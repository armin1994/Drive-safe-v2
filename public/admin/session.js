(function (angular) {
    'user strict';
    angular.module('app').factory('Session', function ($rootScope) {
        return {
            save: function (data) {
                sessionStorage.adminuser = JSON.stringify(data);
            }
            , saveToken: function (data) {
                sessionStorage.token = data;
            }
            , get: function () {
                var user = JSON.parse(sessionStorage.adminuser);
                return user;
            }
            , isLoggedIn: function () {
                return (sessionStorage.adminuser) ? sessionStorage.adminuser : false;
            }
            , destroy: function () {
                delete sessionStorage.adminuser;
                delete sessionStorage.token;
                console.log("destroy");
            }
        };
    });
})(angular);
