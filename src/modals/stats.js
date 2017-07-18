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

}
