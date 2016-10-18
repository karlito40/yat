'use strict';

class Pipeline {

  constructor(middlewares, onComplete, scope) {
    this.middlewares = middlewares;
    this.onComplete = onComplete;
    this.scope = scope;
    this.iterator = 0;
  }

  execute() {
    if(!this.middlewares[this.iterator]) {
      return (this.onComplete || function(){})();
    }
    this.middlewares[this.iterator].call(this.scope, this.next.bind(this));
  }

  next() {
    this.iterator++;
    this.execute();
  }

  reset() {
    this.iterator = 0;
    this.execute();
  }
}

module.exports = Pipeline;
