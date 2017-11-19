import * as angular from 'angular';

export class LoginService {

    public login(user) {
        
        if (user.login === 'olivier' && user.pwd === 'efficient') {
            console.log("ok");
            return true;
        }

        return false;
    }

}

angular.module('main').service('loginService',LoginService);