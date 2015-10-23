'use strict';

var list = [];

module.exports.add = add;
module.exports.start = start;

function add(patch) {
  if(Array.isArray(patch)) {
    list = list.concat(patch);
  } else {
    list.push(patch);
  }

}

function start() {
  list.forEach(function(patch) {
    patch();
  });
}
