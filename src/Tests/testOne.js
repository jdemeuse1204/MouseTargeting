/* beautify preserve:start */
import './testOne.less';
import jQueryHelpers from '../common/jQueryHelpers';
import ObjectBuilder from '../common/objectBuilder';
import { inject } from 'aurelia-dependency-injection';
import HoloSight from '../objects/sights/holo';
import LinearEnemy from '../objects/enemies/linearEnemy';
import moment from 'moment';
/* beautify preserve:end */

@inject(jQueryHelpers, ObjectBuilder)
export default class TestOne {


  //

  helpers = null;
  objectHelper = null;
  sight = null;
  enemy = null;
  testStart = null;
  testEnd = null;
  time = '';
  shotsFired = 0;
  shotsHit = 0;

  constructor(helpers, objectHelper) {
    this.helpers = helpers;
    this.objectHelper = objectHelper;
  }

  leftClick() {
    if (!this.enemy) {
      return;
    }
    this.shotsFired++;
    const enemyLocation = this.enemy.location();
    const sightLocation = this.sight.location();

    if (enemyLocation.hitBox.isHit(sightLocation.reticle.X, sightLocation.reticle.Y)) {
      this.shotsHit++;
      if (this.enemy.takeDamage() === false) {
        // end the test
        this.testEnd = new Date();
        this.time = moment(this.testEnd).diff(moment(this.testStart), 'milliseconds');
        this.enemy.stop();
        this.enemy.destroy();
        this.enemy = null;
      }
    }
  }

  rightClick() {

  }

  attached() {
    $('.shootingRange').on('contextmenu', () => false);
    $('.shootingRange').on('mousedown', (e) => {
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
    this.objectHelper.build(w => {
      this.sight = new HoloSight();
      this.enemy = new LinearEnemy(4);
      this.enemy.create('.shootingRange');
      this.enemy.start(600, 600, -0.5);

      // start the test
      this.testStart = new Date();
      this.sight.create('.shootingRange');
    }).build(w => 3 === 1).build(w => 5 === 1).compile();
  }
}
