/**
* DevExtreme (esm/__internal/grids/new/grid_core/pager/view.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import $ from '../../../../../core/renderer';
import { DataController } from '../data_controller';
import { getContext } from '../di.test_utils';
import { OptionsControllerMock } from '../options_controller/options_controller.mock';
import { PagerView } from './view';
const createPagerView = options => {
  const context = getContext(options ?? {
    dataSource: [],
    pager: {
      visible: true
    }
  });
  const rootElement = document.createElement('div');
  const pager = context.get(PagerView);
  const optionsController = context.get(OptionsControllerMock);
  pager.render(rootElement);
  return {
    rootElement,
    optionsController,
    dataController: context.get(DataController)
  };
};
const isPaginationVisible = rootElement => {
  const visible = rootElement.querySelector('.dx-pagination') !== null;
  return visible;
};
const getPagination = rootElement => {
  const element = rootElement.querySelector('.dx-pagination');
  const component = $(element).dxPagination('instance');
  return component;
};
describe('Pager View', () => {
  describe('render', () => {
    it('empty PagerView', () => {
      const {
        rootElement
      } = createPagerView();
      expect(rootElement).toMatchSnapshot();
    });
    it('PagerView with options', () => {
      const {
        rootElement
      } = createPagerView({
        dataSource: [...new Array(20)].map((_, index) => ({
          field: `test_${index}`
        })),
        paging: {
          pageIndex: 2
        },
        pager: {
          showPageSizeSelector: true
        }
      });
      expect(rootElement).toMatchSnapshot();
    });
  });
  describe('Visibility', () => {
    it('should be visible when visible = \'true\'', () => {
      const {
        rootElement
      } = createPagerView({
        dataSource: [...new Array(20)].map((_, index) => ({
          field: `test_${index}`
        })),
        paging: {
          pageIndex: 6
        },
        pager: {
          visible: true,
          showPageSizeSelector: true
        }
      });
      expect(isPaginationVisible(rootElement)).toBeTruthy();
    });
    it('should be hidden when visible = \'false\'', () => {
      const {
        rootElement
      } = createPagerView({
        dataSource: [...new Array(20)].map((_, index) => ({
          field: `test_${index}`
        })),
        paging: {
          pageIndex: 6
        },
        pager: {
          visible: false,
          showPageSizeSelector: true
        }
      });
      expect(isPaginationVisible(rootElement)).toBeFalsy();
    });
    it('should be hidden when visible = \'auto\' and pageCount <= 1', () => {
      const {
        rootElement
      } = createPagerView({
        dataSource: [...new Array(4)].map((_, index) => ({
          field: `test_${index}`
        })),
        paging: {
          pageIndex: 6
        },
        pager: {
          visible: 'auto',
          showPageSizeSelector: true
        }
      });
      expect(isPaginationVisible(rootElement)).toBeFalsy();
    });
    it('should be visibl visible = \'auto\' and pageCount > 1', () => {
      const {
        rootElement
      } = createPagerView({
        dataSource: [...new Array(20)].map((_, index) => ({
          field: `test_${index}`
        })),
        paging: {
          pageIndex: 6
        },
        pager: {
          visible: 'auto',
          showPageSizeSelector: true
        }
      });
      expect(isPaginationVisible(rootElement)).toBeTruthy();
    });
    it('should be hidden when changing a visible to \'false\' at runtime', () => {
      const {
        rootElement,
        optionsController
      } = createPagerView({
        dataSource: [...new Array(4)].map((_, index) => ({
          field: `test_${index}`
        })),
        paging: {
          pageIndex: 6
        },
        pager: {
          visible: true,
          showPageSizeSelector: true
        }
      });
      optionsController.option('pager.visible', false);
      expect(isPaginationVisible(rootElement)).toBeFalsy();
    });
    it('should be visible when changing a visible to \'true\' at runtime', () => {
      const {
        rootElement,
        optionsController
      } = createPagerView({
        dataSource: [...new Array(4)].map((_, index) => ({
          field: `test_${index}`
        })),
        paging: {
          pageIndex: 6
        },
        pager: {
          visible: false,
          showPageSizeSelector: true
        }
      });
      optionsController.option('pager.visible', true);
      expect(isPaginationVisible(rootElement)).toBeTruthy();
    });
  });
  describe('allowedPageSizes', () => {
    it('allowedPageSizes = \'auto\'', () => {
      const {
        rootElement
      } = createPagerView({
        dataSource: [...new Array(4)].map((_, index) => ({
          field: `test_${index}`
        })),
        paging: {
          pageIndex: 6
        },
        pager: {
          visible: true,
          allowedPageSizes: 'auto',
          showPageSizeSelector: true
        }
      });
      const pagination = getPagination(rootElement);
      expect(pagination.option('allowedPageSizes')).toEqual([3, 6, 12]);
    });
    it('allowedPageSizes = custom values', () => {
      const {
        rootElement
      } = createPagerView({
        dataSource: [...new Array(20)].map((_, index) => ({
          field: `test_${index}`
        })),
        paging: {
          pageIndex: 6
        },
        pager: {
          visible: 'auto',
          allowedPageSizes: [4, 10, 20],
          showPageSizeSelector: true
        }
      });
      const pagination = getPagination(rootElement);
      expect(pagination.option('allowedPageSizes')).toEqual([4, 10, 20]);
    });
    it('allowedPageSizes changed to custom values at runtime', () => {
      const {
        rootElement,
        optionsController
      } = createPagerView({
        dataSource: [...new Array(20)].map((_, index) => ({
          field: `test_${index}`
        })),
        paging: {
          pageIndex: 6
        },
        pager: {
          allowedPageSizes: 'auto',
          showPageSizeSelector: true
        }
      });
      optionsController.option('pager.allowedPageSizes', [4, 10, 20]);
      const pagination = getPagination(rootElement);
      expect(pagination.option('allowedPageSizes')).toEqual([4, 10, 20]);
    });
  });
});
