'use strict';

class Pipeline {

  constructor(middlewares) {
    this.middlewares = middlewares;
    this.iterator = 0;
  }

  execute() {
    if(!this.middlewares[this.iterator]) {
      return;
    }

    this.middlewares[this.iterator](this.next.bind(this));
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
