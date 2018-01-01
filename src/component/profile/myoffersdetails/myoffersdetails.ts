'use strict';

import * as angular from 'angular';
import { MyoffersDetailsService } from '../../../service/Myoffersdetailsservice/Myoffersdetailsservice';
import * as moment from '../../../../node_modules/moment/moment.js';

angular.module('main').component('myoffersdetails', {
    template: require('./myoffersdetails.html'),
    bindings: {

    },
    controller: class MyoffersdetailsCtrl {

        private detailsOffers;
        
        constructor(private $state, private MyoffersDetailsService: MyoffersDetailsService) {
            console.log(this.$state.params.id);

            this.MyoffersDetailsService.getMyOffersDetails(this.$state.params.id).then( response => {
                this.detailsOffers = response;
                
                this.detailsOffers.date_publication = moment(this.detailsOffers.date_publication).format("dddd DD MMMM YYYY") + " à " + 
                    moment(this.detailsOffers.date_publication).format("hh") + "H" + 
                    moment(this.detailsOffers.date_publication).format("mm");
                console.log('details', this.detailsOffers);
            });
        }
    },
    controllerAs: 'myoffersdetailsCtrl'
});
