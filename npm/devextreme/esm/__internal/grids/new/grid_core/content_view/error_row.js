/**
* DevExtreme (esm/__internal/grids/new/grid_core/content_view/error_row.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { Toast } from '../../../../grids/new/grid_core/inferno_wrappers/toast';
import { Component, createRef } from 'inferno';
export const CLASSES = {
  errorRow: 'dx-gridcore-error-row'
};
export class ErrorRow extends Component {
  constructor() {
    super(...arguments);
    this.ref = createRef();
    this.toastRef = createRef();
  }
  render() {
    const lastError = this.props.errors.at(-1);
    return createVNode(1, "div", CLASSES.errorRow, this.props.enabled && lastError && createComponentVNode(2, Toast, {
      "componentRef": this.toastRef,
      "visible": true,
      "message": lastError.text,
      "type": 'error'
    }, lastError.id), 0, null, null, this.ref);
  }
  componentDidUpdate() {
    var _this$toastRef$curren;
    (_this$toastRef$curren = this.toastRef.current) === null || _this$toastRef$curren === void 0 || _this$toastRef$curren.option('position', {
      my: 'bottom',
      at: 'bottom',
      of: this.ref.current
    });
  }
}
