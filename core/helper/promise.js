var TYPE = require('constant-list').TYPE
, Promise = require('promise');

function resolveObject(data, cb) {
  if(!data) {
    return cb(null, data);
  }
  
  var res = {}
  , nbKey = Object.keys(data).length
  , refLength = 0
  , done = false;
  
  function addRef(key, value) {
    res[key] = value;
    refLength++;
    if(!done && refLength >= nbKey ) {
      cb(null, res);
      done = true;
    }
  }
  
  for(var key in data) {
    var value = data[key]; 
    if(typeof value == TYPE.OBJECT && value.then) {
      value.then(
          (function(key) {
            return function(res) {
              addRef(key, res);
            }
          })(key)
        )
        .catch(function(e) {
          if(!done) {
            done = true;
            cb(e);  
          }
        });
    } else {
      addRef(key, value);
    }
    
  }
}

module.exports.resolveObject = Promise.denodeify(resolveObject);