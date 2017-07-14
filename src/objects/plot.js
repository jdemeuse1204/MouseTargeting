import './plot.less';

export default class Plot {
  add(canvasSelector, top, left, backgroundColor) {
    const element = $(canvasSelector);
    const point = $(`<span class="plotPoint" style="top: ${top}px;left: ${left}px; background-color: ${backgroundColor}"></span>`);

    // add element to the dom
    point.appendTo(element);
  }
}
