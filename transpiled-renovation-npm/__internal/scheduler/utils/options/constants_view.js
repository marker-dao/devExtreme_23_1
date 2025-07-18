"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_TYPES = exports.VIEWS = exports.DEFAULT_VIEW_OPTIONS = void 0;
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _m_inflector = require("../../../core/utils/m_inflector");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VIEWS = exports.VIEWS = {
  DAY: 'day',
  WEEK: 'week',
  WORK_WEEK: 'workWeek',
  MONTH: 'month',
  TIMELINE_DAY: 'timelineDay',
  TIMELINE_WEEK: 'timelineWeek',
  TIMELINE_WORK_WEEK: 'timelineWorkWeek',
  TIMELINE_MONTH: 'timelineMonth',
  AGENDA: 'agenda'
};
const VIEW_TYPES = exports.VIEW_TYPES = Object.values(VIEWS);
const getName = type => _message.default.format(`dxScheduler-switcher${(0, _m_inflector.camelize)(type, true)}`);
const getView = (type, groupOrientation) => ({
  groupOrientation,
  intervalCount: 1,
  name: getName(type),
  type
});
const DEFAULT_VIEW_OPTIONS = exports.DEFAULT_VIEW_OPTIONS = {
  day: getView('day', 'horizontal'),
  week: getView('week', 'horizontal'),
  workWeek: getView('workWeek', 'horizontal'),
  month: getView('month', 'horizontal'),
  timelineDay: getView('timelineDay', 'vertical'),
  timelineWeek: getView('timelineWeek', 'vertical'),
  timelineWorkWeek: getView('timelineWorkWeek', 'vertical'),
  timelineMonth: getView('timelineMonth', 'vertical'),
  agenda: {
    agendaDuration: 7,
    intervalCount: 1,
    name: getName('agenda'),
    type: 'agenda'
  }
};