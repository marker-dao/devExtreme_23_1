/**
* DevExtreme (esm/__internal/grids/new/grid_core/selection/controller.integration.test.js)
* Version: 25.2.0
* Build date: Fri Jul 18 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker, @stylistic/max-len */
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import $ from '../../../../../core/renderer';
import CardView from '../../../../grids/new/card_view/widget';
import { throwError } from '../../../../grids/new/grid_core/options_validation/utils';
import { rerender } from 'inferno';
const SELECTORS = {
  cardView: '.dx-cardview',
  card: '.dx-cardview-card',
  cardCheckbox: '.dx-checkbox-container',
  selectAllButton: '[aria-label="Select all"]'
};
const setup = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const container = document.createElement('div');
  const {
    body
  } = document;
  body.append(container);
  const cardView = new CardView(container, options);
  rerender();
  return cardView;
};
const getCardElements = () => document.querySelectorAll(SELECTORS.card);
const getCardCheckboxes = () => document.querySelectorAll(SELECTORS.cardCheckbox);
const getSelectAllButton = () => document.querySelector(SELECTORS.selectAllButton);
const checkError = () => expect(throwError).toHaveBeenCalledWith('E1042', 'CardView');
jest.mock('@ts/grids/new/grid_core/options_validation/utils', () => ({
  throwError: jest.fn().mockImplementation(() => ({}))
}));
describe('when keyExpr is missing', () => {
  afterEach(() => {
    var _$;
    const cardView = document.querySelector(SELECTORS.cardView);
    // @ts-expect-error bad typed renderer
    (_$ = $(cardView ?? undefined)) === null || _$ === void 0 || _$.dxCardView('dispose');
    document.body.innerHTML = '';
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('selection mode single', () => {
    it('shouldn\'t throw E1042 on initial startup', () => {
      setup({
        dataSource: [{
          value: 'test1'
        }, {
          value: 'test2'
        }],
        selection: {
          mode: 'single'
        }
      });
      const cardElements = getCardElements();
      expect(cardElements.length).toEqual(2);
    });
    it('should throw E1042 error on card click selection', () => {
      setup({
        dataSource: [{
          value: 'test1'
        }, {
          value: 'test2'
        }],
        selection: {
          mode: 'single'
        }
      });
      const cardElements = getCardElements();
      cardElements[0].dispatchEvent(new MouseEvent('click'));
      checkError();
    });
    it('should throw E1042 error on initial selectedCardKeys', () => {
      setup({
        dataSource: [{
          value: 'test1'
        }, {
          value: 'test2'
        }],
        selection: {
          mode: 'single'
        },
        selectedCardKeys: [0]
      });
      checkError();
    });
    it('should throw E1042 error on runtime selectedCardKeys update', () => {
      const cardView = setup({
        dataSource: [{
          value: 'test1'
        }, {
          value: 'test2'
        }],
        selection: {
          mode: 'single'
        }
      });
      cardView.instance().option('selectedCardKeys', [1]);
      checkError();
    });
  });
  describe('selection mode multiple', () => {
    it('shouldn\'t throw E1042 on initial startup', () => {
      setup({
        dataSource: [{
          value: 'test1'
        }, {
          value: 'test2'
        }],
        selection: {
          mode: 'multiple'
        }
      });
      const cardElements = getCardElements();
      expect(cardElements.length).toEqual(2);
    });
    it('should throw E1042 error on checkbox click selection', () => {
      setup({
        dataSource: [{
          value: 'test1'
        }, {
          value: 'test2'
        }],
        selection: {
          mode: 'multiple',
          showCheckBoxesMode: 'always'
        }
      });
      const cardCheckboxes = getCardCheckboxes();
      cardCheckboxes[0].dispatchEvent(new MouseEvent('click', {
        bubbles: true
      }));
      checkError();
    });
    it('should throw E1042 error on selectAll toolbar button click', () => {
      setup({
        dataSource: [{
          value: 'test1'
        }, {
          value: 'test2'
        }],
        selection: {
          mode: 'multiple',
          showCheckBoxesMode: 'always',
          allowSelectAll: true
        }
      });
      const selectAllButton = getSelectAllButton();
      selectAllButton === null || selectAllButton === void 0 || selectAllButton.dispatchEvent(new MouseEvent('click'));
      checkError();
    });
    it('should throw E1042 error on initial selectedCardKeys', () => {
      setup({
        dataSource: [{
          value: 'test1'
        }, {
          value: 'test2'
        }],
        selection: {
          mode: 'multiple',
          showCheckBoxesMode: 'always'
        },
        selectedCardKeys: [0, 1]
      });
      checkError();
    });
    it('should throw E1042 error on runtime selectedCardKeys update', () => {
      const cardView = setup({
        dataSource: [{
          value: 'test1'
        }, {
          value: 'test2'
        }],
        selection: {
          mode: 'multiple',
          showCheckBoxesMode: 'always'
        }
      });
      cardView.instance().option('selectedCardKeys', [1]);
      checkError();
    });
  });
});
