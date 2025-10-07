/**
* DevExtreme (cjs/__internal/grids/grid_core/context_menu/m_context_menu.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contextMenuModule = exports.ContextMenuView = exports.ContextMenuController = void 0;
var _element = require("../../../../core/element");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _iterator = require("../../../../core/utils/iterator");
var _context_menu = _interopRequireDefault(require("../../../../ui/context_menu"));
var _m_modules = _interopRequireDefault(require("../m_modules"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable max-classes-per-file */

const CONTEXT_MENU = 'dx-context-menu';
const GROUP_ROW_CLASS = 'dx-group-row';
const viewName = {
  columnHeadersView: 'header',
  rowsView: 'content',
  footerView: 'footer',
  headerPanel: 'toolbar'
};
const VIEW_NAMES = ['columnHeadersView', 'rowsView', 'footerView', 'headerPanel'];
class ContextMenuController extends _m_modules.default.ViewController {
  init() {
    this.createAction('onContextMenuPreparing');
  }
  getContextMenuItems(dxEvent) {
    if (!dxEvent) {
      return false;
    }
    const that = this;
    const $targetElement = (0, _renderer.default)(dxEvent.target);
    let menuItems;
    (0, _iterator.each)(VIEW_NAMES, function () {
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
          targetElement: (0, _element.getPublicElement)($targetElement),
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
exports.ContextMenuController = ContextMenuController;
class ContextMenuView extends _m_modules.default.View {
  init() {
    super.init();
    this._contextMenuController = this.getController('contextMenu');
  }
  _renderCore() {
    const $element = this.element().addClass(CONTEXT_MENU);
    this.setAria('role', 'presentation', $element);
    this._createComponent($element, _context_menu.default, {
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
exports.ContextMenuView = ContextMenuView;
const contextMenuModule = exports.contextMenuModule = {
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
