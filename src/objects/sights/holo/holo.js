import './holo.less';
import Sight from '../sight';

export default class Holo extends Sight {

  constructor(recoil) {
    super(recoil);
    this.sightClassName = 'holoSight';
    this.cursorHtml = `<span class="${this.sightClassName}"><span class="reticle"></span></span>`;
  }
}
