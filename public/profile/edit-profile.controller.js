(function (angular) {
    'use strict';
    function ControllerFN($scope, $state, User, Session, FileUploader) {
        var newImage = false;
        $scope.uploader = new FileUploader({
            url: '/api/upload',
            onSuccessItem: function (item, response, status, headers) {
                $scope.user.image = response.name;
                edit();
            },
            onErrorItem : function (item, response, status, headers) {
                var message = "Error unsupported file try again"
                demo.showNotification('top','center',message,4,0);
            },
            headers: {
                Authorization: 'Bearer ' + sessionStorage.token
            }
        });
        //console.log(sessionStorage.token)
        $scope.user = angular.copy(Session.get());
        $scope.password = "";
        $scope.submit = () => {
            if ($scope.uploader.queue.length>0){
                $scope.uploader.queue[$scope.uploader.queue.length-1].upload();
            }
            else
                edit();
            }
        $scope.resetImage = function(){
            $scope.uploader.clearQueue();
        };
        var edit = function(){
            if ($scope.password == "")
                delete $scope.user.password;
            else
                $scope.user.password = $scope.password;
            var temp = new User($scope.user);
            temp.$update().then((data) => {
                demo.showSwal('success-edit-profile');
                Session.save($scope.user);
                $state.go('profile');
            });
        }
    }

    ControllerFN.$inject = ['$scope', '$state', 'User', 'Session', 'FileUploader'];
    angular.module('app').controller('EditProfileController', ControllerFN);
})(angular);