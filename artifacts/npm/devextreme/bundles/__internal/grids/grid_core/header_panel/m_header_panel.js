/**
* DevExtreme (bundles/__internal/grids/grid_core/header_panel/m_header_panel.js)
* Version: 23.2.0
* Build date: Fri Oct 06 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headerPanelModule = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _data = require("../../../../core/utils/data");
var _extend = require("../../../../core/utils/extend");
var _type = require("../../../../core/utils/type");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _toolbar = _interopRequireDefault(require("../../../../ui/toolbar"));
var _m_columns_view = require("../views/m_columns_view");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var HEADER_PANEL_CLASS = 'header-panel';
var TOOLBAR_BUTTON_CLASS = 'toolbar-button';
var TOOLBAR_ARIA_LABEL = '-ariaToolbar';
var DEFAULT_TOOLBAR_ITEM_NAMES = ['addRowButton', 'applyFilterButton', 'columnChooserButton', 'exportButton', 'groupPanel', 'revertButton', 'saveButton', 'searchPanel'];
var HeaderPanel = /*#__PURE__*/function (_ColumnsView) {
  _inheritsLoose(HeaderPanel, _ColumnsView);
  function HeaderPanel() {
    return _ColumnsView.apply(this, arguments) || this;
  }
  var _proto = HeaderPanel.prototype;
  _proto._getToolbarItems = function _getToolbarItems() {
    return [];
  };
  _proto._getButtonContainer = function _getButtonContainer() {
    return (0, _renderer.default)('<div>').addClass(this.addWidgetPrefix(TOOLBAR_BUTTON_CLASS));
  };
  _proto._getToolbarButtonClass = function _getToolbarButtonClass(specificClass) {
    var secondClass = specificClass ? " ".concat(specificClass) : '';
    return this.addWidgetPrefix(TOOLBAR_BUTTON_CLASS) + secondClass;
  };
  _proto._getToolbarOptions = function _getToolbarOptions() {
    var userToolbarOptions = this.option('toolbar');
    var options = {
      toolbarOptions: {
        items: this._getToolbarItems(),
        visible: userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.visible,
        disabled: userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.disabled,
        onItemRendered(e) {
          var itemRenderedCallback = e.itemData.onItemRendered;
          if (itemRenderedCallback) {
            itemRenderedCallback(e);
          }
        }
      }
    };
    var userItems = userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.items;
    options.toolbarOptions.items = this._normalizeToolbarItems(options.toolbarOptions.items, userItems);
    this.executeAction('onToolbarPreparing', options);
    if (options.toolbarOptions && !(0, _type.isDefined)(options.toolbarOptions.visible)) {
      var toolbarItems = options.toolbarOptions.items;
      options.toolbarOptions.visible = !!(toolbarItems === null || toolbarItems === void 0 ? void 0 : toolbarItems.length);
    }
    return options.toolbarOptions;
  };
  _proto._normalizeToolbarItems = function _normalizeToolbarItems(defaultItems, userItems) {
    defaultItems.forEach(function (button) {
      if (!DEFAULT_TOOLBAR_ITEM_NAMES.includes(button.name)) {
        throw new Error("Default toolbar item '".concat(button.name, "' is not added to DEFAULT_TOOLBAR_ITEM_NAMES"));
      }
    });
    var defaultProps = {
      location: 'after'
    };
    var isArray = Array.isArray(userItems);
    if (!(0, _type.isDefined)(userItems)) {
      return defaultItems;
    }
    if (!isArray) {
      userItems = [userItems];
    }
    var defaultButtonsByNames = {};
    defaultItems.forEach(function (button) {
      defaultButtonsByNames[button.name] = button;
    });
    var normalizedItems = userItems.map(function (button) {
      if ((0, _type.isString)(button)) {
        button = {
          name: button
        };
      }
      if ((0, _type.isDefined)(button.name)) {
        if ((0, _type.isDefined)(defaultButtonsByNames[button.name])) {
          button = (0, _extend.extend)(true, {}, defaultButtonsByNames[button.name], button);
        } else if (DEFAULT_TOOLBAR_ITEM_NAMES.includes(button.name)) {
          button = _extends(_extends({}, button), {
            visible: false
          });
        }
      }
      return (0, _extend.extend)(true, {}, defaultProps, button);
    });
    return isArray ? normalizedItems : normalizedItems[0];
  };
  _proto._renderCore = function _renderCore() {
    if (!this._toolbar) {
      var $headerPanel = this.element();
      $headerPanel.addClass(this.addWidgetPrefix(HEADER_PANEL_CLASS));
      var label = _message.default.format(this.component.NAME + TOOLBAR_ARIA_LABEL);
      var $toolbar = (0, _renderer.default)('<div>').attr('aria-label', label).appendTo($headerPanel);
      this._toolbar = this._createComponent($toolbar, _toolbar.default, this._toolbarOptions);
    } else {
      this._toolbar.option(this._toolbarOptions);
    }
  };
  _proto._columnOptionChanged = function _columnOptionChanged() {};
  _proto._handleDataChanged = function _handleDataChanged() {
    if (this._requireReady) {
      this.render();
    }
  };
  _proto._isDisabledDefinedByUser = function _isDisabledDefinedByUser(name) {
    var _a;
    var userItems = (_a = this.option('toolbar')) === null || _a === void 0 ? void 0 : _a.items;
    var userItem = userItems === null || userItems === void 0 ? void 0 : userItems.find(function (item) {
      return (item === null || item === void 0 ? void 0 : item.name) === name;
    });
    return (0, _type.isDefined)(userItem === null || userItem === void 0 ? void 0 : userItem.disabled);
  };
  _proto.init = function init() {
    _ColumnsView.prototype.init.call(this);
    this.createAction('onToolbarPreparing', {
      excludeValidators: ['disabled', 'readOnly']
    });
  };
  _proto.render = function render() {
    this._toolbarOptions = this._getToolbarOptions();
    _ColumnsView.prototype.render.apply(this, arguments);
  };
  _proto.setToolbarItemDisabled = function setToolbarItemDisabled(name, disabled) {
    var _a;
    var toolbar = this._toolbar;
    var isDefinedByUser = this._isDisabledDefinedByUser(name);
    if (!toolbar || isDefinedByUser) {
      return;
    }
    var items = (_a = toolbar.option('items')) !== null && _a !== void 0 ? _a : [];
    var itemIndex = items.findIndex(function (item) {
      return item.name === name;
    });
    if (itemIndex < 0) {
      return;
    }
    var item = toolbar.option("items[".concat(itemIndex, "]"));
    toolbar.option("items[".concat(itemIndex, "].disabled"), disabled);
    if (item.options) {
      toolbar.option("items[".concat(itemIndex, "].options.disabled"), disabled);
    }
  };
  _proto.updateToolbarDimensions = function updateToolbarDimensions() {
    var _a;
    (_a = this._toolbar) === null || _a === void 0 ? void 0 : _a.updateDimensions();
  };
  _proto.getHeaderPanel = function getHeaderPanel() {
    return this.element();
  };
  _proto.getHeight = function getHeight() {
    return this.getElementHeight();
  };
  _proto.optionChanged = function optionChanged(args) {
    if (args.name === 'onToolbarPreparing') {
      this._invalidate();
      args.handled = true;
    }
    if (args.name === 'toolbar') {
      args.handled = true;
      if (this._toolbar) {
        var parts = (0, _data.getPathParts)(args.fullName);
        var optionName = args.fullName.replace(/^toolbar\./, '');
        if (parts.length === 1) {
          // `toolbar` case
          var toolbarOptions = this._getToolbarOptions();
          this._toolbar.option(toolbarOptions);
        } else if (parts[1] === 'items') {
          if (parts.length === 2) {
            // `toolbar.items` case
            var _toolbarOptions = this._getToolbarOptions();
            this._toolbar.option('items', _toolbarOptions.items);
          } else if (parts.length === 3) {
            // `toolbar.items[i]` case
            var normalizedItem = this._normalizeToolbarItems(this._getToolbarItems(), args.value);
            this._toolbar.option(optionName, normalizedItem);
          } else if (parts.length >= 4) {
            // `toolbar.items[i].prop` case
            this._toolbar.option(optionName, args.value);
          }
        } else {
          // `toolbar.visible`, `toolbar.disabled` case
          this._toolbar.option(optionName, args.value);
        }
      }
    }
    _ColumnsView.prototype.optionChanged.call(this, args);
  };
  _proto.isVisible = function isVisible() {
    return !!(this._toolbarOptions && this._toolbarOptions.visible);
  };
  _proto.allowDragging = function allowDragging() {};
  _proto.hasGroupedColumns = function hasGroupedColumns() {};
  return HeaderPanel;
}(_m_columns_view.ColumnsView);
var headerPanelModule = {
  defaultOptions() {
    return {};
  },
  views: {
    headerPanel: HeaderPanel
  },
  extenders: {
    controllers: {
      resizing: {
        _updateDimensionsCore() {
          this.callBase.apply(this, arguments);
          this.getView('headerPanel').updateToolbarDimensions();
        }
      }
    }
  }
};
exports.headerPanelModule = headerPanelModule;
