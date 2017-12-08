(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name adminApp.service:GalleryService
     * @function
     * @description
     * # GalleryService
     */
    angular.module('webSpeechApiApp')
        .service('GalleryService', ['$http', function ($http) {

            function getImageData() {
                return $http.get('http://localhost:3000/images');
            }

            function saveImageData(data) {
                return $http.post('http://localhost:3000/images', data);
            }

            var service = {
                getImageData: getImageData,
                saveImageData: saveImageData
            };

            return service;



        }]);
}());