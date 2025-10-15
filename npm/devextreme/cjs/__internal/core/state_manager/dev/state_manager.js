/**
* DevExtreme (cjs/__internal/core/state_manager/dev/state_manager.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateManagerFactory = void 0;
var _logger = require("./logger");
var _preact_signal_value_container_manager = require("./preact_signal_value_container_manager");
var _redux_dev_tools_connector = require("./redux_dev_tools_connector");
var _utils = require("./utils");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // eslint-disable-next-line spellcheck/spell-checker
class StateManager {
  constructor(config) {
    this.componentState = {};
    this.valueContainerManagers = config.valueContainerManagers;
    this.devToolsConnector = config.devToolsConnector;
    this.logger = config.logger;
    this.stateSourceSign = config.stateSourceSign;
    this.init();
  }
  init() {
    this.devToolsConnector.onExternalAction(action => {
      this.logger.warn(`Handler for the '${action}' action is not implemented`);
    });
    this.devToolsConnector.connect();
    this.logger.info('StateManager initialized');
  }
  trackStateOf(sourceData, sourceDataId) {
    var _sourceData$construct;
    const preparedSourceDataId = sourceDataId ?? (sourceData === null || sourceData === void 0 || (_sourceData$construct = sourceData.constructor) === null || _sourceData$construct === void 0 ? void 0 : _sourceData$construct.name);
    if (!sourceData) {
      this.logger.error('State source cannot be null or undefined');
      return;
    }
    if (this.componentState[preparedSourceDataId]) {
      this.logger.debug(`State source with ID '${preparedSourceDataId}' is already tracked. Overwriting.`);
    }
    Object.entries(sourceData).forEach(_ref => {
      let [propertyName, propertyValue] = _ref;
      if (!this.hasValueContainerManagerFor(propertyValue)) {
        this.logger.debug(`No value container manager found for the '${propertyName}' property of the '${preparedSourceDataId}' state source`);
        return;
      }
      if (!this.componentState[preparedSourceDataId]) {
        this.componentState[preparedSourceDataId] = {};
      }
      this.componentState[preparedSourceDataId][propertyName] = (0, _utils.isObject)(propertyValue) ? new WeakRef(propertyValue) : propertyValue;
      this.trackStateSourceChanges(preparedSourceDataId, propertyName, propertyValue);
    });
  }
  trackStateSourceChanges(stateId, propertyName, propertyValue) {
    const valueContainerManager = this.createValueContainerManagerFor(propertyValue);
    if (!valueContainerManager) {
      this.logger.debug(`No value container manager found for the '${propertyName}' property of the '${stateId}' state`);
      return;
    }
    const fullPathToProperty = (0, _utils.joinStatePath)(stateId, propertyName);
    try {
      valueContainerManager.trackChanges(valueContainerChange => {
        const valueContainerChangeCopy = _extends({}, valueContainerChange, {
          payload: _extends({}, valueContainerChange.payload, {
            path: fullPathToProperty
          })
        });
        const {
          previousValue,
          newValue
        } = valueContainerChange.payload;
        if (typeof previousValue === 'object' && previousValue !== null) {
          valueContainerChangeCopy.payload.previousValue = (0, _utils.deepCopy)(previousValue);
        }
        if (typeof newValue === 'object' && newValue !== null) {
          valueContainerChangeCopy.payload.newValue = (0, _utils.deepCopy)(newValue);
        }
        const updatedComponentState = this.getComponentState();
        if (this.devToolsConnector.isConnected) {
          this.devToolsConnector.sendAction('UPDATE', valueContainerChangeCopy.payload, updatedComponentState);
        }
      });
    } catch (error) {
      this.logger.error(`Failed to track state for ${fullPathToProperty}`, error);
    }
  }
  hasValueContainerManagerFor(valueContainer) {
    return this.valueContainerManagers.some(currentStateContainerManager => currentStateContainerManager.canHandle(valueContainer));
  }
  createValueContainerManagerFor(valueContainer) {
    const valueContainerManagerFactory = this.valueContainerManagers.find(currentStateContainerManager => currentStateContainerManager.canHandle(valueContainer));
    if (!valueContainerManagerFactory) {
      return undefined;
    }
    return valueContainerManagerFactory.create(this.logger, this.stateSourceSign, valueContainer);
  }
  getComponentState() {
    const result = Object.entries(this.componentState).reduce((acc, _ref2) => {
      let [stateId, stateValue] = _ref2;
      Object.entries(stateValue).forEach(_ref3 => {
        let [propertyName, propertyValue] = _ref3;
        const preparedPropertyValue = propertyValue instanceof WeakRef
        // eslint-disable-next-line spellcheck/spell-checker
        ? propertyValue.deref() : propertyValue;
        if (!preparedPropertyValue) {
          return acc;
        }
        const valueContainerManager = this.createValueContainerManagerFor(preparedPropertyValue);
        if (!valueContainerManager) {
          return acc;
        }
        const value = valueContainerManager.getValue();
        if (!acc[stateId]) {
          acc[stateId] = {};
        }
        acc[stateId][propertyName] = (0, _utils.isObject)(value) ? (0, _utils.deepCopy)(value) : value;
        return acc;
      });
      return acc;
    }, {});
    return result;
  }
}
const StateManagerFactory = exports.StateManagerFactory = {
  create: options => {
    const logger = options.logger ?? new _logger.Logger({
      logLevel: options.logLevel,
      prefix: '[StateManager]'
    });
    const stateContainerManagers = options.valueContainerManagers ?? [_preact_signal_value_container_manager.PreactSignalValueContainerManagerFactory];
    const preparedConfig = {
      valueContainerManagers: stateContainerManagers,
      devToolsConnector: options.devToolsConnector
      // eslint-disable-next-line spellcheck/spell-checker
      ?? new _redux_dev_tools_connector.ReduxDevToolsConnector(options.componentName, logger),
      logger,
      stateSourceSign: options.stateSourceSign
    };
    return new StateManager(preparedConfig);
  }
};
