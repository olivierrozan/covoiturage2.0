'use strict';

import * as angular from 'angular';
import { RegisterService } from '../../service/registerService/registerService';

angular.module('main').component('register', {
    template: require('./register.html'),
    bindings: {

    },
    controller: class RegisterCtrl {

        private user;
        private registerForm;
        private response;

        constructor(private $mdToast, private RegisterService: RegisterService) {
            this.user = {
                email: 'rozan@gmail.com',
                password: 'userPWD59'
            };
        }

        public isFive(a, b) {
            return a + b === 5;
        };

        public register() {
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            this.RegisterService.sendRegisterData(this.user, config).then((response) => {
                console.log("response: ", response);

                if (response.data['message'] === 'Created') {
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
            });
        }
    },
    controllerAs: 'registerCtrl'
});
