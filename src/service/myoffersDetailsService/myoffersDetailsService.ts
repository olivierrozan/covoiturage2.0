import * as angular from 'angular';

export class MyoffersDetailsService {
    
    private config;

    constructor(private $http: ng.IHttpService) {
        
    }

    public getMyOffersDetails(index) {
        this.config = {
            params: {
                id: index
            }
        };
        
        return this.$http.get('http://localhost:9300/profile/myoffersdetails', this.config).then((response) => {
            return response.data['offers'];
        }).then((error) => {
            return error;
        });
    }
}

angular.module('main').service('MyoffersDetailsService',MyoffersDetailsService);