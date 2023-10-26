/**
* DevExtreme (bundles/__internal/scheduler/workspaces/view_model/m_view_data_generator_week.js)
* Version: 23.2.0
* Build date: Thu Oct 26 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewDataGeneratorWeek = void 0;
var _week = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/week");
var _m_view_data_generator = require("./m_view_data_generator");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
let ViewDataGeneratorWeek = /*#__PURE__*/function (_ViewDataGenerator) {
  _inheritsLoose(ViewDataGeneratorWeek, _ViewDataGenerator);
  function ViewDataGeneratorWeek() {
    var _this;
    _this = _ViewDataGenerator.apply(this, arguments) || this;
    _this.daysInInterval = 7;
    return _this;
  }
  var _proto = ViewDataGeneratorWeek.prototype;
  _proto._getIntervalDuration = function _getIntervalDuration(intervalCount) {
    return (0, _week.getIntervalDuration)(intervalCount);
  };
  _proto._calculateStartViewDate = function _calculateStartViewDate(options) {
    return (0, _week.calculateStartViewDate)(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount), this.getFirstDayOfWeek(options.firstDayOfWeek));
  };
  return ViewDataGeneratorWeek;
}(_m_view_data_generator.ViewDataGenerator);
exports.ViewDataGeneratorWeek = ViewDataGeneratorWeek;
