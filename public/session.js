(function (angular) {
        'user strict';
        angular.module('app').factory('Session', function ($rootScope) {
            return {
                save: function (data) {
                    sessionStorage.user = JSON.stringify(data);
                }
                , saveToken: function (data) {
                    sessionStorage.token = data;
                }
                , saveCart: function(data){
                    sessionStorage.cart = JSON.stringify(data);
                    $rootScope.cart = data;
                }
                , saveReservations: function(data){
                    sessionStorage.reservations = JSON.stringify(data);
                }
                , get: function () {
                    var user = JSON.parse(sessionStorage.user);
                    return user;
                }
                , getCart: function(){
                    var cart = JSON.parse(sessionStorage.cart);
                    return cart;
                }
                , getReservations: function(){
                    var reservations = JSON.parse(sessionStorage.reservations);
                    return reservations;
                }

                , isLoggedIn: function () {
                    return (sessionStorage.user) ? sessionStorage.user : false;
                }
                , destroy: function () {
                    delete sessionStorage.user;
                    delete sessionStorage.token;
                    delete sessionStorage.cart;
                    delete sessionStorage.reservations;
                    console.log("destroy");
                }
            };
        });
    })(angular);
