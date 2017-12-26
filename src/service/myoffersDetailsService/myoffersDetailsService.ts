import * as angular from 'angular';

export class MyoffersDetailsService {
    constructor(private $http: ng.IHttpService) {

    }

    public getMyOffersDetails(index) {
        return this.$http.get('http://localhost:9300/profile/myoffersdetails', { params: { id: index } } ).then((response) => {
            return response.data['offers'];
        }).then((error) => {
            return error;
        });
    }
}

angular.module('main').service('MyoffersDetailsService',MyoffersDetailsService);