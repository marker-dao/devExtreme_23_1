/**
* DevExtreme (esm/__internal/scheduler/workspaces/m_agenda.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateLocalization from '../../../common/core/localization/date';
import registerComponent from '../../../core/component_registrator';
import domAdapter from '../../../core/dom_adapter';
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import { noop } from '../../../core/utils/common';
import dateUtils from '../../../core/utils/date';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { setHeight, setOuterHeight } from '../../../core/utils/size';
import { DATE_TABLE_CLASS, DATE_TABLE_ROW_CLASS, GROUP_HEADER_CONTENT_CLASS, GROUP_ROW_CLASS, TIME_PANEL_CLASS } from '../m_classes';
import tableCreatorModule from '../m_table_creator';
import { agendaUtils, formatWeekday, getVerticalGroupCountClass } from '../r1/utils/index';
import { VIEWS } from '../utils/options/constants_view';
import { convertToOldTree, reduceResourcesTree } from '../utils/resource_manager/agenda_group_utils';
import WorkSpace from './m_work_space';
const {
  tableCreator
} = tableCreatorModule;
const AGENDA_CLASS = 'dx-scheduler-agenda';
const AGENDA_DATE_CLASS = 'dx-scheduler-agenda-date';
const GROUP_TABLE_CLASS = 'dx-scheduler-group-table';
const TIME_PANEL_ROW_CLASS = 'dx-scheduler-time-panel-row';
const TIME_PANEL_CELL_CLASS = 'dx-scheduler-time-panel-cell';
const NODATA_CONTAINER_CLASS = 'dx-scheduler-agenda-nodata';
const LAST_ROW_CLASS = 'dx-scheduler-date-table-last-row';
const INNER_CELL_MARGIN = 5;
const OUTER_CELL_MARGIN = 20;
class SchedulerAgenda extends WorkSpace {
  get type() {
    return VIEWS.AGENDA;
  }
  get renderingStrategy() {
    return this.invoke('getLayoutManager').getRenderingStrategyInstance();
  }
  get appointmentDataProvider() {
    return this.option('getAppointmentDataProvider')();
  }
  getStartViewDate() {
    return this._startViewDate;
  }
  _init() {
    super._init();
    this._activeStateUnit = undefined;
  }
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      // Number | "month"
      agendaDuration: 7,
      rowHeight: 60,
      noDataText: ''
    });
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    const {
      value
    } = args;
    switch (name) {
      case 'agendaDuration':
        break;
      case 'noDataText':
      case 'rowHeight':
        this._recalculateAgenda(this._rows);
        break;
      case 'groups':
        if (!(value !== null && value !== void 0 && value.length)) {
          if (this._$groupTable) {
            this._$groupTable.remove();
            this._$groupTable = null;
            this._detachGroupCountClass();
          }
        } else if (!this._$groupTable) {
          this._initGroupTable();
          this._dateTableScrollable.$content().prepend(this._$groupTable);
        }
        super._optionChanged(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
  _renderFocusState() {
    return noop();
  }
  _renderFocusTarget() {
    return noop();
  }
  _cleanFocusState() {
    return noop();
  }
  supportAllDayRow() {
    return false;
  }
  _isVerticalGroupedWorkSpace() {
    return false;
  }
  _getElementClass() {
    return AGENDA_CLASS;
  }
  _calculateStartViewDate() {
    return agendaUtils.calculateStartViewDate(this.option('currentDate'), this.option('startDayHour'));
  }
  _getRowCount() {
    return this.option('agendaDuration');
  }
  _getCellCount() {
    return 1;
  }
  _getTimePanelRowCount() {
    return this.option('agendaDuration');
  }
  _renderAllDayPanel() {
    return noop();
  }
  _updateAllDayVisibility() {
    return noop();
  }
  _updateAllDayHeight() {
    return noop();
  }
  _initWorkSpaceUnits() {
    this._initGroupTable();
    this._$timePanel = $('<table>').attr('aria-hidden', true).addClass(TIME_PANEL_CLASS);
    this._$dateTable = $('<table>').attr('aria-hidden', true).addClass(DATE_TABLE_CLASS);
    this._$dateTableScrollableContent = $('<div>').addClass('dx-scheduler-date-table-scrollable-content');
    this._$dateTableContainer = $('<div>').addClass('dx-scheduler-date-table-container');
  }
  _initGroupTable() {
    const groups = this.option('groups');
    if (groups !== null && groups !== void 0 && groups.length) {
      this._$groupTable = $('<table>').attr('aria-hidden', true).addClass(GROUP_TABLE_CLASS);
    }
  }
  _renderView() {
    this._startViewDate = this._calculateStartViewDate();
    this._rows = [];
    this._initPositionHelper();
  }
  _recalculateAgenda(rows) {
    let cellTemplates = [];
    this._cleanView();
    if (this._rowsIsEmpty(rows)) {
      this._renderNoData();
      return;
    }
    this._rows = rows;
    if (this._$groupTable) {
      cellTemplates = this._renderGroupHeader();
      this._setGroupHeaderCellsHeight();
    }
    this._renderTimePanel();
    this._renderDateTable();
    this.invoke('onAgendaReady', rows);
    this._applyCellTemplates(cellTemplates);
    this._dateTableScrollable.update();
  }
  _renderNoData() {
    this._$noDataContainer = $('<div>').addClass(NODATA_CONTAINER_CLASS).html(this.option('noDataText'));
    this._dateTableScrollable.$content().append(this._$noDataContainer);
  }
  _setTableSizes() {
    return noop();
  }
  _toggleHorizontalScrollClass() {
    return noop();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _createCrossScrollingConfig(argument) {
    return noop();
  }
  _setGroupHeaderCellsHeight() {
    const $cells = this._getGroupHeaderCells().filter((_, element) => !element.getAttribute('rowSpan'));
    const rows = this._removeEmptyRows(this._rows);
    if (!rows.length) {
      return;
    }
    for (let i = 0; i < $cells.length; i++) {
      const $cellContent = $cells.eq(i).find('.dx-scheduler-group-header-content');
      setOuterHeight($cellContent, this._getGroupRowHeight(rows[i]));
    }
  }
  _rowsIsEmpty(rows) {
    let result = true;
    for (let i = 0; i < rows.length; i++) {
      const groupRow = rows[i];
      for (let j = 0; j < groupRow.length; j++) {
        if (groupRow[j]) {
          result = false;
          break;
        }
      }
    }
    return result;
  }
  _attachGroupCountClass() {
    const className = getVerticalGroupCountClass(this.option('groups'));
    this.$element().addClass(className);
  }
  _removeEmptyRows(rows) {
    const result = [];
    const isEmpty = function (data) {
      return !data.some(value => value > 0);
    };
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].length && !isEmpty(rows[i])) {
        result.push(rows[i]);
      }
    }
    return result;
  }
  _getGroupHeaderContainer() {
    return this._$groupTable;
  }
  _makeGroupRows() {
    const resourceManager = this.option('getResourceManager')();
    const allAppointments = this.option('getFilteredItems')();
    const tree = reduceResourcesTree(resourceManager.resourceById, resourceManager.groupsTree, allAppointments);
    const oldTree = convertToOldTree(resourceManager.resourceById, tree);
    const cellTemplate = this.option('resourceCellTemplate');
    const getGroupHeaderContentClass = GROUP_HEADER_CONTENT_CLASS;
    const cellTemplates = [];
    const table = tableCreator.makeGroupedTableFromJSON(tableCreator.VERTICAL, oldTree, {
      cellTag: 'th',
      groupTableClass: GROUP_TABLE_CLASS,
      groupRowClass: GROUP_ROW_CLASS,
      groupCellClass: this._getGroupHeaderClass(),
      groupCellCustomContent(cell, cellTextElement, index, data) {
        const container = domAdapter.createElement('div');
        container.className = getGroupHeaderContentClass;
        if (cellTemplate !== null && cellTemplate !== void 0 && cellTemplate.render) {
          cellTemplates.push(cellTemplate.render.bind(cellTemplate, {
            model: {
              data: data.data,
              id: data.value,
              color: data.color,
              text: cellTextElement.textContent
            },
            container: getPublicElement($(container)),
            index
          }));
        } else {
          const contentWrapper = domAdapter.createElement('div');
          contentWrapper.appendChild(cellTextElement);
          container.appendChild(contentWrapper);
        }
        cell.appendChild(container);
      },
      cellTemplate
    });
    return {
      elements: $(table).find(`.${GROUP_ROW_CLASS}`),
      cellTemplates
    };
  }
  _cleanView() {
    this._$dateTable.empty();
    this._$timePanel.empty();
    if (this._$groupTable) {
      this._$groupTable.empty();
    }
    if (this._$noDataContainer) {
      this._$noDataContainer.empty();
      this._$noDataContainer.remove();
      delete this._$noDataContainer;
    }
  }
  _createWorkSpaceElements() {
    this._createWorkSpaceStaticElements();
  }
  _createWorkSpaceStaticElements() {
    this._$dateTableContainer.append(this._$dateTable);
    this._dateTableScrollable.$content().append(this._$dateTableScrollableContent);
    if (this._$groupTable) {
      this._$dateTableScrollableContent.prepend(this._$groupTable);
    }
    this._$dateTableScrollableContent.append(this._$timePanel, this._$dateTableContainer);
    this.$element().append(this._dateTableScrollable.$element());
  }
  _renderDateTable() {
    this._renderTableBody({
      container: getPublicElement(this._$dateTable),
      rowClass: DATE_TABLE_ROW_CLASS,
      cellClass: this._getDateTableCellClass()
    });
  }
  _attachTablesEvents() {
    return noop();
  }
  _attachEvents() {
    return noop();
  }
  _cleanCellDataCache() {
    return noop();
  }
  isIndicationAvailable() {
    return false;
  }
  _prepareCellTemplateOptions(text, date, rowIndex, $cell) {
    const leaf = this.resourceManager.groupsLeafs[rowIndex];
    const groups = (leaf === null || leaf === void 0 ? void 0 : leaf.grouped) ?? {};
    const groupIndex = leaf === null || leaf === void 0 ? void 0 : leaf.groupIndex;
    return {
      model: {
        text,
        date,
        groups,
        groupIndex
      },
      container: getPublicElement($cell),
      index: rowIndex
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _renderTableBody(options, delayCellTemplateRendering) {
    const cellTemplates = [];
    const cellTemplateOpt = options.cellTemplate;
    this._$rows = [];
    let i;
    const fillTableBody = function (rowIndex, rowSize) {
      if (rowSize) {
        let date;
        let cellDateNumber;
        let cellDayName;
        const $row = $('<tr>');
        const $td = $('<td>');
        setHeight($td, this._getRowHeight(rowSize));
        if (options.getStartDate) {
          var _options$getStartDate;
          date = (_options$getStartDate = options.getStartDate) === null || _options$getStartDate === void 0 ? void 0 : _options$getStartDate.call(options, rowIndex);
          cellDateNumber = dateLocalization.format(date, 'd');
          cellDayName = dateLocalization.format(date, formatWeekday);
        }
        if (cellTemplateOpt !== null && cellTemplateOpt !== void 0 && cellTemplateOpt.render) {
          const templateOptions = this._prepareCellTemplateOptions(`${cellDateNumber} ${cellDayName}`, date, i, $td);
          cellTemplates.push(cellTemplateOpt.render.bind(cellTemplateOpt, templateOptions));
        } else if (cellDateNumber && cellDayName) {
          $td.addClass(AGENDA_DATE_CLASS).text(`${cellDateNumber} ${cellDayName}`);
        }
        if (options.rowClass) {
          $row.addClass(options.rowClass);
        }
        if (options.cellClass) {
          $td.addClass(options.cellClass);
        }
        $row.append($td);
        this._$rows.push($row);
      }
    }.bind(this);
    for (i = 0; i < this._rows.length; i++) {
      each(this._rows[i], fillTableBody);
      this._setLastRowClass();
    }
    $(options.container).append($('<tbody>').append(this._$rows));
    this._applyCellTemplates(cellTemplates);
  }
  _setLastRowClass() {
    if (this._rows.length > 1 && this._$rows.length) {
      const $lastRow = this._$rows[this._$rows.length - 1];
      $lastRow.addClass(LAST_ROW_CLASS);
    }
  }
  _renderTimePanel() {
    this._renderTableBody({
      container: getPublicElement(this._$timePanel),
      rowCount: this._getTimePanelRowCount(),
      cellCount: 1,
      rowClass: TIME_PANEL_ROW_CLASS,
      cellClass: TIME_PANEL_CELL_CLASS,
      cellTemplate: this.option('dateCellTemplate'),
      getStartDate: this._getTimePanelStartDate.bind(this)
    });
  }
  _getTimePanelStartDate(rowIndex) {
    const current = new Date(this.option('currentDate'));
    const cellDate = new Date(current.setDate(current.getDate() + rowIndex));
    return cellDate;
  }
  _getRowHeight(rowSize) {
    const baseHeight = this.option('rowHeight');
    const innerOffset = (rowSize - 1) * INNER_CELL_MARGIN;
    return rowSize ? baseHeight * rowSize + innerOffset + OUTER_CELL_MARGIN : 0;
  }
  _getGroupRowHeight(groupRows) {
    if (!groupRows) {
      return;
    }
    let result = 0;
    for (let i = 0; i < groupRows.length; i++) {
      result += this._getRowHeight(groupRows[i]);
    }
    return result;
  }
  _calculateRows(appointments) {
    return this.renderingStrategy.calculateRows(appointments, this.option('agendaDuration'), this.option('currentDate'));
  }
  onDataSourceChanged(appointments) {
    super.onDataSourceChanged();
    this._renderView();
    const rows = this._calculateRows(appointments);
    this._recalculateAgenda(rows);
  }
  getAgendaVerticalStepHeight() {
    return this.option('rowHeight');
  }
  getEndViewDate() {
    const currentDate = new Date(this.option('currentDate'));
    const agendaDuration = this.option('agendaDuration');
    currentDate.setHours(this.option('endDayHour'));
    const result = currentDate.setDate(currentDate.getDate() + agendaDuration - 1) - 60000;
    return new Date(result);
  }
  getEndViewDateByEndDayHour() {
    return this.getEndViewDate();
  }
  updateScrollPosition(date) {
    const newDate = this.timeZoneCalculator.createDate(date, 'toGrid');
    const bounds = this.getVisibleBounds();
    const startDateHour = newDate.getHours();
    const startDateMinutes = newDate.getMinutes();
    if (this.needUpdateScrollPosition(startDateHour, startDateMinutes, bounds, newDate)) {
      this.scrollToTime(startDateHour, startDateMinutes, newDate);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  needUpdateScrollPosition(hours, minutes, bounds, newData) {
    let isUpdateNeeded = false;
    if (hours < bounds.top.hours || hours > bounds.bottom.hours) {
      isUpdateNeeded = true;
    }
    if (hours === bounds.top.hours && minutes < bounds.top.minutes) {
      isUpdateNeeded = true;
    }
    if (hours === bounds.bottom.hours && minutes > bounds.top.minutes) {
      isUpdateNeeded = true;
    }
    return isUpdateNeeded;
  }
  renovatedRenderSupported() {
    return false;
  }
  _setSelectedCellsByCellData() {}
  _getIntervalDuration() {
    return dateUtils.dateToMilliseconds('day') * this.option('intervalCount');
  }
  getDOMElementsMetaData() {
    return {
      dateTableCellsMeta: [[{}]],
      allDayPanelCellsMeta: [{}]
    };
  }
}
registerComponent('dxSchedulerAgenda', SchedulerAgenda);
export default SchedulerAgenda;
