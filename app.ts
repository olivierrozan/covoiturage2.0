import * as angular from 'angular';
import * as moment from './node_modules/moment/moment.js';

angular.module('main', [
    require('angular-ui-router'),
    require('angular-animate'),
    require('angular-sanitize'),
    require('angular-material'),
    require('angular-aria'),
    require('angular-cookies')
]);

angular.module('main').config(($stateProvider, $urlRouterProvider, $qProvider, $mdIconProvider) => {

    moment.locale('fr');

    moment.updateLocale('fr', {
        months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet",
            "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        weekdays: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
    });

    $qProvider.errorOnUnhandledRejections(false);
    $mdIconProvider.defaultIconSet('assets/mdi.svg');

    $stateProvider.state('register', {
        url: '/register',
        template: '<register></register>'
    });
    $stateProvider.state('profile', {
        url: '/profile',
        template: '<profile></profile>',
        redirectTo: 'profile.myoffers'
    });
    $stateProvider.state('profile.myoffers', {
        url: '/myoffers',
        template: '<myoffers></myoffers>'
    });
    $stateProvider.state('profile.myoffersdetails', {
        url: '/myoffersdetails?id',
        template: '<myoffersdetails></myoffersdetails>'
    });

    /* Add New Routes Above */
    $urlRouterProvider.otherwise('/register');
});
