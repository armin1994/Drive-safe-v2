(function (angular) {
    'use strict';
    function loginControllerFN($scope, $rootScope, User, $state, Session, Scenario, Reservation, Facebook) {
        $scope.user = {};
        $scope.getLoginStatus = function () {
            Facebook.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    fetch();
                } else {
                    login();
                }
            });
        };
        var login = function () {
            // From now on you can use the Facebook service just as Facebook api says
            Facebook.login(function (response) {
                fetch();
            });
        };
        var fetch = function () {
            $scope.promise = [];
            $scope.promise[0] = Facebook.api('/me', {fields: 'first_name,last_name,picture'}, function (response) {
                if(!response.error){
                $scope.promise[1] = User.fb({id: response.id}).$promise.then((data) => {
                    if (!data.status) {
                        var temp = new User();
                        temp.fb_id = response.id;
                        temp.first_name = response.first_name;
                        temp.last_name = response.last_name;
                        temp.image = response.picture.data.url;
                        $scope.promise[2] = temp.$register().then((d) => {
                            if (d.status) {
                                $scope.promise[3] = User.fb({id: d.data.fb_id}).$promise.then((data) => {
                                    Session.save(data.user);
                                    Session.saveToken(data.token);
                                    $rootScope.cart = [];
                                    Session.saveCart([]);
                                    $scope.promise[4] = Reservation.getReservations({id: data.user._id}).$promise.then((d) => {
                                        Session.saveReservations(d);
                                        $state.go('home');
                                    });
                                })
                            }
                            else {
                                var message = "Error there is a problem !!"
                                demo.showNotification('top', 'center', message, 4, 0);
                            }
                        });
                    } else {
                        Session.save(data.user);
                        Session.saveToken(data.token);
                        $rootScope.cart = [];
                        Session.saveCart([]);
                        Reservation.getReservations({id: data.user._id}).$promise.then((d) => {
                            Session.saveReservations(d);
                            $state.go('home');
                        });
                    }
                });
                }
                //$scope.user = response;
            });
        };
        $scope.login = function () {
            var temp = new User($scope.user);
            temp.$login().then(function (data) {
                if (data.status) {
                    Session.save(data.user);
                    Session.saveToken(data.token);
                    $rootScope.cart = [];
                    Session.saveCart([]);
                    Reservation.getReservations({id: $scope.user._id}).$promise.then((data) => {
                        Session.saveReservations(data);
                        $state.go('home', {}, {reload: true});
                    });
                }
                else {
                    var message = "Error wrong login/password combination !!"
                    demo.showNotification('top', 'center', message, 4, 0);
                    $scope.user = {};
                }

            })
        };
    }

    loginControllerFN.$inject = ['$scope', '$rootScope', 'User', '$state', 'Session', 'Scenario', 'Reservation','Facebook'];
    angular.module('app').controller('LoginController', loginControllerFN);
})(angular);