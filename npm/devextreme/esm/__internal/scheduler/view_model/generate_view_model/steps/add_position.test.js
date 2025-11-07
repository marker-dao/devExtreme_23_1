/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/add_position.test.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { describe, expect, it } from '@jest/globals';
import { addPosition } from './add_position';
describe('addPosition', () => {
  it('should add cell indexes for regular appointments, contiguous cells', () => {
    const cells = [{
      min: 0,
      max: 10,
      cellIndex: 0,
      rowIndex: 0,
      columnIndex: 0
    }, {
      min: 10,
      max: 20,
      cellIndex: 1,
      rowIndex: 0,
      columnIndex: 1
    }, {
      min: 20,
      max: 30,
      cellIndex: 2,
      rowIndex: 0,
      columnIndex: 2
    }, {
      min: 30,
      max: 40,
      cellIndex: 3,
      rowIndex: 1,
      columnIndex: 0
    }, {
      min: 40,
      max: 50,
      cellIndex: 4,
      rowIndex: 2,
      columnIndex: 1
    }, {
      min: 50,
      max: 60,
      cellIndex: 5,
      rowIndex: 3,
      columnIndex: 2
    }];
    const items = [{
      startDateUTC: 0,
      endDateUTC: 5
    }, {
      startDateUTC: 2,
      endDateUTC: 5
    }, {
      startDateUTC: 8,
      endDateUTC: 27
    }, {
      startDateUTC: 43,
      endDateUTC: 48
    }, {
      startDateUTC: 59,
      endDateUTC: 60
    }];
    expect(addPosition(items, cells)).toEqual([_extends({}, items[0], {
      cellIndex: 0,
      endCellIndex: 0,
      rowIndex: 0,
      columnIndex: 0
    }), _extends({}, items[1], {
      cellIndex: 0,
      endCellIndex: 0,
      rowIndex: 0,
      columnIndex: 0
    }), _extends({}, items[2], {
      cellIndex: 0,
      endCellIndex: 2,
      rowIndex: 0,
      columnIndex: 0
    }), _extends({}, items[3], {
      cellIndex: 4,
      endCellIndex: 4,
      rowIndex: 2,
      columnIndex: 1
    }), _extends({}, items[4], {
      cellIndex: 5,
      endCellIndex: 5,
      rowIndex: 3,
      columnIndex: 2
    })]);
  });
  it('should add cell indexes and crop appointments by cell for interrupted interval', () => {
    const items = [{
      startDateUTC: 10,
      endDateUTC: 20
    }, {
      startDateUTC: 20,
      endDateUTC: 50
    }, {
      startDateUTC: 40,
      endDateUTC: 55
    }];
    expect(addPosition(items, [{
      min: 0,
      max: 15,
      cellIndex: 0,
      rowIndex: 0,
      columnIndex: 0
    }, {
      min: 25,
      max: 35,
      cellIndex: 1,
      rowIndex: 0,
      columnIndex: 1
    }, {
      min: 45,
      max: 55,
      cellIndex: 2,
      rowIndex: 0,
      columnIndex: 2
    }])).toEqual([{
      startDateUTC: 10,
      endDateUTC: 15,
      cellIndex: 0,
      endCellIndex: 0,
      rowIndex: 0,
      columnIndex: 0
    }, {
      startDateUTC: 25,
      endDateUTC: 50,
      cellIndex: 1,
      endCellIndex: 2,
      rowIndex: 0,
      columnIndex: 1
    }, {
      startDateUTC: 45,
      endDateUTC: 55,
      cellIndex: 2,
      endCellIndex: 2,
      rowIndex: 0,
      columnIndex: 2
    }]);
  });
});
