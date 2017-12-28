import * as angular from 'angular';

export class ProfileService {
    
    public user;
    
    constructor(private $http: ng.IHttpService, private $mdDialog) {

    }
    
    public getUserProfile() {
        return this.$http.get('http://localhost:9300/profile').then((response) => {
            this.user = response.data['user'];
            console.log('service', this.user);
            return this.user;
        }).then((error) => {
            return error;
        });
    }

    public updateUserProfile(user, config) {
        return this.$http.post('http://localhost:9300/updateProfile', user, config).then((response) => {
            // this.$mdDialog.hide();
            return response.data['message'];
        }).then((error) => {
            return error;
        });
    }

    public updatePassword(user, config) {
        return this.$http.post('http://localhost:9300/changePassword', {
            currentPassword: user.currentPassword,
            newPassword: user.newPassword
        }, config).then((response) => {
            return response.data['message'];
        }).then((error) => {
            return error;
        });
    }
}

angular.module('main').service('ProfileService',ProfileService);