/**
* DevExtreme (esm/__internal/grids/new/grid_core/pager/view.test.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
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
    optionsController
  };
};
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
describe('Applying options', () => {
  describe('when visible = \'auto\' and pageCount <= 1', () => {
    it('Pager should be hidden', () => {
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
      expect(rootElement).toMatchSnapshot();
    });
  });
  describe('when visible = \'auto\' and pageCount > 1', () => {
    it('Pager should be visible', () => {
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
      expect(rootElement).toMatchSnapshot();
    });
  });
  describe('when visible = \'true\'', () => {
    it('Pager should be visible', () => {
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
      expect(rootElement).toMatchSnapshot();
    });
  });
  describe('when visible = \'false\'', () => {
    it('Pager should be hidden', () => {
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
      expect(rootElement).toMatchSnapshot();
    });
  });
  describe('when changing a visible to \'false\' at runtime', () => {
    it('Pager should be hidden', () => {
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
      expect(rootElement).toMatchSnapshot();
    });
  });
  describe('when changing a visible to \'true\' at runtime', () => {
    it('Pager should be visible', () => {
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
      expect(rootElement).toMatchSnapshot();
    });
  });
  describe('when allowedPageSizes = \'auto\'', () => {
    it('calculates pageSizes by pageSize', () => {
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
      expect(rootElement).toMatchSnapshot();
    });
  });
  describe('when allowedPageSizes with custom values', () => {
    it('displays custom values', () => {
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
      expect(rootElement).toMatchSnapshot();
    });
  });
  describe('when changing an allowedPageSizes to custom values at runtime', () => {
    it('applies custom values', () => {
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
      expect(rootElement).toMatchSnapshot();
    });
  });
});
