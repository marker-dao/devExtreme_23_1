/**
* DevExtreme (cjs/__internal/scheduler/workspaces/m_work_space_work_week.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _index = require("../../scheduler/r1/utils/index");
var _constants_view = require("../utils/options/constants_view");
var _m_work_space_week = _interopRequireDefault(require("./m_work_space_week"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const WORK_WEEK_CLASS = 'dx-scheduler-work-space-work-week';
class SchedulerWorkSpaceWorkWeek extends _m_work_space_week.default {
  get type() {
    return _constants_view.VIEWS.WORK_WEEK;
  }
  constructor() {
    // @ts-expect-error
    super(...arguments);
    this._getWeekendsCount = _index.getWeekendsCount;
  }
  _getElementClass() {
    return WORK_WEEK_CLASS;
  }
}
(0, _component_registrator.default)('dxSchedulerWorkSpaceWorkWeek', SchedulerWorkSpaceWorkWeek);
var _default = exports.default = SchedulerWorkSpaceWorkWeek;
