/**
* DevExtreme (esm/__internal/ui/button/__tests__/__mock__/model/button.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
const CLASSES = {
  stateDisabled: 'dx-state-disabled'
};
export class ButtonModel {
  constructor(root) {
    this.root = root;
  }
  getElement() {
    return this.root;
  }
  isDisabled() {
    return this.root.classList.contains(CLASSES.stateDisabled);
  }
}
