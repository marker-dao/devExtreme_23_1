/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/maybe_split.test.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { describe, expect, it } from '@jest/globals';
import { maybeSplit } from './maybe_split';
const entities = [{
  isAllDayPanelOccupied: true,
  startDateUTC: 10
}, {
  isAllDayPanelOccupied: false,
  startDateUTC: 10
}, {
  isAllDayPanelOccupied: false,
  startDateUTC: 12
}, {
  isAllDayPanelOccupied: true,
  startDateUTC: 12
}, {
  isAllDayPanelOccupied: false,
  startDateUTC: 15
}];
const callback = (items, panelName) => items.map(item => _extends({}, item, {
  panelName
}));
describe('maybeSplit', () => {
  it('should not split', () => {
    expect(maybeSplit(entities, false, callback)).toEqual([_extends({}, entities[0], {
      panelName: 'regularPanel'
    }), _extends({}, entities[1], {
      panelName: 'regularPanel'
    }), _extends({}, entities[2], {
      panelName: 'regularPanel'
    }), _extends({}, entities[3], {
      panelName: 'regularPanel'
    }), _extends({}, entities[4], {
      panelName: 'regularPanel'
    })]);
  });
  it('should split and sort by startDate', () => {
    expect(maybeSplit(entities, true, callback)).toEqual([_extends({}, entities[0], {
      panelName: 'allDayPanel'
    }), _extends({}, entities[1], {
      panelName: 'regularPanel'
    }), _extends({}, entities[3], {
      panelName: 'allDayPanel'
    }), _extends({}, entities[2], {
      panelName: 'regularPanel'
    }), _extends({}, entities[4], {
      panelName: 'regularPanel'
    })]);
  });
});
