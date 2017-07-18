/* beautify preserve:start */
import './testOne.less';
import jQueryHelpers from '../../common/jQueryHelpers';
import ObjectBuilder from '../../common/objectBuilder';
import { inject } from 'aurelia-dependency-injection';
import HoloSight from '../../objects/sights/holo';
import LinearEnemy from '../../objects/enemies/linearEnemy';
import { DialogService } from 'aurelia-dialog';
import { shootingScore } from '../../common/score';
import Recoil from '../../objects/sights/recoil';
import moment from 'moment';
import { PLATFORM } from 'aurelia-pal';
//import Slider from 'bootstrap-slider';
/* beautify preserve:end */

@inject(jQueryHelpers, ObjectBuilder, DialogService)
export default class TestOne {

  sight = null;
  enemy = null;
  testStart = null;
  testEnd = null;

  time = '';
  shotsFired = 0;
  shotsHit = 0;
  score = 0;

  helpers = null;
  objectHelper = null;
  dialogService = null;
  recoil = null;

  constructor(helpers, objectHelper, dialogService) {
    this.helpers = helpers;
    this.objectHelper = objectHelper;
    this.dialogService = dialogService;
    this.recoil = new Recoil(1, 1);
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
        this.testEnd = new Date();
        this.time = moment(this.testEnd).diff(moment(this.testStart), 'milliseconds');
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

    $('#testOneShootingRange').on('contextmenu', () => false);
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
    this.time = '';
    this.shotsFired = 0;
    this.shotsHit = 0;
    this.score = 0;


    this.objectHelper.build(w => {
      this.sight = new HoloSight(this.recoil);
      this.enemy = new LinearEnemy(4, 800, 0);
      this.enemy.create('#testOneShootingRange');
      this.enemy.start(0, 200, 0.5);

      // start the test
      this.testStart = new Date();
      this.sight.create('#testOneShootingRange', 16, 400);
    }).build(w => {
      //alert('TimeOut1');
    }, 3000).build(w => {
      //alert('TimeOut2');
    }, 3000).compile().clear();
  }
}
