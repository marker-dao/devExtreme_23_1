/**
* DevExtreme (cjs/__internal/exporter/jspdf/autotable/export.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Export = void 0;
var _date = _interopRequireDefault(require("../../../../common/core/localization/date"));
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _number = _interopRequireDefault(require("../../../../common/core/localization/number"));
var _extend = require("../../../../core/utils/extend");
var _type = require("../../../../core/utils/type");
var _window = require("../../../../core/utils/window");
var _export_load_panel = require("../../common/export_load_panel");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable consistent-return */
/* eslint-disable spellcheck/spell-checker */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-plusplus */
/* eslint-disable max-depth */
/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @stylistic/no-mixed-operators */

const Export = exports.Export = {
  getFullOptions(options) {
    const fullOptions = (0, _extend.extend)({}, options);
    if (!((0, _type.isDefined)(fullOptions.jsPDFDocument) && (0, _type.isObject)(fullOptions.jsPDFDocument))) {
      throw Error('The "jsPDFDocument" field must contain a jsPDF instance.');
    }
    if (!((0, _type.isDefined)(fullOptions.jsPDFDocument.autoTable) && (0, _type.isFunction)(fullOptions.jsPDFDocument.autoTable))) {
      throw Error('The "exportDataGrid" method requires a autoTable plugin for jsPDF object.');
    }
    if (!(0, _type.isDefined)(fullOptions.keepColumnWidths)) {
      fullOptions.keepColumnWidths = true;
    }
    if (!(0, _type.isDefined)(fullOptions.autoTableOptions)) {
      fullOptions.autoTableOptions = this._getDefaultAutoTableOptions();
    } else {
      if (!(0, _type.isObject)(fullOptions.autoTableOptions)) {
        throw Error('The "autoTableOptions" option must be of object type.');
      }
      fullOptions.autoTableOptions = (0, _extend.extend)(true, {}, this._getDefaultAutoTableOptions(), fullOptions.autoTableOptions);
    }
    if (!(0, _type.isDefined)(fullOptions.loadPanel)) {
      fullOptions.loadPanel = {};
    }
    if (!(0, _type.isDefined)(fullOptions.loadPanel.enabled)) {
      fullOptions.loadPanel.enabled = true;
    }
    if (!(0, _type.isDefined)(fullOptions.loadPanel.text)) {
      fullOptions.loadPanel.text = _message.default.format('dxDataGrid-exporting');
    }
    return fullOptions;
  },
  _getDefaultAutoTableOptions() {
    return {
      theme: 'plain',
      tableLineColor: 149,
      tableLineWidth: 0.1,
      styles: {
        textColor: 51,
        lineColor: 149,
        lineWidth: 0
      },
      columnStyles: {},
      headStyles: {
        fontStyle: 'normal',
        textColor: 149,
        lineWidth: 0.1
      },
      bodyStyles: {
        lineWidth: 0.1
      },
      head: [],
      body: []
    };
  },
  export(options) {
    var _component$_getIntern, _internalComponent$op;
    const {
      jsPDFDocument,
      autoTableOptions,
      component,
      customizeCell,
      keepColumnWidths,
      selectedRowsOnly,
      loadPanel
    } = options;
    const internalComponent = ((_component$_getIntern = component._getInternalInstance) === null || _component$_getIntern === void 0 ? void 0 : _component$_getIntern.call(component)) || component;
    const initialLoadPanelEnabledOption = (_internalComponent$op = internalComponent.option('loadPanel')) === null || _internalComponent$op === void 0 ? void 0 : _internalComponent$op.enabled;
    if (initialLoadPanelEnabledOption) {
      component.option('loadPanel.enabled', false);
    }
    let exportLoadPanel;
    if (loadPanel.enabled && (0, _window.hasWindow)()) {
      const rowsView = component.getView('rowsView');
      exportLoadPanel = new _export_load_panel.ExportLoadPanel(component, rowsView.element(), rowsView.element().parent(), loadPanel);
      exportLoadPanel.show();
    }
    const dataProvider = component.getDataProvider(selectedRowsOnly);
    const wrapText = !!component.option('wordWrapEnabled');
    return new Promise(resolve => {
      dataProvider.ready().done(() => {
        const columns = dataProvider.getColumns();
        const styles = dataProvider.getStyles();
        const dataRowsCount = dataProvider.getRowsCount();
        const headerRowCount = dataProvider.getHeaderRowCount();
        const mergedCells = [];
        if (keepColumnWidths) {
          const pdfColumnWidths = this._tryGetPdfColumnWidths(autoTableOptions.tableWidth, dataProvider.getColumnsWidths());
          if ((0, _type.isDefined)(pdfColumnWidths) && (0, _type.isDefined)(autoTableOptions.columnStyles)) {
            this._setColumnWidths(autoTableOptions.columnStyles, pdfColumnWidths);
          }
        }
        for (let rowIndex = 0; rowIndex < dataRowsCount; rowIndex++) {
          const row = [];
          for (let cellIndex = 0; cellIndex < columns.length; cellIndex++) {
            const {
              value,
              cellSourceData: gridCell
            } = dataProvider.getCellData(rowIndex, cellIndex, true);
            const cellStyle = styles[dataProvider.getStyleId(rowIndex, cellIndex)];
            const pdfCell = {
              content: this._getFormattedValue(value, cellStyle.format),
              styles: this._getPDFCellStyles(gridCell.rowType, columns[cellIndex].alignment, cellStyle, wrapText)
            };
            if (gridCell.rowType === 'header') {
              const mergedRange = this._tryGetMergeRange(rowIndex, cellIndex, mergedCells, dataProvider);
              if (mergedRange && mergedRange.rowSpan > 0) {
                pdfCell.rowSpan = mergedRange.rowSpan + 1;
              }
              if (mergedRange && mergedRange.colSpan > 0) {
                pdfCell.colSpan = mergedRange.colSpan + 1;
              }
              const isMergedCell = mergedCells[rowIndex] && mergedCells[rowIndex][cellIndex];
              if (!isMergedCell || pdfCell.rowSpan > 1 || pdfCell.colSpan > 1) {
                if ((0, _type.isFunction)(customizeCell)) {
                  customizeCell({
                    gridCell,
                    pdfCell
                  });
                }
                row.push(pdfCell);
              }
            } else if (gridCell.rowType === 'group' && !(0, _type.isDefined)(pdfCell.content) && row.length === 1) {
              row[0].colSpan = row[0].colSpan ?? 1;
              row[0].colSpan++;
            } else {
              pdfCell.content = pdfCell.content ?? '';
              if ((0, _type.isFunction)(customizeCell)) {
                customizeCell({
                  gridCell,
                  pdfCell
                });
              }
              row.push(pdfCell);
            }
          }
          if (rowIndex < headerRowCount) {
            autoTableOptions.head.push(row);
          } else {
            autoTableOptions.body.push(row);
          }
        }
        jsPDFDocument.autoTable(autoTableOptions);
        resolve();
      }).always(() => {
        if (initialLoadPanelEnabledOption) {
          component.option('loadPanel.enabled', initialLoadPanelEnabledOption);
        }
        if (loadPanel.enabled && (0, _window.hasWindow)()) {
          exportLoadPanel.dispose();
        }
      });
    });
  },
  _getFormattedValue(value, format) {
    if ((0, _type.isDefined)(format)) {
      if ((0, _type.isDate)(value)) {
        return _date.default.format(value, format);
      }
      if ((0, _type.isNumeric)(value)) {
        return _number.default.format(value, format);
      }
    }
    return value;
  },
  _getPDFCellStyles(rowType, columnAlignment, cellStyle, wrapText) {
    const {
      alignment: cellAlignment,
      bold
    } = cellStyle;
    const align = rowType === 'header' ? columnAlignment : cellAlignment;
    const pdfCellStyle = {};
    if (align) {
      pdfCellStyle.halign = align;
    }
    if (bold && rowType !== 'header') {
      pdfCellStyle.fontStyle = 'bold';
    }
    if (wrapText) {
      pdfCellStyle.cellWidth = 'wrap';
    }
    return pdfCellStyle;
  },
  _tryGetMergeRange(rowIndex, cellIndex, mergedCells, dataProvider) {
    var _mergedCells$rowIndex;
    if (!((_mergedCells$rowIndex = mergedCells[rowIndex]) !== null && _mergedCells$rowIndex !== void 0 && _mergedCells$rowIndex[cellIndex])) {
      const {
        colspan,
        rowspan
      } = dataProvider.getCellMerging(rowIndex, cellIndex);
      if (colspan || rowspan) {
        for (let i = rowIndex; i <= rowIndex + rowspan || 0; i++) {
          for (let j = cellIndex; j <= cellIndex + colspan || 0; j++) {
            if (!mergedCells[i]) {
              mergedCells[i] = [];
            }
            mergedCells[i][j] = true;
          }
        }
        return {
          rowSpan: rowspan,
          colSpan: colspan
        };
      }
    }
    return undefined;
  },
  _tryGetPdfColumnWidths(autoTableWidth, columnWidths) {
    if ((0, _type.isNumeric)(autoTableWidth) && (0, _type.isDefined)(columnWidths)) {
      const tableWidth = columnWidths.reduce((a, b) => a + b, 0);
      return columnWidths.map(columnWidth => autoTableWidth * columnWidth / tableWidth);
    }
  },
  _setColumnWidths(autoTableColumnStyles, pdfColumnWidths) {
    pdfColumnWidths.forEach((width, index) => {
      autoTableColumnStyles[index] = autoTableColumnStyles[index] || {};
      autoTableColumnStyles[index].cellWidth = width;
    });
  }
};
