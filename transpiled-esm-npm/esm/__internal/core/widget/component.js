import Action from '../../../core/action';
import Class from '../../../core/class';
import Config from '../../../core/config';
import errors from '../../../core/errors';
import { EventsStrategy } from '../../../core/events_strategy';
import { Options } from '../../../core/options/index';
import { convertRulesToOptions } from '../../../core/options/utils';
import { PostponedOperations } from '../../../core/postponed_operations';
import Callbacks from '../../../core/utils/callbacks';
import { noop } from '../../../core/utils/common';
import { getPathParts } from '../../../core/utils/data';
import { extend } from '../../../core/utils/extend';
import { name as publicComponentName } from '../../../core/utils/public_component';
import { isDefined, isFunction, isPlainObject } from '../../../core/utils/type';
// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @stylistic/max-len
const getEventName = actionName => actionName.charAt(2).toLowerCase() + actionName.substr(3);
const isInnerOption = optionName => optionName.indexOf('_', 0) === 0;
export class Component extends Class.inherit({}) {
  _setDeprecatedOptions() {
    this._deprecatedOptions = {};
  }
  _getDeprecatedOptions() {
    return this._deprecatedOptions;
  }
  _getDefaultOptions() {
    return {
      onInitialized: null,
      onOptionChanged: null,
      onDisposing: null,
      defaultOptionsRules: null
    };
  }
  _defaultOptionsRules() {
    return [];
  }
  _setOptionsByDevice(rules) {
    this._options.applyRules(rules);
  }
  _convertRulesToOptions(rules) {
    return convertRulesToOptions(rules);
  }
  _isInitialOptionValue(name) {
    return this._options.isInitial(name);
  }
  _setOptionsByReference() {
    this._optionsByReference = {};
  }
  _getOptionsByReference() {
    return this._optionsByReference;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  ctor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let extra = arguments.length > 1 ? arguments[1] : undefined;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _optionChangedCallbacks,
      _disposingCallbacks
    } = options;
    this.NAME = publicComponentName(this.constructor);
    this._eventsStrategy = EventsStrategy.create(this, options.eventsStrategy);
    this._updateLockCount = 0;
    this._optionChangedCallbacks = _optionChangedCallbacks || Callbacks();
    this._disposingCallbacks = _disposingCallbacks || Callbacks();
    this.postponedOperations = new PostponedOperations();
    this._createOptions(options);
  }
  _createOptions(options) {
    this.beginUpdate();
    try {
      this._setOptionsByReference();
      this._setDeprecatedOptions();
      this._options = new Options(this._getDefaultOptions(), this._getDefaultOptions(), this._getOptionsByReference(), this._getDeprecatedOptions());
      this._options.onChanging((name, previousValue, value) => this._initialized && this._optionChanging(name, previousValue, value));
      this._options.onDeprecated((option, info) => this._logDeprecatedOptionWarning(option, info));
      this._options.onChanged((name, value, previousValue) => this._notifyOptionChanged(name, value, previousValue));
      this._options.onStartChange(() => this.beginUpdate());
      this._options.onEndChange(() => this.endUpdate());
      this._options.addRules(this._defaultOptionsRules());
      this._options.validateOptions(o => this._validateOptions(o));
      if (options && options.onInitializing) {
        // @ts-expect-error
        options.onInitializing.apply(this, [options]);
      }
      this._setOptionsByDevice(options.defaultOptionsRules);
      this._initOptions(options);
    } finally {
      this.endUpdate();
    }
  }
  _initOptions(options) {
    this.option(options);
  }
  _init() {
    this._createOptionChangedAction();
    this.on('disposing', args => {
      this._disposingCallbacks.fireWith(this, [args]);
    });
  }
  _logDeprecatedOptionWarning(option, info) {
    const message = info.message || `Use the '${info.alias}' option instead`;
    errors.log('W0001', this.NAME, option, info.since, message);
  }
  _logDeprecatedComponentWarning(since, alias) {
    errors.log('W0000', this.NAME, since, `Use the '${alias}' widget instead`);
  }
  _createOptionChangedAction() {
    this._optionChangedAction = this._createActionByOption('onOptionChanged', {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _createDisposingAction() {
    this._disposingAction = this._createActionByOption('onDisposing', {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'onDisposing':
      case 'onInitialized':
        break;
      case 'onOptionChanged':
        this._createOptionChangedAction();
        break;
      case 'defaultOptionsRules':
        break;
      default:
        break;
    }
  }
  _dispose() {
    var _this$_disposingActio;
    this._optionChangedCallbacks.empty();
    this._createDisposingAction();
    (_this$_disposingActio = this._disposingAction) === null || _this$_disposingActio === void 0 || _this$_disposingActio.call(this);
    this._eventsStrategy.dispose();
    this._options.dispose();
    this._disposed = true;
  }
  _lockUpdate() {
    // eslint-disable-next-line no-plusplus
    this._updateLockCount++;
  }
  _unlockUpdate() {
    this._updateLockCount = Math.max(this._updateLockCount - 1, 0);
  }
  // TODO: remake as getter after ES6 refactor
  _isUpdateAllowed() {
    return this._updateLockCount === 0;
  }
  // TODO: remake as getter after ES6 refactor
  _isInitializingRequired() {
    return !this._initializing && !this._initialized;
  }
  isInitialized() {
    return this._initialized;
  }
  _commitUpdate() {
    this.postponedOperations.callPostponedOperations();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this._isInitializingRequired() && this._initializeComponent();
  }
  _initializeComponent() {
    this._initializing = true;
    try {
      this._init();
    } finally {
      this._initializing = false;
      this._lockUpdate();
      this._createActionByOption('onInitialized', {
        excludeValidators: ['disabled', 'readOnly']
      })();
      this._unlockUpdate();
      this._initialized = true;
    }
  }
  instance() {
    return this;
  }
  beginUpdate() {
    this._lockUpdate();
  }
  endUpdate() {
    this._unlockUpdate();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this._isUpdateAllowed() && this._commitUpdate();
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  _optionChanging() {}
  _notifyOptionChanged(option, value, previousValue) {
    if (this._initialized) {
      const optionNames = [option].concat(this._options.getAliasesByName(option));
      // eslint-disable-next-line @typescript-eslint/prefer-for-of, no-plusplus
      for (let i = 0; i < optionNames.length; i++) {
        const name = optionNames[i];
        const args = {
          name: getPathParts(name)[0],
          fullName: name,
          value,
          previousValue
        };
        if (!isInnerOption(name)) {
          var _this$_optionChangedA;
          this._optionChangedCallbacks.fireWith(this, [extend(this._defaultActionArgs(), args)]);
          (_this$_optionChangedA = this._optionChangedAction) === null || _this$_optionChangedA === void 0 || _this$_optionChangedA.call(this, extend({}, args));
        }
        if (!this._disposed && this._cancelOptionChange !== name) {
          this._optionChanged(args);
        }
      }
    }
  }
  initialOption(name) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._options.initial(name);
  }
  _defaultActionConfig() {
    return {
      context: this,
      component: this
    };
  }
  _defaultActionArgs() {
    return {
      component: this
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _createAction(actionSource, config) {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let action;
    return e => {
      if (!isDefined(e)) {
        // eslint-disable-next-line no-param-reassign
        e = {};
      }
      if (!isPlainObject(e)) {
        // eslint-disable-next-line no-param-reassign
        e = {
          actionValue: e
        };
      }
      action = action || new Action(actionSource, extend({}, config, this._defaultActionConfig()));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return action.execute.call(action, extend(e, this._defaultActionArgs()));
    };
  }
  _createActionByOption(optionName, config) {
    var _this = this;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let action;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let eventName;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let actionFunc;
    // eslint-disable-next-line no-param-reassign
    config = extend({}, config);
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const result = function () {
      var _config, _config2;
      if (!eventName) {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing, no-param-reassign
        config = config || {};
        if (typeof optionName !== 'string') {
          throw errors.Error('E0008');
        }
        if (optionName.startsWith('on')) {
          eventName = getEventName(optionName);
        }
        actionFunc = _this.option(optionName);
      }
      if (!action && !actionFunc && !((_config = config) !== null && _config !== void 0 && _config.beforeExecute) && !((_config2 = config) !== null && _config2 !== void 0 && _config2.afterExecute) && !_this._eventsStrategy.hasEvent(eventName)) {
        return;
      }
      if (!action) {
        // @ts-expect-error
        const {
          beforeExecute
        } = config;
        // @ts-expect-error
        config.beforeExecute = function () {
          for (var _len2 = arguments.length, props = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            props[_key2] = arguments[_key2];
          }
          // eslint-disable-next-line @stylistic/max-len
          // eslint-disable-next-line @typescript-eslint/prefer-optional-chain, @typescript-eslint/no-unused-expressions
          beforeExecute && beforeExecute.apply(_this, props);
          _this._eventsStrategy.fireEvent(eventName, props[0].args);
        };
        action = _this._createAction(actionFunc, config);
      }
      // @ts-expect-error
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (Config().wrapActionsBeforeExecute) {
        const beforeActionExecute = _this.option('beforeActionExecute') || noop;
        // @ts-expect-error
        const wrappedAction = beforeActionExecute(_this, action, config) || action;
        // eslint-disable-next-line consistent-return, @typescript-eslint/no-unsafe-return
        return wrappedAction.apply(_this, args);
      }
      // eslint-disable-next-line consistent-return, @typescript-eslint/no-unsafe-return
      return action.apply(_this, args);
    };
    // @ts-expect-error
    if (Config().wrapActionsBeforeExecute) {
      return result;
    }
    const onActionCreated = this.option('onActionCreated') || noop;
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return onActionCreated(this, result, config) || result;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
  hasActionSubscription(actionName) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return !!this._options.silent(actionName) || this._eventsStrategy.hasEvent(getEventName(actionName));
  }
  isOptionDeprecated(name) {
    return this._options.isDeprecated(name);
  }
  _setOptionWithoutOptionChange(name, value) {
    this._cancelOptionChange = name;
    this.option(name, value);
    this._cancelOptionChange = false;
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  _getOptionValue(name, context) {
    const value = this.option(name);
    if (isFunction(value)) {
      return value.bind(context)();
    }
    return value;
  }
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  option() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._options.option(...arguments);
  }
  resetOption(name) {
    this.beginUpdate();
    this._options.reset(name);
    this.endUpdate();
  }
  _validateOptions(options) {
    return options;
  }
}