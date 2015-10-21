
/**
 * Application configuration.
 *  `var AppConfig = require('yaat/app').Config;
 *   var yourVariable = AppConfig.get('yourVariableKey');
` */
App.set({
  DEBUG: true,
  port: 9999,
  // ssl: {
  //   key: './key',  
  //   cert: './cert'  
  // }
});

Module.add([
  require('../../modules/cache/varnish')
]);

// App.on('error')

/**
 * Router configuration
 */

Router.get('/', function() {
  this.render('test', {
    hello: 'world',
    partialTest: this.partial('simple_partial')
  });
});

var querystring = require('querystring');
var util = require('util');

Router.post('/simple/:uid', function(uid, body) {
  this.response.end('You Posted:\n' + body);
  
  // console.log(this.request.body);
  // this.json({result: true});  
})

Router.get('/toto/:uid', function(uid) {
  this.render('test', {
    hello: `your uid is ${uid}`
  });
})

Router.get('/foo/:uid/simple/:anotherUid', function(uid, anotherUid){
  this.render('test', {
    hello: `your uid is ${uid}, and anotherUid is ${anotherUid}`
  });
});

Router.get('/json', function() {
  this.json({toto: "tata"});  
});

// Router.pattern('id', '[0-9]+');

// View.layout


// Controller

//
// Route.middleware([
//   Auth
// ])
