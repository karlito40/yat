var Event = require('../../core/system/event');

module.exports = function(){
  console.log('module varnish');
  
  Event.register(Event.RESPONSE, function(response) {
    console.log('varnish')
  });
  
  return {
    id: 'Varnish'
  };
};