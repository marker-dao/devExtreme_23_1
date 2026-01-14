/**
* DevExtreme (esm/__internal/grids/new/card_view/header_panel/item.a11y.test.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createComponentVNode, normalizeProps } from "inferno";
import { describe, expect, it } from '@jest/globals';
import { Item } from '../../../../grids/new/card_view/header_panel/item';
import { normalizeColumn } from '../../../../grids/new/grid_core/columns_controller/columns_controller.mock';
import { render } from 'inferno';
import { getHeaderItemA11yLabel } from './a11y/index';
const CLASSES = {
  itemRoot: 'dx-cardview-header-item'
};
const setup = props => {
  const rootElement = document.createElement('div');
  render(normalizeProps(createComponentVNode(2, Item, Object.assign({}, props))), rootElement);
  return rootElement;
};
const getItemRoot = element => element.querySelector(`.${CLASSES.itemRoot}`);
describe('Item', () => {
  describe('A11y', () => {
    it('should has aria label with column caption', () => {
      const expectedColumnName = 'TEST_COL';
      const expectedAriaLabel = getHeaderItemA11yLabel(expectedColumnName, {});
      const element = setup({
        column: normalizeColumn({
          dataField: 'SOME_DATA_FIELD',
          caption: expectedColumnName
        })
      });
      const itemRoot = getItemRoot(element);
      expect(itemRoot === null || itemRoot === void 0 ? void 0 : itemRoot.getAttribute('aria-label')).toBe(expectedAriaLabel);
    });
    it.each([true, false])('should has aria label with header filter info', hasFilters => {
      const expectedColumnName = 'TEST_COL';
      const expectedAriaLabel = getHeaderItemA11yLabel(expectedColumnName, {
        hasHeaderFilterValue: hasFilters
      });
      const element = setup({
        column: normalizeColumn({
          dataField: 'SOME_DATA_FIELD',
          caption: expectedColumnName
        }),
        hasFilters
      });
      const itemRoot = getItemRoot(element);
      expect(itemRoot === null || itemRoot === void 0 ? void 0 : itemRoot.getAttribute('aria-label')).toBe(expectedAriaLabel);
    });
    it.each(['asc', 'desc', undefined])('sorting: %s -> should has arial label with sorting info', sortOrder => {
      const expectedColumnName = 'TEST_COL';
      const expectedAriaLabel = getHeaderItemA11yLabel(expectedColumnName, {
        sortOrder
      });
      const element = setup({
        column: normalizeColumn({
          dataField: 'SOME_DATA_FIELD',
          caption: expectedColumnName,
          sortOrder
        })
      });
      const itemRoot = getItemRoot(element);
      expect(itemRoot === null || itemRoot === void 0 ? void 0 : itemRoot.getAttribute('aria-label')).toBe(expectedAriaLabel);
    });
    it.each([{
      sortOrder: 'asc',
      sortIndex: 0
    }, {
      sortOrder: 'desc',
      sortIndex: 5
    }, {
      sortOrder: undefined,
      sortIndex: 1
    }, {
      sortOrder: undefined,
      sortIndex: undefined
    }, {
      sortOrder: 'asc',
      sortIndex: undefined
    }, {
      sortOrder: 'desc',
      sortIndex: undefined
    }])('sorting: $sortOrder | sortIndex: $sortIndex -> should has arial label with sort idx info', _ref => {
      let {
        sortOrder,
        sortIndex
      } = _ref;
      const expectedColumnName = 'TEST_COL';
      const expectedAriaLabel = getHeaderItemA11yLabel(expectedColumnName, {
        sortOrder,
        sortIndex
      });
      const element = setup({
        column: normalizeColumn({
          dataField: 'SOME_DATA_FIELD',
          caption: expectedColumnName,
          sortOrder,
          sortIndex
        })
      });
      const itemRoot = getItemRoot(element);
      expect(itemRoot === null || itemRoot === void 0 ? void 0 : itemRoot.getAttribute('aria-label')).toBe(expectedAriaLabel);
    });
    it.each([{
      caption: 'TEST #0',
      hasFilters: true,
      sortOrder: 'asc',
      sortIndex: 100
    }, {
      caption: 'TEST #1',
      hasFilters: true,
      sortOrder: undefined,
      sortIndex: 100
    }, {
      caption: 'TEST #2',
      hasFilters: true,
      sortOrder: undefined,
      sortIndex: 1
    }])('caption: $caption ' + '| filterType: $filterType ' + '| filterValues: $filterValues ' + '| sortOrder: $sortOrder ' + '| sortIndex: $sortIndex' + ' -> complex case', _ref2 => {
      let {
        caption,
        hasFilters,
        sortOrder,
        sortIndex
      } = _ref2;
      const expectedAriaLabel = getHeaderItemA11yLabel(caption, {
        hasHeaderFilterValue: hasFilters,
        sortOrder,
        sortIndex
      });
      const element = setup({
        column: normalizeColumn({
          dataField: 'SOME_DATA_FIELD',
          caption,
          sortOrder,
          sortIndex
        }),
        hasFilters
      });
      const itemRoot = getItemRoot(element);
      expect(itemRoot === null || itemRoot === void 0 ? void 0 : itemRoot.getAttribute('aria-label')).toBe(expectedAriaLabel);
    });
  });
});
