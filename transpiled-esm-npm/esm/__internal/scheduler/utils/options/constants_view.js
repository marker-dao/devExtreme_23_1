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
const getName = type => messageLocalization.format(`dxScheduler-switcher${camelize(type, true)}`);
const getView = (type, groupOrientation) => ({
  groupOrientation,
  intervalCount: 1,
  name: getName(type),
  type
});
export const DEFAULT_VIEW_OPTIONS = {
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