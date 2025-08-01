/**
* DevExtreme (esm/__internal/scheduler/__mock__/resourceManager.mock.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { DataSource } from '../../data/data_source/m_data_source';
import CustomStore from '../../data/m_custom_store';
import { ResourceManager } from '../utils/resource_manager/resource_manager';
export const resourceItemsByIdMock = {
  'nested.priorityId': [{
    id: 1,
    text: 'Low Priority',
    color: '#1e90ff'
  }, {
    id: 2,
    text: 'High Priority',
    color: '#ff9747'
  }],
  assigneeId: [{
    guid: 1,
    name: 'Samantha Bright',
    mainColor: '#727bd2'
  }, {
    guid: 2,
    name: 'John Heart',
    mainColor: '#32c9ed'
  }, {
    guid: 3,
    name: 'Todd Hoffman',
    mainColor: '#2a7ee4'
  }, {
    guid: 4,
    name: 'Sandra Johnson',
    mainColor: '#7b49d3'
  }],
  roomId: [{
    id: 0,
    text: 'Room 1',
    color: '#aaa'
  }, {
    id: 1,
    text: 'Room 2',
    color: '#ccc'
  }, {
    id: 2,
    text: 'Room 3',
    color: '#777'
  }]
};
export const complexIdResourceMock = [{
  field: 'ownerId',
  dataSource: [{
    id: {
      _value: 'guid-1'
    },
    text: 'one',
    color: 'rgb(255, 0, 0)'
  }, {
    id: {
      _value: 'guid-2'
    },
    text: 'two',
    color: 'rgb(0, 128, 0)'
  }, {
    id: {
      _value: 'guid-3'
    },
    text: 'three',
    color: 'rgb(255, 255, 0)'
  }]
}];
export const resourceIndexesMock = Object.keys(resourceItemsByIdMock);
export const resourceConfigMock = [{
  allowMultiple: false,
  dataSource: resourceItemsByIdMock['nested.priorityId'],
  fieldExpr: 'nested.priorityId',
  displayExpr: 'text',
  label: 'Priority'
}, {
  fieldExpr: 'assigneeId',
  allowMultiple: true,
  dataSource: new DataSource({
    store: new CustomStore({
      load: () => resourceItemsByIdMock.assigneeId
    }),
    paginate: false
  }),
  valueExpr: 'guid',
  colorExpr: 'mainColor',
  displayExpr: 'name',
  label: 'Assignee'
}, {
  field: 'roomId',
  dataSource: resourceItemsByIdMock.roomId,
  label: 'Room'
}];
export const getResourceManagerMock = config => new ResourceManager(config ?? resourceConfigMock.map(item => _extends({}, item)));
