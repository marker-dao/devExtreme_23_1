import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from '../../../core/component_registrator';
import dateUtils from '../../../core/utils/date';
import { formatWeekdayAndDay } from '../../../renovation/ui/scheduler/view_model/to_test/views/utils/base';
import { getViewStartByOptions } from '../../../renovation/ui/scheduler/view_model/to_test/views/utils/month';
// NOTE: Renovation component import.
// @ts-expect-error
import dxrDateHeader from '../../../renovation/ui/scheduler/workspaces/base/header_panel/layout.j';
import { VIEWS } from '../m_constants';
import SchedulerTimeline from './m_timeline';
var TIMELINE_CLASS = 'dx-scheduler-timeline-month';
class SchedulerTimelineMonth extends SchedulerTimeline {
  constructor() {
    super(...arguments);
    this.viewDirection = 'horizontal';
  }
  get type() {
    return VIEWS.TIMELINE_MONTH;
  }
  get renovatedHeaderPanelComponent() {
    return dxrDateHeader;
  }
  _renderView() {
    super._renderView();
    this._updateScrollable();
  }
  _getElementClass() {
    return TIMELINE_CLASS;
  }
  _getDateHeaderTemplate() {
    return this.option('dateCellTemplate');
  }
  _calculateDurationInCells(timeDiff) {
    return timeDiff / this.getCellDuration();
  }
  isIndicatorVisible() {
    return true;
  }
  _getFormat() {
    return formatWeekdayAndDay;
  }
  _getIntervalBetween(currentDate) {
    var firstViewDate = this.getStartViewDate();
    var timeZoneOffset = dateUtils.getTimezonesDifference(firstViewDate, currentDate);
    return currentDate.getTime() - (firstViewDate.getTime() - this.option('startDayHour') * 3600000) - timeZoneOffset;
  }
  _getViewStartByOptions() {
    return getViewStartByOptions(this.option('startDate'), this.option('currentDate'), this.option('intervalCount'), dateUtils.getFirstMonthDate(this.option('startDate')));
  }
  generateRenderOptions() {
    var options = super.generateRenderOptions(true);
    return _extends(_extends({}, options), {
      getDateForHeaderText: (_, date) => date
    });
  }
}
registerComponent('dxSchedulerTimelineMonth', SchedulerTimelineMonth);
export default SchedulerTimelineMonth;