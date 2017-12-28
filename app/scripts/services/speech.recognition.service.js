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
    .service('SpeechRecognitionService', function ($window, _, $rootScope) {
      var SpeechRecognition = $window.SpeechRecognition || $window.webkitSpeechRecognition;
      var recognizer;
      var isRecognizing = false;
      var autoRestart = false;
      var commands = [];
      var noMatchCallback;
      var unrecognisedCallback;

      function activate() {
        if (SpeechRecognition) {
          recognizer = new SpeechRecognition();
          recognizer.contineous = true;
          recognizer.maxAlternatives = 3;
          recognizer.onstart = startHandler;
          recognizer.onend = endHandler;
          recognizer.onresults = resultHandler;
          recognizer.onerror = errorHandler;
        }
      }
      function errorHandler(err) {
        if (err.error === 'not allowed') {
          autoRestart = false;
        }
      }
      function setNoMatchCallback(callback) {
        noMatchCallback = callback;
      }

      function setUnrecognisedCallback(callback) {
        unrecognisedCallback = callback;
      }

      function resultHandler(event) {
        if (event.results) {
          var result = event.results[event.resultIndex];
          var transcript;
          if (result.isFinal) {
            if (result[0].confidence >= 0.5) {
              transcript = result[0].transcript;

              var match = _.find(commands, { text: _.toLower(_.trim(transcript)) });
              if (match) {
                match.callback();
              } else if (noMatchCallback) {
                noMatchCallback(transcript);
              } else {
                console.log('No Matching command for : ' + transcript);
              }
            } else {
              if (unrecognisedCallback) {
                setUnrecognisedCallback(transcript);
              } else {
                console.log('Un-recognised command' + transcript);
              }
            }

            $rootScope.$apply();
          }
        }
      }

      function addCommand(commandText, cb) {
        commands.push({ commandText: _.toLower(commandText), callback: cb });
      }

      function clearCommands() {
        commands.length = 0;
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
        stopRecognition: stopRecognition,
        addCommand: addCommand,
        clearCommands: clearCommands,
        setNoMatchCallback: setNoMatchCallback,
        setUnrecognisedCallback: setUnrecognisedCallback
      };

    });

}());