"use strict";

var _globals = require("@jest/globals");
var _data = require("../../../../../common/data");
var _widget = _interopRequireDefault(require("../../../../grids/new/card_view/widget"));
var _inferno = require("inferno");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */

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
(0, _globals.describe)('SortingController', () => {
  (0, _globals.describe)('Integration tests', () => {
    let storeLoadMock = _globals.jest.fn();
    (0, _globals.beforeEach)(() => {
      storeLoadMock = _globals.jest.fn().mockImplementation(() => [{
        id: 0,
        A: 'A_0',
        B: 'B_0'
      }, {
        id: 1,
        A: 'A_1',
        B: 'B_1'
      }]);
    });
    (0, _globals.describe)('Single mode', () => {
      (0, _globals.it)('Should not trigger additional load on initial sorting', () => {
        const cardView = setup({
          dataSource: new _data.CustomStore({
            load: storeLoadMock,
            totalCount: () => 2
          }),
          keyExpr: 'id',
          columns: ['A', 'B'],
          sorting: {
            mode: 'single'
          }
        });
        const [firstCol] = cardView.getVisibleColumns();
        // @ts-expect-error access private property
        cardView.sortingController.onSingleModeSortClick(firstCol, new MouseEvent('click'));
        // NOTE: 1 -> initial load + 1 -> load on sorting
        (0, _globals.expect)(storeLoadMock).toHaveBeenCalledTimes(2);
      });
      (0, _globals.it)('Should not trigger additional load on sorting clear', () => {
        const cardView = setup({
          dataSource: new _data.CustomStore({
            load: storeLoadMock,
            totalCount: () => 2
          }),
          keyExpr: 'id',
          columns: [{
            dataField: 'A',
            sortOrder: 'asc'
          }, 'B'],
          sorting: {
            mode: 'single'
          }
        });
        const [firstCol] = cardView.getVisibleColumns();
        // @ts-expect-error access private property
        cardView.sortingController.onSingleModeSortClick(firstCol, new MouseEvent('click', {
          ctrlKey: true
        }));
        // NOTE: 1 -> initial load + 1 -> sort clear
        (0, _globals.expect)(storeLoadMock).toHaveBeenCalledTimes(2);
      });
      (0, _globals.it)('Should not trigger additional load on sorting column change', () => {
        const cardView = setup({
          dataSource: new _data.CustomStore({
            load: storeLoadMock,
            totalCount: () => 2
          }),
          keyExpr: 'id',
          columns: ['A', {
            dataField: 'B',
            sortOrder: 'asc'
          }],
          sorting: {
            mode: 'multiple'
          }
        });
        const [firstCol] = cardView.getVisibleColumns();
        // @ts-expect-error access private property
        cardView.sortingController.onSingleModeSortClick(firstCol, new MouseEvent('click'));
        // NOTE: 1 -> initial load + 1 -> load on sorting
        (0, _globals.expect)(storeLoadMock).toHaveBeenCalledTimes(2);
      });
    });
    (0, _globals.describe)('Multiple mode', () => {
      (0, _globals.it)('Should not trigger additional load on initial sorting', () => {
        const cardView = setup({
          dataSource: new _data.CustomStore({
            load: storeLoadMock,
            totalCount: () => 2
          }),
          keyExpr: 'id',
          columns: ['A', 'B'],
          sorting: {
            mode: 'multiple'
          }
        });
        const [firstCol] = cardView.getVisibleColumns();
        // @ts-expect-error access private property
        cardView.sortingController.onMultipleModeSortClick(firstCol, new MouseEvent('click'));
        // NOTE: 1 -> initial load + 1 -> load on sorting
        (0, _globals.expect)(storeLoadMock).toHaveBeenCalledTimes(2);
      });
      (0, _globals.it)('Should not trigger additional load on sorting clear', () => {
        const cardView = setup({
          dataSource: new _data.CustomStore({
            load: storeLoadMock,
            totalCount: () => 2
          }),
          keyExpr: 'id',
          columns: [{
            dataField: 'A',
            sortOrder: 'asc',
            sortIndex: 0
          }, {
            dataField: 'B',
            sortOrder: 'asc',
            sortIndex: 1
          }],
          sorting: {
            mode: 'single'
          }
        });
        const [firstCol] = cardView.getVisibleColumns();
        // @ts-expect-error access private property
        cardView.sortingController.onSingleModeSortClick(firstCol, new MouseEvent('click', {
          ctrlKey: true
        }));
        // NOTE: 1 -> initial load + 1 -> sort clear
        (0, _globals.expect)(storeLoadMock).toHaveBeenCalledTimes(2);
      });
      (0, _globals.it)('Should not trigger additional load on adding sorting column', () => {
        const cardView = setup({
          dataSource: new _data.CustomStore({
            load: storeLoadMock,
            totalCount: () => 2
          }),
          keyExpr: 'id',
          columns: ['A', {
            dataField: 'B',
            sortOrder: 'asc',
            sortIndex: 0
          }],
          sorting: {
            mode: 'single'
          }
        });
        const [firstCol] = cardView.getVisibleColumns();
        // @ts-expect-error access private property
        cardView.sortingController.onSingleModeSortClick(firstCol, new MouseEvent('click', {
          shiftKey: true
        }));
        // NOTE: 1 -> initial load + 1 -> load on sorting
        (0, _globals.expect)(storeLoadMock).toHaveBeenCalledTimes(2);
      });
      (0, _globals.it)('Should not trigger additional load on sorting column change', () => {
        const cardView = setup({
          dataSource: new _data.CustomStore({
            load: storeLoadMock,
            totalCount: () => 2
          }),
          keyExpr: 'id',
          columns: ['A', {
            dataField: 'B',
            sortOrder: 'asc',
            sortIndex: 0
          }],
          sorting: {
            mode: 'single'
          }
        });
        const [firstCol] = cardView.getVisibleColumns();
        // @ts-expect-error access private property
        cardView.sortingController.onSingleModeSortClick(firstCol, new MouseEvent('click'));
        // NOTE: 1 -> initial load + 1 -> load on sorting
        (0, _globals.expect)(storeLoadMock).toHaveBeenCalledTimes(2);
      });
    });
  });
});