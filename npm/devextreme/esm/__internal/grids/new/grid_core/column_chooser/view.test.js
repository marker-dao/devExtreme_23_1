/**
* DevExtreme (esm/__internal/grids/new/grid_core/column_chooser/view.test.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker */
import { describe, expect, it } from '@jest/globals';
import { rerender } from 'inferno';
import { ColumnsController } from '../columns_controller';
import { getContext } from '../di.test_utils';
import { OptionsControllerMock } from '../options_controller/options_controller.mock';
import { ToolbarController } from '../toolbar/controller';
import { ToolbarView } from '../toolbar/view';
import { ColumnChooserView } from './view';
const CLASS = {
  root: 'dx-cardview-column-chooser',
  selectMode: 'dx-cardview-column-chooser-mode-select',
  dragMode: 'dx-cardview-column-chooser-mode-drag',
  list: 'dx-cardview-column-chooser-list',
  plain: 'dx-cardview-column-chooser-plain',
  item: 'dx-column-chooser-item',
  treeViewItem: 'dx-treeview-item-content'
};
export const renderColumnChooser = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let open = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  const context = getContext(options);
  const element = document.createElement('div');
  const columnChooserView = context.get(ColumnChooserView);
  const columnsController = context.get(ColumnsController);
  columnChooserView.render(element);
  if (open) {
    var _columnChooserView$po;
    columnChooserView.show();
    rerender();
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
export const renderColumnChooserWithToolbar = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const context = getContext(options);
  const rootElement = document.createElement('div');
  const optionsController = context.get(OptionsControllerMock);
  const columnChooserView = context.get(ColumnChooserView);
  const toolbarView = context.get(ToolbarView);
  const toolbarController = context.get(ToolbarController);
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
describe('ColumnChooser', () => {
  describe('View', () => {
    it('toolbar button', () => {
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
      expect(toolbarItems).toHaveLength(1);
      expect(toolbarItems[0].name).toEqual('columnChooserButton');
      optionsController.option('columnChooser.enabled', false);
      toolbarItems = toolbarController.items.peek();
      expect(toolbarItems).toHaveLength(0);
    });
    it.each([{
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
      expect(columnChooserView.dragModeOpened.peek()).toEqual(result);
    });
    describe('Select mode', () => {
      it('popup has correct css classes', () => {
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
        expect(popup === null || popup === void 0 ? void 0 : popup.content().classList).toContain(CLASS.list);
        expect(popup === null || popup === void 0 ? void 0 : popup.content().classList).toContain(CLASS.plain);
        expect(wrapperElement === null || wrapperElement === void 0 ? void 0 : wrapperElement.classList).toContain(CLASS.root);
        expect(wrapperElement === null || wrapperElement === void 0 ? void 0 : wrapperElement.classList).toContain(CLASS.selectMode);
      });
    });
    describe('Drag mode', () => {
      it('popup has correct css classes', () => {
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
        expect(popup === null || popup === void 0 ? void 0 : popup.content().classList).toContain(CLASS.list);
        expect(overlayElement === null || overlayElement === void 0 ? void 0 : overlayElement.classList).toContain(CLASS.root);
        expect(overlayElement === null || overlayElement === void 0 ? void 0 : overlayElement.classList).toContain(CLASS.dragMode);
      });
    });
  });
});
