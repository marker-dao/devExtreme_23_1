/**
* DevExtreme (esm/__internal/grids/new/card_view/header_panel/item.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createComponentVNode, normalizeProps } from "inferno";
import { describe, expect, it } from '@jest/globals';
import { render } from 'inferno';
import { normalizeColumn } from '../../grid_core/columns_controller/columns_controller.mock';
import { Item } from './item';
const setup = props => {
  const rootElement = document.createElement('div');
  render(normalizeProps(createComponentVNode(2, Item, _extends({}, props))), rootElement);
  return rootElement;
};
describe('Item', () => {
  it('should use column caption as text', () => {
    const el = setup({
      column: normalizeColumn({
        dataField: 'my column data field',
        caption: 'my column caption'
      })
    });
    expect(el).toMatchSnapshot();
  });
  it('should render sort icons', () => {
    const el = setup({
      column: normalizeColumn({
        dataField: 'column1',
        sortIndex: 0,
        sortOrder: 'asc'
      })
    });
    expect(el).toMatchSnapshot();
  });
  it('should render headerFilter icons if enabled', () => {
    const el = setup({
      column: normalizeColumn({
        dataField: 'column1',
        allowHeaderFiltering: true
      })
    });
    expect(el).toMatchSnapshot();
  });
});
