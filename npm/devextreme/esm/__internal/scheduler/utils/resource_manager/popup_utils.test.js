/**
* DevExtreme (esm/__internal/scheduler/utils/resource_manager/popup_utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { getResourceManagerMock } from '../../../scheduler/__mock__/resourceManager.mock';
import { createResourceEditorModel } from './popup_utils';
describe('popup utils', () => {
  describe('createResourceEditorModel', () => {
    it('should return resource editor model', () => {
      const manager = getResourceManagerMock();
      expect(createResourceEditorModel(manager.resourceById)).toEqual([{
        dataField: 'nested.priorityId',
        editorOptions: {
          dataSource: expect.anything(),
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
          dataSource: expect.anything(),
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
          dataSource: expect.anything(),
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
    it('Resource editor should always have label', () => {
      expect(createResourceEditorModel({
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
