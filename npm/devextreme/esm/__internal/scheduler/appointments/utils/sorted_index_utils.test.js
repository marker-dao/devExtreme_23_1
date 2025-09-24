/**
* DevExtreme (esm/__internal/scheduler/appointments/utils/sorted_index_utils.test.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it, jest } from '@jest/globals';
import $ from '../../../../core/renderer';
import { getNextElement, getPrevElement, isElementCanBeFocused } from './sorted_index_utils';
const createContainer = () => {
  const container = document.createElement('div');
  const $element = $(container);
  jest.spyOn($element, 'is').mockImplementation(selector => selector === ':visible');
  return $element;
};
const createDisabledContainer = () => {
  const $container = createContainer();
  $container.addClass('dx-state-disabled');
  return $container;
};
describe('sorted index utils', () => {
  describe('isElementCanBeFocused', () => {
    it('should return true for pure div', () => {
      expect(isElementCanBeFocused(createContainer())).toBe(true);
    });
    it('should return false for invisible div', () => {
      const container = document.createElement('div');
      expect(isElementCanBeFocused($(container))).toBe(false);
    });
    it('should return false for disabled div', () => {
      expect(isElementCanBeFocused(createDisabledContainer())).toBe(false);
    });
  });
  describe('getPrevElement', () => {
    it('should return prev element', () => {
      const elements = [createContainer(), createContainer(), createContainer()];
      expect(getPrevElement(2, elements)).toBe(elements[1]);
    });
    it('should return prev element that exist and not disabled', () => {
      const elements = [createContainer(), undefined, createDisabledContainer(), createContainer()];
      expect(getPrevElement(3, elements)).toBe(elements[0]);
    });
    it('should return undefined', () => {
      const elements = [createContainer()];
      expect(getPrevElement(0, elements)).toBe(undefined);
    });
  });
  describe('getNextElement', () => {
    it('should return next element', () => {
      const elements = [createContainer(), createContainer(), createContainer()];
      expect(getNextElement(2, elements)).toBe(elements[3]);
    });
    it('should return next element that exist and not disabled', () => {
      const elements = [createContainer(), undefined, createDisabledContainer(), createContainer()];
      expect(getNextElement(0, elements)).toBe(elements[3]);
    });
    it('should return undefined', () => {
      const elements = [createContainer()];
      expect(getNextElement(0, elements)).toBe(undefined);
    });
  });
});
