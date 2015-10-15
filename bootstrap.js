
/**
 * Application configuration.
 *  `var AppConfig = require('yaat/app').Config;
 *   var yourVariable = AppConfig.get('yourVariableKey');
` */
App.set({
  DEBUG: true,
  port: 9999,
});

// App.on('error')

/**
 * Router configuration
 */

Router.get('/', function() {
  this.render('test', {hello: 'world'});
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
