/**
* DevExtreme (cjs/__internal/grids/new/grid_core/options_controller/options_controller_base.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _component = require("./component.mock");
var _options_controller_base = require("./options_controller_base");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-non-null-assertion */
const setup = (options, defaultOptions) => {
  const onOptionChangedMock = _globals.jest.fn();
  const component = (0, _component.createComponentMock)(options, defaultOptions);
  const optionsController = new _options_controller_base.OptionsController(component);
  return {
    component,
    optionsController,
    onOptionChangedMock
  };
};
(0, _globals.describe)('oneWay', () => {
  const plainOptions = {
    value: 'ABC'
  };
  const defaultPlainOptions = {
    value: 'default_ABC'
  };
  const nestedPlainOptions = {
    nested: {
      value: 'ABC'
    }
  };
  const defaultNestedPlainOptions = {
    nested: {
      value: 'default_ABC'
    }
  };
  const arrayOptions = {
    value: ['A', 'B', 'C']
  };
  const defaultArrayOptions = {
    value: ['A_default', 'B_default']
  };
  const functionOptions = {
    value: function fnValue() {}
  };
  const defaultFunctionOptions = {
    value: function defaultFnValue() {}
  };
  const mixedPlainOptions = {
    value: 'default'
  };
  const mixedComplexOptions = {
    value: {
      valueA: 'A',
      valueB: 'B'
    }
  };
  (0, _globals.describe)('initial values', () => {
    (0, _globals.describe)('plain options', () => {
      (0, _globals.it)('should have initial value same as passed in config', () => {
        const {
          optionsController
        } = setup(plainOptions, defaultPlainOptions);
        const value = optionsController.oneWay('value');
        (0, _globals.expect)(value.peek()).toBe(plainOptions.value);
      });
      (0, _globals.it)('should have initial default value if config options is undefined', () => {
        const {
          optionsController
        } = setup({}, defaultPlainOptions);
        const value = optionsController.oneWay('value');
        (0, _globals.expect)(value.peek()).toBe(defaultPlainOptions.value);
      });
      (0, _globals.it)('should have initial value same as passed in config if default not specified', () => {
        const optionalOptions = {
          optionalValue: 'ABC'
        };
        const {
          optionsController
        } = setup(optionalOptions, defaultPlainOptions);
        const value = optionsController.oneWay('optionalValue');
        (0, _globals.expect)(value.peek()).toBe(optionalOptions.optionalValue);
      });
      (0, _globals.it)('should have undefined value if options not passed with config and doesnt have default value', () => {
        const {
          optionsController
        } = setup(plainOptions, defaultPlainOptions);
        const value = optionsController.oneWay('optionalValue');
        (0, _globals.expect)(value.peek()).toBe(undefined);
      });
    });
    (0, _globals.describe)('object options child subscription', () => {
      (0, _globals.it)('should have initial value same as passed in config', () => {
        const {
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.value');
        (0, _globals.expect)(value.peek()).toBe(nestedPlainOptions.nested.value);
      });
      (0, _globals.it)('should have initial default value if parent config option is undefined', () => {
        var _defaultNestedPlainOp;
        const {
          optionsController
        } = setup({}, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.value');
        (0, _globals.expect)(value.peek()).toBe((_defaultNestedPlainOp = defaultNestedPlainOptions.nested) === null || _defaultNestedPlainOp === void 0 ? void 0 : _defaultNestedPlainOp.value);
      });
      (0, _globals.it)('should have initial default value if plain config option is undefined', () => {
        var _defaultNestedPlainOp2;
        const {
          optionsController
        } = setup({
          nested: {
            value: undefined
          }
        }, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.value');
        (0, _globals.expect)(value.peek()).toBe((_defaultNestedPlainOp2 = defaultNestedPlainOptions.nested) === null || _defaultNestedPlainOp2 === void 0 ? void 0 : _defaultNestedPlainOp2.value);
      });
      (0, _globals.it)('should have initial value same as passed in config if default not specified', () => {
        var _defaultNestedPlainOp3;
        const optionalOptions = {
          nested: {
            optionalValue: 'ABC'
          }
        };
        const {
          optionsController
        } = setup(optionalOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('optionalValue');
        (0, _globals.expect)(value.peek()).toBe((_defaultNestedPlainOp3 = defaultNestedPlainOptions.nested) === null || _defaultNestedPlainOp3 === void 0 ? void 0 : _defaultNestedPlainOp3.optionalValue);
      });
      (0, _globals.it)('should have undefined value if options not passed with config and doesnt have default value', () => {
        const {
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.optionalValue');
        (0, _globals.expect)(value.peek()).toBe(undefined);
      });
    });
    (0, _globals.describe)('object options self subscription', () => {
      (0, _globals.it)('should have initial value same as passed in config', () => {
        const {
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested');
        (0, _globals.expect)(value.peek()).toStrictEqual(nestedPlainOptions.nested);
      });
      (0, _globals.it)('should have initial default value if config options is undefined', () => {
        const {
          optionsController
        } = setup({}, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested');
        (0, _globals.expect)(value.peek()).toStrictEqual(defaultNestedPlainOptions.nested);
      });
      (0, _globals.it)('should have initial default value if child config option is undefined', () => {
        const {
          optionsController
        } = setup({
          nested: {
            value: undefined
          }
        }, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested');
        (0, _globals.expect)(value.peek()).toStrictEqual(defaultNestedPlainOptions.nested);
      });
      (0, _globals.it)('should merge passed optional values with default ones', () => {
        const optionalOptions = {
          nested: {
            optionalValue: 'ABC'
          }
        };
        const {
          optionsController
        } = setup(optionalOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested');
        (0, _globals.expect)(value.peek()).toStrictEqual(_extends({}, defaultNestedPlainOptions.nested, optionalOptions.nested));
      });
    });
    (0, _globals.describe)('array options', () => {
      // NOTE: We don't merge arrays with default values
      (0, _globals.it)('should have initial value same as passed in config', () => {
        const {
          optionsController
        } = setup(arrayOptions, defaultArrayOptions);
        const value = optionsController.oneWay('value');
        (0, _globals.expect)(value.peek()).toStrictEqual(arrayOptions.value);
      });
      (0, _globals.it)('should have initial default value if config options is undefined', () => {
        const {
          optionsController
        } = setup({}, defaultArrayOptions);
        const value = optionsController.oneWay('value');
        (0, _globals.expect)(value.peek()).toStrictEqual(defaultArrayOptions.value);
      });
      (0, _globals.it)('should have initial value same as passed in config if default not specified', () => {
        const optionalOptions = {
          optionalValue: ['A_optional', 'B_optional']
        };
        const {
          optionsController
        } = setup(optionalOptions, defaultArrayOptions);
        const value = optionsController.oneWay('optionalValue');
        (0, _globals.expect)(value.peek()).toStrictEqual(optionalOptions.optionalValue);
      });
      (0, _globals.it)('should have undefined value if options not passed with config and doesnt have default value', () => {
        const {
          optionsController
        } = setup(arrayOptions, defaultArrayOptions);
        const value = optionsController.oneWay('optionalValue');
        (0, _globals.expect)(value.peek()).toBe(undefined);
      });
    });
    (0, _globals.describe)('function options', () => {
      (0, _globals.it)('should have initial value same as passed in config', () => {
        var _value$peek, _functionOptions$valu;
        const {
          optionsController
        } = setup(functionOptions, defaultFunctionOptions);
        const value = optionsController.oneWay('value');
        (0, _globals.expect)((_value$peek = value.peek()) === null || _value$peek === void 0 ? void 0 : _value$peek.name).toBe((_functionOptions$valu = functionOptions.value) === null || _functionOptions$valu === void 0 ? void 0 : _functionOptions$valu.name);
      });
      (0, _globals.it)('should have initial default value if config options is undefined', () => {
        var _value$peek2, _defaultFunctionOptio;
        const {
          optionsController
        } = setup({}, defaultFunctionOptions);
        const value = optionsController.oneWay('value');
        (0, _globals.expect)((_value$peek2 = value.peek()) === null || _value$peek2 === void 0 ? void 0 : _value$peek2.name).toBe((_defaultFunctionOptio = defaultFunctionOptions.value) === null || _defaultFunctionOptio === void 0 ? void 0 : _defaultFunctionOptio.name);
      });
      (0, _globals.it)('should have initial value same as passed in config if default not specified', () => {
        var _value$peek3;
        const optionalOptions = {
          optionalValue: function optionalFnValue() {}
        };
        const {
          optionsController
        } = setup(optionalOptions, defaultFunctionOptions);
        const value = optionsController.oneWay('optionalValue');
        (0, _globals.expect)((_value$peek3 = value.peek()) === null || _value$peek3 === void 0 ? void 0 : _value$peek3.name).toBe('optionalFnValue');
      });
      (0, _globals.it)('should have undefined value if options not passed with config and doesnt have default value', () => {
        const {
          optionsController
        } = setup(functionOptions, defaultFunctionOptions);
        const value = optionsController.oneWay('optionalValue');
        (0, _globals.expect)(value.peek()).toBe(undefined);
      });
    });
    (0, _globals.describe)('mixed options child subscription', () => {
      (0, _globals.it)('should have initial value same as passed in config', () => {
        const {
          optionsController
        } = setup(mixedComplexOptions, mixedPlainOptions);
        const value = optionsController.oneWay('value.valueA');
        (0, _globals.expect)(value.peek()).toStrictEqual(mixedComplexOptions.value.valueA);
      });
      (0, _globals.it)('should have initial value undefined if parent is plain value', () => {
        const {
          optionsController
        } = setup(mixedPlainOptions, mixedComplexOptions);
        const value = optionsController.oneWay('value.valueA');
        (0, _globals.expect)(value.peek()).toBe(undefined);
      });
      (0, _globals.it)('should have initial default value if config options is undefined', () => {
        const {
          optionsController
        } = setup({}, mixedComplexOptions);
        const value = optionsController.oneWay('value.valueA');
        (0, _globals.expect)(value.peek()).toBe(mixedComplexOptions.value.valueA);
      });
    });
    (0, _globals.describe)('mixed options self subscription', () => {
      (0, _globals.it)('should have initial value same as passed in config', () => {
        const {
          optionsController
        } = setup(mixedComplexOptions, mixedPlainOptions);
        const value = optionsController.oneWay('value');
        (0, _globals.expect)(value.peek()).toStrictEqual(mixedComplexOptions.value);
      });
      (0, _globals.it)('should have initial default value if config options is undefined', () => {
        const {
          optionsController
        } = setup({}, mixedPlainOptions);
        const value = optionsController.oneWay('value');
        (0, _globals.expect)(value.peek()).toBe(mixedPlainOptions.value);
      });
    });
  });
  (0, _globals.describe)('update values', () => {
    (0, _globals.describe)('plain options', () => {
      (0, _globals.it)('should update on option changed', () => {
        const {
          component,
          optionsController
        } = setup(plainOptions, defaultPlainOptions);
        const value = optionsController.oneWay('value');
        component.option('value', 'newValue');
        (0, _globals.expect)(value.peek()).toBe('newValue');
      });
      (0, _globals.it)('should update boolean plain option on option changed', () => {
        const {
          component,
          optionsController
        } = setup({}, {
          value: true
        });
        const value = optionsController.oneWay('value');
        component.option('value', false);
        (0, _globals.expect)(value.peek()).toBe(false);
      });
      (0, _globals.it)('should update to default value if updated to undefined', () => {
        const {
          component,
          optionsController
        } = setup(plainOptions, defaultPlainOptions);
        const value = optionsController.oneWay('value');
        component.option('value', undefined);
        (0, _globals.expect)(value.peek()).toBe(defaultPlainOptions.value);
      });
      (0, _globals.it)('should update initial undefined value to updated value', () => {
        const {
          component,
          optionsController
        } = setup(plainOptions, defaultPlainOptions);
        const value = optionsController.oneWay('optionalValue');
        component.option('optionalValue', 'newValue');
        (0, _globals.expect)(value.peek()).toBe('newValue');
      });
    });
    (0, _globals.describe)('object options child subscription', () => {
      (0, _globals.it)('should update on option changed', () => {
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.value');
        component.option('nested.value', 'newValue');
        (0, _globals.expect)(value.peek()).toBe('newValue');
      });
      (0, _globals.it)('should update on parent option changed', () => {
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.value');
        component.option('nested', {
          value: 'newValue'
        });
        (0, _globals.expect)(value.peek()).toBe('newValue');
      });
      (0, _globals.it)('should update to default value if updated to undefined', () => {
        var _defaultNestedPlainOp4;
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.value');
        component.option('nested.value', undefined);
        (0, _globals.expect)(value.peek()).toBe((_defaultNestedPlainOp4 = defaultNestedPlainOptions.nested) === null || _defaultNestedPlainOp4 === void 0 ? void 0 : _defaultNestedPlainOp4.value);
      });
      (0, _globals.it)('should update to default value if parent option updated to undefined', () => {
        var _defaultNestedPlainOp5;
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.value');
        component.option('nested', undefined);
        (0, _globals.expect)(value.peek()).toBe((_defaultNestedPlainOp5 = defaultNestedPlainOptions.nested) === null || _defaultNestedPlainOp5 === void 0 ? void 0 : _defaultNestedPlainOp5.value);
      });
      (0, _globals.it)('should update initial undefined value to updated value', () => {
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.optionalValue');
        component.option('nested.optionalValue', 'newValue');
        (0, _globals.expect)(value.peek()).toBe('newValue');
      });
      (0, _globals.it)('should update initial undefined value to updated value on parent option update', () => {
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.optionalValue');
        component.option('nested', {
          optionalValue: 'newValue'
        });
        (0, _globals.expect)(value.peek()).toBe('newValue');
      });
    });
    (0, _globals.describe)('object options self subscription', () => {
      (0, _globals.it)('should update on option changed', () => {
        const updatedOptions = {
          value: 'newValue',
          optionalValue: 'newValue_2'
        };
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested');
        component.option('nested', updatedOptions);
        (0, _globals.expect)(value.peek()).toStrictEqual(updatedOptions);
      });
      (0, _globals.it)('should update on child option changed', () => {
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested');
        component.option('nested.value', 'newValue');
        (0, _globals.expect)(value.peek()).toStrictEqual({
          value: 'newValue'
        });
      });
      (0, _globals.it)('should update to default value if updated to undefined', () => {
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested');
        component.option('nested', undefined);
        (0, _globals.expect)(value.peek()).toStrictEqual(defaultNestedPlainOptions.nested);
      });
    });
    (0, _globals.describe)('array options', () => {
      (0, _globals.it)('should update on whole array option changed', () => {
        const {
          component,
          optionsController
        } = setup(arrayOptions, defaultArrayOptions);
        const value = optionsController.oneWay('value');
        component.option('value', ['F', 'E']);
        (0, _globals.expect)(value.peek()).toStrictEqual(['F', 'E']);
      });
      (0, _globals.it)('should update on array element option changed', () => {
        const {
          component,
          optionsController
        } = setup(arrayOptions, defaultArrayOptions);
        const value = optionsController.oneWay('value');
        component.option('value[0]', 'F');
        (0, _globals.expect)(value.peek()).toStrictEqual(['F', 'B', 'C']);
      });
      (0, _globals.it)('should update on array element child option changed', () => {
        const {
          component,
          optionsController
        } = setup({
          value: [{
            A: 'A_0',
            B: 'B_0'
          }, {
            A: 'A_1',
            B: 'B_1'
          }]
        }, {});
        const value = optionsController.oneWay('value');
        component.option('value[0].A', 'F');
        (0, _globals.expect)(value.peek()).toStrictEqual([{
          A: 'F',
          B: 'B_0'
        }, {
          A: 'A_1',
          B: 'B_1'
        }]);
      });
      (0, _globals.it)('should update to default value if updated to undefined', () => {
        const {
          component,
          optionsController
        } = setup(arrayOptions, defaultArrayOptions);
        const value = optionsController.oneWay('value');
        component.option('value', undefined);
        (0, _globals.expect)(value.peek()).toStrictEqual(defaultArrayOptions.value);
      });
      (0, _globals.it)('should update initial undefined value to updated value', () => {
        const {
          component,
          optionsController
        } = setup(arrayOptions, defaultArrayOptions);
        const value = optionsController.oneWay('optionalValue');
        component.option('optionalValue', ['F', 'E']);
        (0, _globals.expect)(value.peek()).toStrictEqual(['F', 'E']);
      });
    });
    (0, _globals.describe)('function options', () => {
      (0, _globals.it)('should update on option changed', () => {
        var _value$peek4;
        const {
          component,
          optionsController
        } = setup(functionOptions, defaultFunctionOptions);
        const value = optionsController.oneWay('value');
        // eslint-disable-next-line prefer-arrow-callback
        component.option('value', function newFn() {});
        (0, _globals.expect)((_value$peek4 = value.peek()) === null || _value$peek4 === void 0 ? void 0 : _value$peek4.name).toBe('newFn');
      });
      (0, _globals.it)('should update to default value if updated to undefined', () => {
        var _value$peek5, _defaultFunctionOptio2;
        const {
          component,
          optionsController
        } = setup(functionOptions, defaultFunctionOptions);
        const value = optionsController.oneWay('value');
        component.option('value', undefined);
        (0, _globals.expect)((_value$peek5 = value.peek()) === null || _value$peek5 === void 0 ? void 0 : _value$peek5.name).toBe((_defaultFunctionOptio2 = defaultFunctionOptions.value) === null || _defaultFunctionOptio2 === void 0 ? void 0 : _defaultFunctionOptio2.name);
      });
      (0, _globals.it)('should update initial undefined value to updated value', () => {
        var _value$peek6;
        const {
          component,
          optionsController
        } = setup(functionOptions, defaultFunctionOptions);
        const value = optionsController.oneWay('optionalValue');
        // eslint-disable-next-line prefer-arrow-callback
        component.option('optionalValue', function newFn() {});
        (0, _globals.expect)((_value$peek6 = value.peek()) === null || _value$peek6 === void 0 ? void 0 : _value$peek6.name).toBe('newFn');
      });
    });
    (0, _globals.describe)('mixed options child subscription', () => {
      (0, _globals.it)('should update on option changed', () => {
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedPlainOptions);
        const value = optionsController.oneWay('value.valueA');
        component.option('value.valueA', 'newValue');
        (0, _globals.expect)(value.peek()).toBe('newValue');
      });
      (0, _globals.it)('should update to default value if updated to undefined', () => {
        var _mixedComplexOptions$;
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedComplexOptions);
        const value = optionsController.oneWay('value.valueA');
        component.option('value.valueA', undefined);
        (0, _globals.expect)(value.peek()).toBe((_mixedComplexOptions$ = mixedComplexOptions.value) === null || _mixedComplexOptions$ === void 0 ? void 0 : _mixedComplexOptions$.valueA);
      });
      (0, _globals.it)('should update to undefined if parent option update to plain one', () => {
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedPlainOptions);
        const value = optionsController.oneWay('value.valueA');
        component.option('value', 'plain');
        (0, _globals.expect)(value.peek()).toBe(undefined);
      });
      (0, _globals.it)('should update to default value if parent updated to undefined', () => {
        var _mixedComplexOptions$2;
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedComplexOptions);
        const value = optionsController.oneWay('value.valueA');
        component.option('value', undefined);
        (0, _globals.expect)(value.peek()).toBe((_mixedComplexOptions$2 = mixedComplexOptions.value) === null || _mixedComplexOptions$2 === void 0 ? void 0 : _mixedComplexOptions$2.valueA);
      });
      (0, _globals.it)('should update to undefined if default value is plain', () => {
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedPlainOptions);
        const value = optionsController.oneWay('value.valueA');
        component.option('value', undefined);
        (0, _globals.expect)(value.peek()).toBe(undefined);
      });
    });
    (0, _globals.describe)('mixed options self subscription', () => {
      (0, _globals.it)('should update on option changed', () => {
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedPlainOptions);
        const value = optionsController.oneWay('value');
        component.option('value', {
          valueA: '1',
          valueB: '2'
        });
        (0, _globals.expect)(value.peek()).toStrictEqual({
          valueA: '1',
          valueB: '2'
        });
      });
      (0, _globals.it)('should update on option changed to plain', () => {
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedPlainOptions);
        const value = optionsController.oneWay('value');
        component.option('value', 'newValue');
        (0, _globals.expect)(value.peek()).toBe('newValue');
      });
      (0, _globals.it)('should update on child option changed', () => {
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedComplexOptions);
        const value = optionsController.oneWay('value');
        component.option('value.valueA', 'newValue');
        (0, _globals.expect)(value.peek()).toStrictEqual({
          valueA: 'newValue',
          valueB: 'B'
        });
      });
      (0, _globals.it)('should update to default value if updated to undefined', () => {
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedPlainOptions);
        const value = optionsController.oneWay('value');
        component.option('value', undefined);
        (0, _globals.expect)(value.peek()).toStrictEqual(mixedPlainOptions.value);
      });
    });
  });
});
(0, _globals.describe)('twoWay', () => {
  const onOptionChangedTestMock = _globals.jest.fn();
  const testOptions = {
    value: 'initialValue',
    objectValue: {
      nestedValue: 'initialNestedValue'
    },
    onOptionChanged: onOptionChangedTestMock
  };
  const defaultTestOptions = {
    value: 'value_default',
    objectValue: {
      nestedValue: 'nestedValue_default'
    }
  };
  (0, _globals.beforeEach)(() => {
    onOptionChangedTestMock.mockClear();
  });
  (0, _globals.it)('should have initial value', () => {
    const {
      optionsController
    } = setup(testOptions, defaultTestOptions);
    const value = optionsController.twoWay('value');
    (0, _globals.expect)(value.value).toBe('initialValue');
  });
  (0, _globals.it)('should update on options changed', () => {
    const {
      component,
      optionsController
    } = setup(testOptions, defaultTestOptions);
    const value = optionsController.twoWay('value');
    const fn = _globals.jest.fn();
    value.subscribe(fn);
    component.option('value', 'newValue');
    (0, _globals.expect)(fn).toHaveBeenCalledTimes(2);
    (0, _globals.expect)(fn).toHaveBeenCalledWith('newValue');
  });
  (0, _globals.it)('should return new value after update', () => {
    const {
      optionsController
    } = setup(testOptions, defaultTestOptions);
    const value = optionsController.twoWay('value');
    value.value = 'newValue';
    (0, _globals.expect)(value.value).toBe('newValue');
  });
  (0, _globals.it)('should call optionChanged on update', () => {
    const {
      component,
      optionsController
    } = setup(testOptions, defaultTestOptions);
    const value = optionsController.twoWay('value');
    value.value = 'newValue';
    (0, _globals.expect)(testOptions.onOptionChanged).toHaveBeenCalledTimes(1);
    (0, _globals.expect)(testOptions.onOptionChanged).toHaveBeenCalledWith({
      component,
      fullName: 'value',
      name: 'value',
      previousValue: 'initialValue',
      value: 'newValue'
    });
  });
});
(0, _globals.describe)('oneWayWithChanges', () => {
  (0, _globals.it)('should return changes: null if optionChanged was not called', () => {
    const publicOptions = {
      value: {
        str: 'str'
      }
    };
    const {
      optionsController
    } = setup(publicOptions, {});
    const value = optionsController.oneWayWithChanges('value');
    (0, _globals.expect)(value.peek()).toStrictEqual({
      changes: null,
      value: publicOptions.value
    });
  });
  (0, _globals.it)('should return changes if optionChanged was called', () => {
    const publicOptions = {
      value: 'str'
    };
    const {
      component,
      optionsController
    } = setup(publicOptions, {});
    component.option('value', 'str_2');
    const value = optionsController.oneWayWithChanges('value');
    const result = value.peek();
    (0, _globals.expect)(result.changes).toMatchObject({
      name: 'value',
      fullName: 'value',
      value: 'str_2',
      previousValue: 'str'
    });
    (0, _globals.expect)(result.value).toStrictEqual('str_2');
  });
  (0, _globals.it)('should return changes of nested option if optionChanged was called', () => {
    const publicOptions = {
      a: {
        b: {
          c: 'C_0'
        }
      }
    };
    const {
      component,
      optionsController
    } = setup(publicOptions, {});
    component.option('a.b.c', 'C_1');
    const value = optionsController.oneWayWithChanges('a.b.c');
    const result = value.peek();
    (0, _globals.expect)(result.changes).toMatchObject({
      name: 'a',
      fullName: 'a.b.c',
      value: 'C_1',
      previousValue: 'C_0'
    });
    (0, _globals.expect)(result.value).toStrictEqual('C_1');
  });
  (0, _globals.it)('should use different cache with oneWay', () => {
    const publicOptions = {
      value: '123'
    };
    const {
      optionsController
    } = setup(publicOptions, {});
    const value = optionsController.oneWay('value');
    const valueWithChanges = optionsController.oneWayWithChanges('value');
    (0, _globals.expect)(value.peek()).toBe('123');
    (0, _globals.expect)(valueWithChanges.peek()).toStrictEqual({
      changes: null,
      value: '123'
    });
  });
});
