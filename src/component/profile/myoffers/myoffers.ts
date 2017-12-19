'use strict';

'use strict';

import * as angular from 'angular';
import { MyoffersService } from '../../../service/myoffersService/myoffersService';

angular.module('main').component('myoffers', {
    template: require('./myoffers.html'),
    bindings: {

    },
    controller: class MyOffersCtrl {
        
        private offers;
        
        constructor(private $state, private MyoffersService: MyoffersService) {
            console.log("Mes offres");

            this.MyoffersService.getMyOffers().then( response => {
                this.offers = response;
            });
        }
    },
    controllerAs: 'myOffersCtrl'
});
