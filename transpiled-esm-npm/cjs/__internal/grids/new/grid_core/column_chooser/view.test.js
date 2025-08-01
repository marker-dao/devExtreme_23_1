"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderColumnChooserWithToolbar = exports.renderColumnChooser = void 0;
var _globals = require("@jest/globals");
var _inferno = require("inferno");
var _columns_controller = require("../columns_controller");
var _di = require("../di.test_utils");
var _options_controller = require("../options_controller/options_controller.mock");
var _controller = require("../toolbar/controller");
var _view = require("../toolbar/view");
var _view2 = require("./view");
/* eslint-disable spellcheck/spell-checker */

const CLASS = {
  root: 'dx-cardview-column-chooser',
  selectMode: 'dx-cardview-column-chooser-mode-select',
  dragMode: 'dx-cardview-column-chooser-mode-drag',
  list: 'dx-cardview-column-chooser-list',
  plain: 'dx-cardview-column-chooser-plain',
  item: 'dx-column-chooser-item',
  treeViewItem: 'dx-treeview-item-content'
};
const renderColumnChooser = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let open = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  const context = (0, _di.getContext)(options);
  const element = document.createElement('div');
  const columnChooserView = context.get(_view2.ColumnChooserView);
  const columnsController = context.get(_columns_controller.ColumnsController);
  columnChooserView.render(element);
  if (open) {
    var _columnChooserView$po;
    columnChooserView.show();
    (0, _inferno.rerender)();
    // we need to fire 'onShowing' event manually, so that setPopupAttributes() is called
    // @ts-expect-error
    (_columnChooserView$po = columnChooserView.popupRef.current) === null || _columnChooserView$po === void 0 || _columnChooserView$po.option('onShowing')({
      component: columnChooserView.popupRef.current
    });
  }
  return {
    element,
    columnChooserView,
    columnsController
  };
};
exports.renderColumnChooser = renderColumnChooser;
const renderColumnChooserWithToolbar = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const context = (0, _di.getContext)(options);
  const rootElement = document.createElement('div');
  const optionsController = context.get(_options_controller.OptionsControllerMock);
  const columnChooserView = context.get(_view2.ColumnChooserView);
  const toolbarView = context.get(_view.ToolbarView);
  const toolbarController = context.get(_controller.ToolbarController);
  const toolbarElement = document.createElement('div');
  const columnChooserElement = document.createElement('div');
  rootElement.append(toolbarElement, columnChooserElement);
  toolbarView.render(toolbarElement);
  columnChooserView.render(columnChooserElement);
  return {
    element: rootElement,
    optionsController,
    toolbarController
  };
};
exports.renderColumnChooserWithToolbar = renderColumnChooserWithToolbar;
(0, _globals.describe)('ColumnChooser', () => {
  (0, _globals.describe)('View', () => {
    (0, _globals.it)('toolbar button', () => {
      const {
        toolbarController,
        optionsController
      } = renderColumnChooserWithToolbar({
        toolbar: {
          visible: true
        },
        columnChooser: {
          enabled: true
        }
      });
      let toolbarItems = toolbarController.items.peek();
      (0, _globals.expect)(toolbarItems).toHaveLength(1);
      (0, _globals.expect)(toolbarItems[0].name).toEqual('columnChooserButton');
      optionsController.option('columnChooser.enabled', false);
      toolbarItems = toolbarController.items.peek();
      (0, _globals.expect)(toolbarItems).toHaveLength(0);
    });
    _globals.it.each([{
      mode: 'dragAndDrop',
      opened: true,
      result: true
    }, {
      mode: 'dragAndDrop',
      opened: false,
      result: false
    }, {
      mode: 'select',
      opened: true,
      result: false
    }, {
      mode: 'select',
      opened: false,
      result: false
    }])('\'dragModeOpened\' state is correct when mode: \'$mode\', column chooser opened: $opened', _ref => {
      let {
        mode,
        opened,
        result
      } = _ref;
      const {
        columnChooserView
      } = renderColumnChooser({
        columns: ['Column 1', 'Column 2'],
        columnChooser: {
          enabled: true,
          mode
        }
      }, false);
      if (opened) {
        columnChooserView.show();
      }
      (0, _globals.expect)(columnChooserView.dragModeOpened.peek()).toEqual(result);
    });
    (0, _globals.describe)('Select mode', () => {
      (0, _globals.it)('popup has correct css classes', () => {
        const {
          columnChooserView
        } = renderColumnChooser({
          columns: ['Column 1', 'Column 2'],
          columnChooser: {
            enabled: true,
            mode: 'select'
          }
        });
        const popup = columnChooserView.popupRef.current;
        // @ts-expect-error
        const wrapperElement = popup === null || popup === void 0 ? void 0 : popup._$wrapper.get(0);
        (0, _globals.expect)(popup === null || popup === void 0 ? void 0 : popup.content().classList).toContain(CLASS.list);
        (0, _globals.expect)(popup === null || popup === void 0 ? void 0 : popup.content().classList).toContain(CLASS.plain);
        (0, _globals.expect)(wrapperElement === null || wrapperElement === void 0 ? void 0 : wrapperElement.classList).toContain(CLASS.root);
        (0, _globals.expect)(wrapperElement === null || wrapperElement === void 0 ? void 0 : wrapperElement.classList).toContain(CLASS.selectMode);
      });
    });
    (0, _globals.describe)('Drag mode', () => {
      (0, _globals.it)('popup has correct css classes', () => {
        const {
          columnChooserView
        } = renderColumnChooser({
          columns: ['Column 1', 'Column 2'],
          columnChooser: {
            enabled: true,
            mode: 'dragAndDrop'
          }
        });
        const popup = columnChooserView.popupRef.current;
        // @ts-expect-error
        const overlayElement = popup === null || popup === void 0 ? void 0 : popup._$wrapper.get(0);
        (0, _globals.expect)(popup === null || popup === void 0 ? void 0 : popup.content().classList).toContain(CLASS.list);
        (0, _globals.expect)(overlayElement === null || overlayElement === void 0 ? void 0 : overlayElement.classList).toContain(CLASS.root);
        (0, _globals.expect)(overlayElement === null || overlayElement === void 0 ? void 0 : overlayElement.classList).toContain(CLASS.dragMode);
      });
    });
  });
});