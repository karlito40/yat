var Event = require('../../core/system/event');

module.exports = function(){
  
  
  Event.register(Event.RESPONSE, function(response) {
    // TODO Add header to the response
  });
  
  
  return {
    id: 'Varnish'
  };
};