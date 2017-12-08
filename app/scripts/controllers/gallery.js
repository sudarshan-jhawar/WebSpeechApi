'use strict';

/**
 * @ngdoc function
 * @name webSpeechApiApp.controller:GalleryCtrl
 * @description
 * # MainCtrl
 * Controller of the webSpeechApiApp
 */
angular.module('webSpeechApiApp')
  .controller('GalleryCtrl', function ($scope, $window, GalleryService, GalleryModalService, $interval) {
    var vm = this;

    vm.alerts = [];
    //vm.albums;
    //[
    //   {
    //     albumName: "Album",
    //     images: [{
    //       src: "app/images/yeoman.png",
    //       caption: "Image one"
    //     }]
    //   }
    // ];
    vm.selectedIndex = -1;
    vm.isSlideShowRunning = false;

    $scope.$on('$locationChangeStart', function () {
      stopSlideShow();
    });

    function activate() {
      getImages();
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
              selectedImage.caption = newCaption;
              GalleryService.saveImageData(angular.toJson(vm.album))
                .then(function () {
                  addAlert('success', 'Caption updated successfully');
                });
            }
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
