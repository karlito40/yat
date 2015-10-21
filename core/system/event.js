var ArrayHelper = require('../helper/array');

module.exports.trigger = trigger;
module.exports.register = register;
module.exports.dispose = dispose;
module.exports.getChannel = getChannel;

var channels = {};

function register(name, cb) {
  if(!channels[name]) {
    channels[name] = [];
  }
  
  channels[name].push(cb);
  return cb;
}

function trigger(name) {
  if(!channels[name]) {
    return 0;
  }
  
  channels[name].forEach(function(job){
    job();
  });
  
  return channels[name].length
}

function dispose(cb) {
  for(var key in channels) {
    var events = channels[key];
    var found = events.indexOf(cb);
    if(found != -1) {
      ArrayHelper.remove(events, found);
      if(!events.length) {
        delete channels[key];
      }
      return true;
    }
    
  }
  
  return false;
  
}

function getChannel(name) {
  return channels[name];
}