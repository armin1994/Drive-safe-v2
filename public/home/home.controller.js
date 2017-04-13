(function (angular) {
    'use strict';

    function ControllerFn($scope,$state,Session,Scenario,Category,angularLoad){

        $scope.checkboxFilter = {0:false,1:false,2:false};
        $scope.categoriesFilter = {};
        $scope.sortBy = 'difficulty';
        $scope.promiseCategories = Category.query().$promise.then((data)=>{
            $scope.categories = data;
        })
        $scope.promise = Scenario.query().$promise.then((data)=>{
            $scope.scenarios = data;
            $scope.filteredList = data;
            $scope.currentPage = 0;
            $scope.pageSize = 6;
            $scope.numberOfPages=function(){
                return new Array(Math.ceil($scope.filteredList.length/$scope.pageSize));
            }
        });
        $scope.change = (id)=>{
            $scope.currentPage = id;
        }
        $('#myselect').on('changed.bs.select',function(e){
            $scope.sortBy = $(this).selectpicker('val');
            $scope.$apply();
        });
        $scope.$watch("filteredList", function() {
            $scope.currentPage = 0;
        },true);
    }
    ControllerFn.$inject = ['$scope','$state','Session','Scenario','Category','angularLoad'];
    angular.module("app").controller("HomeController", ControllerFn);
})(angular);