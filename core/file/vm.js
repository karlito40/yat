var fs = require('fs')
, String2 = require('../helper/string')
, EXTENSION = require('../constant/extension')
;

module.exports.load = load;

/**
 * Send the given objects to a javascript file
 *
 * In the following code, the foo file has
 * a global access to FooContext and AnotherVar
 *
 *    `load('foo', {
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
