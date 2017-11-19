import * as angular from 'angular';

angular.module('main', [
    require('angular-ui-router'),
    require('angular-animate'),
    require('angular-sanitize'),
    require('angular-material'),
    require('angular-aria')
]);

angular.module('main').config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        template: '<signup></signup>'
    });

    /* Add New Routes Above */
    $urlRouterProvider.otherwise('/signup');
});
