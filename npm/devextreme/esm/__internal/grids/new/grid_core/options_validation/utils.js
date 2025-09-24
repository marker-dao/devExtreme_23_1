/**
* DevExtreme (esm/__internal/grids/new/grid_core/options_validation/utils.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import errors from '../../../../../ui/widget/ui.errors';
export const throwError = (errorCode, message) => {
  throw errors.Error(errorCode, message);
};
