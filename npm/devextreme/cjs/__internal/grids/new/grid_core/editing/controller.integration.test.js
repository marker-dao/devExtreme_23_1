/**
* DevExtreme (cjs/__internal/grids/new/grid_core/editing/controller.integration.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _renderer = _interopRequireDefault(require("../../../../../core/renderer"));
var _widget = _interopRequireDefault(require("../../../../grids/new/card_view/widget"));
var _utils = require("../../../../grids/new/grid_core/options_validation/utils");
var _inferno = require("inferno");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */

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
  const cardView = new _widget.default(container, options);
  (0, _inferno.rerender)();
  return cardView;
};
const getAddButton = () => document.querySelector(SELECTORS.addButton);
const getEditButton = () => document.querySelector(SELECTORS.editButton);
const getDeleteButton = () => document.querySelector(SELECTORS.deleteButton);
const checkError = () => (0, _globals.expect)(_utils.throwError).toHaveBeenCalledWith('E1042', 'CardView');
_globals.jest.mock('@ts/grids/new/grid_core/options_validation/utils', () => ({
  throwError: _globals.jest.fn().mockImplementation(() => ({}))
}));
(0, _globals.describe)('editing validation', () => {
  (0, _globals.afterEach)(() => {
    var _$;
    const cardView = document.querySelector(SELECTORS.cardView);
    // @ts-expect-error bad typed renderer
    (_$ = (0, _renderer.default)(cardView ?? undefined)) === null || _$ === void 0 || _$.dxCardView('dispose');
    document.body.innerHTML = '';
  });
  (0, _globals.beforeEach)(() => {
    _globals.jest.clearAllMocks();
  });
  (0, _globals.it)('should throw error when no keyExpr and clicking on add', () => {
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
  (0, _globals.it)('should throw error when no keyExpr and clicking on edit', () => {
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
  (0, _globals.it)('should throw error when no keyExpr and clicking on delete', () => {
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
