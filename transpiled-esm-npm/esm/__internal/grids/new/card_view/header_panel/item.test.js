import { createComponentVNode, normalizeProps } from "inferno";
import { describe, expect, it } from '@jest/globals';
import { render } from 'inferno';
import { normalizeColumn } from '../../grid_core/columns_controller/columns_controller.mock';
import { Item } from './item';
const setup = props => {
  const rootElement = document.createElement('div');
  render(normalizeProps(createComponentVNode(2, Item, Object.assign({}, props))), rootElement);
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