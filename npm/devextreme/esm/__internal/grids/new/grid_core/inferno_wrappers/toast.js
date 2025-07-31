/**
* DevExtreme (esm/__internal/grids/new/grid_core/inferno_wrappers/toast.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxToast from '../../../../../ui/toast';
import { InfernoWrapper } from './widget_wrapper';
export class Toast extends InfernoWrapper {
  getComponentFabric() {
    return dxToast;
  }
}
