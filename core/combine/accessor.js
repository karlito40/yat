module.exports.set = set;
module.exports.get = get;
module.exports.object = {
  get: get,
  set: set,
};

function set(/* polymorphism */) {
  if(arguments.length > 2) {
    throw new Error(`Accessor::set does not
      allow to be execute with ${arguments.length} variables`);
  }

  if(arguments.length == 1) {
    var object = arguments[0];
    for(var key in object) {
      this[key] = object[key];
    }
  } else {
    this[arguments[0]] = arguments[1];
  }

  return this;
}

function get(key)  {
  return this[key];
}
