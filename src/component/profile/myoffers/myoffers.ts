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
                console.log("Mes offres");
                this.offers = response;
                this.offers.map((el) => {
                    el.date_publication = moment(el.date_publication).format("dddd DD MMMM YYYY") + " à " + 
                    moment(el.date_publication).format("hh") + "H" + 
                    moment(el.date_publication).format("mm")
                });
            });
        }

        public goToDetails(offer) {
            this.$state.go('profile.myoffersdetails', {id: offer.id});
        }
    },
    controllerAs: 'myOffersCtrl'
});
