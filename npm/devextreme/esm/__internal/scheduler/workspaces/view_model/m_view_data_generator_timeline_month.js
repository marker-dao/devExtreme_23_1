/**
* DevExtreme (esm/__internal/scheduler/workspaces/view_model/m_view_data_generator_timeline_month.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../../../core/utils/date';
import { setOptionHour, timelineMonthUtils } from '../../../scheduler/r1/utils/index';
import timezoneUtils from '../../m_utils_time_zone';
import { ViewDataGenerator } from './m_view_data_generator';
const toMs = dateUtils.dateToMilliseconds;
export class ViewDataGeneratorTimelineMonth extends ViewDataGenerator {
  calculateEndDate(startDate, interval, endDayHour) {
    return setOptionHour(startDate, endDayHour);
  }
  getInterval() {
    return toMs('day');
  }
  _calculateStartViewDate(options) {
    return timelineMonthUtils.calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, options.intervalCount);
  }
  getCellCount(options) {
    const {
      intervalCount
    } = options;
    const currentDate = new Date(options.currentDate);
    let cellCount = 0;
    for (let i = 1; i <= intervalCount; i++) {
      cellCount += new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 0).getDate();
    }
    return cellCount;
  }
  setHiddenInterval() {
    this.hiddenInterval = 0;
  }
  getCellEndDate(cellStartDate, options) {
    const {
      startDayHour,
      endDayHour
    } = options;
    const durationMs = (endDayHour - startDayHour) * toMs('hour');
    return timezoneUtils.addOffsetsWithoutDST(cellStartDate, durationMs);
  }
}
