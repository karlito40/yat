'use strict';

module.exports.subUntill = subUntill;
module.exports.has = has;

function subUntill(s, encounter) {
  var index = s.indexOf(encounter);

  return (index != -1)
    ? s.substr(0, s.indexOf(encounter))
    : s;
}

function has(s, element) {
  return (s.indexOf(element) != -1);
}
