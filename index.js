'use strict';

require('node-jsx').install({
  harmony: true,
  extension: '.jsx'
});


const App = require('./core/app');
App.start();
