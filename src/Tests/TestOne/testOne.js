/* beautify preserve:start */
import './testOne.less';
import jQueryHelpers from '../../common/jQueryHelpers';
import ObjectBuilder from '../../common/objectBuilder';
import { inject } from 'aurelia-dependency-injection';
import HoloSight from '../../objects/sights/holo/holo';
import AcogSight from '../../objects/sights/acog/acog';
import RedDotSight from '../../objects/sights/redDot/redDot';
import LinearEnemy from '../../objects/enemies/linearEnemy';
import { DialogService } from 'aurelia-dialog';
import { shootingScore } from '../../common/score';
import Recoil from '../../objects/sights/recoil';
import Timer from '../../common/timer';
import { PLATFORM } from 'aurelia-pal';
import { default as ButtonListener, buttons } from '../../common/buttonListener';
import { countdown } from '../../common/overlays';
import TestBase from '../testBase';
//import Slider from 'bootstrap-slider';
/* beautify preserve:end */

@inject(jQueryHelpers, ObjectBuilder, DialogService, Timer)
export default class TestOne extends TestBase {

  showDetailsDisplay = 'block';
  showShootingRangeDisplay = 'none';
  dialogService = null;

  constructor(helpers, objectHelper, dialogService, timer) {
    super(helpers, objectHelper, timer, null, new Recoil(1, 1));
    this.dialogService = dialogService;
    this.shootingRangeId = '#testOneShootingRange';
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

  settings() {
    this.dialogService.open({
      viewModel: PLATFORM.moduleName('modals/settings'),
      model: {}
    }).then(response => {

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

    countdown(3, 'Starting in ').then(() => {
      const listener = new ButtonListener('body');

      listener.listenOnce(buttons['0'], () => {
        console.log(0);
      });

      listener.listenOnce(buttons['1'], () => {
        console.log(1);
      });

      // start the timer
      that.timer.start();

      // create test objects
      that.sight = new AcogSight(that.recoil);
      //that.sight = new RedDotSight(that.recoil);
      that.enemy = new LinearEnemy(4, 800, 0);
      that.enemy.create('#testOneShootingRange');
      that.sight.create('#testOneShootingRange');
      that.enemy.start(0, 200, 0.5);

      // this.objectHelper.build(w => {}).build(w => {
      //   // reset the score
      //   this.time = '';
      //   this.shotsFired = 0;
      //   this.shotsHit = 0;
      //   this.score = 0;

      //   // start the timer
      //   this.timer.start();

      //   // create test objects
      //   this.sight = new HoloSight(this.recoil);
      //   this.enemy = new LinearEnemy(4, 800, 0);
      //   this.enemy.create('#testOneShootingRange');
      //   this.sight.create('#testOneShootingRange', 16, 400);
      //   this.enemy.start(0, 200, 0.5);
      // }, 2000).compile().clear();
    });
  }
}
