/**
* DevExtreme (esm/__internal/scheduler/workspaces/m_timeline_week.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../core/component_registrator';
import { getBoundingRect } from '../../../core/utils/position';
import { VIEWS } from '../utils/options/constants_view';
import SchedulerTimeline from './m_timeline';
const TIMELINE_CLASS = 'dx-scheduler-timeline-week';
export default class SchedulerTimelineWeek extends SchedulerTimeline {
  get type() {
    return VIEWS.TIMELINE_WEEK;
  }
  _getElementClass() {
    return TIMELINE_CLASS;
  }
  _getHeaderPanelCellWidth($headerRow) {
    return getBoundingRect($headerRow.children().first().get(0)).width;
  }
  _needRenderWeekHeader() {
    return true;
  }
  _incrementDate(date) {
    date.setDate(date.getDate() + 1);
  }
}
registerComponent('dxSchedulerTimelineWeek', SchedulerTimelineWeek);
