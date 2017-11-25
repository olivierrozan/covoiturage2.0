'use strict';

import * as angular from 'angular';

angular.module('main').component('signup', {
    template: require('./signup.html'),
    bindings: {

    },
    controller: class SignupCtrl {

        private user;
        private signupForm;
        private status;

        constructor(private $http: ng.IHttpService, private $state, private $mdToast) {
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
                this.status = response.data['message'];

                if (this.status === 'Created') {
                    this.$mdToast.show(
                        this.$mdToast.simple()
                            .textContent("Utilisateur créé ! Un mail vous est envoyé à l'adresse mail indiquée !")
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                } else {
                    this.$mdToast.show(
                        this.$mdToast.simple()
                            .textContent("Erreur ! L'utilisateur existe déjà !")
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                }
            }).then((error) => {
                return error;
            });
        }
    },
    controllerAs: 'signupCtrl'
});
