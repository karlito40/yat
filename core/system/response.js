
var View = require('./view')
, Event = require('./event')
, HTTP = require('constant-list').HTTP
, mime = require('mime')
, fs = require('fs');

function Response(res) {
  this.code = null;
  this.res = res;
}

Response.prototype.send = function(view) {
  if(!this.code) {
    return this._notImplemented();  
  } 
  
  this.res.writeHead(this.code, {
    'Content-Type': view.contentType
  });
  
  Event.trigger(Event.RESPONSE, this);
  
  this.res.end(view.body);
  return this.res;
}

Response.prototype._control = function(job, code) {
  this.code = code || HTTP.OK;
  
  return job()
    .catch(function(e){
      self.code = HTTP.INTERNAL_ERROR;
      return View.error('Internal server error');
    })
    .then(this.send.bind(this));
}

Response.prototype.render = function(viewName, data, code) {
  return this._control(function() {
    return View.render(viewName, data)
  }, code);

}

Response.prototype.json = function(content, code) {
  return this._control(function() {
    return View.json(content)
  });
}

Response.prototype.error = function(message, code) {
  this._control(function(){
    return View.error(message);
  }, code);
}

Response.prototype.asset = function(filepath) {
  this.res.writeHead(200, {
    'Content-Type': mime.lookup(filepath),
  });

  var readStream = fs.createReadStream(filepath);
  readStream.pipe(this.res);
}

Response.prototype._notImplemented = function(){
  return this._control(function(){
    return View.error('Response type not implemented');
  }, HTTP.NOT_IMPLEMENTED)
}

module.exports = Response;