/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/header_filter/view_controller.test.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable no-spaced-func */
import { describe, expect, it } from '@jest/globals';
import { ColumnsController } from '../../../../../grids/new/grid_core/columns_controller';
import { getContext } from '../../di.test_utils';
import { HeaderFilterViewController } from './view_controller';
const setup = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const context = getContext(options);
  return {
    viewController: context.get(HeaderFilterViewController),
    columnsController: context.get(ColumnsController)
  };
};
describe('HeaderFilter', () => {
  describe('ViewController', () => {
    describe('openPopup', () => {
      it('should pass element as is to popupState', () => {
        const mockElement = {};
        const {
          viewController
        } = setup();
        viewController.openPopup(mockElement, {});
        const result = viewController.popupState.peek();
        expect(result === null || result === void 0 ? void 0 : result.element).toBe(mockElement);
      });
      it.each([{
        dataType: 'string',
        result: 'list'
      }, {
        dataType: 'number',
        result: 'list'
      }, {
        dataType: 'boolean',
        result: 'list'
      }, {
        dataType: 'date',
        result: 'tree'
      }, {
        dataType: 'datetime',
        result: 'tree'
      }])('options.type in state with columns dataType "$dataType" -> "$result"', _ref => {
        var _state$options;
        let {
          dataType,
          result
        } = _ref;
        const {
          viewController
        } = setup();
        viewController.openPopup({}, {
          dataType
        });
        const state = viewController.popupState.peek();
        expect(state === null || state === void 0 || (_state$options = state.options) === null || _state$options === void 0 ? void 0 : _state$options.type).toBe(result);
      });
      it('should pass headerFilter options', () => {
        var _state$options2, _state$options3;
        const expectedFilterValues = ['VAL_0', 'VAL_1', 'VAL_2'];
        const expectedHeaderFilter = {
          allowSearch: true,
          testRandomField: 'A'
        };
        const {
          viewController
        } = setup();
        viewController.openPopup({}, {
          headerFilter: expectedHeaderFilter,
          filterValues: expectedFilterValues
        });
        const state = viewController.popupState.peek();
        expect(state === null || state === void 0 || (_state$options2 = state.options) === null || _state$options2 === void 0 ? void 0 : _state$options2.headerFilter).toStrictEqual(expectedHeaderFilter);
        expect(state === null || state === void 0 || (_state$options3 = state.options) === null || _state$options3 === void 0 ? void 0 : _state$options3.filterValues).toEqual(expectedFilterValues);
      });
      it('should apply headerFilter to column options by callback call', () => {
        var _state$options4;
        const expectedFilterValues = ['VAL_0', 'VAL_1', 'VAL_2'];
        const {
          viewController,
          columnsController
        } = setup({
          headerFilter: {
            visible: true
          },
          columns: [{
            dataField: 'A',
            name: 'A'
          }]
        });
        viewController.openPopup({}, {
          dataField: 'A',
          name: 'A'
        });
        const state = viewController.popupState.peek();
        state === null || state === void 0 || (_state$options4 = state.options) === null || _state$options4 === void 0 || (_state$options4 = _state$options4.apply) === null || _state$options4 === void 0 || _state$options4.call({
          filterValues: expectedFilterValues
        });
        const updatedColumn = columnsController.columns.peek()[0];
        expect(updatedColumn === null || updatedColumn === void 0 ? void 0 : updatedColumn.filterValues).toMatchObject(expectedFilterValues);
      });
      it('should save passed headerFilter values during update by callback call', () => {
        var _state$options5;
        const expectedFilterValues = ['VAL_0', 'VAL_1', 'VAL_2'];
        const expectedSearch = {
          enabled: true,
          editorOptions: {
            testOpt: 'TEST_OPT'
          }
        };
        const expectedHeaderFilter = {
          search: expectedSearch,
          values: expectedFilterValues
        };
        const {
          viewController,
          columnsController
        } = setup({
          headerFilter: Object.assign({}, expectedHeaderFilter),
          filterValues: 'test',
          columns: [{
            dataField: 'A'
          }]
        });
        viewController.openPopup({}, {
          dataField: 'A',
          name: 'A',
          headerFilter: {
            search: expectedSearch
          }
        });
        const state = viewController.popupState.peek();
        state === null || state === void 0 || (_state$options5 = state.options) === null || _state$options5 === void 0 || (_state$options5 = _state$options5.apply) === null || _state$options5 === void 0 || _state$options5.call({
          filterValues: expectedFilterValues
        });
        const updatedColumn = columnsController.columns.peek()[0];
        expect(updatedColumn === null || updatedColumn === void 0 ? void 0 : updatedColumn.headerFilter).toMatchObject(expectedHeaderFilter);
      });
      it('should clear popupState on hide popup callback', () => {
        var _state$options6, _state$options6$hideP;
        const {
          viewController
        } = setup({
          headerFilter: {
            visible: true
          },
          columns: [{
            name: 'A'
          }]
        });
        viewController.openPopup({}, {
          name: 'A'
        });
        const state = viewController.popupState.peek();
        expect(state !== null).toBeTruthy();
        state === null || state === void 0 || (_state$options6 = state.options) === null || _state$options6 === void 0 || (_state$options6$hideP = _state$options6.hidePopupCallback) === null || _state$options6$hideP === void 0 || _state$options6$hideP.call(_state$options6);
        const stateAfterClose = viewController.popupState.peek();
        expect(stateAfterClose === null).toBeTruthy();
      });
    });
    describe('openPopup - get dataSource legacy', () => {
      it('dataSource options should contain load and postProcess functions', () => {
        const {
          viewController
        } = setup({
          headerFilter: {
            visible: true
          },
          columns: [{
            name: 'A'
          }]
        });
        viewController.openPopup({}, {
          name: 'A'
        });
        const state = viewController.popupState.peek();
        expect(typeof (state === null || state === void 0 ? void 0 : state.options.dataSource).load).toBe('function');
        expect(typeof (state === null || state === void 0 ? void 0 : state.options.dataSource).postProcess).toBe('function');
      });
      // NOTE: Unfortunately, we cannot test perfectly local group functions here
      // Because these functions are local and too deep in the old grid_core
      it.each([{
        caseName: 'default',
        column: {
          dataField: 'A'
        },
        checkFn: group => typeof group === 'function'
      }, {
        caseName: 'groupInterval',
        column: {
          dataField: 'A',
          headerFilter: {
            groupInterval: 2
          }
        },
        checkFn: _ref2 => {
          let [group] = _ref2;
          return typeof group === 'function';
        }
      }, {
        caseName: 'sortingMethod',
        column: {
          dataField: 'A',
          sortingMethod: () => {}
        },
        checkFn: _ref3 => {
          let [{
            selector,
            compare
          }] = _ref3;
          return typeof selector === 'function' && typeof compare === 'function';
        }
      }])('$caseName: dataSource options should contains correct group', _ref4 => {
        let {
          column,
          checkFn
        } = _ref4;
        const {
          viewController
        } = setup({
          headerFilter: {
            visible: true
          },
          columns: [column]
        });
        viewController.openPopup({}, column);
        const state = viewController.popupState.peek();
        expect((state === null || state === void 0 ? void 0 : state.options.dataSource).group).toBeTruthy();
        expect(checkFn((state === null || state === void 0 ? void 0 : state.options.dataSource).group)).toBeTruthy();
      });
    });
  });
});
