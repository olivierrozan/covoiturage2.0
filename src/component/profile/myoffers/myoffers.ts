'use strict';

import * as angular from 'angular';
import { MyoffersService } from '../../../service/myoffersService/myoffersService';
import * as moment from '../../../../node_modules/moment/moment.js';

angular.module('main').component('myoffers', {
    template: require('./myoffers.html'),
    bindings: {

    },
    controller: class MyOffersCtrl {
        
        private offers;
        
        constructor(private $state, private MyoffersService: MyoffersService) {
            
            this.MyoffersService.getMyOffers().then( response => {
                this.offers = response;
                this.offers.map((el) => {
                    el.date_publication = moment.utc(el.date_publication).format("dddd DD MMMM YYYY") + " à " + 
                    moment.utc(el.date_publication).format("HH") + "H" + 
                    moment.utc(el.date_publication).format("mm");
                });
                console.log("moment ", moment().locale());
                console.log("Mes offres", this.offers);
            });
        }

        public goToDetails(offer) {
            this.$state.go('profile.myoffersdetails', {id: offer.id});
        }
    },
    controllerAs: 'myOffersCtrl'
});
