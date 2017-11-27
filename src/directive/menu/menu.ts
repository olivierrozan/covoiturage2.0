import * as angular from 'angular';
import { LoginService } from '../../service/login/loginService';

/*class Menu {

    public user;

    constructor(private $http: ng.IHttpService, private loginService: LoginService, scope: ng.IScope, instanceElement: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, controller: {}, transclude: ng.ITranscludeFunction) {
        this.user = {
            email: 'rozan.olivier@gmail.com',
            password: 'OzTprP'
        };
    }

    public login() {
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        this.$http.get('http://localhost:9300/connexion').then((data) => {
            var response = data;
            console.log('HELLO: ', response);
            return response;
        }).then((error) => {
            return error;
        });

        console.log("LOGIN");
    }
}*/

angular.module('main').directive('menu', [($http: ng.IHttpService, $state) => {
    return {
        restrict: 'E',
        replace: true,
        scope: {

        },
        template: require('./menu.html'),
        link: link,
        controller: Menu,
        controllerAs: 'loginCtrl'
    };

    function link(scope, element, attrs) {

    }

    function Menu($http, $state) {
        this.user = {
            email: 'rozan.oler@gmail.com',
            password: 'efficient'
        };

        this.result;

        this.login = () => {
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
