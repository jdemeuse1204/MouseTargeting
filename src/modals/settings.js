import './settings.less';
import { DialogController } from 'aurelia-dialog';
import { inject } from 'aurelia-dependency-injection';
import { buttons } from '../common/buttonListener';
import { buttonMap } from '../Tests/settings';

@inject(DialogController)
export default class SettingsModal {

  controller = null;
  model = null;
  selectableButtons = [];
  buttonSettings = buttonMap;

  constructor(controller) {
    this.controller = controller;

    for (let button in buttons) {
      this.selectableButtons.push({ name: button, value: buttons[button] });
    }
  }

  activate(model) {
    this.model = model;
  }

}
