/**
* DevExtreme (esm/__internal/grids/new/card_view/widget.test.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from '@jest/globals';
import $ from '../../../../core/renderer';
import { rerender } from 'inferno';
import { CardView } from './widget';
describe('common', () => {
  describe('initial render', () => {
    it('should be successfull', () => {
      const container = document.createElement('div');
      const cardView = new CardView(container, {});
      rerender();
      expect(container).toMatchSnapshot();
    });
  });
});
describe('options', () => {
  describe('rtlEnabled', () => {
    const container = document.createElement('div');
    const cardView = new CardView(container, {
      rtlEnabled: true,
      pager: {
        visible: true
      }
    });
    it('should add dx-rtl class to container div', () => {
      expect(container.classList).toContain('dx-rtl');
    });
    it('should pass rtlEnabled options to nested components', () => {
      expect($(container).find('.dx-pagination')
      // @ts-expect-error
      .dxPagination('instance').option('rtlEnabled')).toBe(true);
    });
  });
});
describe('regressions', () => {
  it('should not have leaks to defaultOptions after changing option', () => {
    const container = document.createElement('div');
    let cardView = new CardView(container, {
      keyExpr: 'a',
      dataSource: [{
        a: 'a'
      }]
    });
    expect(cardView.option('pager.showPageSizeSelector')).toBe(false);
    cardView.option('pager.showPageSizeSelector', true);
    expect(cardView.option('pager.showPageSizeSelector')).toBe(true);
    cardView.dispose();
    cardView = new CardView(container, {
      keyExpr: 'a',
      dataSource: [{
        a: 'a'
      }]
    });
    expect(cardView.option('pager.showPageSizeSelector')).toBe(false);
  });
});
