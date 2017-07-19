import moment from 'moment';

export default class Timer {

  startTime = undefined;
  stopTime = undefined;

  start() {
    this.startTime = moment().format();
  }

  stop() {
    this.stopTime = moment().format();
  }

  reset() {
    this.startTime = undefined;
    this.stopTime = undefined;
  }

  getTime() {
    return moment(this.stopTime).diff(moment(this.startTime), 'milliseconds');
  }
}
