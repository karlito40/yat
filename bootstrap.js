
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

/**
 * Router configuration
 */

Router.get('/', function() {
  
  var reactComponent = require("../../public/js/components/app");
  
  console.log('this', this);
  
  this.render('test', {
    hello: 'world',
    partialTest: this.react(reactComponent)
    // partialTest: this.partial('simple_partial')
    // partialTest: markup
  });
  
});

var querystring = require('querystring');
var util = require('util');

Router.post('/simple/:uid', function(uid, body) {
  this.response.end('You Posted:\n' + body);
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

