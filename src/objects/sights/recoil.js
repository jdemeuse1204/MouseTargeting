import { number } from '../../common/Random';

export default class Recoil {

  verticalRecoilDifficulity = 0;
  horizontalRecoilDifficulty = 0;
  lastNumbers = [];

  constructor(verticalRecoilDifficulity, horizontalRecoilDifficulty) {
    this.verticalRecoilDifficulity = verticalRecoilDifficulity;
    this.horizontalRecoilDifficulty = horizontalRecoilDifficulty;
  }

  processRecoil(difficulty) {
    switch (difficulty) {
      case 1:
        return number(0, 2);
      case 2:
        return number(1, 2);
      case 3:
        return number(2, 4);
      case 4:
        return number(2, 5);
      case 5:
        return number(3, 6);
      case 6:
        return number(3, 7);
      case 7:
        return number(4, 8);
      case 8:
        return number(4, 9);
      case 9:
        return number(5, 10);
      case 10:
        return number(6, 12);
      default:
        throw new Exception('Difficulty not valid');
    }
  }

  compute() {
    let xRecoil = 0;
    let yRecoil = 0;

    if (this.verticalRecoilDifficulity !== 0) {
      // process vertical recoil
      yRecoil = -this.processRecoil(this.verticalRecoilDifficulity);
    }

    if (this.horizontalRecoilDifficulty !== 0) {
      // process horizontal recoil
      xRecoil = this.processRecoil(this.horizontalRecoilDifficulty);

      this.lastRecoilNumber = Math.floor(Math.random() * 20) + 1;
      this.lastNumbers.push(this.lastRecoilNumber);

      if (this.lastNumbers.length > 2) {
        // remove number
        this.lastNumbers.pop();
      }

      if (this.lastNumbers.length === 2) {
        const lessThan = this.lastNumbers.filter(x => x <= 10); // left - positive
        const greaterThan = this.lastNumbers.filter(x => x > 10); // right - negative

        if (lessThan.length === 2) {
          this.lastNumbers.pop();
          this.lastNumbers.push(20);

          if (xRecoil !== 0) {
            xRecoil = -xRecoil;
          }
        }

        if (greaterThan.length === 2) {
          this.lastNumbers.pop();
          this.lastNumbers.push(1);
          xRecoil = Math.abs(xRecoil);
        }
      } else {
        if (this.lastRecoilNumber > 10 && xRecoil !== 0) {
          xRecoil = -xRecoil;
        }
      }
    }

    return {
      x: xRecoil,
      y: yRecoil
    };
  }
}
