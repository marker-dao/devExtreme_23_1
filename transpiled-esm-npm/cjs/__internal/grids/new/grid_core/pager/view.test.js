"use strict";

var _globals = require("@jest/globals");
var _renderer = _interopRequireDefault(require("../../../../../core/renderer"));
var _data_controller = require("../data_controller");
var _di = require("../di.test_utils");
var _options_controller = require("../options_controller/options_controller.mock");
var _view = require("./view");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
    optionsController,
    dataController: context.get(_data_controller.DataController)
  };
};
const isPaginationVisible = rootElement => {
  const visible = rootElement.querySelector('.dx-pagination') !== null;
  return visible;
};
const getPagination = rootElement => {
  const element = rootElement.querySelector('.dx-pagination');
  const component = (0, _renderer.default)(element).dxPagination('instance');
  return component;
};
(0, _globals.describe)('Pager View', () => {
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
  (0, _globals.describe)('Visibility', () => {
    (0, _globals.it)('should be visible when visible = \'true\'', () => {
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
      (0, _globals.expect)(isPaginationVisible(rootElement)).toBeTruthy();
    });
    (0, _globals.it)('should be hidden when visible = \'false\'', () => {
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
      (0, _globals.expect)(isPaginationVisible(rootElement)).toBeFalsy();
    });
    (0, _globals.it)('should be hidden when visible = \'auto\' and pageCount <= 1', () => {
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
      (0, _globals.expect)(isPaginationVisible(rootElement)).toBeFalsy();
    });
    (0, _globals.it)('should be visibl visible = \'auto\' and pageCount > 1', () => {
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
      (0, _globals.expect)(isPaginationVisible(rootElement)).toBeTruthy();
    });
    (0, _globals.it)('should be hidden when changing a visible to \'false\' at runtime', () => {
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
      (0, _globals.expect)(isPaginationVisible(rootElement)).toBeFalsy();
    });
    (0, _globals.it)('should be visible when changing a visible to \'true\' at runtime', () => {
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
      (0, _globals.expect)(isPaginationVisible(rootElement)).toBeTruthy();
    });
  });
  (0, _globals.describe)('allowedPageSizes', () => {
    (0, _globals.it)('allowedPageSizes = \'auto\'', () => {
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
      (0, _globals.expect)(pagination.option('allowedPageSizes')).toEqual([3, 6, 12]);
    });
    (0, _globals.it)('allowedPageSizes = custom values', () => {
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
      (0, _globals.expect)(pagination.option('allowedPageSizes')).toEqual([4, 10, 20]);
    });
    (0, _globals.it)('allowedPageSizes changed to custom values at runtime', () => {
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
      (0, _globals.expect)(pagination.option('allowedPageSizes')).toEqual([4, 10, 20]);
    });
  });
});