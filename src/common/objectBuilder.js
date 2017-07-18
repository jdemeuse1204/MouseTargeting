export default class ObjectBuilder {

  functions = [];
  runFunctions = [];

  constructor() {

  }

  build(fn, waitMilliseconds) {
    this.functions.push(functionBuilder(fn, waitMilliseconds, this.functions.length));
    return this;
  }

  clear() {
    const that = this;
    const fn = () => {
      that.functions = [];
    };
    this.functions.push(functionBuilder(fn, undefined, this.functions.length));
  }

  compile() {
    const that = this;
    for (let item of this.functions) {
      this.runFunctions.push(item.id);
      if (item.type === fnTypes.wait) {
        that.functions = this.functions.filter(w => this.runFunctions.includes(w.id) === false);
        const waitFn = item.fn;
        window.setTimeout(() => {
          waitFn();
          that.compile();
        }, item.wait);
        break;
      }
      item.fn();
    }
    return this;
  }
}

const functionBuilder = (fn, waitMilliseconds, id) => {
  return {
    fn,
    wait: waitMilliseconds,
    type: waitMilliseconds ? fnTypes.wait : fnTypes.immediate,
    id
  };
};

const fnTypes = {
  wait: 'Wait',
  immediate: 'Immediate'
};
