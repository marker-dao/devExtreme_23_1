/**
* DevExtreme (esm/__internal/ui/scroll_view/utils/get_element_style.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { titleize } from '../../../../core/utils/inflector';
import { setWindow } from '../../../../core/utils/window';
import each from 'jest-each';
import { getElementMargin, getElementOverflowX, getElementOverflowY, getElementPadding, getElementStyle, getElementTransform } from './get_element_style';
describe('getElementStyle', () => {
  it('element is not defined', () => {
    expect(getElementStyle(null)).toEqual(null);
  });
  it('hasWindow: false', () => {
    const el = {};
    setWindow({}, false);
    expect(getElementStyle(el)).toEqual(null);
  });
  it('hasWindow: true, window.getComputedStyle: undefined', () => {
    const el = {};
    setWindow({}, true);
    expect(getElementStyle(el)).toEqual(undefined);
  });
  it('hasWindow: true, window.getComputedStyle: { width: 120px }', () => {
    const el = {};
    setWindow({
      getComputedStyle: () => ({
        paddingBottom: '120px'
      })
    }, true);
    expect(getElementStyle(el)).toEqual({
      paddingBottom: '120px'
    });
  });
});
describe('getElementTransform', () => {
  it('element is not defined', () => {
    expect(getElementTransform(null)).toEqual('');
  });
  it('matrix(1, 0, 0, 1, 10, 20)', () => {
    const el = {};
    setWindow({
      getComputedStyle: () => ({
        transform: 'matrix(1, 0, 0, 1, 10, 20)'
      })
    }, true);
    expect(getElementTransform(el)).toEqual('matrix(1, 0, 0, 1, 10, 20)');
  });
});
each(['top', 'left', 'right', 'bottom']).describe('side: %o', side => {
  describe(`getElementPadding(element, ${side})`, () => {
    it('element is not defined', () => {
      expect(getElementPadding(null, side)).toEqual(0);
    });
    it(`padding${titleize(side)}: 5px`, () => {
      const el = {};
      setWindow({
        getComputedStyle: () => ({
          [`padding${titleize(side)}`]: '5px'
        })
      }, true);
      expect(getElementPadding(el, side)).toEqual(5);
    });
  });
  describe(`getElementMargin(element, ${side})`, () => {
    it('element is not defined', () => {
      expect(getElementMargin(null, side)).toEqual(0);
    });
    it(`margin${titleize(side)}: 5px`, () => {
      const el = {};
      setWindow({
        getComputedStyle: () => ({
          [`margin${titleize(side)}`]: '5px'
        })
      }, true);
      expect(getElementMargin(el, side)).toEqual(5);
    });
  });
});
describe('getElementOverflowX', () => {
  it('element is not defined', () => {
    expect(getElementOverflowX(null)).toEqual('visible');
  });
  it('overflowX: hidden', () => {
    const el = {};
    setWindow({
      getComputedStyle: () => ({
        overflowX: 'hidden'
      })
    }, true);
    expect(getElementOverflowX(el)).toEqual('hidden');
  });
});
describe('getElementOverflowY', () => {
  it('element is not defined', () => {
    expect(getElementOverflowY(null)).toEqual('visible');
  });
  it('overflowY: hidden', () => {
    const el = {};
    setWindow({
      getComputedStyle: () => ({
        overflowY: 'hidden'
      })
    }, true);
    expect(getElementOverflowY(el)).toEqual('hidden');
  });
});
