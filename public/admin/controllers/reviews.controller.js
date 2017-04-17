(function (angular) {
    'use strict';
    function ControllerFN($scope,Review,Session,$state) {
        $scope.reviews = [];

        Review.query().$promise.then((data)=>{
            $scope.reviews = data;
        });

        $scope.remove = (id)=>{
            var temp = new Review({_id:id});
            temp.$remove().then((data)=>{
                var index = $scope.reviews.map(x=>x._id).indexOf(id);
                $scope.reviews.splice(index,1);
            });
        }


    }
    ControllerFN.$inject = ['$scope','Review','Session','$state'];
    angular.module('app').controller('ReviewsController', ControllerFN);
})(angular);