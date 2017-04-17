(function (angular) {
    'use strict';
    function ControllerFN($scope,Skill,Session,$state) {
        $scope.addskill = {};
        $scope.aditskill = {};

        $scope.skills = [];

        Skill.query().$promise.then((data)=>{
            $scope.skills = data;
        });

        $scope.remove = (id)=>{
            var temp = new Skill({_id:id});
            temp.$remove().then((data)=>{
                var index = $scope.skills.map(x=>x._id).indexOf(id);
                $scope.skills.splice(index,1);
            });
        }

		$scope.add = function(){
            var temp = new Skill($scope.addskill);
            temp.$save().then((data)=>{
                $scope.skills.push(data);
                $('#addModal').modal('toggle');
            })
		}

		$scope.fillmodal = function(data){
		    $scope.editskill = angular.copy(data);
        }

        $scope.edit = function(){
            var temp = new Skill($scope.editskill);
            temp.$update().then((data)=>{
                var index = $scope.skills.map(x=>x._id).indexOf(temp._id);
                $scope.skills.splice(index,1,$scope.editskill);
                $('#editModal').modal('toggle');
            })

        }
    }
    ControllerFN.$inject = ['$scope','Skill','Session','$state'];
    angular.module('app').controller('SkillsController', ControllerFN);
})(angular);