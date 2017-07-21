export default class Weapon {

  magazineSize = 0;
  roundsInMagazine = 0;

  constructor(magazineSize) {
    this.magazineSize = magazineSize;
    this.roundsInMagazine = magazineSize;
  }


  fire() {
    if (this.roundsInMagazine === 0) {
      return false;
    }

    this.roundsInMagazine--;

    return true;
  }

  reload() {
    this.roundsInMagazine = this.magazineSize;
  }
}
