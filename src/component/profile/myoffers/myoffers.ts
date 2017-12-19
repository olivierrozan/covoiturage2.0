'use strict';

import * as angular from 'angular';

angular.module('main').component('myoffers', {
    template: require('./myoffers.html'),
    bindings: {

    },
    controller: class MyOffersCtrl {
        
        private offers;
        
        constructor(private $state) {
            console.log("Mes offres");
            
        }
    },
    controllerAs: 'myOffersCtrl'
});
