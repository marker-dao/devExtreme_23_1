"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorController = void 0;
var _signalsCore = require("@preact/signals-core");
class ErrorController {
  constructor() {
    this._errors = (0, _signalsCore.signal)([]);
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
exports.ErrorController = ErrorController;
ErrorController.dependencies = [];