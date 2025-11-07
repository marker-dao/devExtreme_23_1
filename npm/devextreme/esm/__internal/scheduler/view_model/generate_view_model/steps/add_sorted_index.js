/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/add_sorted_index.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
export const addSortedIndex = entities => entities.map((entity, index) => _extends({}, entity, {
  sortedIndex: index
}));
