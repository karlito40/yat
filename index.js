'use strict';

require('node-jsx').install({
  harmony: true,
  extension: '.jsx'
});

var App = require('./core/app');
App.start();
