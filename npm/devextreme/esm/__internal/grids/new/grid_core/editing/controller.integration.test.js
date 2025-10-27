/**
* DevExtreme (esm/__internal/grids/new/grid_core/editing/controller.integration.test.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker */
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import $ from '../../../../../core/renderer';
import CardView from '../../../../grids/new/card_view/widget';
import { throwError } from '../../../../grids/new/grid_core/options_validation/utils';
import { rerender } from 'inferno';
const SELECTORS = {
  cardView: '.dx-cardview',
  addButton: '[aria-label="add"]',
  editButton: '[aria-label="edit"]',
  deleteButton: '[aria-label="trash"]'
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
const getAddButton = () => document.querySelector(SELECTORS.addButton);
const getEditButton = () => document.querySelector(SELECTORS.editButton);
const getDeleteButton = () => document.querySelector(SELECTORS.deleteButton);
const checkError = () => expect(throwError).toHaveBeenCalledWith('E1042', 'CardView');
jest.mock('@ts/grids/new/grid_core/options_validation/utils', () => ({
  throwError: jest.fn().mockImplementation(() => ({}))
}));
describe('editing validation', () => {
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
  it('should throw error when no keyExpr and clicking on add', () => {
    setup({
      dataSource: [{
        value: 'test1'
      }],
      editing: {
        allowAdding: true
      }
    });
    const addButton = getAddButton();
    addButton === null || addButton === void 0 || addButton.dispatchEvent(new MouseEvent('click'));
    checkError();
  });
  it('should throw error when no keyExpr and clicking on edit', () => {
    setup({
      dataSource: [{
        value: 'test1'
      }],
      editing: {
        allowUpdating: true
      }
    });
    const editButton = getEditButton();
    editButton === null || editButton === void 0 || editButton.dispatchEvent(new MouseEvent('click'));
    checkError();
  });
  it('should throw error when no keyExpr and clicking on delete', () => {
    setup({
      dataSource: [{
        value: 'test1'
      }],
      editing: {
        allowDeleting: true
      }
    });
    const deleteButton = getDeleteButton();
    deleteButton === null || deleteButton === void 0 || deleteButton.dispatchEvent(new MouseEvent('click'));
    checkError();
  });
});
