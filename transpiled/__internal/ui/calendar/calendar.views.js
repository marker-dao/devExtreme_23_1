"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.YearView = exports.MonthView = exports.DecadeView = exports.CenturyView = void 0;
var _date = _interopRequireDefault(require("../../../common/core/localization/date"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _date2 = _interopRequireDefault(require("../../../core/utils/date"));
var _date_serialization = _interopRequireDefault(require("../../../core/utils/date_serialization"));
var _calendar = _interopRequireDefault(require("./calendar.base_view"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable max-classes-per-file */
const CALENDAR_OTHER_MONTH_CLASS = 'dx-calendar-other-month';
const CALENDAR_OTHER_VIEW_CLASS = 'dx-calendar-other-view';
const CALENDAR_WEEK_NUMBER_CELL_CLASS = 'dx-calendar-week-number-cell';
const CALENDAR_WEEK_SELECTION_CLASS = 'dx-calendar-week-selection';
class MonthView extends _calendar.default {
  _getViewName() {
    return 'month';
  }
  _getCurrentDateFormat() {
    return 'longdate';
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      firstDayOfWeek: 0,
      rowCount: 6,
      colCount: 7
    });
  }
  _renderImpl() {
    super._renderImpl();
    this._renderHeader();
  }
  _renderBody() {
    super._renderBody();
    this._$table.find(`.${CALENDAR_OTHER_VIEW_CLASS}`).addClass(CALENDAR_OTHER_MONTH_CLASS);
  }
  _renderFocusTarget() {}
  _renderHeader() {
    const $headerRow = (0, _renderer.default)('<tr>');
    const $header = (0, _renderer.default)('<thead>').append($headerRow);
    this._$table.prepend($header);
    const {
      colCount: columnsCount,
      showWeekNumbers
    } = this.option();
    for (let colIndex = 0, colCount = columnsCount; colIndex < colCount; colIndex += 1) {
      this._renderHeaderCell(colIndex, $headerRow);
    }
    if (showWeekNumbers) {
      this._renderWeekHeaderCell($headerRow);
    }
  }
  _renderHeaderCell(cellIndex, $headerRow) {
    const {
      firstDayOfWeek = 0
    } = this.option();
    const {
      full: fullCaption,
      abbreviated: abbrCaption
    } = this._getDayCaption(firstDayOfWeek + cellIndex);
    const $cell = (0, _renderer.default)('<th>')
    // @ts-expect-error ts-error
    .attr({
      scope: 'col',
      abbr: fullCaption
    }).text(abbrCaption);
    $headerRow.append($cell);
  }
  _renderWeekHeaderCell($headerRow) {
    const $weekNumberHeaderCell = (0, _renderer.default)('<th>')
    // @ts-expect-error ts-error
    .attr({
      scope: 'col',
      abbr: 'WeekNumber',
      class: 'dx-week-number-header'
    });
    $headerRow.prepend($weekNumberHeaderCell);
  }
  _renderWeekNumberCell(rowData) {
    const {
      showWeekNumbers,
      cellTemplate,
      selectionMode,
      selectWeekOnClick
    } = this.option();
    if (!showWeekNumbers) {
      return;
    }
    const weekNumber = this._getWeekNumber(rowData.prevCellDate);
    const cell = _dom_adapter.default.createElement('td');
    const $cell = (0, _renderer.default)(cell);
    cell.className = CALENDAR_WEEK_NUMBER_CELL_CLASS;
    if (selectionMode !== 'single' && selectWeekOnClick) {
      $cell.addClass(CALENDAR_WEEK_SELECTION_CLASS);
    }
    if (cellTemplate) {
      // @ts-expect-error ts-error
      cellTemplate.render(this._prepareCellTemplateData(weekNumber, -1, $cell));
    } else {
      cell.innerHTML = `${weekNumber}`;
    }
    rowData.row.prepend(cell);
    this.setAria({
      role: 'gridcell',
      label: `Week ${weekNumber}`
    }, $cell);
  }
  _getWeekNumber(date) {
    const {
      weekNumberRule = 'auto',
      firstDayOfWeek
    } = this.option();
    if (weekNumberRule === 'auto') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return _date2.default.getWeekNumber(date, firstDayOfWeek, firstDayOfWeek === 1 ? 'firstFourDays' : 'firstDay');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _date2.default.getWeekNumber(date, firstDayOfWeek, weekNumberRule);
  }
  getNavigatorCaption() {
    const {
      date
    } = this.option();
    return `${_date.default.format(date, 'monthandyear')}`;
  }
  _isTodayCell(cellDate) {
    const {
      _todayDate: today
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _date2.default.sameDate(cellDate, today());
  }
  _isDateOutOfRange(cellDate) {
    const minDate = this.option('min');
    const maxDate = this.option('max');
    return !_date2.default.dateInRange(cellDate, minDate, maxDate, 'date');
  }
  _isOtherView(cellDate) {
    const {
      date
    } = this.option();
    return cellDate.getMonth() !== date.getMonth();
  }
  _isStartDayOfMonth(cellDate) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _date2.default.sameDate(cellDate, _date2.default.getFirstMonthDate(this.option('date')));
  }
  _isEndDayOfMonth(cellDate) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _date2.default.sameDate(cellDate, _date2.default.getLastMonthDate(this.option('date')));
  }
  _getCellText(cellDate) {
    return `${_date.default.format(cellDate, 'd')}`;
  }
  _getDayCaption(day) {
    const {
      colCount: daysInWeek
    } = this.option();
    const dayIndex = day % daysInWeek;
    return {
      full: _date.default.getDayNames()[dayIndex],
      abbreviated: _date.default.getDayNames('abbreviated')[dayIndex]
    };
  }
  _getFirstCellData() {
    const {
      firstDayOfWeek = 0,
      date
    } = this.option();
    const firstDay = _date2.default.getFirstMonthDate(date);
    let firstMonthDayOffset = firstDayOfWeek - firstDay.getDay();
    const {
      colCount: daysInWeek
    } = this.option();
    if (firstMonthDayOffset >= 0) {
      firstMonthDayOffset -= daysInWeek;
    }
    firstDay.setDate(firstDay.getDate() + firstMonthDayOffset);
    return firstDay;
  }
  _getNextCellData(date) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  }
  _getCellByDate(date) {
    return this._$table.find(`td[data-value='${_date_serialization.default.serializeDate(date, _date2.default.getShortDateFormat())}']`);
  }
  isBoundary(date) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _date2.default.sameMonthAndYear(date, this.option('min')) || _date2.default.sameMonthAndYear(date, this.option('max'));
  }
  _getDefaultDisabledDatesHandler(disabledDates) {
    return args => disabledDates.some(item => _date2.default.sameDate(item, args.date));
  }
}
exports.MonthView = MonthView;
class YearView extends _calendar.default {
  _getViewName() {
    return 'year';
  }
  _getCurrentDateFormat() {
    return 'monthandyear';
  }
  _isTodayCell(cellDate) {
    const {
      _todayDate: today
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _date2.default.sameMonthAndYear(cellDate, today());
  }
  _isDateOutOfRange(cellDate) {
    return !_date2.default.dateInRange(cellDate, _date2.default.getFirstMonthDate(this.option('min')), _date2.default.getLastMonthDate(this.option('max')));
  }
  _isOtherView() {
    return false;
  }
  _isStartDayOfMonth() {
    return false;
  }
  _isEndDayOfMonth() {
    return false;
  }
  _getCellText(cellDate) {
    return _date.default.getMonthNames('abbreviated')[cellDate.getMonth()];
  }
  _getFirstCellData() {
    const {
      date: currentDate
    } = this.option();
    const data = new Date(currentDate);
    data.setDate(1);
    data.setMonth(0);
    return data;
  }
  _getNextCellData(date) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate;
  }
  _getCellByDate(date) {
    const foundDate = new Date(date);
    foundDate.setDate(1);
    return this._$table.find(`td[data-value='${_date_serialization.default.serializeDate(foundDate, _date2.default.getShortDateFormat())}']`);
  }
  getNavigatorCaption() {
    const {
      date
    } = this.option();
    return `${_date.default.format(date, 'yyyy')}`;
  }
  isBoundary(date) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _date2.default.sameYear(date, this.option('min')) || _date2.default.sameYear(date, this.option('max'));
  }
  _renderWeekNumberCell() {}
}
exports.YearView = YearView;
class DecadeView extends _calendar.default {
  _getViewName() {
    return 'decade';
  }
  _isTodayCell(cellDate) {
    const {
      _todayDate: today
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _date2.default.sameYear(cellDate, today());
  }
  _isDateOutOfRange(cellDate) {
    const {
      min,
      max
    } = this.option();
    return !_date2.default.dateInRange(cellDate.getFullYear(), min === null || min === void 0 ? void 0 : min.getFullYear(), max === null || max === void 0 ? void 0 : max.getFullYear());
  }
  _isOtherView(cellDate) {
    const date = new Date(cellDate);
    date.setMonth(1);
    return !_date2.default.sameDecade(date, this.option('date'));
  }
  _isStartDayOfMonth() {
    return false;
  }
  _isEndDayOfMonth() {
    return false;
  }
  _getCellText(cellDate) {
    return `${_date.default.format(cellDate, 'yyyy')}`;
  }
  _getFirstCellData() {
    const year = _date2.default.getFirstYearInDecade(this.option('date')) - 1;
    return _date2.default.createDateWithFullYear(year, 0, 1);
  }
  _getNextCellData(date) {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate;
  }
  getNavigatorCaption() {
    const {
      date: currentDate
    } = this.option();
    const firstYearInDecade = _date2.default.getFirstYearInDecade(currentDate);
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);
    startDate.setFullYear(firstYearInDecade);
    endDate.setFullYear(firstYearInDecade + 9);
    return `${_date.default.format(startDate, 'yyyy')}-${_date.default.format(endDate, 'yyyy')}`;
  }
  _isValueOnCurrentView(currentDate, value) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _date2.default.sameDecade(currentDate, value);
  }
  _getCellByDate(date) {
    const foundDate = new Date(date);
    foundDate.setDate(1);
    foundDate.setMonth(0);
    return this._$table.find(`td[data-value='${_date_serialization.default.serializeDate(foundDate, _date2.default.getShortDateFormat())}']`);
  }
  isBoundary(date) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _date2.default.sameDecade(date, this.option('min')) || _date2.default.sameDecade(date, this.option('max'));
  }
  _renderWeekNumberCell() {}
}
exports.DecadeView = DecadeView;
class CenturyView extends _calendar.default {
  _getViewName() {
    return 'century';
  }
  _isTodayCell(cellDate) {
    const {
      _todayDate: today
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _date2.default.sameDecade(cellDate, today());
  }
  _isDateOutOfRange(cellDate) {
    const decade = _date2.default.getFirstYearInDecade(cellDate);
    const minDecade = _date2.default.getFirstYearInDecade(this.option('min'));
    const maxDecade = _date2.default.getFirstYearInDecade(this.option('max'));
    return !_date2.default.dateInRange(decade, minDecade, maxDecade);
  }
  _isOtherView(cellDate) {
    const date = new Date(cellDate);
    date.setMonth(1);
    return !_date2.default.sameCentury(date, this.option('date'));
  }
  _isStartDayOfMonth() {
    return false;
  }
  _isEndDayOfMonth() {
    return false;
  }
  _getCellText(cellDate) {
    const startDate = _date.default.format(cellDate, 'yyyy');
    const endDate = new Date(cellDate);
    endDate.setFullYear(endDate.getFullYear() + 9);
    return `${startDate} - ${_date.default.format(endDate, 'yyyy')}`;
  }
  _getFirstCellData() {
    const decade = _date2.default.getFirstDecadeInCentury(this.option('date')) - 10;
    return _date2.default.createDateWithFullYear(decade, 0, 1);
  }
  _getNextCellData(date) {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + 10);
    return newDate;
  }
  _getCellByDate(date) {
    const foundDate = new Date(date);
    foundDate.setDate(1);
    foundDate.setMonth(0);
    foundDate.setFullYear(_date2.default.getFirstYearInDecade(foundDate));
    return this._$table.find(`td[data-value='${_date_serialization.default.serializeDate(foundDate, _date2.default.getShortDateFormat())}']`);
  }
  getNavigatorCaption() {
    const {
      date: currentDate
    } = this.option();
    const firstDecadeInCentury = _date2.default.getFirstDecadeInCentury(currentDate);
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);
    startDate.setFullYear(firstDecadeInCentury);
    endDate.setFullYear(firstDecadeInCentury + 99);
    return `${_date.default.format(startDate, 'yyyy')}-${_date.default.format(endDate, 'yyyy')}`;
  }
  isBoundary(date) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _date2.default.sameCentury(date, this.option('min')) || _date2.default.sameCentury(date, this.option('max'));
  }
  _renderWeekNumberCell() {}
}
exports.CenturyView = CenturyView;
var _default = exports.default = {
  month: MonthView,
  year: YearView,
  decade: DecadeView,
  century: CenturyView
};