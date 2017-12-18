import * as angular from 'angular';

export class RegisterService {
    
    public data;
    
    constructor(private $http: ng.IHttpService) {
        console.log('hello');
    }

    public sendRegisterData(user, config) {
        user.firstname = user.firstname[0].toUpperCase() + user.firstname.slice(1);
        user.lastname = user.lastname.toUpperCase();
        return this.$http.post('http://localhost:9300/register', user, config).then((response) => {
            this.data = response;
            // console.log("server: ", this.data);
            return this.data;
        }).then((error) => {
            return error;
        });
    }
}

angular.module('main').service('RegisterService',RegisterService);