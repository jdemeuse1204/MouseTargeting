import Helpers from '../../common/jQueryHelpers';

export default class Sight {

  canvasSelector = undefined;
  helpers = undefined;
  recoil = undefined;
  xOffset = 0;
  yOffset = 0;
  sightClassName = '';
  cursorHtml = '';

  constructor(recoil) {
    this.helpers = new Helpers();
    this.recoil = recoil;
  }

  create(canvasSelector) {
    this.canvasSelector = canvasSelector;

    const element = $(canvasSelector);

    // add element to the dom
    $(this.cursorHtml).appendTo(element);

    const canvas = document.getElementById('testOneShootingRange');
    const cursorSelector = `.page-host .${this.sightClassName}`;
    const cursor = $(cursorSelector);
    const rect = canvas.getBoundingClientRect();
    const cursorHeight = this.helpers.getPixelSize(cursorSelector, 'height') / 2;
    const cursorWidth = this.helpers.getPixelSize(cursorSelector, 'width') / 2;
    const that = this;

    element.mousemove((e) => {
      cursor.css('top', (e.clientY - rect.top - cursorHeight) + that.yOffset);
      cursor.css('left', (e.clientX - rect.left - cursorWidth) + that.xOffset);
    });
  }

  resetRecoil() {
    this.yOffset = 0;
    this.xOffset = 0;
  }

  processRecoil() {
    if (this.recoil === undefined) {
      return;
    }

    const result = this.recoil.compute();
    const cursorSelector = `.page-host .${this.sightClassName}`;
    const cursor = $(cursorSelector);

    this.xOffset += result.x;
    this.yOffset += result.y;

    const top = this.helpers.getPixelSize(cursorSelector, 'top');
    const left = this.helpers.getPixelSize(cursorSelector, 'left');

    cursor.css('top', (top + result.y));
    cursor.css('left', (left + result.x));
  }

  destroy() {
    $(`.page-host .${this.sightClassName}`).remove();
  }

  location() {
    const enemyElementSelect = `${this.canvasSelector} .${this.sightClassName}`;
    const cursorSelector = `.page-host .${this.sightClassName}`;
    const top = this.helpers.getPixelSize(enemyElementSelect, 'top');
    const left = this.helpers.getPixelSize(enemyElementSelect, 'left');
    const cursorHeight = this.helpers.getPixelSize(cursorSelector, 'height') / 2;
    const cursorWidth = this.helpers.getPixelSize(cursorSelector, 'width') / 2;

    return {
      Y: top,
      X: left,
      reticle: {
        Y: top + cursorHeight,
        X: left + cursorWidth
      }
    };
  }
}
