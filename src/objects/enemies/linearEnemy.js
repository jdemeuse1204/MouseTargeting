import './linearEnemy.less';
import Helpers from '../../common/jQueryHelpers';
import HitBox from '../../common/hitBox';

export default class LinearEnemy {

  canvasSelector = undefined;
  canvasElement = undefined;
  helpers = undefined;
  hitPoints = 0;
  interval = 0;

  constructor(hitPoints) {
    this.hitPoints = hitPoints;
    this.helpers = new Helpers();
  }

  create(canvasSelector) {
    this.canvasSelector = canvasSelector;
    this.canvasElement = $(canvasSelector);

    const elementHtml = '<span class="linearEnemy"></span>';

    // add element to the dom
    $(elementHtml).appendTo(this.canvasElement);
  }

  takeDamage() {
    this.hitPoints = this.hitPoints - 1;
    return this.hitPoints > 0;
  }

  destroy() {
    $('.linearEnemy').remove();
  }

  location() {
    const enemyElementSelect = `${this.canvasSelector} .linearEnemy`;
    const top = this.helpers.getPixelSize(enemyElementSelect, 'top');
    const left = this.helpers.getPixelSize(enemyElementSelect, 'left');

    return {
      Y: top,
      X: left,
      hitBox: new HitBox(top, left + 30, top + 30, left)
    };
  }

  stop() {
    window.clearInterval(this.interval);
  }

  start(x, y, xMovePixels, yMovePixels) {
    const enemyElementSelect = `${this.canvasSelector} .linearEnemy`;
    const enemyElement = $(enemyElementSelect);

    enemyElement.css('top', y);
    enemyElement.css('left', x);

    this.interval = window.setInterval(() => {
      let left = 0;
      let top = 0;
      let hasXMovePixels = false;
      let hasYMovePixels = false;

      if (xMovePixels) {
        left = this.helpers.getPixelSize(enemyElementSelect, 'left');
        hasXMovePixels = true;
      }

      if (yMovePixels) {
        top = this.helpers.getPixelSize(enemyElementSelect, 'top');
        hasYMovePixels = true;
      }

      if ((left <= 0 && hasXMovePixels) || (top <= 0 && hasYMovePixels)) {
        window.clearInterval(this.interval);
      } else {
        if (hasXMovePixels) {
          enemyElement.css('left', left + xMovePixels);
        }

        if (hasYMovePixels) {
          enemyElement.css('top', top + yMovePixels);
        }
      }
    }, 10);
  }
}
