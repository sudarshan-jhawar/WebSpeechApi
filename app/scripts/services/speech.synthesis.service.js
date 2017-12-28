(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name webSpeechApiApp.speechSynthesisService
   * @description
   * # speechSynthesisService
   * Service in the webSpeechApiApp.
   */
  angular.module('webSpeechApiApp')
    .service('speechSynthesisService', function ($window) {
      var synthesizer = $window.speechSynthesis;
      function speak(text) {
        if (synthesizer) {
          if (synthesizer.pending || synthesizer.speaking) {
            synthesizer.cancel();
          }
          var utterence = new SpeechSynthesisUtterance(text);
          synthesizer.speak(utterence);
        }
      }
      return {
        speak: speak
      };
    });

})();