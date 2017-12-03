import * as angular from 'angular';

angular.module('app', ['ngCookies']);

angular.module('main').component('profile', {
    template: require('./profile.html'),
    bindings: {

    },
    controller: class ProfileCtrl {

        private user;

        constructor(private $http: ng.IHttpService, private $state, private $mdDialog, private $scope: ng.IScope, private $mdToast) {
            this.$http.get('http://localhost:9300/profile').then((response) => {
                this.user = response.data['user'];
            }).then((error) => {
                return error;
            });
        }

        public showPasswordDialog(ev) {
            this.$mdDialog.show({
                templateUrl: './src/component/profile/passwordChange.html',
                controller: ProfileCtrl,
                controllerAs: 'profileCtrl',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
                .then(function (answer) {
                    console.log('You said the information was "' + answer + '".');
                }, function () {
                    console.log('You cancelled the dialog.');
                });
        };

        public validatePasswordChange() {
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            this.$http.post('http://localhost:9300/changePassword', { password: this.user.newPassword }, config).then((response) => {

                this.$mdToast.show(
                    this.$mdToast.simple()
                        .textContent("Mot de passe modifié !")
                        .position('bottom left')
                        .hideDelay(3000)
                );

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
