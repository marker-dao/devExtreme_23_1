/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/add_geometry/add_adaptivity_geometry_inside_interval.test.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _add_adaptivity_geometry_inside_interval = require("./add_adaptivity_geometry_inside_interval");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
(0, _globals.describe)('addAdaptivityGeometryInsideInterval', () => {
  (0, _globals.it)('should position collector center bottom for horizontal view', () => {
    const entity = {
      columnIndex: 2,
      rowIndex: 2,
      isAllDayPanelOccupied: false,
      items: [{}]
    };
    (0, _globals.expect)((0, _add_adaptivity_geometry_inside_interval.addAdaptivityGeometryInsideInterval)(entity, {
      collectorSize: {
        width: 20,
        height: 20
      },
      collectorWithMarginsSize: {
        width: 20,
        height: 20
      },
      cellSize: {
        width: 100,
        height: 80
      },
      viewOrientation: 'horizontal'
    })).toEqual(_extends({}, entity, {
      width: 20,
      height: 20,
      left: 240,
      top: 40,
      items: [{
        width: 100,
        height: 80
      }]
    }));
  });
  (0, _globals.it)('should position collector center for all day panel entity', () => {
    const entity = {
      columnIndex: 0,
      rowIndex: 0,
      isAllDayPanelOccupied: true,
      items: [{}]
    };
    (0, _globals.expect)((0, _add_adaptivity_geometry_inside_interval.addAdaptivityGeometryInsideInterval)(entity, {
      collectorSize: {
        width: 20,
        height: 20
      },
      collectorWithMarginsSize: {
        width: 20,
        height: 20
      },
      cellSize: {
        width: 100,
        height: 80
      },
      viewOrientation: 'horizontal'
    })).toEqual(_extends({}, entity, {
      width: 20,
      height: 20,
      left: 40,
      top: 30,
      items: [{
        width: 100,
        height: 80
      }]
    }));
  });
  (0, _globals.it)('should position collector center for vertical view', () => {
    const entity = {
      columnIndex: 1,
      rowIndex: 0,
      items: [{}]
    };
    (0, _globals.expect)((0, _add_adaptivity_geometry_inside_interval.addAdaptivityGeometryInsideInterval)(entity, {
      collectorSize: {
        width: 20,
        height: 20
      },
      collectorWithMarginsSize: {
        width: 30,
        height: 30
      },
      cellSize: {
        width: 100,
        height: 80
      },
      viewOrientation: 'vertical'
    })).toEqual(_extends({}, entity, {
      width: 20,
      height: 20,
      left: 35,
      top: 105,
      items: [{
        width: 100,
        height: 80
      }]
    }));
  });
});
