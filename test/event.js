var assert = require('assert')
, Event = require('../core/system/event') 

describe('system/event', function() {
  
  describe('#register', function() {
    
    it('should be able to subscribe to a channel', function() {
      Event.register('test_register', function() {
        return 'test1';
      });  
      
      Event.register('test_register', function() {
        return 'test2';
      });
      assert.equal(Event.getChannel('test_register').length, 2);
    });
    
  });
  
  describe('#trigger', function() {
    
    it('should be able to execute a listener', function(done) {
      Event.register('test_trigger', function() {
        done();
      });  
      
      Event.trigger('test_trigger')
    });
    
    
  });
  
  describe('#dispose', function() {
    
    it('should be able to remove a listener', function() {
      var id1 = Event.register('test_dispose', function() {});
      var id2 = Event.register('test_dispose', function() {});
      
      Event.dispose(id1);
      assert.equal(1, Event.getChannel('test_dispose').length);
      
      Event.dispose(id2);
      assert.equal(undefined, Event.getChannel('test_dispose'));
      
    });
    
  });
  
});