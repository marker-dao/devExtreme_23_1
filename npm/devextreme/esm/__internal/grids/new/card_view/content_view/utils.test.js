/**
* DevExtreme (esm/__internal/grids/new/card_view/content_view/utils.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { factors } from './utils';
describe('factors', () => {
  it('should return all factors of given number', () => {
    expect(factors(1)).toEqual([1]);
    expect(factors(2)).toEqual([1, 2]);
    expect(factors(7)).toEqual([1, 7]);
    expect(factors(6)).toEqual([1, 2, 3, 6]);
    expect(factors(8)).toEqual([1, 2, 4, 8]);
    expect(factors(12)).toEqual([1, 2, 3, 4, 6, 12]);
  });
});
