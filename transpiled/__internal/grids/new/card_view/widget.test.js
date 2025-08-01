"use strict";

var _globals = require("@jest/globals");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _inferno = require("inferno");
var _widget = require("./widget");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */
/* eslint-disable @typescript-eslint/no-unused-vars */

(0, _globals.describe)('common', () => {
  (0, _globals.describe)('initial render', () => {
    (0, _globals.it)('should be successfull', () => {
      const container = document.createElement('div');
      const cardView = new _widget.CardView(container, {});
      (0, _inferno.rerender)();
      (0, _globals.expect)(container).toMatchSnapshot();
    });
  });
});
(0, _globals.describe)('options', () => {
  (0, _globals.describe)('rtlEnabled', () => {
    const container = document.createElement('div');
    const cardView = new _widget.CardView(container, {
      rtlEnabled: true,
      pager: {
        visible: true
      }
    });
    (0, _globals.it)('should add dx-rtl class to container div', () => {
      (0, _globals.expect)(container.classList).toContain('dx-rtl');
    });
    (0, _globals.it)('should pass rtlEnabled options to nested components', () => {
      (0, _globals.expect)((0, _renderer.default)(container).find('.dx-pagination')
      // @ts-expect-error
      .dxPagination('instance').option('rtlEnabled')).toBe(true);
    });
  });
});
(0, _globals.describe)('regressions', () => {
  (0, _globals.it)('should not have leaks to defaultOptions after changing option', () => {
    const container = document.createElement('div');
    let cardView = new _widget.CardView(container, {
      keyExpr: 'a',
      dataSource: [{
        a: 'a'
      }]
    });
    (0, _globals.expect)(cardView.option('pager.showPageSizeSelector')).toBe(false);
    cardView.option('pager.showPageSizeSelector', true);
    (0, _globals.expect)(cardView.option('pager.showPageSizeSelector')).toBe(true);
    cardView.dispose();
    cardView = new _widget.CardView(container, {
      keyExpr: 'a',
      dataSource: [{
        a: 'a'
      }]
    });
    (0, _globals.expect)(cardView.option('pager.showPageSizeSelector')).toBe(false);
  });
});