import * as angular from 'angular';

angular.module('main', [
    require('angular-ui-router'),
    require('angular-animate'),
    require('angular-sanitize'),
    require('angular-material'),
    require('angular-aria'),
    require('angular-cookies')
]);

angular.module('main').config(function ($stateProvider, $urlRouterProvider, $qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $stateProvider.state('register', {
        url: '/register',
        template: '<register></register>'
    });

    $stateProvider.state('home', {
        url: '/home',
        template: '<home></home>'
    });

    /* Add New Routes Above */
    $urlRouterProvider.otherwise('/register');
});
