(function (angular) {
        'user strict';

        function configFN($httpProvider, jwtOptionsProvider) {
            jwtOptionsProvider.config({
                tokenGetter: [function() {
                    return localStorage.getItem('id_token');
                }]
            });
            $httpProvider.interceptors.push('jwtInterceptor');
        }
        configFN.$inject = ['$httpProvider', 'jwtOptionsProvider'];
        angular.module('app',['angular-jwt']).config(configFN);

    }
)(angular);