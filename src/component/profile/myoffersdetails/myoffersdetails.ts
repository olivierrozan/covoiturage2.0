import * as angular from 'angular';
import { MyoffersDetailsService } from '../../../service/Myoffersdetailsservice/Myoffersdetailsservice';
import * as moment from '../../../../node_modules/moment/moment.js';

angular.module('main').component('myoffersdetails', {
    template: require('./myoffersdetails.html'),
    bindings: {

    },
    controller: class MyoffersdetailsCtrl {

        private offers;
        
        constructor(private $state, private MyoffersDetailsService: MyoffersDetailsService) {
            console.log(this.$state.params.id);

            this.MyoffersDetailsService.getMyOffersDetails(this.$state.params.id).then( response => {
                console.log('details', response);
                this.offers = response;
                this.offers.map((el) => {
                    el.date_publication = moment(el.date_publication).format("dddd DD MMMM YYYY") + " à " + 
                    moment(el.date_publication).format("hh") + "H" + 
                    moment(el.date_publication).format("mm")
                });
            });
        }
    },
    controllerAs: 'myoffersdetailsCtrl'
});
