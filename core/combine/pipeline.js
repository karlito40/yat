function Pipeline(middlewares) {
  this.middlewares = middlewares;
  this.iterator = 0;
}

Pipeline.prototype.execute = function() {
  if(!this.middlewares[this.iterator]) {
    return;
  }
  this.middlewares[this.iterator](this.next.bind(this));
}

Pipeline.prototype.next = function() {
  this.iterator++;
  this.execute();
}

Pipeline.prototype.reset = function() {
  this.iterator = 0;
  this.execute();
}

module.exports = Pipeline;
