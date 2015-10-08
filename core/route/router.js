module.exports = Rooter;

function Rooter(groupName) {
  this.groupName = groupName;
  this.handlers = {};
}

Rooter.prototype.get = function(uri, cb) {
  return this._handleMethod('get', uri, cb);
}

Rooter.prototype.post = function(uri, cb) {
  return this._handleMethod('post', uri, cb);
}

Rooter.prototype.put = function(uri, cb) {
  return this._handleMethod('put', uri, cb);
}

Rooter.prototype.del = function(uri, cb) {
  return this._handleMethod('del', uri, cb);
}

Rooter.prototype._handleMethod = function(method, uri, cb) {
  if(this.groupName) {
    uri = `/${this.groupName}/${uri}`;
  }

  this.handlers[uri] = cb;
  return this;
}
