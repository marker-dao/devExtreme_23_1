/**
* DevExtreme (esm/__internal/ui/calendar/m_calendar.views.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import dateLocalization from '../../../common/core/localization/date';
import domAdapter from '../../../core/dom_adapter';
import $ from '../../../core/renderer';
import dateUtils from '../../../core/utils/date';
import dateSerialization from '../../../core/utils/date_serialization';
import BaseView from './m_calendar.base_view';
const CALENDAR_OTHER_MONTH_CLASS = 'dx-calendar-other-month';
const CALENDAR_OTHER_VIEW_CLASS = 'dx-calendar-other-view';
const CALENDAR_WEEK_NUMBER_CELL_CLASS = 'dx-calendar-week-number-cell';
const CALENDAR_WEEK_SELECTION_CLASS = 'dx-calendar-week-selection';
export class MonthView extends BaseView {
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
    const $headerRow = $('<tr>');
    const $header = $('<thead>').append($headerRow);
    this._$table.prepend($header);
    const {
      colCount: columnsCount,
      showWeekNumbers
    } = this.option();
    for (let colIndex = 0, colCount = columnsCount; colIndex < colCount; colIndex++) {
      this._renderHeaderCell(colIndex, $headerRow);
    }
    if (showWeekNumbers) {
      this._renderWeekHeaderCell($headerRow);
    }
  }
  _renderHeaderCell(cellIndex, $headerRow) {
    const {
      firstDayOfWeek
    } = this.option();
    const {
      full: fullCaption,
      abbreviated: abbrCaption
    } = this._getDayCaption(firstDayOfWeek + cellIndex);
    const $cell = $('<th>')
    // @ts-expect-error ts-error
    .attr({
      scope: 'col',
      abbr: fullCaption
    }).text(abbrCaption);
    $headerRow.append($cell);
  }
  _renderWeekHeaderCell($headerRow) {
    const $weekNumberHeaderCell = $('<th>')
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
    const cell = domAdapter.createElement('td');
    const $cell = $(cell);
    cell.className = CALENDAR_WEEK_NUMBER_CELL_CLASS;
    if (selectionMode !== 'single' && selectWeekOnClick) {
      $cell.addClass(CALENDAR_WEEK_SELECTION_CLASS);
    }
    if (cellTemplate) {
      // @ts-expect-error ts-error
      cellTemplate.render(this._prepareCellTemplateData(weekNumber, -1, $cell));
    } else {
      cell.innerHTML = weekNumber;
    }
    rowData.row.prepend(cell);
    this.setAria({
      role: 'gridcell',
      label: `Week ${weekNumber}`
    }, $cell);
  }
  _getWeekNumber(date) {
    const {
      weekNumberRule,
      firstDayOfWeek
    } = this.option();
    if (weekNumberRule === 'auto') {
      return dateUtils.getWeekNumber(date, firstDayOfWeek, firstDayOfWeek === 1 ? 'firstFourDays' : 'firstDay');
    }
    return dateUtils.getWeekNumber(date, firstDayOfWeek, weekNumberRule);
  }
  getNavigatorCaption() {
    const {
      date
    } = this.option();
    return dateLocalization.format(date, 'monthandyear');
  }
  _isTodayCell(cellDate) {
    const {
      _todayDate: today
    } = this.option();
    return dateUtils.sameDate(cellDate, today());
  }
  _isDateOutOfRange(cellDate) {
    const minDate = this.option('min');
    const maxDate = this.option('max');
    return !dateUtils.dateInRange(cellDate, minDate, maxDate, 'date');
  }
  _isOtherView(cellDate) {
    const {
      date
    } = this.option();
    return cellDate.getMonth() !== date.getMonth();
  }
  _isStartDayOfMonth(cellDate) {
    return dateUtils.sameDate(cellDate, dateUtils.getFirstMonthDate(this.option('date')));
  }
  _isEndDayOfMonth(cellDate) {
    return dateUtils.sameDate(cellDate, dateUtils.getLastMonthDate(this.option('date')));
  }
  _getCellText(cellDate) {
    return dateLocalization.format(cellDate, 'd');
  }
  _getDayCaption(day) {
    const {
      colCount: daysInWeek
    } = this.option();
    const dayIndex = day % daysInWeek;
    return {
      full: dateLocalization.getDayNames()[dayIndex],
      abbreviated: dateLocalization.getDayNames('abbreviated')[dayIndex]
    };
  }
  _getFirstCellData() {
    const {
      firstDayOfWeek
    } = this.option();
    const firstDay = dateUtils.getFirstMonthDate(this.option('date'));
    // @ts-expect-error ts-error
    let firstMonthDayOffset = firstDayOfWeek - firstDay.getDay();
    const {
      colCount: daysInWeek
    } = this.option();
    if (firstMonthDayOffset >= 0) {
      firstMonthDayOffset -= daysInWeek;
    }
    // @ts-expect-error ts-error
    firstDay.setDate(firstDay.getDate() + firstMonthDayOffset);
    return firstDay;
  }
  _getNextCellData(date) {
    date = new Date(date);
    date.setDate(date.getDate() + 1);
    return date;
  }
  _getCellByDate(date) {
    return this._$table.find(`td[data-value='${dateSerialization.serializeDate(date, dateUtils.getShortDateFormat())}']`);
  }
  isBoundary(date) {
    return dateUtils.sameMonthAndYear(date, this.option('min')) || dateUtils.sameMonthAndYear(date, this.option('max'));
  }
  _getDefaultDisabledDatesHandler(disabledDates) {
    // @ts-expect-error
    return function (args) {
      const isDisabledDate = disabledDates.some(item => dateUtils.sameDate(item, args.date));
      if (isDisabledDate) {
        return true;
      }
    };
  }
}
export class YearView extends BaseView {
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
    return dateUtils.sameMonthAndYear(cellDate, today());
  }
  _isDateOutOfRange(cellDate) {
    return !dateUtils.dateInRange(cellDate, dateUtils.getFirstMonthDate(this.option('min')), dateUtils.getLastMonthDate(this.option('max')));
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
  // eslint-disable-next-line class-methods-use-this
  _getCellText(cellDate) {
    return dateLocalization.getMonthNames('abbreviated')[cellDate.getMonth()];
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
    date = new Date(date);
    date.setMonth(date.getMonth() + 1);
    return date;
  }
  _getCellByDate(date) {
    const foundDate = new Date(date);
    foundDate.setDate(1);
    return this._$table.find(`td[data-value='${dateSerialization.serializeDate(foundDate, dateUtils.getShortDateFormat())}']`);
  }
  getNavigatorCaption() {
    const {
      date
    } = this.option();
    return dateLocalization.format(date, 'yyyy');
  }
  isBoundary(date) {
    return dateUtils.sameYear(date, this.option('min')) || dateUtils.sameYear(date, this.option('max'));
  }
  _renderWeekNumberCell() {}
}
export class DecadeView extends BaseView {
  _getViewName() {
    return 'decade';
  }
  _isTodayCell(cellDate) {
    const {
      _todayDate: today
    } = this.option();
    return dateUtils.sameYear(cellDate, today());
  }
  _isDateOutOfRange(cellDate) {
    const min = this.option('min');
    const max = this.option('max');
    // @ts-expect-error ts-error
    return !dateUtils.dateInRange(cellDate.getFullYear(), min === null || min === void 0 ? void 0 : min.getFullYear(), max === null || max === void 0 ? void 0 : max.getFullYear());
  }
  _isOtherView(cellDate) {
    const date = new Date(cellDate);
    date.setMonth(1);
    return !dateUtils.sameDecade(date, this.option('date'));
  }
  _isStartDayOfMonth() {
    return false;
  }
  _isEndDayOfMonth() {
    return false;
  }
  _getCellText(cellDate) {
    return dateLocalization.format(cellDate, 'yyyy');
  }
  _getFirstCellData() {
    const year = dateUtils.getFirstYearInDecade(this.option('date')) - 1;
    return dateUtils.createDateWithFullYear(year, 0, 1);
  }
  _getNextCellData(date) {
    date = new Date(date);
    date.setFullYear(date.getFullYear() + 1);
    return date;
  }
  getNavigatorCaption() {
    const {
      date: currentDate
    } = this.option();
    const firstYearInDecade = dateUtils.getFirstYearInDecade(currentDate);
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);
    startDate.setFullYear(firstYearInDecade);
    endDate.setFullYear(firstYearInDecade + 9);
    return `${dateLocalization.format(startDate, 'yyyy')}-${dateLocalization.format(endDate, 'yyyy')}`;
  }
  _isValueOnCurrentView(currentDate, value) {
    return dateUtils.sameDecade(currentDate, value);
  }
  _getCellByDate(date) {
    const foundDate = new Date(date);
    foundDate.setDate(1);
    foundDate.setMonth(0);
    return this._$table.find(`td[data-value='${dateSerialization.serializeDate(foundDate, dateUtils.getShortDateFormat())}']`);
  }
  isBoundary(date) {
    return dateUtils.sameDecade(date, this.option('min')) || dateUtils.sameDecade(date, this.option('max'));
  }
  _renderWeekNumberCell() {}
}
export class CenturyView extends BaseView {
  _getViewName() {
    return 'century';
  }
  _isTodayCell(cellDate) {
    const {
      _todayDate: today
    } = this.option();
    return dateUtils.sameDecade(cellDate, today());
  }
  _isDateOutOfRange(cellDate) {
    const decade = dateUtils.getFirstYearInDecade(cellDate);
    const minDecade = dateUtils.getFirstYearInDecade(this.option('min'));
    const maxDecade = dateUtils.getFirstYearInDecade(this.option('max'));
    return !dateUtils.dateInRange(decade, minDecade, maxDecade);
  }
  _isOtherView(cellDate) {
    const date = new Date(cellDate);
    date.setMonth(1);
    return !dateUtils.sameCentury(date, this.option('date'));
  }
  _isStartDayOfMonth() {
    return false;
  }
  _isEndDayOfMonth() {
    return false;
  }
  _getCellText(cellDate) {
    const startDate = dateLocalization.format(cellDate, 'yyyy');
    const endDate = new Date(cellDate);
    endDate.setFullYear(endDate.getFullYear() + 9);
    return `${startDate} - ${dateLocalization.format(endDate, 'yyyy')}`;
  }
  _getFirstCellData() {
    const decade = dateUtils.getFirstDecadeInCentury(this.option('date')) - 10;
    return dateUtils.createDateWithFullYear(decade, 0, 1);
  }
  _getNextCellData(date) {
    date = new Date(date);
    date.setFullYear(date.getFullYear() + 10);
    return date;
  }
  _getCellByDate(date) {
    const foundDate = new Date(date);
    foundDate.setDate(1);
    foundDate.setMonth(0);
    foundDate.setFullYear(dateUtils.getFirstYearInDecade(foundDate));
    return this._$table.find(`td[data-value='${dateSerialization.serializeDate(foundDate, dateUtils.getShortDateFormat())}']`);
  }
  getNavigatorCaption() {
    const {
      date: currentDate
    } = this.option();
    const firstDecadeInCentury = dateUtils.getFirstDecadeInCentury(currentDate);
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);
    startDate.setFullYear(firstDecadeInCentury);
    endDate.setFullYear(firstDecadeInCentury + 99);
    return `${dateLocalization.format(startDate, 'yyyy')}-${dateLocalization.format(endDate, 'yyyy')}`;
  }
  isBoundary(date) {
    return dateUtils.sameCentury(date, this.option('min')) || dateUtils.sameCentury(date, this.option('max'));
  }
  _renderWeekNumberCell() {}
}
export default {
  month: MonthView,
  year: YearView,
  decade: DecadeView,
  century: CenturyView
};
