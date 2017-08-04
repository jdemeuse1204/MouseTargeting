import './stats.less';
import { DialogController } from 'aurelia-dialog';
import { inject } from 'aurelia-dependency-injection';

@inject(DialogController)
export default class StatsModal {

  controller = null;
  model = null;

  constructor(controller) {
    this.controller = controller;
  }

  activate(model) {
    this.model = model;
  }

  allTests() {
    this.controller.ok();
    window.location.href = '/#/Tests/All';
  }

  nextTest() {
    this.controller.ok();
    window.location.href = this.model.nextTestLocationHref;
  }

  restart() {
    this.controller.ok();
    window.location.reload();
  }
}
