import './holo.less';
import Helpers from '../../common/jQueryHelpers';

export default class Holo {

  canvasSelector = undefined;
  helpers = undefined;
  recoil = undefined;
  xOffset = 0;
  yOffset = 0;

  constructor(recoil) {
    this.helpers = new Helpers();
    this.recoil = recoil;
  }

  create(canvasSelector, xOffset, yOffset) {
    this.yOffset = yOffset;
    this.xOffset = xOffset;
    this.canvasSelector = canvasSelector;

    const element = $(canvasSelector);
    const cursorHtml = '<span class="holoSight"><span class="reticle"></span></span>';

    // add element to the dom
    $(cursorHtml).appendTo(element);

    const cursor = $('.page-host .holoSight');
    const that = this;

    element.mousemove((e) => {
      cursor.css('top', (e.pageY - that.yOffset));
      cursor.css('left', (e.pageX - that.xOffset));
    });
  }

  processRecoil() {
    if (this.recoil === undefined) {
      return;
    }

    const result = this.recoil.compute();
    const cursorSelector = '.page-host .holoSight';
    const cursor = $(cursorSelector);

    this.xOffset += result.x;
    this.yOffset += result.y;

    const top = this.helpers.getPixelSize(cursorSelector, 'top');
    const left = this.helpers.getPixelSize(cursorSelector, 'left');

    cursor.css('top', (top + result.y));
    cursor.css('left', (left + result.x));
  }

  destroy() {
    $('.page-host .holoSight').remove();
  }

  location() {
    const enemyElementSelect = `${this.canvasSelector} .holoSight`;
    const top = this.helpers.getPixelSize(enemyElementSelect, 'top');
    const left = this.helpers.getPixelSize(enemyElementSelect, 'left');

    return {
      Y: top,
      X: left,
      reticle: {
        Y: top + 15,
        X: left + 15
      }
    };
  }
}
