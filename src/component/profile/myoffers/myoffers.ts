'use strict';

import * as angular from 'angular';

angular.module('main').component('myoffers', {
    template: require('./myoffers.html'),
    bindings: {

    },
    controller: class MyOffersCtrl {
        
        private nb: Number;
        constructor(private $state) {
            console.log("Mes offres");
            this.nb = 666;
        }
    },
    controllerAs: 'myOffersCtrl'
});
