/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/add_last_in_group.test.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { describe, expect, it } from '@jest/globals';
import { addLastInGroup } from './add_last_in_group';
const items = [{
  groupIndex: 0,
  startDateUTC: new Date(2020, 0, 10, 0)
}, {
  groupIndex: 0,
  startDateUTC: new Date(2020, 0, 10, 1)
}, {
  groupIndex: 0,
  startDateUTC: new Date(2020, 0, 11, 5)
}, {
  groupIndex: 1,
  startDateUTC: new Date(2020, 0, 10, 0)
}, {
  groupIndex: 1,
  startDateUTC: new Date(2020, 0, 10, 1)
}, {
  groupIndex: 1,
  startDateUTC: new Date(2020, 0, 11, 5)
}];
describe('addLastInGroup', () => {
  it('should add last in group', () => {
    expect(addLastInGroup(items)).toEqual([_extends({}, items[0], {
      isLastInGroup: false
    }), _extends({}, items[1], {
      isLastInGroup: true
    }), _extends({}, items[2], {
      isLastInGroup: true
    }), _extends({}, items[3], {
      isLastInGroup: false
    }), _extends({}, items[4], {
      isLastInGroup: true
    }), _extends({}, items[5], {
      isLastInGroup: true
    })]);
  });
});
