(function (angular) {
    'use strict';
    function ControllerFN($scope,Skill,Category,Scenario,Session,$state,FileUploader) {

        $scope.uploader = new FileUploader({
            url: '../api/upload',
            onSuccessItem: function (item, response, status, headers) {
                $scope.addscenario.image = response.name;
                console.log(response.name);
                add();
            },
            onErrorItem : function (item, response, status, headers) {
                var message = "Error unsupported file try again"
                demo.showNotification('top','center',message,4,0);
            },
            headers: {
                Authorization: 'Bearer ' + sessionStorage.token
            }
        });

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

		var add = function(){

                var temp = new Scenario($scope.addscenario);
                temp.$save().then((data)=>{
                    data.category = $scope.categories[($scope.categories.map(x=>x._id).indexOf(data.category))];
                    $scope.scenarios.push(data);

                    $('#addModal').modal('toggle');
                })


		}
        $scope.submit = () => {
            if ($scope.uploader.queue.length>0){
                $scope.uploader.queue[$scope.uploader.queue.length-1].upload();
            }
            else
                add();
        }

    }
    ControllerFN.$inject = ['$scope','Skill','Category','Scenario','Session','$state','FileUploader'];
    angular.module('app').controller('ScenariosController', ControllerFN);
})(angular);