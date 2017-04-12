angular.module('app')
    .directive('lazyLoad', function() {
        return function(scope, element, attrs) {
            if (scope.$last){
                $(".selectpicker").selectpicker();
                $.material.init();
            }
        };
    });