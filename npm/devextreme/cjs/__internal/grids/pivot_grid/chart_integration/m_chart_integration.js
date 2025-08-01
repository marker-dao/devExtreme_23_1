/**
* DevExtreme (cjs/__internal/grids/pivot_grid/chart_integration/m_chart_integration.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ChartIntegrationMixin = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _m_widget_utils = require("../m_widget_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FORMAT_DICTIONARY = {
  number: 'numeric',
  date: 'datetime'
};
const UNBIND_KEY = 'dxPivotGridUnbinding';
function getFormattedValue(path, fields) {
  const value = [];
  const lastFieldIndex = fields.length - 1;
  (0, _iterator.each)(path, (i, item) => {
    value.push(item.text || (0, _m_widget_utils.formatValue)(item.value, fields[lastFieldIndex - i]));
  });
  return value.reverse();
}
function getExpandedLevel(node) {
  let level = 0;
  (0, _m_widget_utils.foreachTree)(node, members => {
    level = Math.max(level, members.length - 1);
  });
  return level;
}
function processDataCell(processCellArgs, processCell) {
  let {
    chartDataItem
  } = processCellArgs;
  let processedCell = processCell && processCell(processCellArgs);
  if (processedCell) {
    chartDataItem = (0, _extend.extend)({}, chartDataItem, processedCell.chartDataItem);
    processedCell = (0, _extend.extend)({}, processCellArgs, processedCell, {
      chartDataItem
    });
    return processedCell;
  }
  return processCellArgs;
}
function createChartDataSource(pivotGridDataSource, mapOptions, axisDictionary) {
  const data = pivotGridDataSource.getData();
  const dataSource = [];
  const dataFields = pivotGridDataSource.getAreaFields('data');
  const rowFields = pivotGridDataSource.getAreaFields('row');
  const columnFields = pivotGridDataSource.getAreaFields('column');
  const columnElements = [{
    index: data.grandTotalColumnIndex,
    children: data.columns
  }];
  const rowElements = [{
    index: data.grandTotalRowIndex,
    children: data.rows
  }];
  const rowLevel = getExpandedLevel(rowElements);
  const columnLevel = getExpandedLevel(columnElements);
  let measureIndex;
  let dataField;
  let rowMemberIndex;
  let rowVisibility;
  let rowPathFormatted;
  let rowPath;
  let columnMemberIndex;
  let columnVisibility;
  let columnPath;
  let columnPathFormatted;
  function createDataItem() {
    const dataCell = (data.values[rowMemberIndex] || [])[columnMemberIndex] || [];
    const value = dataCell[measureIndex];
    let axis;
    let processCellArgs = {
      rowPath,
      maxRowLevel: rowLevel,
      rowPathFormatted,
      rowFields,
      columnPathFormatted,
      maxColumnLevel: columnLevel,
      columnPath,
      columnFields,
      dataFields,
      dataIndex: measureIndex,
      dataValues: dataCell,
      visible: columnVisibility && rowVisibility
    };
    let seriesName = (mapOptions.inverted ? columnPathFormatted : rowPathFormatted).join(' - ');
    let argument = (mapOptions.inverted ? rowPathFormatted : columnPathFormatted).join('/');
    if (dataFields.length > 1) {
      if (mapOptions.putDataFieldsInto === 'args' || mapOptions.putDataFieldsInto === 'both') {
        argument += ` | ${dataField.caption}`;
      }
      if (mapOptions.putDataFieldsInto !== 'args') {
        seriesName += ` | ${dataField.caption}`;
        if (mapOptions.dataFieldsDisplayMode !== 'singleAxis') {
          axis = dataField.caption;
        }
      }
    }
    processCellArgs.chartDataItem = {
      val: value === undefined ? null : value,
      series: seriesName,
      arg: argument
    };
    processCellArgs = processDataCell(processCellArgs, mapOptions.processCell);
    if (processCellArgs.visible) {
      axisDictionary[processCellArgs.chartDataItem.series] = axisDictionary[processCellArgs.chartDataItem.series] || axis;
      dataSource.push(processCellArgs.chartDataItem);
    }
  }
  function foreachRowColumn(callBack) {
    (0, _m_widget_utils.foreachTree)(rowElements, rowMembers => {
      rowMemberIndex = rowMembers[0].index;
      rowMembers = rowMembers.slice(0, rowMembers.length - 1);
      rowVisibility = rowLevel === rowMembers.length;
      rowPath = (0, _m_widget_utils.createPath)(rowMembers);
      rowPathFormatted = getFormattedValue(rowMembers, rowFields);
      if (rowPath.length === 0) {
        rowPathFormatted = [mapOptions.grandTotalText];
      }
      (0, _m_widget_utils.foreachTree)(columnElements, columnMembers => {
        columnMemberIndex = columnMembers[0].index;
        columnMembers = columnMembers.slice(0, columnMembers.length - 1);
        columnVisibility = columnLevel === columnMembers.length;
        columnPath = (0, _m_widget_utils.createPath)(columnMembers);
        columnPathFormatted = getFormattedValue(columnMembers, columnFields);
        if (columnPath.length === 0) {
          columnPathFormatted = [mapOptions.grandTotalText];
        }
        callBack();
      });
    });
  }
  function foreachDataField(callback) {
    (0, _iterator.each)(dataFields, (index, field) => {
      dataField = field;
      measureIndex = index;
      callback();
    });
  }
  if (mapOptions.alternateDataFields === false) {
    foreachDataField(() => {
      foreachRowColumn(createDataItem);
    });
  } else {
    foreachRowColumn(() => {
      foreachDataField(createDataItem);
    });
  }
  return dataSource;
}
function createValueAxisOptions(dataSource, options) {
  const dataFields = dataSource.getAreaFields('data');
  if (options.putDataFieldsInto !== 'args' && options.dataFieldsDisplayMode !== 'singleAxis' || dataFields.length === 1) {
    const valueAxisSettings = [];
    (0, _iterator.each)(dataFields, (_, dataField) => {
      const valueAxisOptions = {
        name: dataField.caption,
        title: dataField.caption,
        valueType: FORMAT_DICTIONARY[dataField.dataType] || dataField.dataType,
        label: {
          format: dataField.format
        }
      };
      if (dataField.customizeText) {
        valueAxisOptions.label.customizeText = function (formatObject) {
          return dataField.customizeText.call(dataField, formatObject);
        };
      }
      if (options.dataFieldsDisplayMode === 'splitPanes') {
        valueAxisOptions.pane = dataField.caption;
      }
      valueAxisSettings.push(valueAxisOptions);
    });
    return valueAxisSettings;
  }
  return [{}];
}
function createPanesOptions(dataSource, options) {
  const panes = [];
  const dataFields = dataSource.getAreaFields('data');
  if (dataFields.length > 1 && options.dataFieldsDisplayMode === 'splitPanes' && options.putDataFieldsInto !== 'args') {
    (0, _iterator.each)(dataFields, (_, dataField) => {
      panes.push({
        name: dataField.caption
      });
    });
  }
  if (!panes.length) {
    panes.push({});
  }
  return panes;
}
function createChartOptions(dataSource, options) {
  const {
    customizeSeries
  } = options;
  const {
    customizeChart
  } = options;
  let chartOptions = {
    valueAxis: createValueAxisOptions(dataSource, options),
    panes: createPanesOptions(dataSource, options)
  };
  const axisDictionary = {};
  if (customizeChart) {
    chartOptions = (0, _extend.extend)(true, {}, chartOptions, customizeChart(chartOptions));
  }
  chartOptions.dataSource = createChartDataSource(dataSource, options, axisDictionary);
  chartOptions.seriesTemplate = {
    nameField: 'series',
    customizeSeries(seriesName) {
      let seriesOptions = {};
      if (options.dataFieldsDisplayMode === 'splitPanes') {
        seriesOptions.pane = axisDictionary[seriesName];
      } else if (options.dataFieldsDisplayMode !== 'singleAxis') {
        seriesOptions.axis = axisDictionary[seriesName];
      }
      if (customizeSeries) {
        seriesOptions = (0, _extend.extend)(seriesOptions, customizeSeries(seriesName, seriesOptions));
      }
      return seriesOptions;
    }
  };
  return chartOptions;
}
function getChartInstance(chartElement) {
  if (!chartElement) {
    return false;
  }
  if (chartElement.NAME) {
    return chartElement.NAME === 'dxChart' && chartElement;
  }
  const element = (0, _renderer.default)(chartElement);
  return element.data('dxChart') && element.dxChart('instance');
}
function removeBinding(chart) {
  const unbind = chart.$element().data(UNBIND_KEY);
  unbind && unbind();
}
const ChartIntegrationMixin = exports.ChartIntegrationMixin = {
  bindChart(chart, integrationOptions) {
    integrationOptions = (0, _extend.extend)({}, integrationOptions);
    const that = this;
    const updateChart = function () {
      integrationOptions.grandTotalText = that.option('texts.grandTotal');
      const chartOptions = createChartOptions(that.getDataSource(), integrationOptions);
      chart.option(chartOptions);
    };
    chart = getChartInstance(chart);
    if (!chart) {
      return null;
    }
    removeBinding(chart);
    that.on('changed', updateChart);
    updateChart();
    const disposeBinding = function () {
      chart.$element().removeData(UNBIND_KEY);
      that.off('changed', updateChart);
    };
    chart.on('disposing', disposeBinding);
    this.on('disposing', disposeBinding);
    chart.$element().data(UNBIND_KEY, disposeBinding);
    return disposeBinding;
  }
};
var _default = exports.default = {
  ChartIntegrationMixin
};
