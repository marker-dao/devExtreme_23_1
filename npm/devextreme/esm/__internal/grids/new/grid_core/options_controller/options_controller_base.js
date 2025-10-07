/**
* DevExtreme (esm/__internal/grids/new/grid_core/options_controller/options_controller_base.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Component } from '../../../../../core/component';
import { getPathParts } from '../../../../../core/utils/data';
import { computed, effect, signal } from '../../../../core/state_manager/index';
import { extend } from '../../../../core/utils/m_extend';
import { TemplateWrapper } from '../inferno_wrappers/template_wrapper';
import { getTreeNodeByPath, mergeOptionTrees } from '../utils/tree/index';
function getOr(cache, key, orElse) {
  if (cache[key]) {
    return cache[key];
  }
  const value = orElse();
  cache[key] = value;
  return value;
}
export class OptionsController {
  constructor(component) {
    var _component$_getDefaul;
    this.component = component;
    this.cache = {
      oneWay: {},
      oneWayWithChanges: {},
      twoWay: {},
      action: {},
      template: {}
    };
    this.isControlledMode = false;
    // @ts-expect-error Component type doesn't have fields from widget.ts
    this.initialized = this.component.initialized;
    // @ts-expect-error
    this.defaults = ((_component$_getDefaul = component._getDefaultOptions) === null || _component$_getDefaul === void 0 ? void 0 : _component$_getDefaul.call(component)) ?? {};
    this.internalOptions = signal({
      options: extend(true, {}, component.option()),
      changes: null
    });
    this.updateIsControlledMode();
    component.on('optionChanged', this.onOptionChangedHandler.bind(this));
  }
  updateIsControlledMode() {
    const isControlledMode = this.component.option('integrationOptions.isControlledMode');
    this.isControlledMode = isControlledMode ?? false;
  }
  onOptionChangedHandler(optionChanges) {
    const {
      fullName
    } = optionChanges;
    this.updateIsControlledMode();
    this.updateInternalOptionsState(fullName, optionChanges);
  }
  updateInternalOptionsState(optionFullName) {
    let changes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    const pathParts = getPathParts(optionFullName);
    this.internalOptions.value = {
      options: mergeOptionTrees(this.internalOptions.peek().options, this.component.option(), this.defaults, pathParts),
      changes
    };
  }
  oneWay(name) {
    return getOr(this.cache.oneWay, name, () => {
      const pathArray = getPathParts(name);
      return computed(() => getTreeNodeByPath(this.internalOptions.value.options, pathArray));
    });
  }
  oneWayWithChanges(name) {
    return getOr(this.cache.oneWayWithChanges, name, () => {
      const pathArray = getPathParts(name);
      return computed(() => {
        const {
          options,
          changes
        } = this.internalOptions.value;
        return {
          value: getTreeNodeByPath(options, pathArray),
          changes
        };
      });
    });
  }
  twoWay(name) {
    return getOr(this.cache.twoWay, name, () => {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      const obs = signal(this.component.option(name));
      effect(() => {
        obs.value = this.oneWay(name).value;
      });
      return {
        get value() {
          return obs.value;
        },
        set value(value) {
          const isInitialized = that.initialized.peek();
          const callbackName = `on${name}Change`;
          const callback = that.component.option(callbackName);
          const isControlled = that.isControlledMode && that.component.option(name) !== undefined;
          if (isControlled) {
            callback === null || callback === void 0 || callback(value);
            return;
          }
          that.component.option(name, value);
          // 🚨🚨🚨 Hotfix for filterSync
          // Unit widget is initialized, the optionChange callback doesn't fire
          // So, in this case we sync our internal options state with option manager manually
          // TODO filterSync: refactor filter and get rid of set values to twoWay bindings
          //   before the widget/optionManager is initialized
          if (!isInitialized) {
            that.updateInternalOptionsState(name);
          }
          callback === null || callback === void 0 || callback(value);
        },
        peek() {
          return obs.peek();
        },
        subscribe() {
          // @ts-expect-error
          return obs.subscribe(...arguments);
        },
        toJSON() {
          // @ts-expect-error
          return obs.toJSON(...arguments);
        },
        valueOf() {
          // @ts-expect-error
          return obs.valueOf(...arguments);
        },
        brand: obs.brand
      };
    });
  }
  normalizeTemplate(template) {
    // @ts-expect-error
    return TemplateWrapper(this.component._getTemplate(template));
  }
  template(name) {
    return getOr(this.cache.template, name, () => {
      const templateOption = this.oneWay(name);
      return computed(
      // @ts-expect-error
      () => templateOption.value && this.normalizeTemplate(templateOption.value));
    });
  }
  action(name) {
    return getOr(this.cache.action, name, () => {
      const actionOption = this.oneWay(name);
      return computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        actionOption.value;
        // @ts-expect-error
        return this.component._createActionByOption(name);
      });
    });
  }
}
OptionsController.dependencies = [Component];
