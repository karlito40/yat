var VM = require('../core/file/vm')
, assert = require('assert')
, expect = require('chai').expect;

describe('VM', function() {
  
  describe('#load', function() {
    
    it('should be able to set an object property', function(){
      var Test = {};
      
      VM.load('./test/res/vm_test', {
        Test: Test
      });
      
      assert.ok(Test.toto);
      
    });

    it('should throw an error when an object is not passed to the VM', function(){
      expect(function() {
        VM.load('./test/res/vm_test')
        VM.load('./test/res/vm_test', 2)
        VM.load('./test/res/vm_test', 'test_String')
      }).to.throw(Error);
    });

    it('should throw an error when the targeted file is not able to set a var', function() {
      
      expect(function() {
        VM.load('./test/res/vm_test', {
          Simple: {}
        })
      }).to.throw(Error);
      
    });
    
  });
  
});