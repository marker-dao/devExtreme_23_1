/**
* DevExtreme (cjs/__internal/scheduler/utils/data_accessor/resource_data_accessor.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _resource_data_accessor = require("./resource_data_accessor");
(0, _globals.describe)('ResourceDataAccessor', () => {
  (0, _globals.describe)('default id, text and color', () => {
    const defaultResource = {
      id: 0,
      text: 'Room 1',
      color: '#aaa'
    };
    const defaultAccessor = new _resource_data_accessor.ResourceDataAccessor({
      fieldExpr: 'roomId',
      dataSource: [],
      label: 'Room'
    });
    (0, _globals.it)('should get fields', () => {
      (0, _globals.expect)(defaultAccessor.get('id', defaultResource)).toBe(defaultResource.id);
      (0, _globals.expect)(defaultAccessor.get('text', defaultResource)).toBe(defaultResource.text);
      (0, _globals.expect)(defaultAccessor.get('color', defaultResource)).toBe(defaultResource.color);
    });
    (0, _globals.it)('should set fields', () => {
      defaultAccessor.set('id', defaultResource, 10);
      defaultAccessor.set('text', defaultResource, 'text');
      defaultAccessor.set('color', defaultResource, 'color');
      (0, _globals.expect)(defaultResource.id).toBe(10);
      (0, _globals.expect)(defaultResource.text).toBe('text');
      (0, _globals.expect)(defaultResource.color).toBe('color');
    });
  });
  (0, _globals.describe)('overloaded id, text and color', () => {
    const customResource = {
      complex: {
        item: {
          guid: '0'
        }
      },
      name: 'Room 1',
      mainColor: '#aaa'
    };
    const accessor = new _resource_data_accessor.ResourceDataAccessor({
      fieldExpr: 'roomId',
      dataSource: [],
      valueExpr: 'complex.item.guid',
      displayExpr: 'name',
      colorExpr: 'mainColor',
      label: 'Room'
    });
    (0, _globals.it)('should get overloaded fields', () => {
      (0, _globals.expect)(accessor.get('id', customResource)).toBe(customResource.complex.item.guid);
      (0, _globals.expect)(accessor.get('text', customResource)).toBe(customResource.name);
      (0, _globals.expect)(accessor.get('color', customResource)).toBe(customResource.mainColor);
    });
    (0, _globals.it)('should set overloaded fields', () => {
      accessor.set('id', customResource, 10);
      accessor.set('text', customResource, 'text');
      accessor.set('color', customResource, 'color');
      (0, _globals.expect)(customResource.complex.item.guid).toBe(10);
      (0, _globals.expect)(customResource.name).toBe('text');
      (0, _globals.expect)(customResource.mainColor).toBe('color');
    });
  });
});
