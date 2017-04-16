(function (angular) {
    'user strict';
    
    function configFN($stateProvider,$urlRouterProvider,$locationProvider,$httpProvider, jwtOptionsProvider,FacebookProvider,$provide) {
        /*$provide.decorator('$sniffer', function($delegate) {
            $delegate.history = false;
            return $delegate;
        });*/
        jwtOptionsProvider.config({
            tokenGetter: [function() {
                return sessionStorage.token;
            }]
        });
        $httpProvider.interceptors.push('jwtInterceptor');
        var indexState = {
            name: 'index'
            , templateUrl: 'index/index.view.html'
            , controller : 'IndexController'
        }
        var index2State = {
            name: 'index2'
            , templateUrl: 'index2/index22.view.html'
            , controller : 'Index2Controller'
        }
        var loginState = {
            name: 'login'
            , url: '/login/'
            , parent : indexState
            , templateUrl: 'login/login2.view.html'
            , controller : 'LoginController'
        }
        var registerState = {
            name: 'register'
            , url: '/register/'
            , parent : indexState
            , templateUrl: 'login/register2.view.html'
            , controller : 'RegisterController'
        }
        var homeState = {
            name: 'home'
            , url: '/home/'
            , parent : index2State
            , templateUrl: 'home/home2.view.html'
            , controller : 'HomeController'
        }
        var profileState = {
            name: 'profile'
            , url: '/profile/'
            , parent : index2State
            , templateUrl: 'profile/profile2.view.html'
            , controller: 'ProfileController'
        }
        var editProfileState = {
            name: 'editProfile'
            , url: '/edit-profile/'
            , parent : index2State
            , templateUrl: 'profile/edit-profile.view.html'
            , controller : 'EditProfileController'
        }
        var reservationState = {
            name: 'reservations'
            , url: '/reservations/'
            , parent : index2State
            , templateUrl: 'reservation/reservation.view.html'
            , controller: 'ReservationController'
        }
        var reservationDetailsState = {
            name: 'reservationDetails'
            , url: '/reservation-details/:id'
            , parent : index2State
            , templateUrl: 'reservation/reservation-details.view.html'
            , controller: 'ReservationDetailsController'
        }
        var scenarioState = {
            name: 'scenario',
            url: '/scenario/:id',
            parent: index2State,
            templateUrl: 'scenario/scenario.view.html',
            controller: 'ScenarioController'
        }
        var reservationScenarioState = {
            name: 'reservationScenario',
            url: '/reservation-scenario/:idReservation/:idScenario',
            parent : index2State,
            templateUrl: 'scenario/reservation-scenario.view.html',
            controller: 'ReservationScenarioController'
        }
        var cartState = {
            name: 'cart',
            url: '/cart/',
            parent : index2State,
            templateUrl: 'cart/cart.view.html',
            controller: 'CartController'
        }
        var logOutState = {
            name: 'logOut',
            url: '/logout/',
            templateUrl: 'login/login2.view.html',
            controller: 'LogoutController'
        }

        $stateProvider.state(indexState);
        $stateProvider.state(index2State);
        $stateProvider.state(loginState);
        $stateProvider.state(logOutState);
        $stateProvider.state(registerState);
        $stateProvider.state(homeState);
        $stateProvider.state(profileState);
        $stateProvider.state(editProfileState);
        $stateProvider.state(reservationState);
        $stateProvider.state(reservationDetailsState);
        $stateProvider.state(scenarioState);
        $stateProvider.state(reservationScenarioState);
        $stateProvider.state(cartState);
        $urlRouterProvider.otherwise('/home/');
        $locationProvider.html5Mode(true);
            //.hashPrefix('!');
        FacebookProvider.init('228029894268796');
    }
    configFN.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider','$httpProvider', 'jwtOptionsProvider','FacebookProvider','$provide'];
    angular.module('app',['ui.router','duScroll','ngResource','angularLoad','angular-jwt','yaru22.angular-timeago','ngMap','facebook','angularFileUpload','cgBusy','angular.filter'
    ]).config(configFN);
}
)(angular);