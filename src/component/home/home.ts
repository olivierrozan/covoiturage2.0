import * as angular from 'angular';



angular.module('main').component('home', {
    template: require('./home.html'),
    bindings: {

    },
    controller: class HomeCtrl {

        constructor(private $http: ng.IHttpService, private $state) {

        }

        public logout() {
            this.$http.get('http://localhost:9200/logout').then((response) => {
                this.$state.go('/signup');
            }).then((error) => {
                return error;
            });
        }
    },
    controllerAs: 'homeCtrl'
});
