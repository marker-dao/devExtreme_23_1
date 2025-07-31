"use strict";

var _globals = require("@jest/globals");
var _renderer = _interopRequireDefault(require("../../../../../core/renderer"));
var _widget = _interopRequireDefault(require("../../../../grids/new/card_view/widget"));
var _utils = require("../../../../grids/new/grid_core/options_validation/utils");
var _inferno = require("inferno");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker, @stylistic/max-len */

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
  const cardView = new _widget.default(container, options);
  (0, _inferno.rerender)();
  return cardView;
};
const getCardElements = () => document.querySelectorAll(SELECTORS.card);
const getCardCheckboxes = () => document.querySelectorAll(SELECTORS.cardCheckbox);
const getSelectAllButton = () => document.querySelector(SELECTORS.selectAllButton);
const checkError = () => (0, _globals.expect)(_utils.throwError).toHaveBeenCalledWith('E1042', 'CardView');
_globals.jest.mock('@ts/grids/new/grid_core/options_validation/utils', () => ({
  throwError: _globals.jest.fn().mockImplementation(() => ({}))
}));
(0, _globals.describe)('when keyExpr is missing', () => {
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
  (0, _globals.describe)('selection mode single', () => {
    (0, _globals.it)('shouldn\'t throw E1042 on initial startup', () => {
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
      (0, _globals.expect)(cardElements.length).toEqual(2);
    });
    (0, _globals.it)('should throw E1042 error on card click selection', () => {
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
    (0, _globals.it)('should throw E1042 error on initial selectedCardKeys', () => {
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
    (0, _globals.it)('should throw E1042 error on runtime selectedCardKeys update', () => {
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
  (0, _globals.describe)('selection mode multiple', () => {
    (0, _globals.it)('shouldn\'t throw E1042 on initial startup', () => {
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
      (0, _globals.expect)(cardElements.length).toEqual(2);
    });
    (0, _globals.it)('should throw E1042 error on checkbox click selection', () => {
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
    (0, _globals.it)('should throw E1042 error on selectAll toolbar button click', () => {
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
    (0, _globals.it)('should throw E1042 error on initial selectedCardKeys', () => {
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
    (0, _globals.it)('should throw E1042 error on runtime selectedCardKeys update', () => {
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
(0, _globals.describe)('selectAll with filters', () => {
  (0, _globals.it)('should select only cards matching filterValue', () => {
    const cardView = setup({
      keyExpr: 'id',
      columns: ['id', 'category'],
      dataSource: [{
        id: 1,
        category: 'A'
      }, {
        id: 2,
        category: 'A'
      }, {
        id: 3,
        category: 'B'
      }, {
        id: 4,
        category: 'B'
      }],
      selection: {
        mode: 'multiple',
        allowSelectAll: true
      },
      filterPanel: {
        filterEnabled: true
      }
    });
    cardView.option('filterValue', ['category', '=', 'A']);
    cardView.selectAll();
    (0, _globals.expect)(cardView.getSelectedCardKeys()).toEqual([1, 2]);
  });
  (0, _globals.it)('should select only cards matching headerFilter', () => {
    const cardView = setup({
      keyExpr: 'id',
      columns: ['id', 'category'],
      dataSource: [{
        id: 1,
        category: 'A'
      }, {
        id: 2,
        category: 'A'
      }, {
        id: 3,
        category: 'B'
      }, {
        id: 4,
        category: 'B'
      }],
      selection: {
        mode: 'multiple',
        allowSelectAll: true
      },
      filterPanel: {
        filterEnabled: true
      }
    });
    cardView.columnOption('category', 'filterValues', ['A']);
    cardView.selectAll();
    (0, _globals.expect)(cardView.getSelectedCardKeys()).toEqual([1, 2]);
  });
  (0, _globals.it)('should select only cards matching dataSource.filter()', () => {
    const cardView = setup({
      keyExpr: 'id',
      columns: ['id', 'category'],
      dataSource: [{
        id: 1,
        category: 'A'
      }, {
        id: 2,
        category: 'A'
      }, {
        id: 3,
        category: 'B'
      }, {
        id: 4,
        category: 'B'
      }],
      selection: {
        mode: 'multiple',
        allowSelectAll: true
      },
      filterPanel: {
        filterEnabled: true
      }
    });
    cardView.getDataSource().filter(['category', '=', 'A']);
    cardView.selectAll();
    (0, _globals.expect)(cardView.getSelectedCardKeys()).toEqual([1, 2]);
  });
  (0, _globals.it)('should select only cards matching filterValue, headerFilter and dataSource.filter()', () => {
    const cardView = setup({
      keyExpr: 'id',
      columns: ['id', 'category1', 'category2', 'category3'],
      dataSource: [{
        id: 1,
        category1: 'A',
        category2: '1',
        category3: true
      }, {
        id: 2,
        category1: 'A',
        category2: '1',
        category3: false
      }, {
        id: 3,
        category1: 'A',
        category2: '2',
        category3: true
      }, {
        id: 4,
        category1: 'A',
        category2: '2',
        category3: false
      }, {
        id: 5,
        category1: 'B',
        category2: '3',
        category3: true
      }, {
        id: 6,
        category1: 'B',
        category2: '3',
        category3: false
      }, {
        id: 7,
        category1: 'B',
        category2: '4',
        category3: true
      }, {
        id: 8,
        category1: 'B',
        category2: '4',
        category3: false
      }],
      selection: {
        mode: 'multiple',
        allowSelectAll: true
      },
      filterPanel: {
        filterEnabled: true
      }
    });
    cardView.option('filterValue', ['category1', '=', 'A']);
    cardView.columnOption('category2', 'filterValues', ['1']);
    cardView.getDataSource().filter(['category3', '=', true]);
    cardView.selectAll();
    (0, _globals.expect)(cardView.getSelectedCardKeys()).toEqual([1]);
  });
});