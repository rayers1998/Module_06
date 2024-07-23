// test\features\health\healthTest.js

// Importing required modules
const chai = require('chai');
const should = chai.should(); // Using should style assertions
const sinon = require('sinon');
const HealthController = require('../src/features/health/health.controller'); // Path to HealthController
const ResponseUtil = require('../src/shared/utils/response-util').ResponseUtil; // Path to ResponseUtil

describe('HealthController', () => {
  // Variables to hold our spies and mocked objects
  let req;
  let res;
  let respondOkSpy;
  let respondErrorSpy;

  // Setup runs before each test
  beforeEach(() => {
    // Mocking the request and response objects
    req = {}; // Empty request object for simplicity
    res = {
      json: sinon.spy(), // Spy on the json method of the response object
      send: sinon.spy(), // Fallback spy in case json isn't available
    };

    // Spying on the methods of ResponseUtil
    respondOkSpy = sinon.spy(ResponseUtil, 'respondOk');
    respondErrorSpy = sinon.spy(ResponseUtil, 'respondError');
  });

  // Cleanup runs after each test
  afterEach(() => {
    // Restoring the original methods of ResponseUtil
    sinon.restore();
  });

  // Testing the helloWorld method
  describe('#helloWorld()', () => {
    it('responds with Hello World', (done) => {
      // Calling the helloWorld method with our mocked request and response objects
      HealthController.helloWorld(req, res);
      // Assertions to check if respondOk was called once and with the correct parameters
      respondOkSpy.calledOnce.should.be.true;
      respondOkSpy.calledWith(sinon.match.any, sinon.match.any, 'Hello World').should.be.true;
      done(); // Indicate that the asynchronous operation is complete
    });
  });

  // Testing the status method
  describe('#status()', () => {
    it('responds with status information', (done) => {
      // Similar to helloWorld, calling the status method and asserting the outcome
      HealthController.status(req, res);
      respondOkSpy.calledOnce.should.be.true;
      respondOkSpy.calledWith(sinon.match.any, sinon.match.has('envName'), sinon.match.string).should.be.true;
      done();
    });
  });

  // Testing the error method
  describe('#error()', () => {
    it('responds with an error', (done) => {
      // Again, calling the error method and asserting the outcome
      HealthController.error(req, res);
      respondErrorSpy.calledOnce.should.be.true;
      respondErrorSpy.calledWith(sinon.match.any, sinon.match.any, 'Error testing endpoint reached').should.be.true;
      done();
    });
  });
});


