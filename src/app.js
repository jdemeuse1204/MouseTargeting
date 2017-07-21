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
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'home'], name: 'home',      moduleId: PLATFORM.moduleName('./home'),      nav: true, title: 'Home' },
      { route: 'Tests/TestOne/testOne', name: 'testOne',      moduleId: PLATFORM.moduleName('./Tests/TestOne/testOne'),      nav: true, title: 'Test One' },
      { route: 'Tests/GunRange/gunRange', name: 'gunRange',      moduleId: PLATFORM.moduleName('./Tests/GunRange/gunRange'),      nav: true, title: 'Gun Range' }
    ]);
    /* beautify preserve:end */
    this.router = router;
  }
}
