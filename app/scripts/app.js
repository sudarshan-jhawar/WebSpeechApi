'use strict';

/**
 * @ngdoc overview
 * @name webSpeechApiApp
 * @description
 * # webSpeechApiApp
 *
 * Main module of the application.
 */
angular
  .module('webSpeechApiApp', [
    'ngAnimate',
    'ngRoute',
    'ui.bootstrap'
  ]).factory('_',function ($window) {
    return $window._;
  })
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: 'views/gallery.html',
        controller: 'GalleryCtrl',
        controllerAs: 'vm',
        title: 'gallery'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'vm',
        title: 'settings'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
