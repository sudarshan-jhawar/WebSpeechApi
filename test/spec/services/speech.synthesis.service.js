'use strict';

describe('Service: speech.synthesis.service', function () {

  // load the service's module
  beforeEach(module('webSpeechApiApp'));

  // instantiate service
  var speech.synthesis.service;
  beforeEach(inject(function (_speech.synthesis.service_) {
    speech.synthesis.service = _speech.synthesis.service_;
  }));

  it('should do something', function () {
    expect(!!speech.synthesis.service).toBe(true);
  });

});
