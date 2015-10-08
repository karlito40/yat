module.exports.subUntill = subUntill;
module.exports.has = has;

function subUntill(s, encounter) {
  return s.substr(0, s.indexOf(encounter));
}

function has(s, element) {
  return (s.indexOf(element) != -1);
}
