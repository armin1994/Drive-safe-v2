(function(angular) {
    'use strict';
    function configFN($stateProvider,$urlRouterProvider,$locationProvider,jwtOptionsProvider,$httpProvider) {




        jwtOptionsProvider.config({
            whiteListedDomains: ['drive-safe-app-v2.herokuapp.com'],
            tokenGetter: [function() {

                return sessionStorage.token;
            }]
        });
        $httpProvider.interceptors.push('jwtInterceptor');


        var loginState = {
            name: 'login',
            url: '/login',
            templateUrl: './views/login.html',
            controller: 'LoginController'
        }

        var dashboardState = {
            name: 'dashboard',
            url: '/dashboard',
            templateUrl: './views/dashboard.html',
            controller: 'DashboardController'
        }

        var usersState = {
            name: 'users',
            url: '/users',
            templateUrl: './views/manage_users.html',
            controller: 'LoginController'
        }
        var reviewsState = {
            name: 'reviews',
            url: '/reviews',
            templateUrl: './views/manage_reviews.html',
            controller: 'ReviewsController'
        }

        var skillsState = {
            name: 'skills',
            url: '/skills',
            templateUrl: './views/manage_skills.html',
            controller: 'SkillsController'
        }

        var scenariosState = {
            name: 'scenarios',
            url: '/scenarios',
            templateUrl: './views/manage_scenarios.html',
            controller: 'ScenariosController'
        }

        var categoriesState = {
            name: 'categories',
            url: '/categories',
            templateUrl: './views/manage_categories.html',
            controller: 'CategoriesController'
        }

        var reservationsState = {
            name: 'reservations',
            url: '/reservations',
            templateUrl: './views/manage_reservations.html',
            controller: 'ReservationsController'
        }





        $stateProvider.state(loginState);
        $stateProvider.state(dashboardState);
        $stateProvider.state(usersState);
        $stateProvider.state(reviewsState);
        $stateProvider.state(skillsState);
        $stateProvider.state(scenariosState);
        $stateProvider.state(categoriesState);
        $stateProvider.state(reservationsState);
        $urlRouterProvider.otherwise('/login');

    }
    configFN.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider','jwtOptionsProvider','$httpProvider'];
    angular.module('app', ['ui.router','ngResource','angular-jwt','yaru22.angular-timeago','angularFileUpload']).config(configFN);
})(angular);
