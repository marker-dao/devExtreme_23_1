/**
* DevExtreme (esm/__internal/grids/grid_core/m_modules.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/method-signature-style */
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import Callbacks from '../../../core/utils/callbacks';
// @ts-expect-error
import { grep } from '../../../core/utils/common';
import { each } from '../../../core/utils/iterator';
import { isFunction } from '../../../core/utils/type';
import { hasWindow } from '../../../core/utils/window';
import errors from '../../../ui/widget/ui.errors';
import { updateViewsBorders } from './views/utils/update_views_borders';
const WIDGET_WITH_LEGACY_CONTAINER_NAME = 'dxDataGrid';
export class ModuleItem {
  constructor(component) {
    const that = this;
    that._updateLockCount = 0;
    that.component = component;
    that._actions = {};
    that._actionConfigs = {};
    each(this.callbackNames() || [], function (index, name) {
      const flags = that.callbackFlags(name) || {};
      flags.unique = true;
      flags.syncStrategy = true;
      that[this] = Callbacks(flags);
    });
  }
  _endUpdateCore() {}
  init() {}
  callbackNames() {
    return undefined;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  callbackFlags(name) {}
  publicMethods() {
    return [];
  }
  beginUpdate() {
    this._updateLockCount++;
  }
  endUpdate() {
    if (this._updateLockCount > 0) {
      this._updateLockCount--;
      if (!this._updateLockCount) {
        this._endUpdateCore();
      }
    }
  }
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
    // @ts-expect-error
    return component.option.apply(component, arguments);
  }
  _silentOption(name, value) {
    const {
      component
    } = this;
    const optionCache = component._optionCache;
    if (optionCache) {
      optionCache[name] = value;
    }
    return component._setOptionWithoutOptionChange(name, value);
  }
  localize(name) {
    const optionCache = this.component._optionCache;
    if (optionCache) {
      if (!(name in optionCache)) {
        optionCache[name] = messageLocalization.format(name);
      }
      return optionCache[name];
    }
    return messageLocalization.format(name);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  on(event, callback) {
    // @ts-expect-error
    return this.component.on.apply(this.component, arguments);
  }
  off() {
    // @ts-expect-error
    return this.component.off.apply(this.component, arguments);
  }
  optionChanged(args) {
    if (args.name in this._actions) {
      this.createAction(args.name, this._actionConfigs[args.name]);
      args.handled = true;
    }
  }
  getAction(actionName) {
    return this._actions[actionName];
  }
  setAria(name, value, $target) {
    const target = $target.get(0);
    const prefix = name !== 'role' && name !== 'id' ? 'aria-' : '';
    if (target.setAttribute) {
      target.setAttribute(prefix + name, value);
    } else {
      $target.attr(prefix + name, value);
    }
  }
  _createComponent($container, component, options) {
    return this.component._createComponent($container, component, options);
  }
  getController(name) {
    return this.component._controllers[name];
  }
  createAction(actionName, config) {
    if (isFunction(actionName)) {
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
  }
  executeAction(actionName, options) {
    const action = this._actions[actionName];
    return action && action(options);
  }
  dispose() {
    const that = this;
    each(that.callbackNames() || [], function () {
      that[this].empty();
    });
  }
  addWidgetPrefix(className) {
    const componentName = this.component.NAME;
    return `dx-${componentName.slice(2).toLowerCase()}${className ? `-${className}` : ''}`;
  }
  getWidgetContainerClass() {
    const containerName = this.component.NAME === WIDGET_WITH_LEGACY_CONTAINER_NAME ? null : 'container';
    return this.addWidgetPrefix(containerName);
  }
  elementIsInsideGrid($element) {
    const $gridElement = $element.closest(`.${this.getWidgetContainerClass()}`).parent();
    return $gridElement.is(this.component.$element());
  }
}
export class Controller extends ModuleItem {}
export class ViewController extends Controller {
  getView(name) {
    return this.component._views[name];
  }
  getViews() {
    return this.component._views;
  }
}
export class View extends ModuleItem {
  constructor(component) {
    super(component);
    this.renderCompleted = Callbacks();
    this.resizeCompleted = Callbacks();
  }
  _isReady() {
    return this.component.isReady();
  }
  _endUpdateCore() {
    super._endUpdateCore();
    if (!this._isReady() && this._requireReady) {
      this._requireRender = false;
      this.component._requireResize = false;
    }
    if (this._requireRender) {
      this._requireRender = false;
      this.render(this._$parent);
    }
  }
  _invalidate(requireResize, requireReady) {
    this._requireRender = true;
    this.component._requireResize = hasWindow() && (this.component._requireResize || requireResize);
    this._requireReady = this._requireReady || requireReady;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _renderCore(options) {}
  _resizeCore() {}
  _parentElement() {
    return this._$parent;
  }
  element() {
    return this._$element;
  }
  getElementHeight() {
    const $element = this.element();
    if (!$element) return 0;
    const marginTop = parseFloat($element.css('marginTop')) || 0;
    const marginBottom = parseFloat($element.css('marginBottom')) || 0;
    const {
      offsetHeight
    } = $element.get(0);
    return offsetHeight + marginTop + marginBottom;
  }
  isVisible() {
    return true;
  }
  getTemplate(name) {
    return this.component._getTemplate(name);
  }
  getView(name) {
    return this.component._views[name];
  }
  _getBorderedViews() {
    return {
      columnHeadersView: this.component._views.columnHeadersView,
      rowsView: this.component._views.rowsView,
      filterPanelView: this.component._views.filterPanelView,
      footerView: this.component._views.footerView
    };
  }
  render($parent, options) {
    let $element = this._$element;
    const isVisible = this.isVisible();
    if (!$element && !$parent) return;
    this._requireReady = false;
    if (!$element) {
      $element = this._$element = $('<div>').appendTo($parent);
      this._$parent = $parent;
    }
    $element.toggleClass('dx-hidden', !isVisible);
    if (this.component._views) {
      updateViewsBorders(this.name, this._getBorderedViews());
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
  }
  resize() {
    this.isResizing = true;
    this._resizeCore();
    this.resizeCompleted.fire();
    this.isResizing = false;
  }
  focus(preventScroll) {
    this.element().get(0).focus({
      preventScroll
    });
  }
}
const MODULES_ORDER_MAX_INDEX = 1000000;
function getExtendedTypes(types) {
  let moduleExtenders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const extendTypes = {};
  Object.entries(moduleExtenders).forEach(_ref => {
    let [name, extender] = _ref;
    const currentType = types[name];
    if (currentType) {
      if (isFunction(extender)) {
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
    each(publicMethods, (_, methodName) => {
      if (moduleItem[methodName]) {
        if (!componentInstance[methodName]) {
          componentInstance[methodName] = function () {
            return moduleItem[methodName](...arguments);
          };
        } else {
          throw errors.Error('E1005', methodName);
        }
      } else {
        throw errors.Error('E1006', name, methodName);
      }
    });
  }
}
export function processModules(componentInstance, componentClass) {
  const {
    modules
  } = componentClass;
  const {
    modulesOrder
  } = componentClass;
  function createModuleItems(moduleTypes) {
    const moduleItems = {};
    each(moduleTypes, (name, moduleType) => {
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
      if (rootControllerTypes[name]) {
        throw errors.Error('E1001', moduleName, name);
      } else if (!((type === null || type === void 0 ? void 0 : type.prototype) instanceof Controller)) {
        throw errors.Error('E1002', moduleName, name);
      }
      rootControllerTypes[name] = type;
    });
    Object.entries(views).forEach(_ref4 => {
      let [name, type] = _ref4;
      if (rootViewTypes[name]) {
        throw errors.Error('E1003', moduleName, name);
      } else if (!((type === null || type === void 0 ? void 0 : type.prototype) instanceof View)) {
        throw errors.Error('E1004', moduleName, name);
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
    return _extends({}, types, getExtendedTypes(types, extenders === null || extenders === void 0 ? void 0 : extenders.controllers));
  }, rootControllerTypes);
  const viewTypes = moduleExtenders.reduce((types, _ref7) => {
    let {
      extenders
    } = _ref7;
    return _extends({}, types, getExtendedTypes(types, extenders === null || extenders === void 0 ? void 0 : extenders.views));
  }, rootViewTypes);
  // eslint-disable-next-line no-param-reassign
  componentInstance._controllers = createModuleItems(controllerTypes);
  // eslint-disable-next-line no-param-reassign
  componentInstance._views = createModuleItems(viewTypes);
}
const callModuleItemsMethod = function (that, methodName, args) {
  args = args || [];
  if (that._controllers) {
    each(that._controllers, function () {
      this[methodName] && this[methodName].apply(this, args);
    });
  }
  if (that._views) {
    each(that._views, function () {
      this[methodName] && this[methodName].apply(this, args);
    });
  }
};
export default {
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
    this.modules = grep(this.modules, module => module.name !== name);
  },
  processModules,
  callModuleItemsMethod
};
