/**
* DevExtreme (cjs/__internal/core/state_manager/state_manager.test.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _index = require("../../core/state_manager/index");
var _di = require("../di");
var _setup_state_manager = require("./dev/setup_state_manager");
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable max-classes-per-file */
/* eslint-disable spellcheck/spell-checker */

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
(0, _globals.describe)('StateManager', () => {
  const originalEnv = Object.assign({}, process.env);
  (0, _globals.beforeAll)(() => {
    _globals.jest.resetModules();
    process.env = Object.assign({}, originalEnv, {
      NODE_ENV: 'development'
    });
  });
  (0, _globals.afterAll)(() => {
    process.env = originalEnv;
  });
  (0, _globals.describe)('Component state sources tracking', () => {
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
    (0, _globals.beforeAll)(() => {
      diContext = new _di.DIContext();
      const stateManager = (0, _setup_state_manager.setupStateManager)({
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
          this.someField = (0, _index.signal)(true);
        }
      };
      DataController = class {
        constructor() {
          this.pagesCount = (0, _index.signal)(10);
          this.pagerConfig = (0, _index.signal)(initialPagerConfig);
          this.nonPreactSignalProperty = nonPreactSignalProperty;
        }
      };
      ColumnsController = class {
        constructor() {
          this.columnsCount = (0, _index.signal)(5);
          this.text = (0, _index.signal)('initial');
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
    (0, _globals.it)('should ignore non-controllers', () => {
      (0, _globals.expect)(testComponentStateTracker.getComponentState()).not.toMatchObject({
        NoSignForIncludingItByStateManagerController: _globals.expect.anything()
      });
    });
    (0, _globals.it)('should get component signal after controllers registration', () => {
      (0, _globals.expect)(testComponentStateTracker.getComponentState().ColumnsController).toEqual({
        columnsCount: 5,
        text: 'initial'
      });
      (0, _globals.expect)(testComponentStateTracker.getComponentState().DataController).toEqual({
        pagesCount: 10,
        pagerConfig: initialPagerConfig
      });
    });
    (0, _globals.it)('should get deep copies of signal values', () => {
      (0, _globals.expect)(testComponentStateTracker.getComponentState().DataController.pagerConfig).not.toBe(initialPagerConfig);
    });
    (0, _globals.it)('should preserve original controller signal values after signal tracker initialization', () => {
      (0, _globals.expect)(columnsControllerInstance.columnsCount.peek()).toBe(5);
      (0, _globals.expect)(columnsControllerInstance.text.peek()).toBe('initial');
      (0, _globals.expect)(dataControllerInstance.pagesCount.peek()).toBe(10);
      (0, _globals.expect)(dataControllerInstance.pagerConfig.peek()).toBe(initialPagerConfig);
      (0, _globals.expect)(dataControllerInstance.nonPreactSignalProperty).toEqual(nonPreactSignalProperty);
    });
    (0, _globals.it)('should track controllers signal updates', () => {
      columnsControllerInstance.columnsCount.value = 10;
      dataControllerInstance.pagesCount.value = 15;
      dataControllerInstance.pagerConfig.value = updatedPagerConfig;
      (0, _globals.expect)(testComponentStateTracker.getComponentState().ColumnsController).toEqual({
        columnsCount: 10,
        text: 'initial'
      });
      (0, _globals.expect)(testComponentStateTracker.getComponentState().DataController).toEqual({
        pagesCount: 15,
        pagerConfig: updatedPagerConfig
      });
    });
    (0, _globals.it)('should preserve original controller signal values after tracking controllers signal updates', () => {
      (0, _globals.expect)(testComponentStateTracker.getComponentState().DataController.pagerConfig).not.toBe(updatedPagerConfig);
      (0, _globals.expect)(columnsControllerInstance.text.peek()).toBe('initial');
      (0, _globals.expect)(columnsControllerInstance.columnsCount.peek()).toBe(10);
      (0, _globals.expect)(dataControllerInstance.pagesCount.peek()).toBe(15);
      (0, _globals.expect)(dataControllerInstance.pagerConfig.peek()).toBe(updatedPagerConfig);
      (0, _globals.expect)(dataControllerInstance.nonPreactSignalProperty).toEqual(nonPreactSignalProperty);
    });
  });
  (0, _globals.it)('should allow garbage collection of a state source when a component is destroyed', async () => {
    let diContext = new _di.DIContext();
    const testComponentStateTracker = (0, _setup_state_manager.setupStateManager)({
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
        this.testValue = (0, _index.signal)(42);
      }
    }
    let controllerInstance = new TestController();
    const controllerInstanceWeakRef = new WeakRef(controllerInstance);
    diContext.registerInstance(TestController, controllerInstance);
    (0, _globals.expect)(testComponentStateTracker.getComponentState().TestController).toEqual({
      testValue: 42
    });
    controllerInstance = null;
    diContext = null;
    await waitGarbageCollection();
    const isGarbageCollected = controllerInstanceWeakRef.deref() === undefined;
    (0, _globals.expect)(isGarbageCollected).toBe(true);
  });
  (0, _globals.it)('should allow garbage collection of a tracked state source properties when they are destroyed', async () => {
    const diContext = new _di.DIContext();
    const testComponentStateTracker = (0, _setup_state_manager.setupStateManager)({
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
        this.testValue = (0, _index.signal)(42);
      }
    }
    const controllerInstance = new TestController();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const controllerInstanceTestValuePropertyWeakRef = new WeakRef(controllerInstance.testValue);
    diContext.registerInstance(TestController, controllerInstance);
    (0, _globals.expect)(testComponentStateTracker.getComponentState().TestController).toEqual({
      testValue: 42
    });
    controllerInstance.testValue = null;
    await waitGarbageCollection();
    const isGarbageCollected = controllerInstanceTestValuePropertyWeakRef.deref() === undefined;
    (0, _globals.expect)(isGarbageCollected).toBe(true);
  });
});
