/**
* DevExtreme (esm/__internal/scheduler/workspaces/view_model/m_view_data_generator_week.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { weekUtils } from '../../r1/utils/index';
import { ViewDataGenerator } from './m_view_data_generator';
export class ViewDataGeneratorWeek extends ViewDataGenerator {
  constructor() {
    super(...arguments);
    this.daysInInterval = 7;
  }
  _getIntervalDuration(intervalCount) {
    return weekUtils.getIntervalDuration(intervalCount);
  }
  _calculateStartViewDate(options) {
    return weekUtils.calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount), this.getFirstDayOfWeek(options.firstDayOfWeek));
  }
}
