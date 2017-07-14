export default class ObjectBuilder {

  functions = [];

  constructor() {

  }

  build(fn) {
    this.functions.push(fn);
    return this;
  }

  clear() {
    this.functions = [];
  }

  compile() {
    for (let fn of this.functions) {
      fn();
    }
  }
}
