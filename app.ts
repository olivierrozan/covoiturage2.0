import * as angular from 'angular';

angular.module('main', [
    require('angular-ui-router'),
    require('angular-animate'),
    require('angular-sanitize'),
    require('angular-material'),
    require('angular-aria'),
    require('angular-cookies')
]);

angular.module('main').config(function ($stateProvider, $urlRouterProvider, $qProvider, $mdIconProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $mdIconProvider.defaultIconSet('assets/mdi.svg');
    $stateProvider.state('register', {
        url: '/register',
        template: '<register></register>'
    });

    $stateProvider.state('profile', {
        url: '/profile',
        template: '<profile></profile>'
    });

    /* Add New Routes Above */
    $urlRouterProvider.otherwise('/register');
});
