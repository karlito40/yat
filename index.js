'use strict';

require('node-jsx').install({
  harmony: true,
  extension: '.jsx'
});

App = require('./core/app');
App.start();
