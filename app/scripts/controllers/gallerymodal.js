(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name webSpeechApiApp.controller:GalleryModalCtrl
   * @description
   * # GallerymodalctrlCtrl
   * Controller of the webSpeechApiApp
   */
  angular.module('webSpeechApiApp')
    .controller('GalleryModalCtrl', function ($uibModalInstance, data, SpeechRecognitionService) {
      var vm = this;
      function cancel() {
        $uibModalInstance.dismiss();
      }

      function ok() {
        $uibModalInstance.close(vm.caption);
      }
      function activate() {
        setSpeechProperties();
      }
      function setSpeechProperties() {
        SpeechRecognitionService.clearCommands();
        SpeechRecognitionService.addCommand('save', ok);
        SpeechRecognitionService.addCommand('cancel', cancel);
        SpeechRecognitionService.setNoMatchCallback(function (transrcipt) {
          vm.caption = transrcipt;
        });
      }

      vm.caption = data.caption;
      vm.cancel = cancel;
      vm.ok = ok;
      activate();
    });
})();