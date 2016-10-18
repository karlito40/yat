
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
  
const reactComponent = require("../../public/js/components/app");

var isAuth = function(next){
  if(!this.session.get('auth')) {
    console.log('!auth')
  } else {
    console.log('is auth')
  }
  next();
  
}

Router.get('/', function() {
  this.session.set('test', {yolo: 'toto'});
  this.render('test', {
    hello: 'world',
    partialTest: this.react(reactComponent)
  });
}, [isAuth]);

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
