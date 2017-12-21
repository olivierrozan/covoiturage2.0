'use strict';
import * as angular from 'angular';
import { ProfileService } from '../../service/profileService/profileService';

angular.module('app', ['ngCookies']);

angular.module('main').component('profile', {
    template: require('./profile.html'),
    bindings: {

    },
    controller: class ProfileCtrl {

        private user;
        private status: String;
        private config;

        constructor(private $http: ng.IHttpService, private $state, private $mdDialog, private $scope: ng.IScope, private $mdToast, private ProfileService: ProfileService) {
            this.config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            this.ProfileService.getUserProfile().then((response) => {
                this.user = response;
            });

            $state.go('profile.myoffers');
        }

        public showUpdateProfileDialog(ev) {
            this.$mdDialog.show({
                templateUrl: './src/component/profile/updateProfile.html',
                locals: { vm: this },
                controller: function UpdateProfileController(vm) {
                    this.user = vm.user;
                    vm.$scope.user = angular.copy(this.user);

                    this.validateUpdateProfile = () => {
                        vm.ProfileService.updateUserProfile(this.user, vm.config).then((response) => {
                            let message = '';

                            if (response === 'success') {
                                message = 'Profil modifié !'
                                vm.$mdDialog.hide();
                            } else {
                                message = "Erreur: Le profil n'a pas été modifié !";
                            }

                            vm.$mdToast.show(
                                vm.$mdToast.simple()
                                    .textContent(message)
                                    .position('bottom left')
                                    .hideDelay(3000)
                            );

                            vm.$state.go('profile.myoffers');
                        });
                    };

                    this.closeDialog = () => {
                        vm.$mdDialog.cancel();
                    }
                },
                controllerAs: 'updateProfileCtrl',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then((answer) => {
                console.log('User modifié !');
            }, (err) => {
                this.user = angular.copy(this.$scope.user);
                console.log('Modifications annulées.');
            });
        };

        public showPasswordDialog(ev) {
            this.$mdDialog.show({
                templateUrl: './src/component/profile/updatePassword.html',
                locals: { vm: this },
                controller: function UpdatePasswordCtrl(vm) {
                    this.user = vm.user;

                    this.validatePasswordChange = () => {
                        vm.ProfileService.updatePassword(this.user, vm.config).then((response) => {
                            let message = '';
                            console.log('update ', response);
                            if (response === 'success') {
                                message = 'Mot de passe modifié !'
                                vm.$mdDialog.hide();
                            } else {
                                message = "Erreur: Mot de passe incorrect !";
                            }

                            vm.$mdToast.show(
                                vm.$mdToast.simple()
                                    .textContent(message)
                                    .position('bottom left')
                                    .hideDelay(3000)
                            );

                            vm.$state.go('profile');
                        });
                    }

                    this.closeDialog = () => {
                        vm.$mdDialog.cancel();
                    }
                },
                controllerAs: 'updatePasswordCtrl',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then((answer) => {
                console.log('Mot de passe modifié !');
            }, (err) => {
                console.log('Changement de mot de passe annulé.');
            });
        };

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
