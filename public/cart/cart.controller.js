(function (angular) {
    'use strict';

    function ControllerFn($scope,$rootScope,Session,Reservation,$state,NgMap,$timeout) {
        $scope.cart = [];
        $scope.cart = Session.getCart();
        $scope.reservation = {};
        $scope.reservation.date = new Date();
        $scope.reservation.scenarios = [];
        $scope.submitReservation = ()=>{
            $scope.cart.forEach(x=>{
                $scope.reservation.scenarios.push({scenario:x})
            });
            $scope.reservation.user = Session.get();
            var temp = new Reservation($scope.reservation);
            temp.$save().then((data)=>{
                demo.showSwal('success-reservation');
                $rootScope.cart = [];
                Session.saveCart([]);
                $state.go('home');
            })
        }
        demo.initMaterialWizard();
        jQuery('.datetimepicker').datetimepicker({
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove',
                inline: true
            }
        });
        $scope.remove = (id)=>{
            demo.showSwal('success-remove-from-cart');
            var index = $scope.cart.map(x=>x._id).indexOf(id);
            $scope.cart.splice(index,1);
            $rootScope.cart = $scope.cart;
            Session.saveCart($scope.cart);
        }
        $scope.callback = ()=>{
            $timeout(function() {
                NgMap.getMap({id:'mainMap'}).then(function(response) {
                    google.maps.event.trigger(response, 'resize');
                });
            }, 200);
        }


    }
    ControllerFn.$inject = ['$scope','$rootScope','Session','Reservation','$state','NgMap','$timeout'];
    angular.module("app").controller("CartController", ControllerFn);
})(angular);