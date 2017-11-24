import * as angular from 'angular';

angular.module('main').directive('signupValidator', [() => {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: link
    };

    function link(scope, element, attrs, ctrl) {
        function validator(ngModelValue) {

            if (ngModelValue === attrs.ref) {
                ctrl.$setValidity('diff', true);
            } else {
                ctrl.$setValidity('diff', false);
            }

            return ngModelValue;
        }

        ctrl.$parsers.push(validator);
    }
}]);