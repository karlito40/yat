var assert = require('assert')
, String2 = require('../core/helper/string');

describe('helper/String', function() {

  describe('#subUntill', function() {

    it('should be able to reduce a string from the start to an element', function(){
      var test = 'Simple Test';
      assert.equal('Sim', String2.subUntill(test, 'ple Test'));
      assert.equal('Simple Test', String2.subUntill(test, 'nothing'));
    });

  });

  describe('#has', function() {

    it('should be able to found an element in a text', function() {
      var test = 'Test string .js, +Other stuff';
      assert.ok(String2.has(test, '.js'));
      assert.equal(false, String2.has(test, 'nothing'));
    });

  });

});
