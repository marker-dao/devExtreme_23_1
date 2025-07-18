/**
* DevExtreme (esm/__internal/grids/new/grid_core/content_view/error_row.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../../../core/r1/runtime/inferno/index';
import { Toast } from '../../../../grids/new/grid_core/inferno_wrappers/toast';
import { createRef } from 'inferno';
import { wrapRef } from '../inferno_wrappers/utils';
export const CLASSES = {
  errorRow: 'dx-gridcore-error-row'
};
export class ErrorRow extends BaseInfernoComponent {
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
      "type": 'error',
      "position": {
        my: 'bottom',
        at: 'bottom',
        // @ts-expect-error
        of: wrapRef(this.ref)
      }
    }, lastError.id), 0, null, null, this.ref);
  }
}
