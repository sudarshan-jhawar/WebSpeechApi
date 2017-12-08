(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name webSpeechApiApp.SettingsService
   * @description
   * # settings
   * Service in the webSpeechApiApp.
   */
  angular.module('webSpeechApiApp')
    .service('SettingsService', function ($http) {
      function getSettings() {
        return $http.get('\settings');
      }
      function saveSettings(data) {
        return $http.post('\settings', data);
      }
      var service = {
        getSettings:getSettings,
        saveSettings:saveSettings
      }; 
      return service;
    });

})();