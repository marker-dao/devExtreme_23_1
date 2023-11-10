/**
* DevExtreme (renovation/ui/scheduler/appointment_edit_form/edit_form/layout_items/groups/switchGroup.js)
* Version: 23.2.2
* Build date: Fri Nov 10 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getSwitchGroupConfig = void 0;
var _const = require("../const");
var _switch = require("../switch");
const getSwitchGroupConfig = (allDayEditorTemplate, repeatEditorTemplate, allDayExpr) => ({
  itemType: 'group',
  colCountByScreen: {
    lg: 3,
    xs: 3
  },
  colSpan: 2,
  items: [(0, _switch.getSwitchLayoutItemConfig)(allDayEditorTemplate, allDayExpr, _const.ItemLabels.allDay), (0, _switch.getSwitchLayoutItemConfig)(repeatEditorTemplate, 'repeat', _const.ItemLabels.repeat), {
    itemType: 'empty',
    colSpan: 2
  }]
});
exports.getSwitchGroupConfig = getSwitchGroupConfig;
