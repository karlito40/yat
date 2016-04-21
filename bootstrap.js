
/**
 * Application configuration.
 *  `var AppConfig = require('yaat/app').Config;
 *   var yourVariable = AppConfig.get('yourVariableKey');
` */
App.set({
  DEBUG: true,
  port: 9999,
  // publicFolder: './public'
  // ssl: {
  //   key: './key',
  //   cert: './cert'
  // }
});
  
// Module.add([
//   require('../../modules/cache/varnish')
// ]);

/**
 */
var reactComponent = require("../../public/js/components/app");

Router.get('/', function() {

  this.render('test', {
    hello: 'world',
    partialTest: this.react(reactComponent)
  });
});

Router.get('/simple/:uid', function(uid, body) {
  this.res.end('You Posted:\n' + uid);
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
