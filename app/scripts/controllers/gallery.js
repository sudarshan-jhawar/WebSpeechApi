'use strict';

/**
 * @ngdoc function
 * @name webSpeechApiApp.controller:GalleryCtrl
 * @description
 * # MainCtrl
 * Controller of the webSpeechApiApp
 */
angular.module('webSpeechApiApp')
  .controller('GalleryCtrl', function ($scope, $window, GalleryService, GalleryModalService, $interval, $timeout, SpeechRecognitionService) {
    var vm = this;
    var recognitionTimeOut;

    vm.alerts = [];
    vm.selectedIndex = -1;
    vm.isSlideShowRunning = false;

    $scope.$on('$locationChangeStart', function () {
      stopSlideShow();
      $timeout.cancel(recognitionTimeOut);
      SpeechRecognitionService.stopRecognition();
    });

    function activate() {
      getImages();
      recognitionTimeOut = $timeout(startSpeechRecognition, 3000);
    }

    function setSpeechProperties() {
      SpeechRecognitionService.clearCommands();
      SpeechRecognitionService.addCommand('Edit Caption', editCaption);
      SpeechRecognitionService.addCommand('start slideshow', startSlideShow);
      SpeechRecognitionService.addCommand('stop slideshow', stopSlideShow);
      SpeechRecognitionService.addCommand('next', next);
      SpeechRecognitionService.addCommand('previous', previous);

      SpeechRecognitionService.setNoMatchCallback(function (transript) {
        addAlert('danger', 'No Matching command found for ' + transript);
      });

      SpeechRecognitionService.setUnrecognisedCallback(function (transript) {
        addAlert('info', 'I am not sure but you said "' + transript + '"');
      });
    }

    function editCaption() {
      if (vm.album.images && vm.album.images.length > 0) {
        if (vm.selectedIndex === -1) {
          selectImage(0);
        }
        stopSlideShow();
        var selectedImage = vm.album.images[vm.selectedIndex];
        GalleryModalService.editCaption(selectedImage.caption)
          .then(function (newCaption) {
            if (newCaption !== selectedImage.caption) {
              setSpeechProperties();
              selectedImage.caption = newCaption;
              GalleryService.saveImageData(angular.toJson(vm.album))
                .then(function () {
                  addAlert('success', 'Caption updated successfully');
                });
            }
          }, function () {
            setSpeechProperties();
          });

      }
    }

    function getImages() {
      GalleryService.getImageData().then(function (response) {
        vm.album = response.data;
      });
    }

    function selectImage(index) {
      $window.scrollTo(0, 0);
      vm.selectedIndex = index;
    }

    function isSelected(index) {
      return vm.selectedIndex === index;
    }

    function addAlert(type, msg) {
      vm.alerts.push({ type: type, message: msg });
    }

    function closeAlert(index) {
      vm.alerts.splice(index, 1);
    }

    function previous() {
      var index = vm.selectedIndex;
      index--;
      if (index < 0) {
        index = vm.album.images.length - 1;
      }
      selectImage(index);
    }

    function next() {
      var index = vm.selectedIndex;
      index++;
      if (index >= vm.album.images.length - 1) {
        index = 0;
      }
      selectImage(index);
    }

    var slideShowPromise;
    function startSlideShow() {
      if (!angular.isDefined(slideShowPromise)) {
        next();
        slideShowPromise = $interval(next, 3000);
        vm.isSlideShowRunning = true;
      }
    }
    function stopSlideShow() {
      if (angular.isDefined(slideShowPromise)) {
        $interval.cancel(slideShowPromise);
        slideShowPromise = undefined;
        vm.isSlideShowRunning = false;
      }
    }

    function startSpeechRecognition() {
      try {
        setSpeechProperties();
        SpeechRecognitionService.startRecognition();
      } catch (error) {
        addAlert('danger', error.message);
      }
    }

    vm.addAlert = addAlert;
    vm.closeAlert = closeAlert;
    vm.isSelected = isSelected;
    vm.selectImage = selectImage;
    vm.previous = previous;
    vm.next = next;
    vm.stopSlideShow = stopSlideShow;
    vm.startSlideShow = startSlideShow;
    vm.editCaption = editCaption;


    activate();
  });
