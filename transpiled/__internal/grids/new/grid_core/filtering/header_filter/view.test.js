"use strict";

var _inferno = require("inferno");
var _globals = require("@jest/globals");
var _index = require("../../../../../core/state_manager/index");
var _view = require("./view");
/* eslint-disable
  spellcheck/spell-checker,
  @typescript-eslint/no-non-null-assertion,
  @typescript-eslint/explicit-member-accessibility,
  no-new
*/

const oldHeaderFilterMock = {
  init: _globals.jest.fn(),
  showHeaderFilterMenu: _globals.jest.fn()
};
_globals.jest.mock('@ts/grids/grid_core/header_filter/m_header_filter_core', () => ({
  HeaderFilterView: class {
    constructor() {
      this.init = oldHeaderFilterMock.init;
      this.showHeaderFilterMenu = oldHeaderFilterMock.showHeaderFilterMenu;
    }
  }
}));
(0, _globals.describe)('HeaderFilter', () => {
  (0, _globals.describe)('HeaderFilterPopupComponent', () => {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let oldHeaderFilterPopupMock;
    (0, _globals.beforeEach)(() => {
      oldHeaderFilterPopupMock = {
        render: _globals.jest.fn(),
        dispose: _globals.jest.fn()
      };
    });
    (0, _globals.it)('should render', () => {
      const container = document.createElement('div');
      (0, _inferno.render)((0, _inferno.createComponentVNode)(2, _view.HeaderFilterPopupComponent, {
        "oldHeaderFilterPopup": oldHeaderFilterPopupMock
      }), container);
      (0, _globals.expect)(container).toMatchSnapshot();
    });
    (0, _globals.it)('should call legacy render after mount', () => {
      const container = document.createElement('div');
      (0, _inferno.render)((0, _inferno.createComponentVNode)(2, _view.HeaderFilterPopupComponent, {
        "oldHeaderFilterPopup": oldHeaderFilterPopupMock
      }), container);
      (0, _inferno.rerender)();
      (0, _globals.expect)(oldHeaderFilterPopupMock.render).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should call legacy render after update', () => {
      const container = document.createElement('div');
      (0, _inferno.render)((0, _inferno.createComponentVNode)(2, _view.HeaderFilterPopupComponent, {
        "oldHeaderFilterPopup": oldHeaderFilterPopupMock
      }), container);
      (0, _inferno.rerender)();
      (0, _inferno.render)((0, _inferno.createComponentVNode)(2, _view.HeaderFilterPopupComponent, {
        "oldHeaderFilterPopup": oldHeaderFilterPopupMock
      }), container);
      (0, _globals.expect)(oldHeaderFilterPopupMock.render).toHaveBeenCalledTimes(2);
    });
  });
  (0, _globals.describe)('View', () => {
    (0, _globals.beforeEach)(() => {
      oldHeaderFilterMock.init.mockClear();
      oldHeaderFilterMock.showHeaderFilterMenu.mockClear();
    });
    (0, _globals.it)('should init old popup module on creation', () => {
      new _view.HeaderFilterPopupView({}, {
        popupState: (0, _index.signal)(null)
      });
      (0, _globals.expect)(oldHeaderFilterMock.init).toHaveBeenCalledTimes(1);
    });
    (0, _globals.it)('should open popup if popupState changed', () => {
      const expectedElement = {
        0: {},
        length: 1
      };
      const expectedOptions = {
        optA: 'A',
        optB: 'B'
      };
      const popupState = (0, _index.signal)(null);
      new _view.HeaderFilterPopupView({}, {
        popupState
      });
      popupState.value = {
        element: {},
        options: expectedOptions
      };
      (0, _globals.expect)(oldHeaderFilterMock.showHeaderFilterMenu).toHaveBeenCalledTimes(1);
      (0, _globals.expect)(oldHeaderFilterMock.showHeaderFilterMenu).toHaveBeenCalledWith(expectedElement, expectedOptions);
    });
    (0, _globals.it)('should do nothing if popupState update is empty', () => {
      const popupState = (0, _index.signal)(null);
      new _view.HeaderFilterPopupView({}, {
        popupState
      });
      popupState.value = {
        element: {},
        options: {}
      };
      popupState.value = null;
      (0, _globals.expect)(oldHeaderFilterMock.showHeaderFilterMenu).toHaveBeenCalledTimes(1);
    });
  });
});