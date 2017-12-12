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

                            vm.$state.go('profile');
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
                console.log('Modifications annulées.');
            });
        };

        public showPasswordDialog(ev) {
            this.$mdDialog.show({
                templateUrl: './src/component/profile/updatePassword.html',
                controller: ProfileCtrl,
                controllerAs: 'profileCtrl',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then((answer) => {
                console.log('Mot de passe modifié !');
            }, (err) => {
                console.log('Changement de mot de passe annulé.');
            });
        };

        public validatePasswordChange() {
            this.$http.post('http://localhost:9300/changePassword', {
                currentPassword: this.user.currentPassword,
                newPassword: this.user.newPassword
            }, this.config).then((response) => {
                this.status = response.data['message'];
                let message = '';
                if (this.status === 'success') {
                    message = 'Mot de passe modifié !'
                    this.$mdDialog.hide();
                } else {
                    message = "Erreur: Mot de passe incorrect !";
                }

                this.$mdToast.show(
                    this.$mdToast.simple()
                        .textContent(message)
                        .position('bottom left')
                        .hideDelay(3000)
                );

            }).then((error) => {
                return error;
            });
        }

        public closeDialog() {
            this.$mdDialog.cancel();
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
