import './redDot.less';
import Sight from '../sight';

export default class RedDot extends Sight {

  constructor(recoil) {
    super(recoil);
    this.sightClassName = 'redDot';
    this.cursorHtml = `<span class="${this.sightClassName}"></span>`;
  }
}
