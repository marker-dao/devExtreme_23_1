/**
* DevExtreme (cjs/__internal/scheduler/utils/data_accessor/appointment_resource_data_accessor.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _appointment_resource_data_accessor = require("./appointment_resource_data_accessor");
(0, _globals.describe)('appointment resource data accessor', () => {
  (0, _globals.describe)('getResourceIndex', () => {
    (0, _globals.it)('should return resource index', () => {
      (0, _globals.expect)((0, _appointment_resource_data_accessor.getResourceIndex)({
        fieldExpr: 'roomId'
      })).toBe('roomId');
      (0, _globals.expect)((0, _appointment_resource_data_accessor.getResourceIndex)({
        field: 'roomId'
      })).toBe('roomId');
      (0, _globals.expect)((0, _appointment_resource_data_accessor.getResourceIndex)({})).toBe('');
    });
  });
  (0, _globals.describe)('getAppointmentResourceAccessor', () => {
    const accessor = (0, _appointment_resource_data_accessor.getAppointmentResourceAccessor)({
      fieldExpr: 'roomId'
    });
    (0, _globals.it)('should get single ids', () => {
      (0, _globals.expect)(accessor.idsGetter({
        roomId: 1
      })).toEqual([1]);
    });
    (0, _globals.it)('should get multiple ids', () => {
      (0, _globals.expect)(accessor.idsGetter({
        roomId: [1, 2]
      })).toEqual([1, 2]);
    });
    (0, _globals.it)('should set ids', () => {
      const obj = {
        roomId: 1
      };
      accessor.idsSetter(obj, [1, 2]);
      (0, _globals.expect)(obj).toEqual({
        roomId: [1, 2]
      });
    });
  });
});
