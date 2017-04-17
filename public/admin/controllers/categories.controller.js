(function (angular) {
    'use strict';
    function ControllerFN($scope,Category,Session,$state) {
        $scope.addcategory = {};
        $scope.aditcategory = {};

        $scope.categorys = [];

        Category.query().$promise.then((data)=>{
            $scope.categorys = data;
        });

        $scope.remove = (id)=>{
            var temp = new Category({_id:id});
            temp.$remove().then((data)=>{
                var index = $scope.categorys.map(x=>x._id).indexOf(id);
                $scope.categorys.splice(index,1);
            });
        }

		$scope.add = function(){
            var temp = new Category($scope.addcategory);
            temp.$save().then((data)=>{
                $scope.categorys.push(data);
                console.log(data);
                $('#addModal').modal('toggle');
            })
		}

		$scope.fillmodal = function(data){
		    $scope.editcategory = angular.copy(data);
        }

        $scope.edit = function(){
            var temp = new Category($scope.editcategory);
            temp.$update().then((data)=>{
                var index = $scope.categorys.map(x=>x._id).indexOf(temp._id);
                $scope.categorys.splice(index,1,$scope.editcategory);
                $('#editModal').modal('toggle');
            })

        }
    }
    ControllerFN.$inject = ['$scope','Category','Session','$state'];
    angular.module('app').controller('CategoriesController', ControllerFN);
})(angular);