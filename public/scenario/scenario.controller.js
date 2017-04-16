(function (angular) {
    'use strict';
    function ControllerFN($scope,$rootScope,$state,Scenario,Review,Session) {
        $scope.scenario = {};
        $scope.reviews = [];
        $scope.newReview = {};
        $scope.newReview.rate = true;
        $scope.promise = [];
        $scope.promise[0] = Scenario.get({id:$state.params.id}).$promise.then((data)=>{
            $scope.scenario = data;
            $scope.promise[2] = Review.getReviews({id:data._id}).$promise.then((data)=>{
                $scope.reviews = data;
            });
        });
        $scope.promise[1] = Scenario.getRate({id:$state.params.id}).$promise.then((data)=>{
            $scope.rate = data.rate;
        });
        $scope.submitReview = ()=>{
            $scope.newReview.user = Session.get()._id;
            $scope.newReview.scenario = $scope.scenario._id;
            $scope.newReview.date = new Date();
            var temp = new Review($scope.newReview);
            temp.$save().then((data)=>{
                demo.showSwal('success-review');
                $scope.newReview.user = Session.get();
                $scope.reviews.push(angular.copy($scope.newReview));
                $scope.newReview = {};
                $scope.newReview.rate = true;
            });
        }
        $scope.addToCart= ()=>{
            demo.showSwal('success-add-to-cart');
            $rootScope.cart.push($scope.scenario);
            Session.saveCart($rootScope.cart);
        }
        $scope.contains = ()=>{
            return !Session.getCart().map(s=>s._id).includes($state.params.id);
        }
    }
    ControllerFN.$inject = ['$scope','$rootScope','$state','Scenario','Review','Session'];
    angular.module('app').controller('ScenarioController', ControllerFN);
})(angular);