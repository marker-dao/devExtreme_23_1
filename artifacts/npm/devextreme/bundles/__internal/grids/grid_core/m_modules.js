/**
* DevExtreme (bundles/__internal/grids/grid_core/m_modules.js)
* Version: 23.2.2
* Build date: Fri Nov 10 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.processModules = processModules;
var _class = _interopRequireDefault(require("../../../core/class"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _callbacks = _interopRequireDefault(require("../../../core/utils/callbacks"));
var _common = require("../../../core/utils/common");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _message = _interopRequireDefault(require("../../../localization/message"));
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /* eslint-disable @typescript-eslint/method-signature-style */ // @ts-expect-error
const WIDGET_WITH_LEGACY_CONTAINER_NAME = 'dxDataGrid';
const BORDERED_VIEWS = ['columnHeadersView', 'rowsView', 'footerView', 'filterPanelView'];
const ModuleItem = _class.default.inherit({
  _endUpdateCore() {},
  ctor(component) {
    const that = this;
    that._updateLockCount = 0;
    that.component = component;
    that._actions = {};
    that._actionConfigs = {};
    (0, _iterator.each)(this.callbackNames() || [], function (index, name) {
      const flags = that.callbackFlags(name) || {};
      flags.unique = true;
      flags.syncStrategy = true;
      // @ts-expect-error
      that[this] = (0, _callbacks.default)(flags);
    });
  },
  init() {},
  callbackNames() {},
  callbackFlags() {},
  publicMethods() {},
  beginUpdate() {
    this._updateLockCount++;
  },
  endUpdate() {
    if (this._updateLockCount > 0) {
      this._updateLockCount--;
      if (!this._updateLockCount) {
        this._endUpdateCore();
      }
    }
  },
  option(name) {
    const {
      component
    } = this;
    const optionCache = component._optionCache;
    if (arguments.length === 1 && optionCache) {
      if (!(name in optionCache)) {
        optionCache[name] = component.option(name);
      }
      return optionCache[name];
    }
    return component.option.apply(component, arguments);
  },
  _silentOption(name, value) {
    const {
      component
    } = this;
    const optionCache = component._optionCache;
    if (optionCache) {
      optionCache[name] = value;
    }
    return component._setOptionWithoutOptionChange(name, value);
  },
  localize(name) {
    const optionCache = this.component._optionCache;
    if (optionCache) {
      if (!(name in optionCache)) {
        optionCache[name] = _message.default.format(name);
      }
      return optionCache[name];
    }
    return _message.default.format(name);
  },
  on() {
    return this.component.on.apply(this.component, arguments);
  },
  off() {
    return this.component.off.apply(this.component, arguments);
  },
  optionChanged(args) {
    if (args.name in this._actions) {
      this.createAction(args.name, this._actionConfigs[args.name]);
      args.handled = true;
    }
  },
  getAction(actionName) {
    return this._actions[actionName];
  },
  setAria(name, value, $target) {
    const target = $target.get(0);
    const prefix = name !== 'role' && name !== 'id' ? 'aria-' : '';
    if (target.setAttribute) {
      target.setAttribute(prefix + name, value);
    } else {
      $target.attr(prefix + name, value);
    }
  },
  _createComponent() {
    return this.component._createComponent.apply(this.component, arguments);
  },
  getController(name) {
    return this.component._controllers[name];
  },
  createAction(actionName, config) {
    if ((0, _type.isFunction)(actionName)) {
      const action = this.component._createAction(actionName.bind(this), config);
      return function (e) {
        action({
          event: e
        });
      };
    }
    this._actions[actionName] = this.component._createActionByOption(actionName, config);
    this._actionConfigs[actionName] = config;
    return undefined;
  },
  executeAction(actionName, options) {
    const action = this._actions[actionName];
    return action && action(options);
  },
  dispose() {
    const that = this;
    (0, _iterator.each)(that.callbackNames() || [], function () {
      that[this].empty();
    });
  },
  addWidgetPrefix(className) {
    const componentName = this.component.NAME;
    return "dx-".concat(componentName.slice(2).toLowerCase()).concat(className ? "-".concat(className) : '');
  },
  getWidgetContainerClass() {
    const containerName = this.component.NAME === WIDGET_WITH_LEGACY_CONTAINER_NAME ? null : 'container';
    return this.addWidgetPrefix(containerName);
  },
  elementIsInsideGrid($element) {
    const $gridElement = $element.closest(".".concat(this.getWidgetContainerClass())).parent();
    return $gridElement.is(this.component.$element());
  }
});
const Controller = ModuleItem;
const ViewController = Controller.inherit({
  getView(name) {
    return this.component._views[name];
  },
  getViews() {
    return this.component._views;
  }
});
const View = ModuleItem.inherit({
  _isReady() {
    return this.component.isReady();
  },
  _endUpdateCore() {
    this.callBase();
    if (!this._isReady() && this._requireReady) {
      this._requireRender = false;
      this.component._requireResize = false;
    }
    if (this._requireRender) {
      this._requireRender = false;
      this.render(this._$parent);
    }
  },
  _invalidate(requireResize, requireReady) {
    this._requireRender = true;
    this.component._requireResize = (0, _window.hasWindow)() && (this.component._requireResize || requireResize);
    this._requireReady = this._requireReady || requireReady;
  },
  _renderCore() {},
  _resizeCore() {},
  _parentElement() {
    return this._$parent;
  },
  ctor(component) {
    this.callBase(component);
    this.renderCompleted = (0, _callbacks.default)();
    this.resizeCompleted = (0, _callbacks.default)();
  },
  element() {
    return this._$element;
  },
  getElementHeight() {
    const $element = this.element();
    if (!$element) return 0;
    const marginTop = parseFloat($element.css('marginTop')) || 0;
    const marginBottom = parseFloat($element.css('marginBottom')) || 0;
    const {
      offsetHeight
    } = $element.get(0);
    return offsetHeight + marginTop + marginBottom;
  },
  isVisible() {
    return true;
  },
  getTemplate(name) {
    return this.component._getTemplate(name);
  },
  getView(name) {
    return this.component._views[name];
  },
  getFirstVisibleViewElement() {
    const columnHeaderView = this.getView('columnHeadersView');
    if (columnHeaderView && columnHeaderView.isVisible()) {
      return columnHeaderView.element();
    }
    return this.getView('rowsView').element();
  },
  getLastVisibleViewElement() {
    const filterPanelView = this.getView('filterPanelView');
    if (filterPanelView && filterPanelView.isVisible()) {
      return filterPanelView.element();
    }
    const footerView = this.getView('footerView');
    if (footerView && footerView.isVisible()) {
      return footerView.element();
    }
    return this.getView('rowsView').element();
  },
  getViewElementWithClass(className) {
    const borderedView = BORDERED_VIEWS.map(viewName => this.getView(viewName)).filter(view => view && view.element()).find(view => view.element().hasClass(className));
    return borderedView && borderedView.element();
  },
  updateBorderedViews() {
    const BORDERED_TOP_VIEW_CLASS = 'dx-bordered-top-view';
    const BORDERED_BOTTOM_VIEW_CLASS = 'dx-bordered-bottom-view';
    const oldFirstBorderedElement = this.getViewElementWithClass(BORDERED_TOP_VIEW_CLASS);
    const oldLastBorderedElement = this.getViewElementWithClass(BORDERED_BOTTOM_VIEW_CLASS);
    const newFirstBorderedElement = this.getFirstVisibleViewElement();
    const newLastBorderedElement = this.getLastVisibleViewElement();
    if (oldFirstBorderedElement && !oldFirstBorderedElement.is(newFirstBorderedElement)) {
      oldFirstBorderedElement.removeClass(BORDERED_TOP_VIEW_CLASS);
    }
    if (oldLastBorderedElement && !oldLastBorderedElement.is(newLastBorderedElement)) {
      oldLastBorderedElement.removeClass(BORDERED_BOTTOM_VIEW_CLASS);
    }
    if (!newFirstBorderedElement.hasClass(BORDERED_TOP_VIEW_CLASS)) {
      newFirstBorderedElement.addClass(BORDERED_TOP_VIEW_CLASS);
    }
    if (!newLastBorderedElement.hasClass(BORDERED_BOTTOM_VIEW_CLASS)) {
      newLastBorderedElement.addClass(BORDERED_BOTTOM_VIEW_CLASS);
    }
  },
  isViewsStateValid() {
    var _a;
    if (this.component._views) {
      if (!BORDERED_VIEWS.includes(this.name)) {
        return false;
      }
      const rowsView = this.getView('rowsView');
      if (!(rowsView && (0, _type.isDefined)((_a = rowsView.element) === null || _a === void 0 ? void 0 : _a.call(rowsView)))) {
        return false;
      }
      const optionalViews = ['columnHeadersView', 'footerView', 'filterPanelView'].map(viewName => this.getView(viewName)).filter(view => {
        var _a;
        return view && ((_a = view.isVisible) === null || _a === void 0 ? void 0 : _a.call(view));
      });
      const isOptionalViewsRendered = optionalViews.every(view => view && (0, _type.isDefined)(view.element()));
      return isOptionalViewsRendered;
    }
    return false;
  },
  render($parent, options) {
    let $element = this._$element;
    const isVisible = this.isVisible();
    if (!$element && !$parent) return;
    this._requireReady = false;
    if (!$element) {
      $element = this._$element = (0, _renderer.default)('<div>').appendTo($parent);
      this._$parent = $parent;
    }
    $element.toggleClass('dx-hidden', !isVisible);
    if (this.isViewsStateValid()) {
      this.updateBorderedViews();
    }
    if (isVisible) {
      this.component._optionCache = {};
      const deferred = this._renderCore(options);
      this.component._optionCache = undefined;
      if (deferred) {
        deferred.done(() => {
          this.renderCompleted.fire(options);
        });
      } else {
        this.renderCompleted.fire(options);
      }
    }
  },
  resize() {
    this.isResizing = true;
    this._resizeCore();
    this.resizeCompleted.fire();
    this.isResizing = false;
  },
  focus(preventScroll) {
    this.element().get(0).focus({
      preventScroll
    });
  }
});
const MODULES_ORDER_MAX_INDEX = 1000000;
function getExtendedTypes(types) {
  let moduleExtenders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const extendTypes = {};
  Object.entries(moduleExtenders).forEach(_ref => {
    let [name, extender] = _ref;
    const currentType = types[name];
    if (currentType) {
      if ((0, _type.isFunction)(extender)) {
        extendTypes[name] = extender(currentType);
      } else {
        const classType = currentType;
        extendTypes[name] = classType.inherit(extender);
      }
    }
  });
  return extendTypes;
}
function registerPublicMethods(componentInstance, name, moduleItem) {
  const publicMethods = moduleItem.publicMethods();
  if (publicMethods) {
    (0, _iterator.each)(publicMethods, (_, methodName) => {
      if (moduleItem[methodName]) {
        if (!componentInstance[methodName]) {
          componentInstance[methodName] = function () {
            return moduleItem[methodName](...arguments);
          };
        } else {
          throw _ui.default.Error('E1005', methodName);
        }
      } else {
        throw _ui.default.Error('E1006', name, methodName);
      }
    });
  }
}
function processModules(componentInstance, componentClass) {
  const {
    modules
  } = componentClass;
  const {
    modulesOrder
  } = componentClass;
  function createModuleItems(moduleTypes) {
    const moduleItems = {};
    (0, _iterator.each)(moduleTypes, (name, moduleType) => {
      // eslint-disable-next-line new-cap
      const moduleItem = new moduleType(componentInstance);
      moduleItem.name = name;
      registerPublicMethods(componentInstance, name, moduleItem);
      moduleItems[name] = moduleItem;
    });
    return moduleItems;
  }
  if (modulesOrder) {
    modules.sort((module1, module2) => {
      let orderIndex1 = modulesOrder.indexOf(module1.name);
      let orderIndex2 = modulesOrder.indexOf(module2.name);
      if (orderIndex1 < 0) {
        orderIndex1 = MODULES_ORDER_MAX_INDEX;
      }
      if (orderIndex2 < 0) {
        orderIndex2 = MODULES_ORDER_MAX_INDEX;
      }
      return orderIndex1 - orderIndex2;
    });
  }
  const rootControllerTypes = {};
  const rootViewTypes = {};
  modules.forEach(_ref2 => {
    let {
      name: moduleName,
      controllers = {},
      views = {}
    } = _ref2;
    Object.entries(controllers).forEach(_ref3 => {
      let [name, type] = _ref3;
      var _a;
      if (rootControllerTypes[name]) {
        throw _ui.default.Error('E1001', moduleName, name);
        // @ts-expect-error
      } else if (!((_a = type === null || type === void 0 ? void 0 : type.subclassOf) === null || _a === void 0 ? void 0 : _a.call(type, Controller))) {
        throw _ui.default.Error('E1002', moduleName, name);
      }
      rootControllerTypes[name] = type;
    });
    Object.entries(views).forEach(_ref4 => {
      let [name, type] = _ref4;
      var _a;
      if (rootViewTypes[name]) {
        throw _ui.default.Error('E1003', moduleName, name);
        // @ts-expect-error
      } else if (!((_a = type === null || type === void 0 ? void 0 : type.subclassOf) === null || _a === void 0 ? void 0 : _a.call(type, View))) {
        throw _ui.default.Error('E1004', moduleName, name);
      }
      rootViewTypes[name] = type;
    });
  });
  const moduleExtenders = modules.filter(_ref5 => {
    let {
      extenders
    } = _ref5;
    return !!extenders;
  });
  const controllerTypes = moduleExtenders.reduce((types, _ref6) => {
    let {
      extenders
    } = _ref6;
    return _extends(_extends({}, types), getExtendedTypes(types, extenders === null || extenders === void 0 ? void 0 : extenders.controllers));
  }, rootControllerTypes);
  const viewTypes = moduleExtenders.reduce((types, _ref7) => {
    let {
      extenders
    } = _ref7;
    return _extends(_extends({}, types), getExtendedTypes(types, extenders === null || extenders === void 0 ? void 0 : extenders.views));
  }, rootViewTypes);
  // eslint-disable-next-line no-param-reassign
  componentInstance._controllers = createModuleItems(controllerTypes);
  // eslint-disable-next-line no-param-reassign
  componentInstance._views = createModuleItems(viewTypes);
}
const callModuleItemsMethod = function (that, methodName, args) {
  args = args || [];
  if (that._controllers) {
    (0, _iterator.each)(that._controllers, function () {
      this[methodName] && this[methodName].apply(this, args);
    });
  }
  if (that._views) {
    (0, _iterator.each)(that._views, function () {
      this[methodName] && this[methodName].apply(this, args);
    });
  }
};
var _default = {
  modules: [],
  View,
  ViewController,
  Controller,
  registerModule(name, module) {
    const {
      modules
    } = this;
    for (let i = 0; i < modules.length; i++) {
      if (modules[i].name === name) {
        return;
      }
    }
    module.name = name;
    modules.push(module);
  },
  registerModulesOrder(moduleNames) {
    this.modulesOrder = moduleNames;
  },
  unregisterModule(name) {
    this.modules = (0, _common.grep)(this.modules, module => module.name !== name);
  },
  processModules,
  callModuleItemsMethod
};
exports.default = _default;
