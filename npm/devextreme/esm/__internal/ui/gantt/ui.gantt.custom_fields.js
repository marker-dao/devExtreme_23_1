/**
* DevExtreme (esm/__internal/ui/gantt/ui.gantt.custom_fields.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { compileGetter } from '../../../core/utils/data';
import { GanttDataCache } from '../../ui/gantt/ui.gantt.cache';
import { GanttHelper } from '../../ui/gantt/ui.gantt.helper';
const GANTT_TASKS = 'tasks';
export class GanttCustomFieldsManager {
  constructor(gantt) {
    this._gantt = gantt;
    // @ts-expect-error ts-error
    this._mappingHelper = gantt._mappingHelper;
    this.cache = new GanttDataCache();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getTaskCustomFields() {
    const {
      columns
    } = this._gantt.option();
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const columnFields = columns === null || columns === void 0 ? void 0 : columns.map(c => c.dataField);
    const mappedFields = this._mappingHelper.getTaskMappedFieldNames();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return columnFields
    // @ts-expect-error ts-error
    ? columnFields.filter(f => !mappedFields.includes(f)) : [];
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getCustomFieldsData(data) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._getTaskCustomFields().reduce((previous, field) => {
      if (data && data[field] !== undefined) {
        previous[field] = data[field];
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return previous;
    }, {});
  }
  addCustomFieldsData(key, data) {
    if (data) {
      var _this$_gantt$_tasksOp;
      // @ts-expect-error ts-error
      const modelData = (_this$_gantt$_tasksOp = this._gantt._tasksOption) === null || _this$_gantt$_tasksOp === void 0 ? void 0 : _this$_gantt$_tasksOp._getItems();
      const keyGetter = compileGetter(
      // @ts-expect-error ts-error
      this._gantt.option(`${GANTT_TASKS}.keyExpr`));
      // @ts-expect-error ts-error
      const modelItem = modelData === null || modelData === void 0 ? void 0 : modelData.filter(obj => keyGetter(obj) === key)[0];
      const customFields = this._getTaskCustomFields();
      if (modelItem) {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < customFields.length; i += 1) {
          const field = customFields[i];
          // eslint-disable-next-line max-depth
          if (Object.prototype.hasOwnProperty.call(modelItem, field)) {
            data[field] = modelItem[field];
          }
        }
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  appendCustomFields(data) {
    var _this$_gantt$_tasksOp2;
    // @ts-expect-error ts-error
    const modelData = (_this$_gantt$_tasksOp2 = this._gantt._tasksOption) === null || _this$_gantt$_tasksOp2 === void 0 ? void 0 : _this$_gantt$_tasksOp2._getItems();
    const keyGetter = this._gantt._getTaskKeyGetter();
    const invertedData = GanttHelper.getInvertedData(modelData, keyGetter);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data.reduce((previous, item) => {
      // @ts-expect-error ts-error
      const key = keyGetter(item);
      const modelItem = invertedData[key];
      if (!modelItem) {
        previous.push(item);
      } else {
        const updatedItem = {};
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const field in modelItem) {
          updatedItem[field] = Object.prototype.hasOwnProperty.call(item, field) ? item[field] : modelItem[field];
        }
        previous.push(updatedItem);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const updateCallback = (key, data) => {
        const dataOption = this._gantt[`_${GANTT_TASKS}Option`];
        if (dataOption && data) {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          dataOption.update(key, data, (data, key) => {
            var _this$_gantt$_ganttVi, _this$_gantt$_actions;
            const updatedCustomFields = {};
            this.addCustomFieldsData(key, updatedCustomFields);
            // eslint-disable-next-line @typescript-eslint/no-shadow
            dataOption._reloadDataSource().done(data => {
              var _this$_gantt$_ganttTr;
              (_this$_gantt$_ganttTr = this._gantt._ganttTreeList) === null || _this$_gantt$_ganttTr === void 0 || _this$_gantt$_ganttTr.updateDataSource(data ?? dataOption._dataSource, false, isCustomFieldsUpdateOnly);
            });
            const selectedRowKey = this._gantt.option('selectedRowKey');
            (_this$_gantt$_ganttVi = this._gantt._ganttView) === null || _this$_gantt$_ganttVi === void 0 || _this$_gantt$_ganttVi._selectTask(selectedRowKey);
            (_this$_gantt$_actions = this._gantt._actionsManager) === null || _this$_gantt$_actions === void 0 || _this$_gantt$_actions.raiseUpdatedAction(GANTT_TASKS, updatedCustomFields, key);
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
