/**
* DevExtreme (cjs/__internal/scheduler/utils/resource_manager/popup_utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _resourceManager = require("../../../scheduler/__mock__/resourceManager.mock");
var _popup_utils = require("./popup_utils");
(0, _globals.describe)('popup utils', () => {
  (0, _globals.describe)('createResourceEditorModel', () => {
    (0, _globals.it)('should return resource editor model', () => {
      const manager = (0, _resourceManager.getResourceManagerMock)();
      (0, _globals.expect)((0, _popup_utils.createResourceEditorModel)(manager.resourceById)).toEqual([{
        dataField: 'nested.priorityId',
        editorOptions: {
          dataSource: _globals.expect.anything(),
          displayExpr: 'text',
          stylingMode: 'outlined',
          valueExpr: 'id'
        },
        editorType: 'dxSelectBox',
        label: {
          text: 'Priority'
        }
      }, {
        dataField: 'assigneeId',
        editorOptions: {
          dataSource: _globals.expect.anything(),
          displayExpr: 'name',
          stylingMode: 'outlined',
          valueExpr: 'guid'
        },
        editorType: 'dxTagBox',
        label: {
          text: 'Assignee'
        }
      }, {
        dataField: 'roomId',
        editorOptions: {
          dataSource: _globals.expect.anything(),
          displayExpr: 'text',
          stylingMode: 'outlined',
          valueExpr: 'id'
        },
        editorType: 'dxSelectBox',
        label: {
          text: 'Room'
        }
      }]);
    });
    (0, _globals.it)('Resource editor should always have label', () => {
      (0, _globals.expect)((0, _popup_utils.createResourceEditorModel)({
        roomId: {
          resourceIndex: 'roomId',
          dataAccessor: {}
        }
      })).toEqual([{
        dataField: 'roomId',
        editorOptions: {
          stylingMode: 'outlined'
        },
        editorType: 'dxSelectBox',
        label: {
          text: 'roomId'
        }
      }]);
    });
  });
});
