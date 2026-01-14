/**
* DevExtreme (esm/__internal/ui/__tests__/__mock__/model/toast.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
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
