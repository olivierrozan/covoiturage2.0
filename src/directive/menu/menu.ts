import * as angular from 'angular';
import { SigninService } from '../../service/signinService/signinService';

angular.module('main').directive('menu', [($http: ng.IHttpService, $state) => {
    return {
        restrict: 'E',
        replace: true,
        scope: {

        },
        template: require('./menu.html'),
        link: link,
        controller: Menu,
        controllerAs: 'signinCtrl'
    };

    function link(scope, element, attrs) {

    }

    function Menu($http, $state) {
        this.user = {
            email: 'AAA@gmail.com',
            password: 'olivier59121'
        };

        this.result;
        this.isAuth = true;

        if (this.isAuth) {
            $state.go('profile');
        }

        this.signin = () => {
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            $http.post('http://localhost:9300/connexion', this.user, config).then((response) => {
                console.log("signin: ", response);

                // if (response) {
                //     $state.go('profile');
                // }
            }).then((error) => {
                return error;
            });
        }
    }
}]);
