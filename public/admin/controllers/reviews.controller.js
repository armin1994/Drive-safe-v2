(function (angular) {
    'use strict';
    function ControllerFN($scope,User,Scenario,Review,Session,$state) {
        $scope.addreview = {};
        $scope.aditreview = {};
        
        $scope.reviews = [];
        $scope.users = [];
        $scope.scenarios = [];


        Review.query().$promise.then((data)=>{
            $scope.reviews = data;
            console.log(data);

        });
        
        User.query().$promise.then((data)=>{
            $scope.users = data;
        });

        Scenario.query().$promise.then((data)=>{
            $scope.scenarios = data;
        });

        $scope.remove = (id)=>{
            var temp = new Review({_id:id});
            temp.$remove().then((data)=>{
                var index = $scope.reviews.map(x=>x._id).indexOf(id);
                $scope.reviews.splice(index,1);
            });
        }
        
        $scope.add = function(){
            var temp = new Review($scope.addreview);
            temp.$save().then((data)=>{
                data.user = $scope.users[($scope.users.map(x=>x._id).indexOf(data.user))];
                data.scenario = $scope.scenarios[($scope.scenarios.map(x=>x._id).indexOf(data.scenario))];
                $scope.reviews.push(data);

                $('#addModal').modal('toggle');
            })
		}
        
        $scope.fillmodal = function(data){
		    $scope.editreview = angular.copy(data);
            console.log($scope.editreview.rate);
        }

        $scope.edit = function(){
            var temp = new Review($scope.editreview);
            temp.$update().then((data)=>{
                var index = $scope.reviews.map(x=>x._id).indexOf(temp._id);
                /*data.user = $scope.users[($scope.users.map(x=>x._id).indexOf(data.user))];
                data.scenario = $scope.scenarios[($scope.scenarios.map(x=>x._id).indexOf(data.scenario))];*/
                $scope.reviews.splice(index,1,$scope.editreview);
                $('#editModal').modal('toggle');
            })
        }

    }
    ControllerFN.$inject = ['$scope','User','Scenario','Review','Session','$state'];
    angular.module('app').controller('ReviewsController', ControllerFN);
})(angular);
