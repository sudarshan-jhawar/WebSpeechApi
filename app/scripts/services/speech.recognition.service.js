(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name webSpeechApiApp.SpeechRecognitionService
   * @description
   * # SpeechRecognitionService
   * Service in the webSpeechApiApp.
   */
  angular.module('webSpeechApiApp')
    .service('SpeechRecognitionService', function ($window) {
      var SpeechRecognition = $window.SpeechRecognition || $window.webkitSpeechRecognition;
      var recognizer;
      var isRecognizing = false;
      var autoRestart = false;


      function activate() {
        if (SpeechRecognition) {
          recognizer = new SpeechRecognition();
          recognizer.contineous = true;

          recognizer.onstart = startHandler;
          recognizer.onend = endHandler;
        }
      }

      function startHandler() {
        isRecognizing = true;
        if (autoRestart) {
          recognizer.stop();
        }
      }

      function endHandler() {
        isRecognizing = false;
        if (autoRestart) {
          recognizer.start();
        }
      }

      function startRecognition() {
        if (recognizer) {
          autoRestart = true;

          recognizer.start();
        } else {
          throw ('Speech recognition does not exist...');
        }
      }

      function stopRecognition() {
        if (recognizer) {
          autoRestart = false;
          recognizer.stop();
        } else {
          throw ('Speech recognition does not exist...');
        }
      }

      activate();

      return {
        startRecognition: startRecognition,
        stopRecognition: stopRecognition
      };

    });

}());