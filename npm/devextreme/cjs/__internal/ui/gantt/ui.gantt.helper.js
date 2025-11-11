/**
* DevExtreme (cjs/__internal/ui/gantt/ui.gantt.helper.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GanttHelper = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _data = require("../../../core/utils/data");
var _type = require("../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const GanttHelper = exports.GanttHelper = {
  prepareMapHandler(getters) {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return data => Object.keys(getters).reduce((previous, key) => {
      const resultKey = key === 'key' ? 'id' : key;
      previous[resultKey] = getters[key](data);
      return previous;
    }, {});
  },
  prepareSetterMapHandler(setters) {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return data => Object.keys(setters).reduce((previous, key) => {
      const resultKey = key === 'key' ? 'id' : key;
      setters[key](previous, data[resultKey]);
      return previous;
    }, {});
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  compileGettersByOption(optionValue) {
    const getters = {};
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const field in optionValue) {
      const exprMatches = /(\w*)Expr/.exec(field);
      if (exprMatches) {
        getters[exprMatches[1]] = (0, _data.compileGetter)(optionValue[exprMatches[0]]);
      }
    }
    return getters;
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  compileSettersByOption(optionValue) {
    const setters = {};
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const field in optionValue) {
      const exprMatches = /(\w*)Expr/.exec(field);
      if (exprMatches && !(0, _type.isFunction)(optionValue[exprMatches[0]])) {
        setters[exprMatches[1]] = (0, _data.compileSetter)(optionValue[exprMatches[0]]);
      }
    }
    return setters;
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  compileFuncSettersByOption(optionValue) {
    const setters = {};
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const field in optionValue) {
      const exprMatches = /(\w*)Expr/.exec(field);
      if (exprMatches && (0, _type.isFunction)(optionValue[exprMatches[0]])) {
        setters[exprMatches[1]] = optionValue[exprMatches[0]];
      }
    }
    return setters;
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getStoreObject(option, modelObject) {
    const setters = GanttHelper.compileSettersByOption(option);
    return Object.keys(setters).reduce((previous, key) => {
      if (key !== 'key') {
        setters[key](previous, modelObject[key]);
      }
      return previous;
    }, {});
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getInvertedData(data, keyGetter) {
    const inverted = {};
    if (data) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < data.length; i += 1) {
        const dataItem = data[i];
        const key = keyGetter(dataItem);
        inverted[key] = dataItem;
      }
    }
    return inverted;
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getArrayFromOneElement(element) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return element === undefined || element === null ? [] : [element];
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getSelectionMode(allowSelection) {
    return allowSelection ? 'single' : 'none';
  },
  convertTreeToList(node, array) {
    if (node !== null && node !== void 0 && node.data && node !== null && node !== void 0 && node.visible) {
      array.push(node.data);
    }
    for (let i = 0; i < ((_node$children = node.children) === null || _node$children === void 0 ? void 0 : _node$children.length); i += 1) {
      var _node$children;
      const child = node.children[i];
      GanttHelper.convertTreeToList(child, array);
    }
  },
  getAllParentNodesKeys(node, array) {
    var _node$parent;
    if (node !== null && node !== void 0 && node.data) {
      array.push(node.key);
    }
    if (node !== null && node !== void 0 && (_node$parent = node.parent) !== null && _node$parent !== void 0 && _node$parent.data) {
      GanttHelper.getAllParentNodesKeys(node.parent, array);
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getDefaultOptions() {
    return {
      tasks: {
        dataSource: null,
        keyExpr: 'id',
        parentIdExpr: 'parentId',
        startExpr: 'start',
        endExpr: 'end',
        progressExpr: 'progress',
        titleExpr: 'title',
        colorExpr: 'color'
      },
      dependencies: {
        dataSource: null,
        keyExpr: 'id',
        predecessorIdExpr: 'predecessorId',
        successorIdExpr: 'successorId',
        typeExpr: 'type'
      },
      resources: {
        dataSource: null,
        keyExpr: 'id',
        textExpr: 'text',
        colorExpr: 'color'
      },
      resourceAssignments: {
        dataSource: null,
        keyExpr: 'id',
        taskIdExpr: 'taskId',
        resourceIdExpr: 'resourceId'
      },
      columns: undefined,
      taskListWidth: 300,
      showResources: true,
      showDependencies: true,
      taskTitlePosition: 'inside',
      firstDayOfWeek: undefined,
      selectedRowKey: undefined,
      onSelectionChanged: null,
      onTaskClick: null,
      onTaskDblClick: null,
      onTaskInserting: null,
      onTaskInserted: null,
      onTaskDeleting: null,
      onTaskDeleted: null,
      onTaskUpdating: null,
      onTaskUpdated: null,
      onTaskMoving: null,
      onTaskEditDialogShowing: null,
      onDependencyInserting: null,
      onDependencyInserted: null,
      onDependencyDeleting: null,
      onDependencyDeleted: null,
      onResourceInserting: null,
      onResourceInserted: null,
      onResourceDeleting: null,
      onResourceDeleted: null,
      onResourceAssigning: null,
      onResourceAssigned: null,
      onResourceUnassigning: null,
      onResourceUnassigned: null,
      onCustomCommand: null,
      onContextMenuPreparing: null,
      allowSelection: true,
      showRowLines: true,
      stripLines: undefined,
      scaleType: 'auto',
      scaleTypeRange: {
        min: 'minutes',
        max: 'years'
      },
      editing: {
        enabled: false,
        allowTaskAdding: true,
        allowTaskDeleting: true,
        allowTaskUpdating: true,
        allowDependencyAdding: true,
        allowDependencyDeleting: true,
        allowResourceAdding: true,
        allowResourceDeleting: true,
        allowResourceUpdating: true,
        allowTaskResourceUpdating: true
      },
      validation: {
        validateDependencies: false,
        autoUpdateParentTasks: false,
        enablePredecessorGap: false
      },
      toolbar: null,
      contextMenu: {
        enabled: true,
        items: undefined
      },
      taskTooltipContentTemplate: null,
      taskProgressTooltipContentTemplate: null,
      taskTimeTooltipContentTemplate: null,
      taskContentTemplate: null,
      rootValue: 0,
      sorting: {
        ascendingText: _message.default.format('dxGantt-sortingAscendingText'),
        descendingText: _message.default.format('dxGantt-sortingDescendingText'),
        clearText: _message.default.format('dxGantt-sortingClearText'),
        mode: 'single',
        showSortIndexes: false
      },
      filterRow: undefined,
      headerFilter: undefined,
      rtlEnabled: false
    };
  }
};
