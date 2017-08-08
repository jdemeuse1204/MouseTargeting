/* beautify preserve:start */
import {PLATFORM} from 'aurelia-pal';
import './index.less';
/* beautify preserve:end */

export class App {

  constructor() {
    Object.defineProperty(String.prototype, 'replaceAll', {
      value(oldValue, newValue) {
        return this.replace(new RegExp(oldValue, 'g'), newValue);
      }
    });
  }

  configureRouter(config, router) {
    /* beautify preserve:start */
    config.title = 'Mouse Keyboard Trainer';
    config.map([
      { route: ['', 'home'], name: 'home',      moduleId: PLATFORM.moduleName('./home'),      nav: true, title: 'Home' },
      { route: 'Tests/TestOne/testOne', name: 'testOne',      moduleId: PLATFORM.moduleName('./Tests/TestOne/testOne'),      nav: true, title: 'Test One' },
      { route: 'Tests/TestSix/testSix', name: 'testSix',      moduleId: PLATFORM.moduleName('./Tests/TestSix/testSix'),      nav: true, title: 'Test Six' },
      { route: 'Tests/GunRange/gunRange', name: 'gunRange',      moduleId: PLATFORM.moduleName('./Tests/GunRange/gunRange'),      nav: true, title: 'Gun Range' },

      { route: 'Tests/All', name: 'allTests',      moduleId: PLATFORM.moduleName('./Tests/allTests'),      nav: true, title: 'All Tests' }
    ]);
    /* beautify preserve:end */
    this.router = router;
  }
}
