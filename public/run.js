(function (angular) {
    'use strict';
    //cute is the name of the directive and the HTML you need to write : <cute></cute>
    angular.module('app').run(['$rootScope', 'Session', '$state', function ($rootScope, Session, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            $rootScope.current = toState.name;
            if (!(toState.name == 'login'|| toState.name == 'register')) {
                if (!Session.isLoggedIn()) {
                    event.preventDefault();
                    $state.go('login');
                }
            }

        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
            window.scrollTo(0, 0);
        });
    }]);
})(angular);