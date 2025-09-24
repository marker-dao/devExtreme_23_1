/**
* DevExtreme (esm/__internal/core/state_manager/state_manager.test.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable max-classes-per-file */
/* eslint-disable spellcheck/spell-checker */
import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';
import { signal } from '../../core/state_manager/index';
import { DIContext } from '../di';
import { setupStateManager } from './dev/setup_state_manager';
const waitGarbageCollection = async () => {
  if (!global.gc) {
    throw new Error('Global gc is not defined. Did you use the `--expose-gc` flag?');
  }
  global.gc();
  await new Promise(resolve => {
    // eslint-disable-next-line no-restricted-globals
    setTimeout(resolve, 0);
  });
  global.gc();
};
describe('StateManager', () => {
  const originalEnv = _extends({}, process.env);
  beforeAll(() => {
    jest.resetModules();
    process.env = _extends({}, originalEnv, {
      NODE_ENV: 'development'
    });
  });
  afterAll(() => {
    process.env = originalEnv;
  });
  describe('Component state sources tracking', () => {
    let diContext;
    let testComponentStateTracker;
    let initialPagerConfig;
    let nonPreactSignalProperty;
    let NoSignForIncludingItByStateManager;
    let DataController;
    let ColumnsController;
    let ignoredInstance;
    let columnsControllerInstance;
    let dataControllerInstance;
    const updatedPagerConfig = {
      infinityScrollingEnabled: false
    };
    beforeAll(() => {
      diContext = new DIContext();
      const stateManager = setupStateManager({
        diContext,
        componentName: 'TestComponent',
        logLevel: 'error'
      });
      if (!stateManager) {
        throw Error('StateManager not initialized');
      }
      testComponentStateTracker = stateManager;
      initialPagerConfig = {
        infinityScrollingEnabled: true
      };
      nonPreactSignalProperty = {
        text: 'non-preact-signal-property'
      };
      NoSignForIncludingItByStateManager = class {
        constructor() {
          this.someField = signal(true);
        }
      };
      DataController = class {
        constructor() {
          this.pagesCount = signal(10);
          this.pagerConfig = signal(initialPagerConfig);
          this.nonPreactSignalProperty = nonPreactSignalProperty;
        }
      };
      ColumnsController = class {
        constructor() {
          this.columnsCount = signal(5);
          this.text = signal('initial');
          this.nonPreactSignalProperty = nonPreactSignalProperty;
        }
      };
      ignoredInstance = new NoSignForIncludingItByStateManager();
      columnsControllerInstance = new ColumnsController();
      dataControllerInstance = new DataController();
      diContext.registerInstance(ColumnsController, columnsControllerInstance);
      diContext.registerInstance(DataController, dataControllerInstance);
      diContext.registerInstance(NoSignForIncludingItByStateManager, ignoredInstance);
    });
    it('should ignore non-controllers', () => {
      expect(testComponentStateTracker.getComponentState()).not.toMatchObject({
        NoSignForIncludingItByStateManagerController: expect.anything()
      });
    });
    it('should get component signal after controllers registration', () => {
      expect(testComponentStateTracker.getComponentState().ColumnsController).toEqual({
        columnsCount: 5,
        text: 'initial'
      });
      expect(testComponentStateTracker.getComponentState().DataController).toEqual({
        pagesCount: 10,
        pagerConfig: initialPagerConfig
      });
    });
    it('should get deep copies of signal values', () => {
      expect(testComponentStateTracker.getComponentState().DataController.pagerConfig).not.toBe(initialPagerConfig);
    });
    it('should preserve original controller signal values after signal tracker initialization', () => {
      expect(columnsControllerInstance.columnsCount.peek()).toBe(5);
      expect(columnsControllerInstance.text.peek()).toBe('initial');
      expect(dataControllerInstance.pagesCount.peek()).toBe(10);
      expect(dataControllerInstance.pagerConfig.peek()).toBe(initialPagerConfig);
      expect(dataControllerInstance.nonPreactSignalProperty).toEqual(nonPreactSignalProperty);
    });
    it('should track controllers signal updates', () => {
      columnsControllerInstance.columnsCount.value = 10;
      dataControllerInstance.pagesCount.value = 15;
      dataControllerInstance.pagerConfig.value = updatedPagerConfig;
      expect(testComponentStateTracker.getComponentState().ColumnsController).toEqual({
        columnsCount: 10,
        text: 'initial'
      });
      expect(testComponentStateTracker.getComponentState().DataController).toEqual({
        pagesCount: 15,
        pagerConfig: updatedPagerConfig
      });
    });
    it('should preserve original controller signal values after tracking controllers signal updates', () => {
      expect(testComponentStateTracker.getComponentState().DataController.pagerConfig).not.toBe(updatedPagerConfig);
      expect(columnsControllerInstance.text.peek()).toBe('initial');
      expect(columnsControllerInstance.columnsCount.peek()).toBe(10);
      expect(dataControllerInstance.pagesCount.peek()).toBe(15);
      expect(dataControllerInstance.pagerConfig.peek()).toBe(updatedPagerConfig);
      expect(dataControllerInstance.nonPreactSignalProperty).toEqual(nonPreactSignalProperty);
    });
  });
  it('should allow garbage collection of a state source when a component is destroyed', async () => {
    let diContext = new DIContext();
    const testComponentStateTracker = setupStateManager({
      diContext,
      componentName: 'TestComponent',
      logLevel: 'error',
      stateSourceSign: /Test/
    });
    if (!testComponentStateTracker) {
      throw Error('StateManager not initialized');
    }
    class TestController {
      constructor() {
        this.testValue = signal(42);
      }
    }
    let controllerInstance = new TestController();
    const controllerInstanceWeakRef = new WeakRef(controllerInstance);
    diContext.registerInstance(TestController, controllerInstance);
    expect(testComponentStateTracker.getComponentState().TestController).toEqual({
      testValue: 42
    });
    controllerInstance = null;
    diContext = null;
    await waitGarbageCollection();
    const isGarbageCollected = controllerInstanceWeakRef.deref() === undefined;
    expect(isGarbageCollected).toBe(true);
  });
  it('should allow garbage collection of a tracked state source properties when they are destroyed', async () => {
    const diContext = new DIContext();
    const testComponentStateTracker = setupStateManager({
      diContext,
      componentName: 'TestComponent',
      logLevel: 'error',
      stateSourceSign: /Test/
    });
    if (!testComponentStateTracker) {
      throw Error('StateManager not initialized');
    }
    class TestController {
      constructor() {
        this.testValue = signal(42);
      }
    }
    const controllerInstance = new TestController();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const controllerInstanceTestValuePropertyWeakRef = new WeakRef(controllerInstance.testValue);
    diContext.registerInstance(TestController, controllerInstance);
    expect(testComponentStateTracker.getComponentState().TestController).toEqual({
      testValue: 42
    });
    controllerInstance.testValue = null;
    await waitGarbageCollection();
    const isGarbageCollected = controllerInstanceTestValuePropertyWeakRef.deref() === undefined;
    expect(isGarbageCollected).toBe(true);
  });
});
