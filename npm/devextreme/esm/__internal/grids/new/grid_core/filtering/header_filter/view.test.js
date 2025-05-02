/**
* DevExtreme (esm/__internal/grids/new/grid_core/filtering/header_filter/view.test.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createComponentVNode } from "inferno";
/* eslint-disable
  spellcheck/spell-checker,
  @typescript-eslint/no-non-null-assertion,
  @typescript-eslint/explicit-member-accessibility,
  no-new
*/
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { signal } from '@preact/signals-core';
import { render, rerender } from 'inferno';
import { HeaderFilterPopupComponent, HeaderFilterPopupView } from './view';
const oldHeaderFilterMock = {
  init: jest.fn(),
  showHeaderFilterMenu: jest.fn()
};
jest.mock('@ts/grids/grid_core/header_filter/m_header_filter_core', () => ({
  HeaderFilterView: class {
    constructor() {
      this.init = oldHeaderFilterMock.init;
      this.showHeaderFilterMenu = oldHeaderFilterMock.showHeaderFilterMenu;
    }
  }
}));
describe('HeaderFilter', () => {
  describe('HeaderFilterPopupComponent', () => {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let oldHeaderFilterPopupMock;
    beforeEach(() => {
      oldHeaderFilterPopupMock = {
        render: jest.fn(),
        dispose: jest.fn()
      };
    });
    it('should render', () => {
      const container = document.createElement('div');
      render(createComponentVNode(2, HeaderFilterPopupComponent, {
        "oldHeaderFilterPopup": oldHeaderFilterPopupMock
      }), container);
      expect(container).toMatchSnapshot();
    });
    it('should call legacy render after mount', () => {
      const container = document.createElement('div');
      render(createComponentVNode(2, HeaderFilterPopupComponent, {
        "oldHeaderFilterPopup": oldHeaderFilterPopupMock
      }), container);
      rerender();
      expect(oldHeaderFilterPopupMock.render).toHaveBeenCalledTimes(1);
    });
    it('should call legacy render after update', () => {
      const container = document.createElement('div');
      render(createComponentVNode(2, HeaderFilterPopupComponent, {
        "oldHeaderFilterPopup": oldHeaderFilterPopupMock
      }), container);
      rerender();
      render(createComponentVNode(2, HeaderFilterPopupComponent, {
        "oldHeaderFilterPopup": oldHeaderFilterPopupMock
      }), container);
      expect(oldHeaderFilterPopupMock.render).toHaveBeenCalledTimes(2);
    });
  });
  describe('View', () => {
    beforeEach(() => {
      oldHeaderFilterMock.init.mockClear();
      oldHeaderFilterMock.showHeaderFilterMenu.mockClear();
    });
    it('should init old popup module on creation', () => {
      new HeaderFilterPopupView({}, {
        popupState: signal(null)
      });
      expect(oldHeaderFilterMock.init).toHaveBeenCalledTimes(1);
    });
    it('should open popup if popupState changed', () => {
      const expectedElement = {
        0: {},
        length: 1
      };
      const expectedOptions = {
        optA: 'A',
        optB: 'B'
      };
      const popupState = signal(null);
      new HeaderFilterPopupView({}, {
        popupState
      });
      popupState.value = {
        element: {},
        options: expectedOptions
      };
      expect(oldHeaderFilterMock.showHeaderFilterMenu).toHaveBeenCalledTimes(1);
      expect(oldHeaderFilterMock.showHeaderFilterMenu).toHaveBeenCalledWith(expectedElement, expectedOptions);
    });
    it('should do nothing if popupState update is empty', () => {
      const popupState = signal(null);
      new HeaderFilterPopupView({}, {
        popupState
      });
      popupState.value = {
        element: {},
        options: {}
      };
      popupState.value = null;
      expect(oldHeaderFilterMock.showHeaderFilterMenu).toHaveBeenCalledTimes(1);
    });
  });
});
