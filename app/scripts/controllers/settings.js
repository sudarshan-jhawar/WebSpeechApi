(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name webSpeechApiApp.controller:SettingsCtrl
   * @description
   * # AboutCtrl
   * Controller of the webSpeechApiApp
   */
  angular.module('webSpeechApiApp')
    .controller('SettingsCtrl', function (speechSynthesisService) {

      var vm = this;
      vm.alerts = [];
      vm.text = '';


      function addAlerts(type, msg) {
        vm.alerts.push({ type: type, message: msg });
      }

      function closeAlerts(index) {
        vm.alerts.splice(index, 1);
      }

      function speak() {
        if (vm.text) {
          speechSynthesisService.speak(vm.text);
        }
      }

      vm.addAlerts = addAlerts;
      vm.closeAlerts = closeAlerts;
      vm.speak = speak;

    });

}());