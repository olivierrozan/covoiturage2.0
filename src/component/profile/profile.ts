import * as angular from 'angular';

angular.module('app', ['ngCookies']);

angular.module('main').component('profile', {
    template: require('./profile.html'),
    bindings: {

    },
    controller: class ProfileCtrl {

        private user;
        
        constructor(private $http: ng.IHttpService, private $state, private $cookies) {
            this.$http.get('http://localhost:9300/profile').then((response) => {
                this.user = response.data['user'];
            }).then((error) => {
                return error;
            });
        }

        public edit() {
            console.log("ok");
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
