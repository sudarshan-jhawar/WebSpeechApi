'use strict';

describe('Service: speech.recognition.service', function () {

  // load the service's module
  beforeEach(module('webSpeechApiApp'));

  // instantiate service
  var speech.recognition.service;
  beforeEach(inject(function (_speech.recognition.service_) {
    speech.recognition.service = _speech.recognition.service_;
  }));

  it('should do something', function () {
    expect(!!speech.recognition.service).toBe(true);
  });

});
