/**
* DevExtreme (cjs/ui/gantt/ui.gantt.custom_fields.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.GanttCustomFieldsManager = void 0;
var _data = require("../../core/utils/data");
var _uiGantt = require("./ui.gantt.cache");
var _uiGantt2 = require("./ui.gantt.helper");
const GANTT_TASKS = 'tasks';
class GanttCustomFieldsManager {
  constructor(gantt) {
    this._gantt = gantt;
    this._mappingHelper = gantt._mappingHelper;
    this.cache = new _uiGantt.GanttDataCache();
  }
  _getTaskCustomFields() {
    const columns = this._gantt.option('columns');
    const columnFields = columns && columns.map(c => c.dataField);
    const mappedFields = this._mappingHelper.getTaskMappedFieldNames();
    return columnFields ? columnFields.filter(f => mappedFields.indexOf(f) < 0) : [];
  }
  _getCustomFieldsData(data) {
    return this._getTaskCustomFields().reduce((previous, field) => {
      if (data && data[field] !== undefined) {
        previous[field] = data[field];
      }
      return previous;
    }, {});
  }
  addCustomFieldsData(key, data) {
    if (data) {
      const modelData = this._gantt._tasksOption && this._gantt._tasksOption._getItems();
      const keyGetter = (0, _data.compileGetter)(this._gantt.option(`${GANTT_TASKS}.keyExpr`));
      const modelItem = modelData && modelData.filter(obj => keyGetter(obj) === key)[0];
      const customFields = this._getTaskCustomFields();
      if (modelItem) {
        for (let i = 0; i < customFields.length; i++) {
          const field = customFields[i];
          if (Object.prototype.hasOwnProperty.call(modelItem, field)) {
            data[field] = modelItem[field];
          }
        }
      }
    }
  }
  appendCustomFields(data) {
    const modelData = this._gantt._tasksOption && this._gantt._tasksOption._getItems();
    const keyGetter = this._gantt._getTaskKeyGetter();
    const invertedData = _uiGantt2.GanttHelper.getInvertedData(modelData, keyGetter);
    return data.reduce((previous, item) => {
      const key = keyGetter(item);
      const modelItem = invertedData[key];
      if (!modelItem) {
        previous.push(item);
      } else {
        const updatedItem = {};
        for (const field in modelItem) {
          updatedItem[field] = Object.prototype.hasOwnProperty.call(item, field) ? item[field] : modelItem[field];
        }
        previous.push(updatedItem);
      }
      return previous;
    }, []);
  }
  addCustomFieldsDataFromCache(key, data) {
    this.cache.pullDataFromCache(key, data);
  }
  saveCustomFieldsDataToCache(key, data) {
    let forceUpdateOnKeyExpire = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let isCustomFieldsUpdateOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    const customFieldsData = this._getCustomFieldsData(data);
    if (Object.keys(customFieldsData).length > 0) {
      const updateCallback = (key, data) => {
        const dataOption = this._gantt[`_${GANTT_TASKS}Option`];
        if (dataOption && data) {
          dataOption.update(key, data, (data, key) => {
            const updatedCustomFields = {};
            this.addCustomFieldsData(key, updatedCustomFields);
            dataOption._reloadDataSource().done(data => {
              this._gantt._ganttTreeList.updateDataSource(data ?? dataOption._dataSource, false, isCustomFieldsUpdateOnly);
            });
            const selectedRowKey = this._gantt.option('selectedRowKey');
            this._gantt._ganttView._selectTask(selectedRowKey);
            this._gantt._actionsManager.raiseUpdatedAction(GANTT_TASKS, updatedCustomFields, key);
          });
        }
      };
      this.cache.saveData(key, customFieldsData, forceUpdateOnKeyExpire ? updateCallback : null);
    }
  }
  resetCustomFieldsDataCache(key) {
    this.cache.resetCache(key);
  }
}
exports.GanttCustomFieldsManager = GanttCustomFieldsManager;
