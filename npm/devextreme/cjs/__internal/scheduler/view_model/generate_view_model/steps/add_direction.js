/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/add_direction.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDirection = void 0;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const addDirection = (entities, allDayPanelDirection, regularPanelDirection) => entities.map(entity => _extends({}, entity, {
  direction: entity.isAllDayPanelOccupied ? allDayPanelDirection : regularPanelDirection
}));
exports.addDirection = addDirection;
