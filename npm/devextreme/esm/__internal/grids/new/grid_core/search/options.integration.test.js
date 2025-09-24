/**
* DevExtreme (esm/__internal/grids/new/grid_core/search/options.integration.test.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker */
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Guid } from '../../../../core/m_guid';
import CardView from '../../../../grids/new/card_view/widget';
import { rerender } from 'inferno';
const SELECTORS = {
  cardContent: 'dx-cardview-card-content',
  searchPanel: 'dx-cardview-search-panel',
  editorInput: 'dx-texteditor-input'
};
const setup = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const container = document.createElement('div');
  const cardView = new CardView(container, options);
  rerender();
  return {
    container,
    cardView
  };
};
function getCardContent(container) {
  rerender();
  return container.querySelector(`.${SELECTORS.cardContent}`);
}
describe('Options', () => {
  beforeEach(() => {
    jest.spyOn(Guid.prototype, '_normalize').mockReturnValue('guidmock');
  });
  afterEach(() => {
    jest.spyOn(Guid.prototype, '_normalize').mockRestore();
  });
  it('searchPanel.text (card contains match)', async () => {
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
    rerender();
    const content = getCardContent(container);
    expect(content).toMatchSnapshot();
  });
  it('searchPanel.text (card not contains match)', async () => {
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
    rerender();
    const content = getCardContent(container);
    expect(content).toMatchSnapshot();
  });
  it('searchPanel.highlightCaseSensitive = true', async () => {
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
    expect(content).toMatchSnapshot();
  });
  it('searchPanel.highlightCaseSensitive = false', () => {
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
    expect(content).toMatchSnapshot();
  });
  it('searchPanel.highlightSearchText = false', () => {
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
    expect(content).toMatchSnapshot();
  });
  it('searchPanel.width', () => {
    const {
      container
    } = setup({
      searchPanel: {
        visible: true,
        width: 333
      }
    });
    rerender();
    const searchPanel = container.querySelector(`.${SELECTORS.searchPanel}`);
    expect(searchPanel).not.toBeNull();
    expect(searchPanel === null || searchPanel === void 0 ? void 0 : searchPanel.getAttribute('style')).toContain('width: 333px');
  });
  it('searchPanel.placeholder', () => {
    const {
      container
    } = setup({
      searchPanel: {
        visible: true,
        placeholder: 'Search here'
      }
    });
    rerender();
    const searchPanel = container.querySelector(`.${SELECTORS.searchPanel}`);
    const searchInput = searchPanel === null || searchPanel === void 0 ? void 0 : searchPanel.querySelector(`.${SELECTORS.editorInput}`);
    expect(searchInput === null || searchInput === void 0 ? void 0 : searchInput.getAttribute('placeholder')).toContain('Search here');
  });
  it('searchPanel.visible = false', () => {
    const {
      container
    } = setup({
      searchPanel: {
        visible: false
      }
    });
    rerender();
    const searchPanel = container.querySelector(`.${SELECTORS.searchPanel}`);
    expect(searchPanel).toBeNull();
  });
  it('searchPanel.searchVisibleColumnsOnly = true', () => {
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
    rerender();
    const content = container.querySelector(`.${SELECTORS.cardContent}`);
    expect(content).toBeNull();
  });
});
