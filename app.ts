import * as angular from 'angular';

angular.module('main', [
    require('angular-ui-router'),
    require('angular-animate'),
    require('angular-sanitize'),
    require('angular-material'),
    require('angular-aria')
]);

angular.module('main').config(function ($stateProvider, $urlRouterProvider, $qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $stateProvider.state('signup', {
        url: '/signup',
        template: '<signup></signup>'
    });

    $stateProvider.state('home', {
        url: '/home',
        template: '<home></home>'
    });

    /* Add New Routes Above */
    $urlRouterProvider.otherwise('/signup');
});
