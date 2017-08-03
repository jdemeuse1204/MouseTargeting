/* beautify preserve:start */
import './gunRange.less';
import jQueryHelpers from '../../common/jQueryHelpers';
import ObjectBuilder from '../../common/objectBuilder';
import { inject } from 'aurelia-dependency-injection';
import HoloSight from '../../objects/sights/holo/holo';
import RedDotSight from '../../objects/sights/redDot/redDot';
import LinearEnemy from '../../objects/enemies/linearEnemy';
import { DialogService } from 'aurelia-dialog';
import { shootingScore } from '../../common/score';
import Recoil from '../../objects/sights/recoil';
import Timer from '../../common/timer';
import { PLATFORM } from 'aurelia-pal';
import { default as ButtonListener, buttons } from '../../common/buttonListener';
import { countdown } from '../../common/overlays';
import { buttonMap } from '../settings';
//import Slider from 'bootstrap-slider';
/* beautify preserve:end */

@inject(jQueryHelpers, ObjectBuilder, DialogService, Timer)
export default class GunRange {

  sight = null;
  enemy = null;
  showDetailsDisplay = 'block';
  showShootingRangeDisplay = 'none';
  isListening = false;

  time = '';
  shotsFired = 0;
  shotsHit = 0;
  score = 0;

  timer = null;
  helpers = null;
  objectHelper = null;
  dialogService = null;
  recoil = null;

  constructor(helpers, objectHelper, dialogService, timer) {
    this.helpers = helpers;
    this.objectHelper = objectHelper;
    this.dialogService = dialogService;
    this.timer = timer;
    this.recoil = new Recoil(1, 1);
  }

  missed(message) {
    console.log(message);
  }

  leftClick() {
    if (!this.enemy) {
      return;
    }
    this.shotsFired++;
    const enemyLocation = this.enemy.location();
    const sightLocation = this.sight.location();
    this.sight.processRecoil();

    if (enemyLocation.hitBox.isHit(sightLocation.reticle.X, sightLocation.reticle.Y)) {
      this.shotsHit++;
      if (this.enemy.takeDamage() === false) {
        // end the test
        this.time = this.timer.getTime();
        this.timer.reset();
        this.enemy.stop();
        this.enemy.destroy();
        this.sight.destroy();
        this.sight = null;
        this.enemy = null;
        this.score = shootingScore(this.shotsFired, this.shotsHit, this.time);

        // score
        const modalModel = {
          statsHtml: '<div class="row">' +
            `<div><label>Time:</label>&nbsp;${this.time} milliseconds</div>` +
            '<h4>Shooting</h4>' +
            `<div><label>Hit:</label>&nbsp;${this.shotsHit}</div>` +
            `<div><label>Missed:</label>&nbsp;${(this.shotsFired - this.shotsHit)}</div>` +
            `<div><label>Total:</label>&nbsp;${this.shotsFired}</div>` +
            `<div><label>Accuracy:</label>&nbsp;${(this.shotsHit / this.shotsFired) * 100}%</div>` +
            '</div>' +
            '<h3>' +
            `Total Rank:&nbsp;${this.score}` +
            '</h3>',
          testName: 'Test #1 Results'
        };
        this.dialogService.open({
          viewModel: PLATFORM.moduleName('modals/stats'),
          model: modalModel
        }).then(response => {

        });
      }
    }
  }

  rightClick() {

  }

  attached() {
    // const slider = new Slider('#difficulty', {
    //   formatter: (value) => {
    //     return 'Current value: ' + value;
    //   }
    // });

    $('#testOneShootingRange').on('contextmenu', () => false); // disable right click
    $('#testOneShootingRange').on('mousedown', (e) => {
      switch (e.which) {
        case 1: // left mouse button
          this.leftClick();
          break;
        case 2: // middle mouse button
          break;
        case 3: // right mouse button
          this.rightClick();
          break;
        default:
          alert('You have a strange Mouse!');
          break;
      }
    });
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
    const listener = new ButtonListener('body');

    listener.listenOnceOrderedQueue([buttonMap.jump, buttonMap.crouch], () => {
      console.log('Down 0');
      that.isListening = true;
    }, () => {
      that.isListening = false;
      console.log('Up 0');
    }, (button) => {
      console.log('Missed Button');
      // missed
      that.missed(`Wrong button pressed${button}`);
    });

    // listener.listenOnce(buttons.a, () => {
    //   console.log('Down 1');
    //   that.isListening = true;
    // }, () => {
    //   console.log('Up 1');
    //   that.isListening = false;
    // }, () => {
    //   console.log('Missed Button');
    //   // missed
    // });

    // start the timer
    that.timer.start();

    // create test objects
    that.sight = new HoloSight(that.recoil);
    //that.sight = new RedDotSight(that.recoil);
    that.enemy = new LinearEnemy(4, 800, 0);
    that.enemy.create('#testOneShootingRange');
    that.sight.create('#testOneShootingRange');

    // countdown(5, 'Starting in ').then(() => {

    //   // that.enemy.start(0, 200, 0.5);

    //   // this.objectHelper.build(w => {}).build(w => {
    //   //   // reset the score
    //   //   this.time = '';
    //   //   this.shotsFired = 0;
    //   //   this.shotsHit = 0;
    //   //   this.score = 0;

    //   //   // start the timer
    //   //   this.timer.start();

    //   //   // create test objects
    //   //   this.sight = new HoloSight(this.recoil);
    //   //   this.enemy = new LinearEnemy(4, 800, 0);
    //   //   this.enemy.create('#testOneShootingRange');
    //   //   this.sight.create('#testOneShootingRange', 16, 400);
    //   //   this.enemy.start(0, 200, 0.5);
    //   // }, 2000).compile().clear();
    // });
  }
}
