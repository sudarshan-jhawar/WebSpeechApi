'use strict';

describe('Service: GalleryModal', function () {

  // load the service's module
  beforeEach(module('webSpeechApiApp'));

  // instantiate service
  var GalleryModal;
  beforeEach(inject(function (_GalleryModal_) {
    GalleryModal = _GalleryModal_;
  }));

  it('should do something', function () {
    expect(!!GalleryModal).toBe(true);
  });

});
