/**
* DevExtreme (esm/__internal/core/state_manager/dev/setup_state_manager.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { Logger } from './logger';
import { StateManagerFactory } from './state_manager';
import { isObject } from './utils';
const DEFAULT_STATE_SOURCE_SIGN = /Controller/;
function isStateSource(instance, stateSourceSign) {
  return isObject(instance) && 'constructor' in instance && 'name' in instance.constructor && stateSourceSign.test(instance.constructor.name);
}
export const setupStateManager = options => {
  const {
    diContext,
    componentName,
    logLevel = 'warn',
    stateSourceSign = DEFAULT_STATE_SOURCE_SIGN
  } = options;
  if (!diContext) {
    throw new Error('DI context is not provided');
  }
  if (!componentName) {
    throw new Error('Component name is not provided');
  }
  const logger = new Logger({
    logLevel,
    prefix: '[StateManager]'
  });
  const isDevelopmentMode = process.env.NODE_ENV === 'development';
  if (!isDevelopmentMode) {
    return undefined;
  }
  const stateManager = StateManagerFactory.create({
    componentName,
    stateSourceSign,
    logger
  });
  const trackStateSource = instance => {
    if (isStateSource(instance, stateSourceSign)) {
      stateManager.trackStateOf(instance);
    } else {
      var _instance$constructor;
      logger.debug(`The '${instance === null || instance === void 0 || (_instance$constructor = instance.constructor) === null || _instance$constructor === void 0 ? void 0 : _instance$constructor.name}' state source isn't tracked by the state manager because it doesn't match the "${stateSourceSign}" sign pattern.`);
    }
    return instance;
  };
  diContext.registerDecorator(trackStateSource);
  return stateManager;
};
