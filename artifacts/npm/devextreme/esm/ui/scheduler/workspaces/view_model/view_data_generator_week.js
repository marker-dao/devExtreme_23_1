/**
* DevExtreme (esm/ui/scheduler/workspaces/view_model/view_data_generator_week.js)
* Version: 23.2.0
* Build date: Thu Jun 29 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { calculateStartViewDate, getIntervalDuration } from '../../../../renovation/ui/scheduler/view_model/to_test/views/utils/week';
import { ViewDataGenerator } from './view_data_generator';
export class ViewDataGeneratorWeek extends ViewDataGenerator {
  get daysInInterval() {
    return 7;
  }
  _getIntervalDuration(intervalCount) {
    return getIntervalDuration(intervalCount);
  }
  _calculateStartViewDate(options) {
    return calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount), this.getFirstDayOfWeek(options.firstDayOfWeek));
  }
}
