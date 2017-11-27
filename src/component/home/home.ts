import * as angular from 'angular';

angular.module('app', ['ngCookies']);

angular.module('main').component('home', {
    template: require('./home.html'),
    bindings: {

    },
    controller: class HomeCtrl {

        constructor(private $http: ng.IHttpService, private $state, private $cookies) {
            this.$http.get('http://localhost:9300/home').then((response) => {
                console.log("home", this.$cookies.getAll());
            }).then((error) => {
                return error;
            });
        }

        public logout() {
            this.$http.get('http://localhost:9300/logout').then((response) => {
                console.log("BYEBYE");
                this.$state.go('signup');
            }).then((error) => {
                return error;
            });
        }
    },
    controllerAs: 'homeCtrl'
});
