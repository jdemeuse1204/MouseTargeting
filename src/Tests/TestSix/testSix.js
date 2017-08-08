/* beautify preserve:start */
import './testSix.less';
import jQueryHelpers from '../../common/jQueryHelpers';
import ObjectBuilder from '../../common/objectBuilder';
import { inject } from 'aurelia-dependency-injection';
import { DialogService } from 'aurelia-dialog';
import Recoil from '../../objects/sights/recoil';
import Timer from '../../common/timer';
import { PLATFORM } from 'aurelia-pal';
import { default as ButtonListener } from '../../common/buttonListener';
import { buttonMap, buttonMapReverseNumbers } from '../settings';
import { countdown } from '../../common/overlays';
import TestBase from '../testBase';
//import Slider from 'bootstrap-slider';
/* beautify preserve:end */

@inject(jQueryHelpers, ObjectBuilder, DialogService, Timer)
export default class TestSix extends TestBase {

  showDetailsDisplay = 'block';
  showShootingRangeDisplay = 'none';
  dialogService = null;
  weaponOne = undefined;
  weaponTwo = undefined;
  buttonToPress = undefined;

  constructor(helpers, objectHelper, dialogService, timer) {
    super(helpers, objectHelper, timer, null, new Recoil(1, 1));
    this.dialogService = dialogService;
    this.shootingRangeId = '#testOneShootingRange';
  }

  settings() {
    this.dialogService.open({
      viewModel: PLATFORM.moduleName('modals/settings'),
      model: {}
    }).then(response => {

    });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  start() {
    const that = this;
    this.showDetailsDisplay = 'none';
    this.showShootingRangeDisplay = 'block';

    // reset the score
    this.time = '';
    this.shotsFired = 0;
    this.shotsHit = 0;
    this.score = 0;
    const queue = [];
    for (let i = 0; i < 99; i++) {
      const rnd = this.getRandomInt(1, 17);
      const button = buttonMapReverseNumbers[rnd];

      if (!this.buttonToPress) {
        this.buttonToPress = button;
      }

      queue.push(buttonMap[button]);
    }
    let map = {};
    for (let button in buttonMap) {
      map[buttonMap[button]] = button;
    }

    countdown(3, 'Starting in ').then(() => {
      const listener = new ButtonListener('body');

      listener.listenOnceOrderedQueue(queue, (nextButton, buttonsLeft) => {
        that.buttonToPress = map[nextButton];
        console.log(buttonsLeft);
      }, () => {
        // button up
      }, () => {
        // missed button
      });
    });
  }
}
