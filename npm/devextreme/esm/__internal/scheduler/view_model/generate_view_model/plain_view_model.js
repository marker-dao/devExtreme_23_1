/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/plain_view_model.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
export const plainViewModel = viewModel => viewModel.flatMap(appointment => appointment.settings.map(setting => _extends({}, setting, {
  itemData: appointment.itemData
})));
