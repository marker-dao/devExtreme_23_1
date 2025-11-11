/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/add_geometry/get_appointment_collector_geometry.test.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _get_appointment_collector_geometry = require("./get_appointment_collector_geometry");
(0, _globals.describe)('getAppointmentCollectorGeometry', () => {
  (0, _globals.it)('should return collector position at the start, horizontal', () => {
    const entity = {
      columnIndex: 3
    };
    (0, _globals.expect)((0, _get_appointment_collector_geometry.getAppointmentCollectorGeometry)(entity, {
      collectorPosition: 'start',
      cellSize: {
        width: 100,
        height: 80
      },
      collectorSize: {
        width: 20,
        height: 20
      },
      collectorWithMarginsSize: {
        width: 26,
        height: 26
      },
      viewOrientation: 'horizontal'
    })).toEqual({
      height: 20,
      left: 300,
      top: 0,
      width: 20
    });
  });
  (0, _globals.it)('should return collector position at the end, horizontal', () => {
    const entity = {
      columnIndex: 3
    };
    (0, _globals.expect)((0, _get_appointment_collector_geometry.getAppointmentCollectorGeometry)(entity, {
      collectorPosition: 'end',
      cellSize: {
        width: 100,
        height: 80
      },
      collectorSize: {
        width: 20,
        height: 20
      },
      collectorWithMarginsSize: {
        width: 26,
        height: 26
      },
      viewOrientation: 'horizontal'
    })).toEqual({
      height: 20,
      left: 300,
      top: 54,
      width: 20
    });
  });
});
