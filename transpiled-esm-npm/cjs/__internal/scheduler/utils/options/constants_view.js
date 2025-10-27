"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_TYPES = exports.VIEWS = exports.DEFAULT_VIEW_OPTIONS = void 0;
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
const WEEKENDS = [0, 6];
const getView = function (type, groupOrientation) {
  let skippedDays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return {
    groupOrientation,
    intervalCount: 1,
    type,
    skippedDays
  };
};
const DEFAULT_VIEW_OPTIONS = exports.DEFAULT_VIEW_OPTIONS = {
  day: getView('day', 'horizontal'),
  week: getView('week', 'horizontal'),
  workWeek: getView('workWeek', 'horizontal', WEEKENDS),
  month: getView('month', 'horizontal'),
  timelineDay: getView('timelineDay', 'vertical'),
  timelineWeek: getView('timelineWeek', 'vertical'),
  timelineWorkWeek: getView('timelineWorkWeek', 'vertical', WEEKENDS),
  timelineMonth: getView('timelineMonth', 'vertical'),
  agenda: {
    agendaDuration: 7,
    intervalCount: 1,
    skippedDays: [],
    type: 'agenda'
  }
};