/**
* DevExtreme (renovation/ui/scheduler/view_model/group_panel/utils.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getGroupPanelData = void 0;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const extendGroupItemsForGroupingByDate = (groupRenderItems, columnCountPerGroup) => [...new Array(columnCountPerGroup)].reduce((currentGroupItems, _, index) => groupRenderItems.map((groupsRow, rowIndex) => {
  const currentRow = currentGroupItems[rowIndex] || [];
  return [...currentRow, ...groupsRow.map((item, columnIndex) => _extends({}, item, {
    key: "".concat(item.key, "_group_by_date_").concat(index),
    isFirstGroupCell: columnIndex === 0,
    isLastGroupCell: columnIndex === groupsRow.length - 1
  }))];
}), []);
const getGroupPanelData = (groups, columnCountPerGroup, groupByDate, baseColSpan) => {
  let repeatCount = 1;
  let groupPanelItems = groups.map(group => {
    const result = [];
    const {
      data,
      items,
      name: resourceName
    } = group;
    for (let iterator = 0; iterator < repeatCount; iterator += 1) {
      result.push(...items.map((_ref, index) => {
        let {
          color,
          id,
          text
        } = _ref;
        return {
          id,
          text,
          color,
          key: "".concat(iterator, "_").concat(resourceName, "_").concat(id),
          resourceName,
          data: data === null || data === void 0 ? void 0 : data[index]
        };
      }));
    }
    repeatCount *= items.length;
    return result;
  });
  if (groupByDate) {
    groupPanelItems = extendGroupItemsForGroupingByDate(groupPanelItems, columnCountPerGroup);
  }
  return {
    groupPanelItems,
    baseColSpan
  };
};
exports.getGroupPanelData = getGroupPanelData;
