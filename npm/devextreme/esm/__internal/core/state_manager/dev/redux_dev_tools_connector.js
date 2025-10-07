/**
* DevExtreme (esm/__internal/core/state_manager/dev/redux_dev_tools_connector.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker */
import { EventEmitter } from './event_emitter';
import { isObject } from './utils';
export class ReduxDevToolsConnector {
  constructor(componentName, logger) {
    this.componentName = componentName;
    this.logger = logger;
    this.devTools = null;
    this._isConnected = false;
    this.externalActionEmitter = new EventEmitter('externalAction', logger);
  }
  connect() {
    if (!this.hasReduxDevTools(window)) {
      this.logger.warn('Redux DevTools extension not found. Install the extension and serve your app via web server (not file://)');
      return;
    }
    try {
      this.devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
        name: `${this.componentName} ${new Date().valueOf()}`,
        trace: true,
        traceLimit: 25,
        features: {
          jump: true,
          skip: false,
          dispatch: true
        },
        shouldCatchErrors: true,
        serialize: {
          options: {
            circular: '[CIRCULAR]',
            date: true
          },
          replacer: (key, value) => {
            // replaced because this property contains a reference to the component instance
            // which causes "heap out of memory"
            if (key === 'changes' && isObject(value) && 'component' in value && 'element' in value) {
              return '[REPLACED]';
            }
            return value;
          }
        }
      });
      this.devTools.subscribe(message => {
        if (message.type !== 'DISPATCH') {
          return;
        }
        if (message.payload.type === 'JUMP_TO_STATE' || message.payload.type === 'JUMP_TO_ACTION') {
          if (message.state) {
            this.handleJumpToAction(message.state);
          }
        } else if (message.payload.type === 'COMMIT') {
          this.externalActionEmitter.emit('COMMIT', null);
        } else if (message.payload.type === 'RESET') {
          this.externalActionEmitter.emit('RESET', null);
        } else {
          this.logger.error(`Unknown ${message.payload.type} message payload type`);
        }
      });
      this._isConnected = true;
      this.logger.info('Connected to Redux DevTools');
    } catch (error) {
      this.logger.error('Failed to connect to Redux DevTools', error);
    }
  }
  disconnect() {
    if (!this.isConnected || this.devTools === null) {
      return;
    }
    try {
      this.devTools.unsubscribe();
      this._isConnected = false;
      this.logger.info('Disconnected from Redux DevTools');
    } catch (error) {
      this.logger.error('Failed to disconnect from Redux DevTools', error);
    }
  }
  sendAction() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const [action, payload, state] = args;
    if (!action) {
      this.logger.error('Action name is required');
      return;
    }
    if (!this.isConnected || this.devTools === null) {
      this.logger.warn('Cannot send action: Not connected to Redux DevTools');
      return;
    }
    try {
      const preparedAction = `${action}: ${payload.path}`;
      const currentState = state ?? {};
      const actionObject = {
        type: preparedAction,
        payload: payload || {}
      };
      this.devTools.send(actionObject, currentState);
    } catch (error) {
      this.logger.error(`Failed to send action to DevTools: ${action}`, error);
      this.logger.debug(`Action details - Type: ${action}, Payload:`, payload);
    }
  }
  get isConnected() {
    return this._isConnected;
  }
  onExternalAction(callback) {
    this.externalActionEmitter.addListener(callback);
  }
  handleJumpToAction(state) {
    try {
      const parsedState = JSON.parse(state);
      this.externalActionEmitter.emit('JUMP_TO_STATE', parsedState);
    } catch (error) {
      this.logger.error('Failed to handle jump to action', error);
    }
  }
  hasReduxDevTools(globalEnv) {
    return typeof globalEnv !== 'undefined' && '__REDUX_DEVTOOLS_EXTENSION__' in globalEnv && globalEnv.__REDUX_DEVTOOLS_EXTENSION__ !== undefined;
  }
}
