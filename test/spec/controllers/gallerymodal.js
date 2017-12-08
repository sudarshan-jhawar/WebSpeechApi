'use strict';

describe('Controller: GallerymodalctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('webSpeechApiApp'));

  var GallerymodalctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GallerymodalctrlCtrl = $controller('GallerymodalctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GallerymodalctrlCtrl.awesomeThings.length).toBe(3);
  });
});
