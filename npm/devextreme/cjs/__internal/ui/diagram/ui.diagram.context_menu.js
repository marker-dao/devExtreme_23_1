/**
* DevExtreme (cjs/__internal/ui/diagram/ui.diagram.context_menu.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _context_menu = _interopRequireDefault(require("../../../ui/context_menu"));
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _diagram = _interopRequireDefault(require("../../ui/diagram/diagram.bar"));
var _diagram2 = _interopRequireDefault(require("../../ui/diagram/diagram.commands_manager"));
var _diagram3 = require("../../ui/diagram/diagram.importer");
var _uiDiagram = _interopRequireDefault(require("../../ui/diagram/ui.diagram.menu_helper"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DIAGRAM_TOUCHBAR_CLASS = 'dx-diagram-touchbar';
const DIAGRAM_TOUCHBAR_OVERLAY_CLASS = 'dx-diagram-touchbar-overlay';
const DIAGRAM_TOUCHBAR_TARGET_CLASS = 'dx-diagram-touchbar-target';
const DIAGRAM_TOUCHBAR_MIN_UNWRAPPED_WIDTH = 800;
const DIAGRAM_TOUCHBAR_Y_OFFSET = 32;
class DiagramContextMenu extends _context_menu.default {
  _renderContextMenuOverlay() {
    // @ts-expect-error ts-error
    super._renderContextMenuOverlay();
    // @ts-expect-error ts-error
    if (this._overlay && this.option('isTouchBarMode')) {
      // @ts-expect-error ts-error
      this._overlay.option('onShown', () => {
        var _this$_overlay;
        // @ts-expect-error ts-error
        const $content = (0, _renderer.default)((_this$_overlay = this._overlay) === null || _this$_overlay === void 0 ? void 0 : _this$_overlay.$content());
        $content.parent().addClass(DIAGRAM_TOUCHBAR_OVERLAY_CLASS);
      });
    }
  }
}
class DiagramContextMenuBar extends _diagram.default {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getCommandKeys() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._getKeys(this._owner._commands);
  }
  setItemValue(key, value) {
    this._owner._setItemValue(key, value);
  }
  setItemEnabled(key, enabled) {
    this._owner._setItemEnabled(key, enabled);
  }
  setItemVisible(key, visible) {
    this._owner._setItemVisible(key, visible);
  }
  setItemSubItems(key, items) {
    this._owner._setItemSubItems(key, items);
  }
  setEnabled(enabled) {
    this._owner._setEnabled(enabled);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  isVisible() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._owner.isVisible();
  }
}
class DiagramContextMenuWrapper extends _widget.default {
  _init() {
    super._init();
    this._createOnVisibilityChangingAction();
    this._createOnInternalCommand();
    this._createOnCustomCommand();
    this._createOnItemClickAction();
    this._tempState = undefined;
    this._commands = [];
    this._commandToIndexMap = {};
    this.bar = new DiagramContextMenuBar(this);
  }
  _initMarkup() {
    super._initMarkup();
    this._commands = this._getCommands();
    this._commandToIndexMap = {};
    this._fillCommandToIndexMap(this._commands, []);
    this._$contextMenuTargetElement = (0, _renderer.default)('<div>').addClass(DIAGRAM_TOUCHBAR_TARGET_CLASS).appendTo(this.$element());
    const $contextMenu = (0, _renderer.default)('<div>').appendTo(this.$element());
    this._contextMenuInstance = this._createComponent($contextMenu, DiagramContextMenu, {
      isTouchBarMode: this._isTouchBarMode(),
      cssClass: this._isTouchBarMode() ? DIAGRAM_TOUCHBAR_CLASS : _uiDiagram.default.getContextMenuCssClass(),
      hideOnOutsideClick: false,
      showEvent: '',
      focusStateEnabled: false,
      items: this._commands,
      position: this._isTouchBarMode() ? {
        my: {
          x: 'center',
          y: 'bottom'
        },
        at: {
          x: 'center',
          y: 'top'
        },
        of: this._$contextMenuTargetElement
      } : {},
      itemTemplate(itemData, itemIndex, itemElement) {
        _uiDiagram.default.getContextMenuItemTemplate(this, itemData, itemIndex, itemElement);
      },
      onItemClick: _ref => {
        let {
          itemData
        } = _ref;
        return this._onItemClick(itemData);
      },
      onShowing: e => {
        if (this._inOnShowing === true) return;
        this._inOnShowing = true;
        this._onVisibilityChangingAction({
          visible: true,
          component: this
        });
        e.component.option('items', e.component.option('items'));
        delete this._inOnShowing;
      }
    });
  }
  _show(x, y, selection) {
    var _this$_contextMenuIns;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_this$_contextMenuIns = this._contextMenuInstance) === null || _this$_contextMenuIns === void 0 || _this$_contextMenuIns.hide();
    if (this._isTouchBarMode()) {
      var _this$_$contextMenuTa, _this$_$contextMenuTa2, _this$_contextMenuIns2;
      (_this$_$contextMenuTa = this._$contextMenuTargetElement) === null || _this$_$contextMenuTa === void 0 || _this$_$contextMenuTa.show();
      if (!selection) {
        // eslint-disable-next-line no-param-reassign
        selection = {
          x,
          y,
          width: 0,
          height: 0
        };
      }
      const widthCorrection = selection.width > DIAGRAM_TOUCHBAR_MIN_UNWRAPPED_WIDTH ? 0 : (DIAGRAM_TOUCHBAR_MIN_UNWRAPPED_WIDTH - selection.width) / 2;
      (_this$_$contextMenuTa2 = this._$contextMenuTargetElement) === null || _this$_$contextMenuTa2 === void 0 || _this$_$contextMenuTa2.css({
        left: selection.x - widthCorrection,
        top: selection.y - DIAGRAM_TOUCHBAR_Y_OFFSET,
        width: selection.width + 2 * widthCorrection,
        height: selection.height + 2 * DIAGRAM_TOUCHBAR_Y_OFFSET
      });
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (_this$_contextMenuIns2 = this._contextMenuInstance) === null || _this$_contextMenuIns2 === void 0 || _this$_contextMenuIns2.show();
    } else {
      var _this$_contextMenuIns3, _this$_contextMenuIns4;
      (_this$_contextMenuIns3 = this._contextMenuInstance) === null || _this$_contextMenuIns3 === void 0 || _this$_contextMenuIns3.option('position', {
        offset: `${x} ${y}`
      });
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (_this$_contextMenuIns4 = this._contextMenuInstance) === null || _this$_contextMenuIns4 === void 0 || _this$_contextMenuIns4.show();
    }
  }
  _hide() {
    var _this$_$contextMenuTa3, _this$_contextMenuIns5;
    (_this$_$contextMenuTa3 = this._$contextMenuTargetElement) === null || _this$_$contextMenuTa3 === void 0 || _this$_$contextMenuTa3.hide();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (_this$_contextMenuIns5 = this._contextMenuInstance) === null || _this$_contextMenuIns5 === void 0 || _this$_contextMenuIns5.hide();
  }
  _isTouchBarMode() {
    const {
      Browser
    } = (0, _diagram3.getDiagram)();
    return Browser.TouchUI;
  }
  _onItemClick(itemData) {
    let processed = false;
    if (this._onItemClickAction) {
      processed = this._onItemClickAction(itemData);
    }
    if (!processed) {
      var _this$_contextMenuIns6;
      _uiDiagram.default.onContextMenuItemClick(this, itemData, this._executeCommand.bind(this));
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (_this$_contextMenuIns6 = this._contextMenuInstance) === null || _this$_contextMenuIns6 === void 0 || _this$_contextMenuIns6.hide();
    }
  }
  _executeCommand(command, name, value) {
    if (typeof command === 'number') {
      var _this$bar;
      (_this$bar = this.bar) === null || _this$bar === void 0 || _this$bar.raiseBarCommandExecuted(command, value);
    } else if (typeof command === 'string') {
      this._onInternalCommandAction({
        command
      });
    }
    if (name !== undefined) {
      this._onCustomCommandAction({
        name
      });
    }
  }
  _createOnInternalCommand() {
    this._onInternalCommandAction = this._createActionByOption('onInternalCommand');
  }
  _createOnCustomCommand() {
    this._onCustomCommandAction = this._createActionByOption('onCustomCommand');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getCommands() {
    return _diagram2.default.getContextMenuCommands(this.option('commands'));
  }
  _fillCommandToIndexMap(commands, indexPath) {
    commands.forEach((command, index) => {
      const commandIndexPath = indexPath.concat([index]);
      if (command.command !== undefined) {
        this._commandToIndexMap[command.command] = commandIndexPath;
      }
      if (Array.isArray(command.items)) {
        this._fillCommandToIndexMap(command.items, commandIndexPath);
      }
    });
  }
  _setItemEnabled(key, enabled) {
    this._setItemVisible(key, enabled);
  }
  _setItemVisible(key, visible) {
    const itemOptionText = _uiDiagram.default.getItemOptionText(this._contextMenuInstance, this._commandToIndexMap[key]);
    _uiDiagram.default.updateContextMenuItemVisible(this._contextMenuInstance, itemOptionText, visible);
  }
  _setItemValue(key, value) {
    const itemOptionText = _uiDiagram.default.getItemOptionText(this._contextMenuInstance, this._commandToIndexMap[key]);
    _uiDiagram.default.updateContextMenuItemValue(this._contextMenuInstance, itemOptionText, key, value);
  }
  _setItemSubItems(key, items) {
    const itemOptionText = _uiDiagram.default.getItemOptionText(this._contextMenuInstance, this._commandToIndexMap[key]);
    _uiDiagram.default.updateContextMenuItems(this._contextMenuInstance, itemOptionText, key, items);
  }
  _setEnabled(enabled) {
    var _this$_contextMenuIns7;
    (_this$_contextMenuIns7 = this._contextMenuInstance) === null || _this$_contextMenuIns7 === void 0 || _this$_contextMenuIns7.option('disabled', !enabled);
  }
  isVisible() {
    return this._inOnShowing;
  }
  _createOnVisibilityChangingAction() {
    this._onVisibilityChangingAction = this._createActionByOption('onVisibilityChanging');
  }
  _createOnItemClickAction() {
    this._onItemClickAction = this._createActionByOption('onItemClick');
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'onVisibilityChanging':
        this._createOnVisibilityChangingAction();
        break;
      case 'onInternalCommand':
        this._createOnInternalCommand();
        break;
      case 'onCustomCommand':
        this._createOnCustomCommand();
        break;
      case 'onItemClick':
        this._createOnItemClickAction();
        break;
      case 'commands':
        this._invalidate();
        break;
      case 'export':
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = {
  DiagramContextMenuWrapper,
  DiagramContextMenu
};
