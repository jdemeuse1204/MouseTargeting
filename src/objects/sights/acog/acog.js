import './acog.less';
import Sight from '../sight';

export default class Acog extends Sight {

  constructor(recoil) {
    super(recoil);
    this.sightClassName = 'acog';
    this.cursorHtml = `<span class="${this.sightClassName}"><span class="reticleOne"></span><span class="reticleTwo"></span></span>`;
  }
}
