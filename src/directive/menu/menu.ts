import * as angular from 'angular';
import { SigninService } from '../../service/signin/signinService';

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
            email: 'rozan.oler@gmail.com',
            password: 'efficient'
        };

        this.result;

        this.signin = () => {
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
    
            $http.post('http://localhost:9300/connexion', this.user, config).then((response) => {
                if (response) {
                    $state.go('home');
                }
            }).then((error) => {
                return error;
            });
        }
    }
}]);
