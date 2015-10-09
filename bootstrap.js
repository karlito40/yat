
/**
 * Application configuration.
 * Every variable set here will be available as shown below
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
  console.log('root works !')
});

// Router.pattern('id', '[0-9]+');

// View.layout


// Controller




//
// Route.middleware([
//   Auth
// ])
