import * as angular from 'angular';

export class MyoffersService {
        
    constructor(private $http: ng.IHttpService) {

    }

    public getMyOffers() {
        return this.$http.get('http://localhost:9300/profile/myoffers').then((response) => {
            return response.data['offers'];
        }).then((error) => {
            return error;
        });
    }
}

angular.module('main').service('MyoffersService',MyoffersService);