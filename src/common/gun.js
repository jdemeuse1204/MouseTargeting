export default class Gun {

  currentMagazine = undefined;
  gunName = undefined;
  magazineSize = undefined;

  constructor(gunName, magazineSize) {
    this.gunName = gunName;
    this.magazineSize = magazineSize;
    this.currentMagazine = this.magazineSize;
  }

  shoot() {
    if (this.currentMagazine === -1) {
      return true; // infinite bullets
    }

    if (this.currentMagazine === 0) {
      return false;
    }

    this.currentMagazine--;
    return true;
  }

  reload() {
    this.currentMagazine = this.magazineSize;
  }
}
