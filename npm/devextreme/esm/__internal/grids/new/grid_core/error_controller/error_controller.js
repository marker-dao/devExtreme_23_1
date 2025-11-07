/**
* DevExtreme (esm/__internal/grids/new/grid_core/error_controller/error_controller.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { signal } from '../../../../core/state_manager/index';
export class ErrorController {
  constructor() {
    this._errors = signal([]);
    this.errors = this._errors;
    this.counter = 0;
  }
  showError(error) {
    this._errors.value = [...this._errors.peek(), {
      text: error,
      id: this.counter
    }];
    this.counter += 1;
  }
  removeError(index) {
    const newErrors = this._errors.peek().slice();
    newErrors.splice(index, 1);
    this._errors.value = newErrors;
  }
}
ErrorController.dependencies = [];
