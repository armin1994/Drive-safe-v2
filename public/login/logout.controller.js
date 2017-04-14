(function (angular) {
    'use strict';
    function ControllerFN($scope,$rootScope,$state,Session) {
        Session.destroy();
        $('html').removeClass('nav-open');

        $('.close-layer').remove();
        setTimeout(function(){
            var $toggle = $('.navbar-toggle');
            $toggle.removeClass('toggled');
        }, 400);
        $state.go('login');
    }
    ControllerFN.$inject = ['$scope','$rootScope','$state','Session'];
    angular.module('app').controller('LogoutController', ControllerFN);
})(angular);