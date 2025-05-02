/**
* DevExtreme (cjs/__internal/grids/new/grid_core/pager/view.test.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _di = require("../di.test_utils");
var _options_controller = require("../options_controller/options_controller.mock");
var _view = require("./view");
const createPagerView = options => {
  const context = (0, _di.getContext)(options ?? {
    dataSource: [],
    pager: {
      visible: true
    }
  });
  const rootElement = document.createElement('div');
  const pager = context.get(_view.PagerView);
  const optionsController = context.get(_options_controller.OptionsControllerMock);
  pager.render(rootElement);
  return {
    rootElement,
    optionsController
  };
};
(0, _globals.describe)('render', () => {
  (0, _globals.it)('empty PagerView', () => {
    const {
      rootElement
    } = createPagerView();
    (0, _globals.expect)(rootElement).toMatchSnapshot();
  });
  (0, _globals.it)('PagerView with options', () => {
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
    (0, _globals.expect)(rootElement).toMatchSnapshot();
  });
});
(0, _globals.describe)('Applying options', () => {
  (0, _globals.describe)('when visible = \'auto\' and pageCount <= 1', () => {
    (0, _globals.it)('Pager should be hidden', () => {
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
      (0, _globals.expect)(rootElement).toMatchSnapshot();
    });
  });
  (0, _globals.describe)('when visible = \'auto\' and pageCount > 1', () => {
    (0, _globals.it)('Pager should be visible', () => {
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
      (0, _globals.expect)(rootElement).toMatchSnapshot();
    });
  });
  (0, _globals.describe)('when visible = \'true\'', () => {
    (0, _globals.it)('Pager should be visible', () => {
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
      (0, _globals.expect)(rootElement).toMatchSnapshot();
    });
  });
  (0, _globals.describe)('when visible = \'false\'', () => {
    (0, _globals.it)('Pager should be hidden', () => {
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
      (0, _globals.expect)(rootElement).toMatchSnapshot();
    });
  });
  (0, _globals.describe)('when changing a visible to \'false\' at runtime', () => {
    (0, _globals.it)('Pager should be hidden', () => {
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
      (0, _globals.expect)(rootElement).toMatchSnapshot();
    });
  });
  (0, _globals.describe)('when changing a visible to \'true\' at runtime', () => {
    (0, _globals.it)('Pager should be visible', () => {
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
      (0, _globals.expect)(rootElement).toMatchSnapshot();
    });
  });
  (0, _globals.describe)('when allowedPageSizes = \'auto\'', () => {
    (0, _globals.it)('calculates pageSizes by pageSize', () => {
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
      (0, _globals.expect)(rootElement).toMatchSnapshot();
    });
  });
  (0, _globals.describe)('when allowedPageSizes with custom values', () => {
    (0, _globals.it)('displays custom values', () => {
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
      (0, _globals.expect)(rootElement).toMatchSnapshot();
    });
  });
  (0, _globals.describe)('when changing an allowedPageSizes to custom values at runtime', () => {
    (0, _globals.it)('applies custom values', () => {
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
      (0, _globals.expect)(rootElement).toMatchSnapshot();
    });
  });
});
