/**
* DevExtreme (esm/__internal/grids/grid_core/context_menu/m_context_menu.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable max-classes-per-file */
import { getPublicElement } from '../../../../core/element';
import $ from '../../../../core/renderer';
import { each } from '../../../../core/utils/iterator';
import ContextMenu from '../../../../ui/context_menu';
import modules from '../m_modules';
const CONTEXT_MENU = 'dx-context-menu';
const GROUP_ROW_CLASS = 'dx-group-row';
const viewName = {
  columnHeadersView: 'header',
  rowsView: 'content',
  footerView: 'footer',
  headerPanel: 'toolbar'
};
const VIEW_NAMES = ['columnHeadersView', 'rowsView', 'footerView', 'headerPanel'];
export class ContextMenuController extends modules.ViewController {
  init() {
    this.createAction('onContextMenuPreparing');
  }
  getContextMenuItems(dxEvent) {
    if (!dxEvent) {
      return false;
    }
    const that = this;
    const $targetElement = $(dxEvent.target);
    let menuItems;
    each(VIEW_NAMES, function () {
      const view = that.getView(this);
      if (!view) {
        return;
      }
      const $viewElement = view.element();
      const isTargetElementInsideView = ($viewElement === null || $viewElement === void 0 ? void 0 : $viewElement.is($targetElement)) || ($viewElement === null || $viewElement === void 0 ? void 0 : $viewElement.find($targetElement).length);
      if (isTargetElementInsideView) {
        var _$targetCellElement$, _rowOptions$cells, _view$getContextMenuI;
        const isGroupRow = $targetElement.hasClass(GROUP_ROW_CLASS);
        const $targetCellElement = isGroupRow ? $targetElement.find('.dx-group-cell').first() : $targetElement.closest('.dx-row > td, .dx-row > tr');
        const $targetRowElement = $targetCellElement.parent();
        const rowIndex = view.getRowIndex($targetRowElement);
        const columnIndex = (_$targetCellElement$ = $targetCellElement[0]) === null || _$targetCellElement$ === void 0 ? void 0 : _$targetCellElement$.cellIndex;
        const rowOptions = $targetRowElement.data('options');
        const options = {
          event: dxEvent,
          targetElement: getPublicElement($targetElement),
          target: viewName[this],
          rowIndex,
          row: view._getRows()[rowIndex],
          columnIndex,
          // @ts-expect-error
          column: rowOptions === null || rowOptions === void 0 || (_rowOptions$cells = rowOptions.cells) === null || _rowOptions$cells === void 0 || (_rowOptions$cells = _rowOptions$cells[columnIndex]) === null || _rowOptions$cells === void 0 ? void 0 : _rowOptions$cells.column
        };
        options.items = (_view$getContextMenuI = view.getContextMenuItems) === null || _view$getContextMenuI === void 0 ? void 0 : _view$getContextMenuI.call(view, options);
        that.executeAction('onContextMenuPreparing', options);
        that._contextMenuPrepared(options);
        menuItems = options.items;
        if (menuItems) {
          return false;
        }
      }
      return undefined;
    });
    return menuItems;
  }
  /**
   * @extended: selection
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _contextMenuPrepared(options) {}
}
export class ContextMenuView extends modules.View {
  init() {
    super.init();
    this._contextMenuController = this.getController('contextMenu');
  }
  _renderCore() {
    const $element = this.element().addClass(CONTEXT_MENU);
    this.setAria('role', 'presentation', $element);
    this._createComponent($element, ContextMenu, {
      onPositioning: actionArgs => {
        const {
          event
        } = actionArgs;
        const contextMenuInstance = actionArgs.component;
        const items = this._contextMenuController.getContextMenuItems(event);
        if (items) {
          contextMenuInstance.option('items', items);
          event.stopPropagation();
        } else {
          // @ts-expect-error
          actionArgs.cancel = true;
        }
      },
      onItemClick(params) {
        var _params$itemData, _params$itemData$onIt;
        (_params$itemData = params.itemData) === null || _params$itemData === void 0 || (_params$itemData$onIt = _params$itemData.onItemClick) === null || _params$itemData$onIt === void 0 || _params$itemData$onIt.call(_params$itemData, params);
      },
      cssClass: this.getWidgetContainerClass(),
      // @ts-expect-error
      target: this.component.$element()
    });
  }
}
export const contextMenuModule = {
  defaultOptions() {
    return {
      onContextMenuPreparing: null
    };
  },
  controllers: {
    contextMenu: ContextMenuController
  },
  views: {
    contextMenuView: ContextMenuView
  }
};
