/**
* DevExtreme (esm/__internal/scheduler/utils/options_validator/core/options_validator_error_handler.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it, jest } from '@jest/globals';
import { OptionsValidatorErrorHandler } from './options_validator_error_handler';
class TestErrorHandler extends OptionsValidatorErrorHandler {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(errorsMap, globalErrorHandler) {
    super(errorsMap, globalErrorHandler);
  }
}
const errorMap = {
  A: 'E0',
  B: 'E1',
  C: 'E2',
  D: 'E3'
};
const createGlobalErrorHandlerMock = () => ({
  logError: jest.fn(),
  throwError: jest.fn()
});
describe('OptionsValidatorErrorHandler', () => {
  it('shouldn\'t call global error handler if options validator result is "true"', () => {
    const globalErrorHandler = createGlobalErrorHandlerMock();
    const handler = new TestErrorHandler(errorMap, globalErrorHandler);
    handler.handleValidationResult(true);
    expect(globalErrorHandler.logError).not.toHaveBeenCalled();
    expect(globalErrorHandler.throwError).not.toHaveBeenCalled();
  });
  it('shouldn\'t call global error handler if there is no error codes for validator\'s errors', () => {
    const globalErrorHandler = createGlobalErrorHandlerMock();
    const handler = new TestErrorHandler({
      B: 'E1'
    }, globalErrorHandler);
    handler.handleValidationResult({
      A: {
        fist: false,
        second: false
      },
      C: {
        first: false
      },
      D: {
        some: false
      }
    });
    expect(globalErrorHandler.logError).not.toHaveBeenCalled();
    expect(globalErrorHandler.throwError).not.toHaveBeenCalled();
  });
  it('should log validator\'s errors and throw the last one', () => {
    const globalErrorHandler = createGlobalErrorHandlerMock();
    const handler = new TestErrorHandler(errorMap, globalErrorHandler);
    handler.handleValidationResult({
      A: {
        fist: false,
        second: false
      },
      B: {
        some: false
      },
      C: {
        first: false
      },
      D: {
        error: false
      }
    });
    expect(globalErrorHandler.logError).toHaveBeenCalledWith('E0');
    expect(globalErrorHandler.logError).toHaveBeenCalledWith('E1');
    expect(globalErrorHandler.logError).toHaveBeenCalledWith('E2');
    expect(globalErrorHandler.throwError).toHaveBeenCalledWith('E3');
    expect(globalErrorHandler.logError).toHaveBeenCalledTimes(3);
    expect(globalErrorHandler.throwError).toHaveBeenCalledTimes(1);
  });
  it('should log and throw only exising error codes', () => {
    const globalErrorHandler = createGlobalErrorHandlerMock();
    const handler = new TestErrorHandler({
      A: 'E0',
      C: 'E2'
    }, globalErrorHandler);
    handler.handleValidationResult({
      A: {
        fist: false,
        second: false
      },
      B: {
        some: false
      },
      C: {
        first: false
      },
      D: {
        error: false
      }
    });
    expect(globalErrorHandler.logError).toHaveBeenCalledWith('E0');
    expect(globalErrorHandler.throwError).toHaveBeenCalledWith('E2');
    expect(globalErrorHandler.logError).toHaveBeenCalledTimes(1);
    expect(globalErrorHandler.throwError).toHaveBeenCalledTimes(1);
  });
  it('should throw single validator\'s error', () => {
    const globalErrorHandler = createGlobalErrorHandlerMock();
    const handler = new TestErrorHandler(errorMap, globalErrorHandler);
    handler.handleValidationResult({
      B: {
        some: false
      }
    });
    expect(globalErrorHandler.logError).not.toHaveBeenCalled();
    expect(globalErrorHandler.throwError).toHaveBeenCalledWith('E1');
    expect(globalErrorHandler.throwError).toHaveBeenCalledTimes(1);
  });
  it('should throw single validator\'s error if only one error code matches with it', () => {
    const globalErrorHandler = createGlobalErrorHandlerMock();
    const handler = new TestErrorHandler({
      B: 'E1'
    }, globalErrorHandler);
    handler.handleValidationResult({
      A: {
        fist: false,
        second: false
      },
      B: {
        some: false
      },
      C: {
        first: false
      },
      D: {
        error: false
      }
    });
    expect(globalErrorHandler.logError).not.toHaveBeenCalled();
    expect(globalErrorHandler.throwError).toHaveBeenCalledWith('E1');
    expect(globalErrorHandler.throwError).toHaveBeenCalledTimes(1);
  });
  it('shouldn\'t log the same error code more that one time', () => {
    const globalErrorHandler = createGlobalErrorHandlerMock();
    const handler = new TestErrorHandler({
      A: 'E0',
      B: 'E0',
      C: 'E1',
      D: 'E1'
    }, globalErrorHandler);
    handler.handleValidationResult({
      A: {
        fist: false,
        second: false
      },
      B: {
        some: false
      },
      C: {
        first: false
      },
      D: {
        error: false
      }
    });
    expect(globalErrorHandler.logError).toHaveBeenCalledWith('E0');
    expect(globalErrorHandler.throwError).toHaveBeenCalledWith('E1');
    expect(globalErrorHandler.logError).toHaveBeenCalledTimes(1);
    expect(globalErrorHandler.throwError).toHaveBeenCalledTimes(1);
  });
  it('should log error with arguments and avoid duplications', () => {
    const globalErrorHandler = createGlobalErrorHandlerMock();
    const handler = new TestErrorHandler({
      A: 'E0',
      B: 'E1',
      C: 'W2',
      D: 'W2'
    }, globalErrorHandler);
    handler.handleValidationResult({
      A: {
        fist: {
          arguments: ['A1']
        },
        second: {
          arguments: ['A2']
        }
      },
      B: {
        some: {
          arguments: ['B']
        }
      },
      C: {
        some: false
      },
      D: {
        some1: {
          arguments: ['D1', 'D2']
        },
        some2: false
      }
    });
    expect(globalErrorHandler.logError).toHaveBeenCalledWith('W2');
    expect(globalErrorHandler.logError).toHaveBeenCalledWith('W2', 'D1', 'D2');
    expect(globalErrorHandler.logError).toHaveBeenCalledWith('E0', 'A2');
    expect(globalErrorHandler.throwError).toHaveBeenCalledWith('E1', 'B');
  });
});
