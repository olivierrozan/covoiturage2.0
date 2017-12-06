import * as angular from 'angular';

angular.module('app', ['ngCookies']);

angular.module('main').component('profile', {
    template: require('./profile.html'),
    bindings: {

    },
    controller: class ProfileCtrl {

        private user;
        private status: String;
        private config;

        constructor(private $http: ng.IHttpService, private $state, private $mdDialog, private $scope: ng.IScope, private $mdToast) {
            this.config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            this.displayProfile();
        }

        public displayProfile() {
            this.$http.get('http://localhost:9300/profile').then((response) => {
                this.user = response.data['user'];
                console.log('call');
            }).then((error) => {
                return error;
            });
        }

        public showUpdateProfileDialog(ev) {
            this.$mdDialog.show({
                templateUrl: './src/component/profile/updateProfile.html',
                bindToController:true,
                controller: ProfileCtrl,
                controllerAs: 'profileCtrl',
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

        public validateUpdateProfile() {
            
            this.$http.post('http://localhost:9300/updateProfile', this.user, this.config).then((response) => {
                this.status = response.data['message'];
                let message = '';
                if (this.status === 'success') {
                    message = 'Profil modifié !'
                    this.$mdDialog.hide();
                } else {
                    message = "Erreur: Le profil n'a pas été modifié !";
                }

                this.$mdToast.show(
                    this.$mdToast.simple()
                    .textContent(message)
                    .position('bottom left')
                    .hideDelay(3000)
                );
                
                this.$mdDialog.hide();
                
            }).then((error) => {
                return error;
            });
            this.$state.go('profile');
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
