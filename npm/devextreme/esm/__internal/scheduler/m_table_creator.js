/**
* DevExtreme (esm/__internal/scheduler/m_table_creator.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import domAdapter from '../../core/dom_adapter';
import { getPublicElement } from '../../core/element';
import { data as elementData } from '../../core/element_data';
import $ from '../../core/renderer';
import { isFunction } from '../../core/utils/type';
const ROW_SELECTOR = 'tr';
class SchedulerTableCreator {
  constructor() {
    this.VERTICAL = 'vertical';
    this.HORIZONTAL = 'horizontal';
  }
  insertAllDayRow(allDayElements, tableBody, index) {
    if (allDayElements[index]) {
      let row = allDayElements[index].find(ROW_SELECTOR);
      if (!row.length) {
        row = $(domAdapter.createElement(ROW_SELECTOR));
        row.append(allDayElements[index].get(0));
      }
      tableBody.appendChild(row.get ? row.get(0) : row);
    }
  }
  makeTable(options) {
    const tableBody = domAdapter.createElement('tbody');
    const templateCallbacks = [];
    let row;
    const rowCountInGroup = options.groupCount ? options.rowCount / options.groupCount : options.rowCount;
    let allDayElementIndex = 0;
    const {
      allDayElements
    } = options;
    const {
      groupIndex
    } = options;
    const {
      rowCount
    } = options;
    $(options.container).append(tableBody);
    if (allDayElements) {
      this.insertAllDayRow(allDayElements, tableBody, 0);
      allDayElementIndex++;
    }
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      row = domAdapter.createElement(ROW_SELECTOR);
      tableBody.appendChild(row);
      const isLastRowInGroup = (rowIndex + 1) % rowCountInGroup === 0;
      if (options.rowClass) {
        row.className = options.rowClass;
      }
      for (let columnIndex = 0; columnIndex < options.cellCount; columnIndex++) {
        var _options$setAdditiona;
        const td = domAdapter.createElement('td');
        row.appendChild(td);
        if (options.cellClass) {
          if (isFunction(options.cellClass)) {
            td.className = options.cellClass(rowIndex, columnIndex);
          } else {
            td.className = options.cellClass;
          }
        }
        let cellDataObject;
        let dataKey;
        let dataValue;
        if (options.getCellData) {
          cellDataObject = options.getCellData(td, rowIndex, columnIndex, groupIndex);
          dataKey = cellDataObject.key;
          dataValue = cellDataObject.value;
          dataKey && elementData(td, dataKey, dataValue);
        }
        (_options$setAdditiona = options.setAdditionalClasses) === null || _options$setAdditiona === void 0 || _options$setAdditiona.call(options, $(td), dataValue);
        if (options.cellTemplate && options.cellTemplate.render) {
          const additionalTemplateData = options.getTemplateData ? options.getTemplateData(rowIndex) : {};
          const templateOptions = {
            model: _extends({
              text: options.getCellText ? options.getCellText(rowIndex, columnIndex) : '',
              date: options.getCellDate ? options.getCellDate(rowIndex) : undefined
            }, additionalTemplateData),
            container: getPublicElement($(td)),
            index: rowIndex * options.cellCount + columnIndex
          };
          if (dataValue) {
            if (dataValue.startDate) {
              templateOptions.model.startDate = dataValue.startDate;
            }
            if (dataValue.endDate) {
              templateOptions.model.endDate = dataValue.endDate;
            }
            if (dataValue.groups) {
              templateOptions.model.groups = dataValue.groups;
            }
            if (dataValue.allDay) {
              templateOptions.model.allDay = dataValue.allDay;
            }
          }
          templateCallbacks.push(options.cellTemplate.render.bind(options.cellTemplate, templateOptions));
        } else if (options.getCellText) {
          $('<div>').text(options.getCellText(rowIndex, columnIndex)).addClass(options.getCellTextClass).appendTo($(td));
        }
      }
      if (allDayElements && isLastRowInGroup) {
        this.insertAllDayRow(allDayElements, tableBody, allDayElementIndex);
        allDayElementIndex++;
      }
    }
    return templateCallbacks;
  }
  makeGroupedTable(type, groups, cssClasses, cellCount, cellTemplate, rowCount, groupByDate) {
    let rows = [];
    if (type === this.VERTICAL) {
      rows = this._makeVerticalGroupedRows(groups, cssClasses, cellTemplate, rowCount);
    } else {
      rows = this._makeHorizontalGroupedRows(groups, cssClasses, cellCount, cellTemplate, groupByDate);
    }
    return rows;
  }
  makeGroupedTableFromJSON(type, data, config) {
    let table;
    const cellStorage = [];
    let rowIndex = 0;
    config = config || {};
    const cellTag = config.cellTag || 'td';
    const childrenField = config.childrenField || 'children';
    const titleField = config.titleField || 'title';
    const {
      groupTableClass
    } = config;
    const {
      groupRowClass
    } = config;
    const {
      groupCellClass
    } = config;
    const {
      groupCellCustomContent
    } = config;
    function createTable() {
      table = domAdapter.createElement('table');
      if (groupTableClass) {
        table.className = groupTableClass;
      }
    }
    function getChildCount(item) {
      if (item[childrenField]) {
        return item[childrenField].length;
      }
      return 0;
    }
    function createCell(text, childCount, index, data) {
      const cell = {
        element: domAdapter.createElement(cellTag),
        childCount
      };
      if (groupCellClass) {
        cell.element.className = groupCellClass;
      }
      const cellText = domAdapter.createTextNode(text);
      if (typeof groupCellCustomContent === 'function') {
        groupCellCustomContent(cell.element, cellText, index, data);
      } else {
        cell.element.appendChild(cellText);
      }
      return cell;
    }
    function generateCells(data) {
      for (let i = 0; i < data.length; i++) {
        const childCount = getChildCount(data[i]);
        const cell = createCell(data[i][titleField], childCount, i, data[i]);
        if (!cellStorage[rowIndex]) {
          cellStorage[rowIndex] = [];
        }
        cellStorage[rowIndex].push(cell);
        if (childCount) {
          generateCells(data[i][childrenField]);
        } else {
          rowIndex++;
        }
      }
    }
    function putCellsToRows() {
      cellStorage.forEach(cells => {
        const row = domAdapter.createElement(ROW_SELECTOR);
        if (groupRowClass) {
          row.className = groupRowClass;
        }
        const rowspans = [];
        for (let i = cells.length - 1; i >= 0; i--) {
          const prev = cells[i + 1];
          let rowspan = cells[i].childCount;
          if (prev && prev.childCount) {
            rowspan *= prev.childCount;
          }
          rowspans.push(rowspan);
        }
        rowspans.reverse();
        cells.forEach((cell, index) => {
          if (rowspans[index]) {
            cell.element.setAttribute('rowSpan', rowspans[index]);
          }
          row.appendChild(cell.element);
        });
        table.appendChild(row);
      });
    }
    createTable();
    generateCells(data);
    putCellsToRows();
    return table;
  }
  _makeFlexGroupedRowCells(group, repeatCount, cssClasses, cellTemplate) {
    let repeatByDate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    const cells = [];
    const {
      items
    } = group;
    const itemCount = items.length;
    for (let i = 0; i < repeatCount * repeatByDate; i++) {
      for (let j = 0; j < itemCount; j++) {
        let $container = $('<div>');
        const cell = {};
        if (cellTemplate && cellTemplate.render) {
          const templateOptions = {
            model: items[j],
            container: getPublicElement($container),
            index: i * itemCount + j
          };
          if (group.data) {
            templateOptions.model.data = group.data[j];
          }
          cell.template = cellTemplate.render.bind(cellTemplate, templateOptions);
        } else {
          $container.text(items[j].text).attr('title', items[j].text).addClass('dx-scheduler-group-header-content');
          $container = $('<div>').append($container);
        }
        const cssClass = isFunction(cssClasses.groupHeaderClass) ? cssClasses.groupHeaderClass(j) : cssClasses.groupHeaderClass;
        cell.element = $container.addClass(cssClass);
        cells.push(cell);
      }
    }
    return cells;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _makeVerticalGroupedRows(groups, cssClasses, cellTemplate, rowCount) {
    const cellTemplates = [];
    let repeatCount = 1;
    const cellsArray = [];
    const cellIterator = function (cell) {
      if (cell.template) {
        cellTemplates.push(cell.template);
      }
    };
    for (let i = 0; i < groups.length; i++) {
      if (i > 0) {
        // eslint-disable-next-line operator-assignment
        repeatCount = groups[i - 1].items.length * repeatCount;
      }
      const cells = this._makeFlexGroupedRowCells(groups[i], repeatCount, cssClasses, cellTemplate);
      cells.forEach(cellIterator);
      cellsArray.push(cells);
    }
    const rows = [];
    const groupCount = cellsArray.length;
    for (let i = 0; i < groupCount; i++) {
      rows.push($('<div>').addClass(cssClasses.groupHeaderRowClass));
    }
    for (let i = groupCount - 1; i >= 0; i--) {
      const currentColumnLength = cellsArray[i].length;
      for (let j = 0; j < currentColumnLength; j++) {
        rows[i].append(cellsArray[i][j].element);
      }
    }
    return {
      elements: $('<div>').addClass('dx-scheduler-group-flex-container').append(rows),
      cellTemplates
    };
  }
  _makeHorizontalGroupedRows(groups, cssClasses, cellCount, cellTemplate, groupByDate) {
    let repeatCount = 1;
    const groupCount = groups.length;
    const rows = [];
    const cellTemplates = [];
    const repeatByDate = groupByDate ? cellCount : 1;
    const cellIterator = function (cell) {
      if (cell.template) {
        cellTemplates.push(cell.template);
      }
      return cell.element;
    };
    for (let i = 0; i < groupCount; i++) {
      if (i > 0) {
        // eslint-disable-next-line operator-assignment
        repeatCount = groups[i - 1].items.length * repeatCount;
      }
      const cells = this._makeGroupedRowCells(groups[i], repeatCount, cssClasses, cellTemplate, repeatByDate);
      rows.push($('<tr>').addClass(cssClasses.groupRowClass).append(cells.map(cellIterator)));
    }
    const maxCellCount = rows[groupCount - 1].find('th').length;
    for (let j = 0; j < groupCount; j++) {
      const $cell = rows[j].find('th');
      let colspan = maxCellCount / $cell.length;
      if (!groupByDate) {
        colspan *= cellCount;
      }
      if (colspan > 1 && repeatByDate === 1 || groupByDate && groupCount > 1) {
        $cell.attr('colSpan', colspan);
      }
    }
    return {
      elements: rows,
      cellTemplates
    };
  }
  _makeGroupedRowCells(group, repeatCount, cssClasses, cellTemplate, repeatByDate) {
    repeatByDate = repeatByDate || 1;
    repeatCount *= repeatByDate;
    const cells = [];
    const {
      items
    } = group;
    const itemCount = items.length;
    for (let i = 0; i < repeatCount; i++) {
      for (let j = 0; j < itemCount; j++) {
        let $container = $('<div>');
        const cell = {};
        if (cellTemplate && cellTemplate.render) {
          const templateOptions = {
            model: items[j],
            container: getPublicElement($container),
            index: i * itemCount + j
          };
          if (group.data) {
            templateOptions.model.data = group.data[j];
          }
          cell.template = cellTemplate.render.bind(cellTemplate, templateOptions);
        } else {
          $container.text(items[j].text);
          $container = $('<div>').append($container);
        }
        $container.addClass(cssClasses.groupHeaderContentClass);
        let cssClass;
        if (isFunction(cssClasses.groupHeaderClass)) {
          cssClass = cssClasses.groupHeaderClass(j);
        } else {
          cssClass = cssClasses.groupHeaderClass;
        }
        cell.element = $('<th>').addClass(cssClass).append($container);
        cells.push(cell);
      }
    }
    return cells;
  }
}
export default {
  tableCreator: new SchedulerTableCreator()
};
