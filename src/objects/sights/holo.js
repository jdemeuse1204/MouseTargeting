import './holo.less';
import Helpers from '../../common/jQueryHelpers';

export default class Holo {

  canvasSelector = undefined;
  helpers = undefined;

  constructor() {
    this.helpers = new Helpers();
  }

  create(canvasSelector) {
    this.canvasSelector = canvasSelector;

    const element = $(canvasSelector);
    const cursorHtml = '<span class="holoSight"><span class="reticle"></span></span>';

    // add element to the dom
    $(cursorHtml).appendTo(element);

    const cursor = $('.page-host .holoSight');

    element.mousemove((e) => {
      cursor.css('top', (e.pageY - 156));
      cursor.css('left', (e.pageX - 16));
    });
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
