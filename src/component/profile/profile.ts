import * as angular from 'angular';

angular.module('app', ['ngCookies']);

angular.module('main').component('profile', {
    template: require('./profile.html'),
    bindings: {

    },
    controller: class ProfileCtrl {

        private user;

        constructor(private $http: ng.IHttpService, private $state, private $mdDialog) {
            this.$http.get('http://localhost:9300/profile').then((response) => {
                this.user = response.data['user'];
            }).then((error) => {
                return error;
            });
        }

        public showPasswordDialog(ev) {
            this.$mdDialog.show({
                templateUrl: './src/component/profile/passwordChange.html',
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
