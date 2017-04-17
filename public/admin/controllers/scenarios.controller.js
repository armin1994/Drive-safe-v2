(function (angular) {
    'use strict';
    function ControllerFN($scope,Skill,Category,Scenario,Session,$state) {
        $scope.addscenario = {};
        $scope.aditscenario = {};

        $scope.scenarios = [];
        $scope.skills = [];
        $scope.categories = [];

        Scenario.query().$promise.then((data)=>{
            $scope.scenarios = data;
        });

        Skill.query().$promise.then((data)=>{
            $scope.skills = data;
        });

        Category.query().$promise.then((data)=>{
            $scope.categories = data;
        });



        $scope.remove = (id)=>{
            var temp = new Scenario({_id:id});
            temp.$remove().then((data)=>{
                var index = $scope.scenarios.map(x=>x._id).indexOf(id);
                $scope.scenarios.splice(index,1);
            });
        }

		$scope.add = function(){
            var temp = new Scenario($scope.addscenario);
            temp.$save().then((data)=>{
                data.category = $scope.categories[($scope.categories.map(x=>x._id).indexOf(data.category))];
                $scope.scenarios.push(data);

                $('#addModal').modal('toggle');
            })
		}

    }
    ControllerFN.$inject = ['$scope','Skill','Category','Scenario','Session','$state'];
    angular.module('app').controller('ScenariosController', ControllerFN);
})(angular);