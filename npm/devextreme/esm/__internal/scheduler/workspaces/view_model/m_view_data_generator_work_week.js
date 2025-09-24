/**
* DevExtreme (esm/__internal/scheduler/workspaces/view_model/m_view_data_generator_work_week.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDataOnWeekend, workWeekUtils } from '../../r1/utils/index';
import { ViewDataGeneratorWeek } from './m_view_data_generator_week';
export class ViewDataGeneratorWorkWeek extends ViewDataGeneratorWeek {
  constructor() {
    super(...arguments);
    this.daysInInterval = 5;
  }
  isSkippedDate(date) {
    return isDataOnWeekend(date);
  }
  _calculateStartViewDate(options) {
    return workWeekUtils.calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount), this.getFirstDayOfWeek(options.firstDayOfWeek));
  }
  getFirstDayOfWeek(firstDayOfWeekOption) {
    return firstDayOfWeekOption || 0;
  }
}
