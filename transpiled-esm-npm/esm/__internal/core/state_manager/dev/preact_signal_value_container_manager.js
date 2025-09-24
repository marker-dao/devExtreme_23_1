import { isObject } from './utils';
function isSignal(value) {
  if (isObject(value) && 'brand' in value) {
    return value.brand === Symbol.for('preact-signals');
  }
  return false;
}
export class PreactSignalValueContainerManager {
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
export const PreactSignalValueContainerManagerFactory = {
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