'use strict';

import * as angular from 'angular';

angular.module('main').component('signup', {
    template: require('./signup.html'),
    bindings: {

    },
    controller: class SignupCtrl {

        private user;
        private signupForm;
        
        constructor(private $http: ng.IHttpService, private $state) {
            this.user = {
                email: 'rozan.oler@gmail.com',
                password: 'efficient'
            };
        }

        public signup() {
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            
            this.$http.post('http://localhost:9300/signup', this.user, config).then((response) => {
                console.log("created, ", this.user);
            }).then((error) => {
                return error;
            });
        }
    },
    controllerAs: 'signupCtrl'
});
