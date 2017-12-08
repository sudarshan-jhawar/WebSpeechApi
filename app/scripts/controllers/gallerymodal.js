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
    .controller('GalleryModalCtrl', function ($uibModalInstance, data) {
      var vm = this;
      function cancel() {
        $uibModalInstance.dismiss();
      }

      function ok() {
        $uibModalInstance.close(vm.caption);
      }
      
      vm.caption = data.caption;
      vm.cancel = cancel;
      vm.ok = ok;
    });
})();