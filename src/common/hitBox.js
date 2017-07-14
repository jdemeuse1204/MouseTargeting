export default class HitBox {

  left = 0;
  right = 0;
  bottom = 0;
  top = 0;

  constructor(top, right, bottom, left) {
    this.top = top;
    this.right = right;
    this.left = left;
    this.bottom = bottom;
  }


  isHit(x, y) {
    return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
  }
}
