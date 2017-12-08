(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name webSpeechApiApp.GalleryModalService
   * @description
   * # GalleryModal
   * Service in the webSpeechApiApp.
   */
  angular.module('webSpeechApiApp')
    .service('GalleryModalService', function ($uibModal) {
      function editCaption(caption) {
        var modalInstance = $uibModal.open({
          templateUrl: '../views/gallery.modal.html',
          controller: 'GalleryModalCtrl',
          controllerAs: 'vm',
          size: 'sm',
          resolve: {
            data: function () {
              return { caption: caption };
            }
          }
        });
        return modalInstance.result;
      }

      var service = {
        editCaption: editCaption,
      };
      return service;
    });
}());