var fs = require('fs')
, isObject = require('util').isObject
, String2 = require('../helper/string')
, EXTENSION = require('constant-list').EXTENSION
;

module.exports.load = load;

/**
 * Send the given objects to a javascript file
 *
 * In the following code, the foo file has
 * a global access to FooContext and AnotherVar
 *
 *    `VM.load('foo', {
 *      FooContext: {
 *        hey: true
 *      },
 *      AnotherVar: {
 *        well: 'it works'
 *      }
 *    })`
 *
 */
function load(filename, shareObjects) {
  if(!isObject(shareObjects)) {
    throw new Error('VM::load an object must be passed');
  }
  
  if(!String2.has(filename, EXTENSION.JS)) {
    filename += '.js';
  }

  var exportVar = '';
  for(var key in shareObjects) {
      exportVar += `var ${key} = shareObjects['${key}'];`;
  }

  var src = "(function(){ ";
    src += exportVar;
    src += fs.readFileSync(filename, 'utf8');
  src += "})()";

  eval(src);
}
