export default class TestBase {

  sight = null;
  enemy = null;
  weapon = null;
  recoil = null;

  time = '';
  shotsFired = 0;
  shotsHit = 0;
  score = 0;

  timer = null;
  helpers = null;
  objectHelper = null;
  shootingRangeId = '';

  constructor(helpers, objectHelper, timer, weapon, recoil) {
    this.helpers = helpers;
    this.objectHelper = objectHelper;
    this.timer = timer;
    this.weapon = weapon;
    this.recoil = recoil;
  }

  attached() {
    const shootingRangeElement = $(this.shootingRangeId);
    shootingRangeElement.on('contextmenu', () => false);
    shootingRangeElement.on('mousedown', e => {
      switch (e.which) {
      case 1: // left mouse button
        this.leftClick(e);
        break;
      case 2: // middle mouse button
        break;
      case 3: // right mouse button
        this.rightClick(e);
        break;
      default:
        alert('You have a strange Mouse!');
        break;
      }
    });
  }
}
