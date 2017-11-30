import * as angular from 'angular';

angular.module('app', ['ngCookies']);

angular.module('main').component('profile', {
    template: require('./profile.html'),
    bindings: {

    },
    controller: class ProfileCtrl {

        constructor(private $http: ng.IHttpService, private $state, private $cookies) {
            this.$http.get('http://localhost:9300/profile').then((response) => {
                console.log("profile", this.$cookies.getAll());
            }).then((error) => {
                return error;
            });
        }

        public logout() {
            this.$http.get('http://localhost:9300/logout').then((response) => {
                console.log("BYEBYE");
                this.$state.go('register');
            }).then((error) => {
                return error;
            });
        }
    },
    controllerAs: 'profileCtrl'
});
