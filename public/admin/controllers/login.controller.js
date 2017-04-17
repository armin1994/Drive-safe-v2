(function (angular) {
    'use strict';
    function ControllerFN($scope,User,Session,$state) {
        $scope.user = {};
        $scope.users = {};

        User.query().$promise.then((data)=>{
            $scope.users = data;
        });

        $scope.remove = (id)=>{
            var temp = new User({_id:id});
            temp.$remove().then((data)=>{
                var index = $scope.users.map(x=>x._id).indexOf(id);
                $scope.users.splice(index,1);
            });
        }
        $scope.login = function(){

            var user = new User($scope.user);

            user.$login().then(function (data) {
                if (data.status) {
                    Session.save(data.user);
                    Session.saveToken(data.token);
                    $state.go('dashboard');
                }
                else {
                    $scope.user = {};
                }
            });
        }
    }
    ControllerFN.$inject = ['$scope','User','Session','$state'];
    angular.module('app').controller('LoginController', ControllerFN);
})(angular);