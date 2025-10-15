/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/add_sorted_index.test.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { addSortedIndex } from './add_sorted_index';
describe('addSortedIndex', () => {
  it('should add sorted index in order of sorting', () => {
    const items = [{
      some: '1'
    }, {
      another: '2'
    }, {
      nothing: true
    }];
    expect(addSortedIndex(items)).toEqual([{
      some: '1',
      sortedIndex: 0
    }, {
      another: '2',
      sortedIndex: 1
    }, {
      nothing: true,
      sortedIndex: 2
    }]);
  });
});
