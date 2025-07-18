"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getViewDataGeneratorByViewType = void 0;
var _constants_view = require("../../../utils/options/constants_view");
var _m_view_data_generator = require("../m_view_data_generator");
var _m_view_data_generator_day = require("../m_view_data_generator_day");
var _m_view_data_generator_month = require("../m_view_data_generator_month");
var _m_view_data_generator_timeline_month = require("../m_view_data_generator_timeline_month");
var _m_view_data_generator_week = require("../m_view_data_generator_week");
var _m_view_data_generator_work_week = require("../m_view_data_generator_work_week");
const getViewDataGeneratorByViewType = viewType => {
  switch (viewType) {
    case _constants_view.VIEWS.MONTH:
      return new _m_view_data_generator_month.ViewDataGeneratorMonth(viewType);
    case _constants_view.VIEWS.TIMELINE_MONTH:
      return new _m_view_data_generator_timeline_month.ViewDataGeneratorTimelineMonth(viewType);
    case _constants_view.VIEWS.DAY:
    case _constants_view.VIEWS.TIMELINE_DAY:
      return new _m_view_data_generator_day.ViewDataGeneratorDay(viewType);
    case _constants_view.VIEWS.WEEK:
    case _constants_view.VIEWS.TIMELINE_WEEK:
      return new _m_view_data_generator_week.ViewDataGeneratorWeek(viewType);
    case _constants_view.VIEWS.WORK_WEEK:
    case _constants_view.VIEWS.TIMELINE_WORK_WEEK:
      return new _m_view_data_generator_work_week.ViewDataGeneratorWorkWeek(viewType);
    default:
      return new _m_view_data_generator.ViewDataGenerator(viewType);
  }
};
exports.getViewDataGeneratorByViewType = getViewDataGeneratorByViewType;