var list = [];

module.exports.add = add;
module.exports.start = start;

function add(patch) {
  console.log('add patch', patch)
  if(Array.isArray(patch)) {
    list = list.concat(patch);
  } else {
    list.push(patch);  
  }
  
}

function start() {
  list.forEach(function(patch) {
    console.log('patch', patch);
    patch();
  });
}