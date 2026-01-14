/**
* DevExtreme (cjs/__internal/integration/knockout/component_registrator.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.widget"));
var _m_component_registrator_callbacks = require("../../core/m_component_registrator_callbacks");
var _m_config = _interopRequireDefault(require("../../core/m_config"));
var _component_wrapper = require("../../core/r1/component_wrapper");
var _m_callbacks = _interopRequireDefault(require("../../core/utils/m_callbacks"));
var _m_locker = require("../../core/utils/m_locker");
var _m_type = require("../../core/utils/m_type");
var _m_draggable = _interopRequireDefault(require("../../m_draggable"));
var _editor = _interopRequireDefault(require("../../ui/editor/editor"));
var _scroll_view = _interopRequireDefault(require("../../ui/scroll_view/scroll_view"));
var _m_base_widget = _interopRequireDefault(require("../../viz/core/m_base_widget"));
var _knockout = _interopRequireDefault(require("knockout"));
var _template = require("./template");
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

if (_knockout.default) {
  const LOCKS_DATA_KEY = 'dxKoLocks';
  const CREATED_WITH_KO_DATA_KEY = 'dxKoCreation';
  const editorsBindingHandlers = [];
  const registerComponentKoBinding = function (componentName, componentClass) {
    if (_editor.default.isEditor(componentClass.prototype)) {
      editorsBindingHandlers.push(componentName);
    }
    _knockout.default.bindingHandlers[componentName] = {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      init(domNode, valueAccessor) {
        const $element = (0, _renderer.default)(domNode);
        const optionChangedCallbacks = (0, _m_callbacks.default)();
        let optionsByReference = {};
        // eslint-disable-next-line @typescript-eslint/init-declarations
        let component;
        // @ts-expect-error
        const knockoutConfig = (0, _m_config.default)().knockout;
        const isBindingPropertyPredicateName = knockoutConfig === null || knockoutConfig === void 0 ? void 0 : knockoutConfig.isBindingPropertyPredicateName;
        // eslint-disable-next-line @typescript-eslint/init-declarations
        let isBindingPropertyPredicate;
        let ctorOptions = {
          onInitializing(options) {
            optionsByReference = this._getOptionsByReference();
            _knockout.default.computed(() => {
              const model = _knockout.default.unwrap(valueAccessor());
              if (component) {
                component.beginUpdate();
              }
              isBindingPropertyPredicate = isBindingPropertyPredicateName && (model === null || model === void 0 ? void 0 : model[isBindingPropertyPredicateName]);
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              unwrapModel(model);
              if (component) {
                component.endUpdate();
              } else {
                var _model$onInitializing;
                model === null || model === void 0 || (_model$onInitializing = model.onInitializing) === null || _model$onInitializing === void 0 || _model$onInitializing.call(this, options);
              }
            }, null, {
              disposeWhenNodeIsRemoved: domNode
            });
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            component = this;
          },
          // eslint-disable-next-line @stylistic/max-len
          // eslint-disable-next-line @typescript-eslint/no-shadow,@typescript-eslint/explicit-function-return-type,consistent-return
          modelByElement($element) {
            if ($element.length) {
              const node = (0, _utils.getClosestNodeWithContext)($element.get(0));
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              return _knockout.default.dataFor(node);
            }
          },
          // eslint-disable-next-line @stylistic/max-len
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-shadow
          nestedComponentOptions(component) {
            return {
              modelByElement: component.option('modelByElement'),
              nestedComponentOptions: component.option('nestedComponentOptions')
            };
          },
          _optionChangedCallbacks: optionChangedCallbacks,
          integrationOptions: {
            watchMethod(fn, callback, options) {
              // eslint-disable-next-line no-param-reassign
              options = options || {};
              let skipCallback = options.skipImmediate;
              const watcher = _knockout.default.computed(() => {
                const newValue = _knockout.default.unwrap(fn());
                if (!skipCallback) {
                  callback(newValue);
                }
                skipCallback = false;
              });
              return function () {
                watcher.dispose();
              };
            },
            templates: {
              'dx-polymorph-widget': {
                render(options) {
                  const widgetName = _knockout.default.utils.unwrapObservable(options.model.widget);
                  if (!widgetName) {
                    return;
                  }
                  const markup = (0, _renderer.default)('<div>').attr('data-bind', `${widgetName}: options`).get(0);
                  (0, _renderer.default)(options.container).append(markup);
                  _knockout.default.applyBindings(options.model, markup);
                }
              }
            },
            createTemplate(element) {
              // @ts-expect-error
              return new _template.KoTemplate(element);
            }
          }
        };
        const optionNameToModelMap = {};
        // eslint-disable-next-line func-names
        const applyModelValueToOption = function (optionName, modelValue, unwrap) {
          const locks = $element.data(LOCKS_DATA_KEY);
          const optionValue = unwrap ? _knockout.default.unwrap(modelValue) : modelValue;
          if (_knockout.default.isWriteableObservable(modelValue)) {
            optionNameToModelMap[optionName] = modelValue;
          }
          if (component) {
            // @ts-expect-error
            if (locks.locked(optionName)) {
              return;
            }
            // @ts-expect-error
            locks.obtain(optionName);
            try {
              if (_knockout.default.ignoreDependencies) {
                _knockout.default.ignoreDependencies(component.option, component, [optionName, optionValue]);
              } else {
                component.option(optionName, optionValue);
              }
            } finally {
              // @ts-expect-error
              locks.release(optionName);
            }
          } else {
            ctorOptions[optionName] = optionValue;
          }
        };
        const handleOptionChanged = function (args) {
          const optionName = args.fullName;
          const optionValue = args.value;
          if (!(optionName in optionNameToModelMap)) {
            return;
          }
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const $element = this._$element;
          const locks = $element.data(LOCKS_DATA_KEY);
          // @ts-expect-error
          if (locks.locked(optionName)) {
            return;
          }
          // @ts-expect-error
          locks.obtain(optionName);
          try {
            optionNameToModelMap[optionName](optionValue);
          } finally {
            // @ts-expect-error
            locks.release(optionName);
          }
        };
        // eslint-disable-next-line func-names
        const createComponent = function () {
          optionChangedCallbacks.add(handleOptionChanged);
          $element.data(CREATED_WITH_KO_DATA_KEY, true)
          // @ts-expect-error
          .data(LOCKS_DATA_KEY, new _m_locker.Locker());
          // eslint-disable-next-line no-new,new-cap
          new componentClass($element, ctorOptions);
          // @ts-expect-error
          ctorOptions = null;
        };
        // eslint-disable-next-line func-names
        const unwrapModelValue = function (currentModel, propertyName, propertyPath) {
          if (propertyPath === isBindingPropertyPredicateName) {
            return;
          }
          if (!isBindingPropertyPredicate
          // @ts-expect-error
          || isBindingPropertyPredicate(propertyPath, propertyName, currentModel)) {
            // eslint-disable-next-line @typescript-eslint/init-declarations
            let unwrappedPropertyValue;
            _knockout.default.computed(() => {
              const propertyValue = currentModel[propertyName];
              applyModelValueToOption(propertyPath, propertyValue, true);
              unwrappedPropertyValue = _knockout.default.unwrap(propertyValue);
            }, null, {
              disposeWhenNodeIsRemoved: domNode
            });
            if ((0, _m_type.isPlainObject)(unwrappedPropertyValue)) {
              if (!optionsByReference[propertyPath]) {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                unwrapModel(unwrappedPropertyValue, propertyPath);
              }
            }
          } else {
            applyModelValueToOption(propertyPath, currentModel[propertyName], false);
          }
        };
        function unwrapModel(model, propertyPath) {
          // eslint-disable-next-line no-restricted-syntax
          for (const propertyName in model) {
            if (Object.prototype.hasOwnProperty.call(model, propertyName)) {
              unwrapModelValue(model, propertyName, propertyPath ? [propertyPath, propertyName].join('.') : propertyName);
            }
          }
        }
        createComponent();
        return {
          controlsDescendantBindings: componentClass.subclassOf(_ui.default) || componentClass.subclassOf(_m_base_widget.default) || componentClass.subclassOf(_component_wrapper.ComponentWrapper) && !(component instanceof _scroll_view.default) || component instanceof _m_draggable.default
        };
      }
    };
    if (componentName === 'dxValidator') {
      _knockout.default.bindingHandlers.dxValidator.after = editorsBindingHandlers;
    }
  };
  _m_component_registrator_callbacks.componentRegistratorCallbacks.add((name, componentClass) => {
    registerComponentKoBinding(name, componentClass);
  });
}
