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
                console.log("profile");
            }).then((error) => {
                return error;
            });

            this.user = {
                firstname: 'Olivier',
                lastname: 'ROZAN',
                address: '16 rue des Aubépines',
                cp: '59121',
                ville: 'Haulchin',
                tel: '07.77.22.21.05',
                email: 'rozan.olivier@gmail.com',
                vehicle: 'Renault Twingo',
                nbPlaces: 4
            };
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
