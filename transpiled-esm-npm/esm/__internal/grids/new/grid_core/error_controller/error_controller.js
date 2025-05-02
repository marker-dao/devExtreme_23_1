import { signal } from '@preact/signals-core';
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