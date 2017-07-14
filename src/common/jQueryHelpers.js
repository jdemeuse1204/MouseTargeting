export default class jQueryHelpers {

  constructor() {
  }

  getPixelSize(selector, cssProperty) {
    const size = $(selector).css(cssProperty).replaceAll('px', '');

    return window.parseFloat(size);
  }
}
