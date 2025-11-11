/**
* DevExtreme (esm/__internal/ui/__tests__/__mock__/model/toast.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Toast from '../../../../../ui/toast';
export class ToastModel {
  constructor(root) {
    this.root = root;
  }
  getElement() {
    return this.root;
  }
  getInstance() {
    return Toast.getInstance(this.root);
  }
}
