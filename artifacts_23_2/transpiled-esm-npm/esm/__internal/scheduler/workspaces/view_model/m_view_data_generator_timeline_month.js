import dateUtils from '../../../../core/utils/date';
import { setOptionHour } from '../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base';
import { calculateCellIndex } from '../../../../renovation/ui/scheduler/view_model/to_test/views/utils/month';
import { calculateStartViewDate } from '../../../../renovation/ui/scheduler/view_model/to_test/views/utils/timeline_month';
import timezoneUtils from '../../m_utils_time_zone';
import { ViewDataGenerator } from './m_view_data_generator';
var toMs = dateUtils.dateToMilliseconds;
export class ViewDataGeneratorTimelineMonth extends ViewDataGenerator {
  _calculateCellIndex(rowIndex, columnIndex, rowCount, columnCount) {
    return calculateCellIndex(rowIndex, columnIndex, rowCount, columnCount);
  }
  calculateEndDate(startDate, interval, endDayHour) {
    return setOptionHour(startDate, endDayHour);
  }
  getInterval() {
    return toMs('day');
  }
  _calculateStartViewDate(options) {
    return calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, options.intervalCount);
  }
  getCellCount(options) {
    var {
      intervalCount
    } = options;
    var currentDate = new Date(options.currentDate);
    var cellCount = 0;
    for (var i = 1; i <= intervalCount; i++) {
      cellCount += new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 0).getDate();
    }
    return cellCount;
  }
  setHiddenInterval() {
    this.hiddenInterval = 0;
  }
  getCellEndDate(cellStartDate, options) {
    var {
      startDayHour,
      endDayHour
    } = options;
    var durationMs = (endDayHour - startDayHour) * toMs('hour');
    return timezoneUtils.addOffsetsWithoutDST(cellStartDate, durationMs);
  }
}