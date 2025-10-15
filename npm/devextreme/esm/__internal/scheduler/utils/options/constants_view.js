/**
* DevExtreme (esm/__internal/scheduler/utils/options/constants_view.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../../../common/core/localization/message';
import { camelize } from '../../../core/utils/m_inflector';
export const VIEWS = {
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
export const VIEW_TYPES = Object.values(VIEWS);
const WEEKENDS = [0, 6];
const getName = type => messageLocalization.format(`dxScheduler-switcher${camelize(type, true)}`);
const getView = function (type, groupOrientation) {
  let skippedDays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return {
    groupOrientation,
    intervalCount: 1,
    name: getName(type),
    type,
    skippedDays
  };
};
export const DEFAULT_VIEW_OPTIONS = {
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
    name: getName('agenda'),
    type: 'agenda'
  }
};
