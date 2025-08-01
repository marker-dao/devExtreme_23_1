/**
* DevExtreme (cjs/__internal/grids/new/grid_core/search/options.integration.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _m_guid = require("../../../../core/m_guid");
var _widget = _interopRequireDefault(require("../../../../grids/new/card_view/widget"));
var _inferno = require("inferno");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */

const SELECTORS = {
  cardContent: 'dx-cardview-card-content',
  searchPanel: 'dx-cardview-search-panel',
  editorInput: 'dx-texteditor-input'
};
const setup = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const container = document.createElement('div');
  const cardView = new _widget.default(container, options);
  (0, _inferno.rerender)();
  return {
    container,
    cardView
  };
};
function getCardContent(container) {
  (0, _inferno.rerender)();
  return container.querySelector(`.${SELECTORS.cardContent}`);
}
(0, _globals.describe)('Options', () => {
  (0, _globals.beforeEach)(() => {
    _globals.jest.spyOn(_m_guid.Guid.prototype, '_normalize').mockReturnValue('guidmock');
  });
  (0, _globals.afterEach)(() => {
    _globals.jest.spyOn(_m_guid.Guid.prototype, '_normalize').mockRestore();
  });
  (0, _globals.it)('searchPanel.text (card contains match)', async () => {
    const {
      container,
      cardView
    } = setup({
      dataSource: [{
        Name: 'John Doe'
      }],
      columns: ['Name'],
      searchPanel: {
        text: 'John'
      }
    });
    // @ts-expect-error protected property
    await cardView.dataController.waitLoaded();
    (0, _inferno.rerender)();
    const content = getCardContent(container);
    (0, _globals.expect)(content).toMatchSnapshot();
  });
  (0, _globals.it)('searchPanel.text (card not contains match)', async () => {
    const {
      container,
      cardView
    } = setup({
      dataSource: [{
        Name: 'John Doe'
      }],
      columns: ['Name'],
      searchPanel: {
        text: 'ABC'
      }
    });
    // @ts-expect-error protected property
    await cardView.dataController.waitLoaded();
    (0, _inferno.rerender)();
    const content = getCardContent(container);
    (0, _globals.expect)(content).toMatchSnapshot();
  });
  (0, _globals.it)('searchPanel.highlightCaseSensitive = true', async () => {
    const {
      container,
      cardView
    } = setup({
      dataSource: [{
        Name: 'John Doe john'
      }],
      columns: ['Name'],
      searchPanel: {
        text: 'john',
        highlightCaseSensitive: true
      }
    });
    // @ts-expect-error protected property
    await cardView.dataController.waitLoaded();
    const content = getCardContent(container);
    (0, _globals.expect)(content).toMatchSnapshot();
  });
  (0, _globals.it)('searchPanel.highlightCaseSensitive = false', () => {
    const {
      container
    } = setup({
      dataSource: [{
        Name: 'John Doe john'
      }],
      columns: ['Name'],
      searchPanel: {
        text: 'john',
        highlightCaseSensitive: false
      }
    });
    const content = getCardContent(container);
    (0, _globals.expect)(content).toMatchSnapshot();
  });
  (0, _globals.it)('searchPanel.highlightSearchText = false', () => {
    const {
      container
    } = setup({
      dataSource: [{
        Name: 'John Doe john'
      }],
      columns: ['Name'],
      searchPanel: {
        text: 'john',
        highlightSearchText: false
      }
    });
    const content = getCardContent(container);
    (0, _globals.expect)(content).toMatchSnapshot();
  });
  (0, _globals.it)('searchPanel.width', () => {
    const {
      container
    } = setup({
      searchPanel: {
        visible: true,
        width: 333
      }
    });
    (0, _inferno.rerender)();
    const searchPanel = container.querySelector(`.${SELECTORS.searchPanel}`);
    (0, _globals.expect)(searchPanel).not.toBeNull();
    (0, _globals.expect)(searchPanel === null || searchPanel === void 0 ? void 0 : searchPanel.getAttribute('style')).toContain('width: 333px');
  });
  (0, _globals.it)('searchPanel.placeholder', () => {
    const {
      container
    } = setup({
      searchPanel: {
        visible: true,
        placeholder: 'Search here'
      }
    });
    (0, _inferno.rerender)();
    const searchPanel = container.querySelector(`.${SELECTORS.searchPanel}`);
    const searchInput = searchPanel === null || searchPanel === void 0 ? void 0 : searchPanel.querySelector(`.${SELECTORS.editorInput}`);
    (0, _globals.expect)(searchInput === null || searchInput === void 0 ? void 0 : searchInput.getAttribute('placeholder')).toContain('Search here');
  });
  (0, _globals.it)('searchPanel.visible = false', () => {
    const {
      container
    } = setup({
      searchPanel: {
        visible: false
      }
    });
    (0, _inferno.rerender)();
    const searchPanel = container.querySelector(`.${SELECTORS.searchPanel}`);
    (0, _globals.expect)(searchPanel).toBeNull();
  });
  (0, _globals.it)('searchPanel.searchVisibleColumnsOnly = true', () => {
    const {
      container
    } = setup({
      dataSource: [{
        name: 'John Doe john',
        lastName: 'last name'
      }],
      columns: ['name', {
        dataField: 'lastName',
        visible: false
      }],
      searchPanel: {
        visible: true,
        text: 'last',
        searchVisibleColumnsOnly: true
      }
    });
    (0, _inferno.rerender)();
    const content = container.querySelector(`.${SELECTORS.cardContent}`);
    (0, _globals.expect)(content).toBeNull();
  });
});
