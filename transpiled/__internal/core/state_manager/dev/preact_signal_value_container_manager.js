"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreactSignalValueContainerManagerFactory = exports.PreactSignalValueContainerManager = void 0;
var _utils = require("./utils");
function isSignal(value) {
  if ((0, _utils.isObject)(value) && 'brand' in value) {
    return value.brand === Symbol.for('preact-signals');
  }
  return false;
}
class PreactSignalValueContainerManager {
  constructor(logger, stateSourceSign, valueContainer) {
    this.logger = logger;
    this.stateSourceSign = stateSourceSign;
    this.valueContainer = valueContainer;
  }
  trackChanges(onChange) {
    if (!onChange || typeof onChange !== 'function') {
      this.logger.error('onChange callback is required');
      return;
    }
    const previousValue = this.getValue();
    this.valueContainer.subscribe(newValue => {
      try {
        const payload = {
          previousValue,
          newValue,
          timestamp: Date.now(),
          source: this.captureSource(this.valueContainer)
        };
        const change = {
          payload
        };
        onChange(change);
      } catch (error) {
        this.logger.error('Error in Preact Signal subscription', error);
      }
    });
  }
  getValue() {
    return this.valueContainer.peek();
  }
  captureSource(valueContainer) {
    if (valueContainer.stack) {
      const {
        stack
      } = valueContainer;
      return this.findStateSourceLine(stack).trim();
    }
    return 'The source is not tracked';
  }
  findStateSourceLine(stack) {
    const lines = stack.split('\n');
    const stateSourceLine = lines.find(line => line && this.stateSourceSign.test(line));
    return stateSourceLine ?? (lines.length > 1 ? lines[1] : '');
  }
}
exports.PreactSignalValueContainerManager = PreactSignalValueContainerManager;
const PreactSignalValueContainerManagerFactory = exports.PreactSignalValueContainerManagerFactory = {
  canHandle(valueContainer) {
    return isSignal(valueContainer);
  },
  create(logger, stateSourceSign, valueContainer) {
    if (!isSignal(valueContainer)) {
      throw new Error('Invalid value container for PreactSignalValueContainerManager');
    }
    return new PreactSignalValueContainerManager(logger, stateSourceSign, valueContainer);
  }
};