angular.module('app')
    .directive('lazyLoad', function(angularLoad) {
        return function(scope, element, attrs) {
            if (scope.$last){
                $(".selectpicker").selectpicker();
                $.material.init();
                //$('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
            }
        };
    });