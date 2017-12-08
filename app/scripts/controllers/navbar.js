'use strict';

/**
 * @ngdoc function
 * @name webSpeechApiApp.controller:NavbarCtrl
 * @description
 * # AboutCtrl
 * Controller of the webSpeechApiApp
 */
angular.module('webSpeechApiApp')
    .controller('NavbarCtrl', function ($route) {
        var vm = this;

        function isRoute(routeName) {
            return $route.current.title === routeName;
        }

        vm.isRoute = isRoute;       

    });
