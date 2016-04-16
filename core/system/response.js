'use strict';

const View = require('./view')
, Event = require('./event')
, HTTP = require('constant-list').HTTP
, mime = require('mime')
, fs = require('fs');

class Response {

  constructor(res) {
    this.code = null;
    this.res = res;
  }

  send(view) {
    
    if(!this.code) {
      return this._notImplemented();
    }

    this.res.writeHead(this.code, {
      'Content-Type': view.contentType
    });

    //Event.trigger(Event.RESPONSE, this);

    this.res.end(view.body);
    return this.res;
  }

  _control(job, code) {
    this.code = code || HTTP.OK;

    return job()
      .catch((e) => {
        this.code = HTTP.INTERNAL_ERROR;
        return View.error('Internal server error');
      })
      .then(this.send.bind(this));
  }

  render(viewName, data, code) {
    return this._control(function() {
      return View.render(viewName, data)
    }, code);
  }

  json(content, code) {
    return this._control(function() {
      return View.json(content)
    });
  }

  error(message, code) {
    return this._control(function(){
      return View.error(message);
    }, code);
  }

  asset(filepath) {
    this.res.writeHead(200, {
      'Content-Type': mime.lookup(filepath),
    });

    var readStream = fs.createReadStream(filepath);
    readStream.pipe(this.res);
  }

  _notImplemented(){
    return this._control(function(){
      return View.error('Response type not implemented');
    }, HTTP.NOT_IMPLEMENTED)
  }

}

module.exports = Response;
