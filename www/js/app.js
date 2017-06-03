// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'google-signin'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    }).config(function ($stateProvider, $urlRouterProvider, GoogleSigninProvider) {
    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        })
        .state('map', {
            url: '/map',
            templateUrl: 'templates/map.html',
            controller: 'MapCtrl',
            params: {
                user: null
            }
        })
        .state('facility', {
            url: '/facility',
            templateUrl: 'templates/facility.html',
            controller: 'FacilityCtrl',
            params: {
                user: null
            }
        }).state('help', {
        url: '/help',
        templateUrl: 'templates/help.html',
        controller: 'HelpCtrl',
        params: {
            user: null
        }
    });

    GoogleSigninProvider.init({
        client_id: '1054860948248-hkkkfe582ct1aqmi213h4bahmco7t9uj.apps.googleusercontent.com',
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
})






