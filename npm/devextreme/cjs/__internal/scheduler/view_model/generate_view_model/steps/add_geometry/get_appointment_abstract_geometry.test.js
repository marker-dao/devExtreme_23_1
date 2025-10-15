/**
* DevExtreme (cjs/__internal/scheduler/view_model/generate_view_model/steps/add_geometry/get_appointment_abstract_geometry.test.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _get_appointment_abstract_geometry = require("./get_appointment_abstract_geometry");
/**
 * @timezone Europe/Belgrade
 */

(0, _globals.describe)('appointment position utils', () => {
  (0, _globals.describe)('getAppointmentX', () => {
    const cellSize = {
      sizeX: 200,
      sizeY: 100
    };
    const cells = [{
      min: 0,
      max: 20,
      cellIndex: 0,
      columnIndex: 0,
      rowIndex: 0
    }, {
      min: 20,
      max: 40,
      cellIndex: 1,
      columnIndex: 1,
      rowIndex: 0
    }, {
      min: 50,
      max: 70,
      cellIndex: 2,
      columnIndex: 2,
      rowIndex: 0
    }, {
      min: 70,
      max: 90,
      cellIndex: 3,
      columnIndex: 3,
      rowIndex: 0
    }];
    (0, _globals.it)('should return X position inside one cell', () => {
      const entity = {
        startDateUTC: 10,
        endDateUTC: 15,
        cellIndex: 0,
        endCellIndex: 0,
        columnIndex: 0
      };
      (0, _globals.expect)((0, _get_appointment_abstract_geometry.getAppointmentX)(entity, cellSize, cells)).toEqual({
        offsetX: 100,
        sizeX: 50
      });
    });
    (0, _globals.it)('should return X position inside cells with gap', () => {
      const entity = {
        startDateUTC: 22,
        endDateUTC: 72,
        cellIndex: 1,
        endCellIndex: 3,
        columnIndex: 1
      };
      (0, _globals.expect)((0, _get_appointment_abstract_geometry.getAppointmentX)(entity, cellSize, cells)).toEqual({
        offsetX: 220,
        sizeX: 400
      });
    });
    (0, _globals.it)('should return correct X position through DST', () => {
      const entity = {
        startDateUTC: Date.UTC(2019, 9, 26),
        endDateUTC: Date.UTC(2019, 9, 29),
        cellIndex: 0,
        endCellIndex: 1,
        columnIndex: 0
      };
      (0, _globals.expect)((0, _get_appointment_abstract_geometry.getAppointmentX)(entity, cellSize, [{
        min: Date.UTC(2019, 9, 25),
        max: Date.UTC(2019, 9, 27),
        cellIndex: 0,
        columnIndex: 0,
        rowIndex: 0
      }, {
        min: Date.UTC(2019, 9, 27),
        max: Date.UTC(2019, 9, 29),
        cellIndex: 1,
        columnIndex: 1,
        rowIndex: 0
      }])).toEqual({
        offsetX: 100,
        sizeX: 300
      });
    });
  });
  (0, _globals.describe)('getAppointmentY', () => {
    (0, _globals.it)('should return Y position inside interval according to level for collector at the start', () => {
      const entity = {
        level: 4,
        maxLevel: 10,
        isAllDayPanelOccupied: false,
        inStackWithCollector: false
      };
      (0, _globals.expect)((0, _get_appointment_abstract_geometry.getAppointmentY)(entity, {
        sizeX: 200,
        sizeY: 105
      }, 5, 'start')).toEqual({
        offsetY: 45,
        sizeY: 10
      });
    });
    (0, _globals.it)('should return Y position inside interval according to level for collector at the end', () => {
      const entity = {
        level: 7,
        maxLevel: 10,
        isAllDayPanelOccupied: false,
        inStackWithCollector: false
      };
      (0, _globals.expect)((0, _get_appointment_abstract_geometry.getAppointmentY)(entity, {
        sizeX: 200,
        sizeY: 105
      }, 5, 'end')).toEqual({
        offsetY: 70,
        sizeY: 10
      });
    });
    (0, _globals.it)('should return Y position for all day panel at the beginning of cell', () => {
      const entity = {
        level: 0,
        maxLevel: 1,
        isAllDayPanelOccupied: true,
        inStackWithCollector: false
      };
      (0, _globals.expect)((0, _get_appointment_abstract_geometry.getAppointmentY)(entity, {
        sizeX: 200,
        sizeY: 105
      }, 5, 'end')).toEqual({
        offsetY: 0,
        sizeY: 100
      });
    });
  });
});
