module.exports.remove = remove;

function remove(arr, index) {
  return arr.splice(index, 1);
}