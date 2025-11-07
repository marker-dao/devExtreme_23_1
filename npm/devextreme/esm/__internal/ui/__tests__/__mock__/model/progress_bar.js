/**
* DevExtreme (esm/__internal/ui/__tests__/__mock__/model/progress_bar.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
const CLASSES = {
  stateInvisible: 'dx-state-invisible'
};
export class ProgressBarModel {
  constructor(root) {
    this.root = root;
  }
  getElement() {
    return this.root;
  }
  isVisible() {
    return !this.root.classList.contains(CLASSES.stateInvisible);
  }
}
