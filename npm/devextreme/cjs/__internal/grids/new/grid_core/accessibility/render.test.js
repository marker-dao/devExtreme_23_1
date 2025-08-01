/**
* DevExtreme (cjs/__internal/grids/new/grid_core/accessibility/render.test.js)
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
var _inferno = require("inferno");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */

const SELECTORS = {
  cardView: '.dx-cardview',
  rootContainer: '.dx-cardview-root-container',
  statusContainer: '[role="status"]',
  headerPanelContent: '.dx-cardview-headerpanel-content',
  headerItem: '.dx-cardview-header-item',
  card: '.dx-cardview-card'
};
const rootQuerySelector = selector => document.body.querySelector(selector);
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
(0, _globals.describe)('Accessibility attributes', () => {
  (0, _globals.afterEach)(() => {
    var _$;
    const cardView = rootQuerySelector(SELECTORS.cardView);
    // @ts-expect-error bad typed renderer
    (_$ = (0, _renderer.default)(cardView ?? undefined)) === null || _$ === void 0 || _$.dxCardView('dispose');
  });
  (0, _globals.describe)('Root descriprion', () => {
    (0, _globals.it)('should be displayed on the root container', () => {
      const cardView = setup({
        dataSource: [{
          A: 'A_0',
          B: 'B_0'
        }, {
          A: 'A_1',
          B: 'B_1'
        }, {
          A: 'A_2',
          B: 'B_2'
        }, {
          A: 'A_3',
          B: 'B_3'
        }, {
          A: 'A_4',
          B: 'B_4'
        }],
        columns: ['A', 'B']
      });
      const rootContainer = rootQuerySelector(SELECTORS.rootContainer);
      (0, _globals.expect)(rootContainer === null || rootContainer === void 0 ? void 0 : rootContainer.getAttribute('role')).toBe('group');
      (0, _globals.expect)(rootContainer === null || rootContainer === void 0 ? void 0 : rootContainer.getAttribute('aria-label')).toBe('Card view with 5 cards. Each card has 2 fields');
      cardView.option('filterValue', ['A', '=', 'A_1']);
      (0, _globals.expect)(rootContainer === null || rootContainer === void 0 ? void 0 : rootContainer.getAttribute('aria-label')).toBe('Card view with 1 cards. Each card has 2 fields');
      cardView.columnOption('B', 'visible', false);
      (0, _globals.expect)(rootContainer === null || rootContainer === void 0 ? void 0 : rootContainer.getAttribute('aria-label')).toBe('Card view with 1 cards. Each card has 1 fields');
    });
  });
  (0, _globals.describe)('Status description', () => {
    // TODO a11y: remove "firstRender" flags, fix this test and unskip.
    _globals.it.skip('should be displayed on the status container', () => {
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: ['A']
      });
      const statusContainer = rootQuerySelector(SELECTORS.statusContainer);
      (0, _globals.expect)(statusContainer).not.toBeNull();
      (0, _globals.expect)(statusContainer === null || statusContainer === void 0 ? void 0 : statusContainer.innerHTML).toBe('');
      cardView.option('filterValue', ['A', '=', 'A_1']);
      (0, _globals.expect)(statusContainer === null || statusContainer === void 0 ? void 0 : statusContainer.innerHTML).toBe('Card view with 1 cards. Each card has 1 fields');
      cardView.option('filterValue', null);
      (0, _globals.expect)(statusContainer === null || statusContainer === void 0 ? void 0 : statusContainer.innerHTML).toBe('Card view with 5 cards. Each card has 1 fields');
      cardView.option('paging', {
        pageSize: 2
      });
      // TODO a11y: is it ok that page size = 2 and status message has 5 cards?
      (0, _globals.expect)(statusContainer === null || statusContainer === void 0 ? void 0 : statusContainer.innerHTML).toBe('Card view with 5 cards. Each card has 1 fields');
      cardView.option('paging', {
        pageIndex: 2
      });
      (0, _globals.expect)(statusContainer === null || statusContainer === void 0 ? void 0 : statusContainer.innerHTML).toBe('Card view with 5 cards. Each card has 1 fields');
    });
  });
  (0, _globals.describe)('Header panel', () => {
    (0, _globals.it)('should be represented as menubar', () => {
      setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: ['A']
      });
      const headerPanelContent = rootQuerySelector(SELECTORS.headerPanelContent);
      (0, _globals.expect)(headerPanelContent === null || headerPanelContent === void 0 ? void 0 : headerPanelContent.getAttribute('role')).toBe('menubar');
    });
    (0, _globals.it)('should contain header panel item with their state', () => {
      setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: [{
          dataField: 'A',
          sortOrder: 'desc',
          sortIndex: 0
        }]
      });
      const headerItem = rootQuerySelector(SELECTORS.headerItem);
      (0, _globals.expect)(headerItem === null || headerItem === void 0 ? void 0 : headerItem.getAttribute('aria-label')).toBe('Field name A, Sorted in descending order, Sort index 1');
    });
  });
  (0, _globals.describe)('Card description', () => {
    (0, _globals.it)('should take into account its position and status', () => {
      const cardView = setup({
        dataSource: [{
          A: 'A_0'
        }, {
          A: 'A_1'
        }, {
          A: 'A_2'
        }, {
          A: 'A_3'
        }, {
          A: 'A_4'
        }],
        columns: ['A'],
        editing: {
          allowUpdating: true
        },
        selection: {
          mode: 'multiple'
        }
      });
      const firstCard = rootQuerySelector(SELECTORS.card);
      (0, _globals.expect)(firstCard === null || firstCard === void 0 ? void 0 : firstCard.getAttribute('role')).toBe('application');
      (0, _globals.expect)(firstCard === null || firstCard === void 0 ? void 0 : firstCard.getAttribute('aria-roledescription')).toBe('Editable card');
      (0, _globals.expect)(firstCard === null || firstCard === void 0 ? void 0 : firstCard.getAttribute('aria-label')).toBe('Row 1, column 1, Not selected');
      cardView.option('selection', {
        mode: 'none'
      });
      (0, _globals.expect)(firstCard === null || firstCard === void 0 ? void 0 : firstCard.getAttribute('aria-label')).toBe('Row 1, column 1');
      cardView.option('editing', {
        allowUpdating: false
      });
      (0, _globals.expect)(firstCard === null || firstCard === void 0 ? void 0 : firstCard.getAttribute('aria-roledescription')).toBe('Card');
    });
  });
});
