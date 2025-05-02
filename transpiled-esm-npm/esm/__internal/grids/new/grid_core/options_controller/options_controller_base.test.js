import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { createComponentMock } from './component.mock';
import { OptionsController } from './options_controller_base';
const setup = (options, defaultOptions) => {
  const onOptionChangedMock = jest.fn();
  const component = createComponentMock(options, defaultOptions);
  const optionsController = new OptionsController(component);
  return {
    component,
    optionsController,
    onOptionChangedMock
  };
};
describe('oneWay', () => {
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
  describe('initial values', () => {
    describe('plain options', () => {
      it('should have initial value same as passed in config', () => {
        const {
          optionsController
        } = setup(plainOptions, defaultPlainOptions);
        const value = optionsController.oneWay('value');
        expect(value.peek()).toBe(plainOptions.value);
      });
      it('should have initial default value if config options is undefined', () => {
        const {
          optionsController
        } = setup({}, defaultPlainOptions);
        const value = optionsController.oneWay('value');
        expect(value.peek()).toBe(defaultPlainOptions.value);
      });
      it('should have initial value same as passed in config if default not specified', () => {
        const optionalOptions = {
          optionalValue: 'ABC'
        };
        const {
          optionsController
        } = setup(optionalOptions, defaultPlainOptions);
        const value = optionsController.oneWay('optionalValue');
        expect(value.peek()).toBe(optionalOptions.optionalValue);
      });
      it('should have undefined value if options not passed with config and doesnt have default value', () => {
        const {
          optionsController
        } = setup(plainOptions, defaultPlainOptions);
        const value = optionsController.oneWay('optionalValue');
        expect(value.peek()).toBe(undefined);
      });
    });
    describe('object options child subscription', () => {
      it('should have initial value same as passed in config', () => {
        const {
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.value');
        expect(value.peek()).toBe(nestedPlainOptions.nested.value);
      });
      it('should have initial default value if parent config option is undefined', () => {
        var _defaultNestedPlainOp;
        const {
          optionsController
        } = setup({}, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.value');
        expect(value.peek()).toBe((_defaultNestedPlainOp = defaultNestedPlainOptions.nested) === null || _defaultNestedPlainOp === void 0 ? void 0 : _defaultNestedPlainOp.value);
      });
      it('should have initial default value if plain config option is undefined', () => {
        var _defaultNestedPlainOp2;
        const {
          optionsController
        } = setup({
          nested: {
            value: undefined
          }
        }, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.value');
        expect(value.peek()).toBe((_defaultNestedPlainOp2 = defaultNestedPlainOptions.nested) === null || _defaultNestedPlainOp2 === void 0 ? void 0 : _defaultNestedPlainOp2.value);
      });
      it('should have initial value same as passed in config if default not specified', () => {
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
        expect(value.peek()).toBe((_defaultNestedPlainOp3 = defaultNestedPlainOptions.nested) === null || _defaultNestedPlainOp3 === void 0 ? void 0 : _defaultNestedPlainOp3.optionalValue);
      });
      it('should have undefined value if options not passed with config and doesnt have default value', () => {
        const {
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.optionalValue');
        expect(value.peek()).toBe(undefined);
      });
    });
    describe('object options self subscription', () => {
      it('should have initial value same as passed in config', () => {
        const {
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested');
        expect(value.peek()).toStrictEqual(nestedPlainOptions.nested);
      });
      it('should have initial default value if config options is undefined', () => {
        const {
          optionsController
        } = setup({}, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested');
        expect(value.peek()).toStrictEqual(defaultNestedPlainOptions.nested);
      });
      it('should have initial default value if child config option is undefined', () => {
        const {
          optionsController
        } = setup({
          nested: {
            value: undefined
          }
        }, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested');
        expect(value.peek()).toStrictEqual(defaultNestedPlainOptions.nested);
      });
      it('should merge passed optional values with default ones', () => {
        const optionalOptions = {
          nested: {
            optionalValue: 'ABC'
          }
        };
        const {
          optionsController
        } = setup(optionalOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested');
        expect(value.peek()).toStrictEqual(_extends({}, defaultNestedPlainOptions.nested, optionalOptions.nested));
      });
    });
    describe('array options', () => {
      // NOTE: We don't merge arrays with default values
      it('should have initial value same as passed in config', () => {
        const {
          optionsController
        } = setup(arrayOptions, defaultArrayOptions);
        const value = optionsController.oneWay('value');
        expect(value.peek()).toStrictEqual(arrayOptions.value);
      });
      it('should have initial default value if config options is undefined', () => {
        const {
          optionsController
        } = setup({}, defaultArrayOptions);
        const value = optionsController.oneWay('value');
        expect(value.peek()).toStrictEqual(defaultArrayOptions.value);
      });
      it('should have initial value same as passed in config if default not specified', () => {
        const optionalOptions = {
          optionalValue: ['A_optional', 'B_optional']
        };
        const {
          optionsController
        } = setup(optionalOptions, defaultArrayOptions);
        const value = optionsController.oneWay('optionalValue');
        expect(value.peek()).toStrictEqual(optionalOptions.optionalValue);
      });
      it('should have undefined value if options not passed with config and doesnt have default value', () => {
        const {
          optionsController
        } = setup(arrayOptions, defaultArrayOptions);
        const value = optionsController.oneWay('optionalValue');
        expect(value.peek()).toBe(undefined);
      });
    });
    describe('function options', () => {
      it('should have initial value same as passed in config', () => {
        var _value$peek, _functionOptions$valu;
        const {
          optionsController
        } = setup(functionOptions, defaultFunctionOptions);
        const value = optionsController.oneWay('value');
        expect((_value$peek = value.peek()) === null || _value$peek === void 0 ? void 0 : _value$peek.name).toBe((_functionOptions$valu = functionOptions.value) === null || _functionOptions$valu === void 0 ? void 0 : _functionOptions$valu.name);
      });
      it('should have initial default value if config options is undefined', () => {
        var _value$peek2, _defaultFunctionOptio;
        const {
          optionsController
        } = setup({}, defaultFunctionOptions);
        const value = optionsController.oneWay('value');
        expect((_value$peek2 = value.peek()) === null || _value$peek2 === void 0 ? void 0 : _value$peek2.name).toBe((_defaultFunctionOptio = defaultFunctionOptions.value) === null || _defaultFunctionOptio === void 0 ? void 0 : _defaultFunctionOptio.name);
      });
      it('should have initial value same as passed in config if default not specified', () => {
        var _value$peek3;
        const optionalOptions = {
          optionalValue: function optionalFnValue() {}
        };
        const {
          optionsController
        } = setup(optionalOptions, defaultFunctionOptions);
        const value = optionsController.oneWay('optionalValue');
        expect((_value$peek3 = value.peek()) === null || _value$peek3 === void 0 ? void 0 : _value$peek3.name).toBe('optionalFnValue');
      });
      it('should have undefined value if options not passed with config and doesnt have default value', () => {
        const {
          optionsController
        } = setup(functionOptions, defaultFunctionOptions);
        const value = optionsController.oneWay('optionalValue');
        expect(value.peek()).toBe(undefined);
      });
    });
    describe('mixed options child subscription', () => {
      it('should have initial value same as passed in config', () => {
        const {
          optionsController
        } = setup(mixedComplexOptions, mixedPlainOptions);
        const value = optionsController.oneWay('value.valueA');
        expect(value.peek()).toStrictEqual(mixedComplexOptions.value.valueA);
      });
      it('should have initial value undefined if parent is plain value', () => {
        const {
          optionsController
        } = setup(mixedPlainOptions, mixedComplexOptions);
        const value = optionsController.oneWay('value.valueA');
        expect(value.peek()).toBe(undefined);
      });
      it('should have initial default value if config options is undefined', () => {
        const {
          optionsController
        } = setup({}, mixedComplexOptions);
        const value = optionsController.oneWay('value.valueA');
        expect(value.peek()).toBe(mixedComplexOptions.value.valueA);
      });
    });
    describe('mixed options self subscription', () => {
      it('should have initial value same as passed in config', () => {
        const {
          optionsController
        } = setup(mixedComplexOptions, mixedPlainOptions);
        const value = optionsController.oneWay('value');
        expect(value.peek()).toStrictEqual(mixedComplexOptions.value);
      });
      it('should have initial default value if config options is undefined', () => {
        const {
          optionsController
        } = setup({}, mixedPlainOptions);
        const value = optionsController.oneWay('value');
        expect(value.peek()).toBe(mixedPlainOptions.value);
      });
    });
  });
  describe('update values', () => {
    describe('plain options', () => {
      it('should update on option changed', () => {
        const {
          component,
          optionsController
        } = setup(plainOptions, defaultPlainOptions);
        const value = optionsController.oneWay('value');
        component.option('value', 'newValue');
        expect(value.peek()).toBe('newValue');
      });
      it('should update boolean plain option on option changed', () => {
        const {
          component,
          optionsController
        } = setup({}, {
          value: true
        });
        const value = optionsController.oneWay('value');
        component.option('value', false);
        expect(value.peek()).toBe(false);
      });
      it('should update to default value if updated to undefined', () => {
        const {
          component,
          optionsController
        } = setup(plainOptions, defaultPlainOptions);
        const value = optionsController.oneWay('value');
        component.option('value', undefined);
        expect(value.peek()).toBe(defaultPlainOptions.value);
      });
      it('should update initial undefined value to updated value', () => {
        const {
          component,
          optionsController
        } = setup(plainOptions, defaultPlainOptions);
        const value = optionsController.oneWay('optionalValue');
        component.option('optionalValue', 'newValue');
        expect(value.peek()).toBe('newValue');
      });
    });
    describe('object options child subscription', () => {
      it('should update on option changed', () => {
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.value');
        component.option('nested.value', 'newValue');
        expect(value.peek()).toBe('newValue');
      });
      it('should update on parent option changed', () => {
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.value');
        component.option('nested', {
          value: 'newValue'
        });
        expect(value.peek()).toBe('newValue');
      });
      it('should update to default value if updated to undefined', () => {
        var _defaultNestedPlainOp4;
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.value');
        component.option('nested.value', undefined);
        expect(value.peek()).toBe((_defaultNestedPlainOp4 = defaultNestedPlainOptions.nested) === null || _defaultNestedPlainOp4 === void 0 ? void 0 : _defaultNestedPlainOp4.value);
      });
      it('should update to default value if parent option updated to undefined', () => {
        var _defaultNestedPlainOp5;
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.value');
        component.option('nested', undefined);
        expect(value.peek()).toBe((_defaultNestedPlainOp5 = defaultNestedPlainOptions.nested) === null || _defaultNestedPlainOp5 === void 0 ? void 0 : _defaultNestedPlainOp5.value);
      });
      it('should update initial undefined value to updated value', () => {
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.optionalValue');
        component.option('nested.optionalValue', 'newValue');
        expect(value.peek()).toBe('newValue');
      });
      it('should update initial undefined value to updated value on parent option update', () => {
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested.optionalValue');
        component.option('nested', {
          optionalValue: 'newValue'
        });
        expect(value.peek()).toBe('newValue');
      });
    });
    describe('object options self subscription', () => {
      it('should update on option changed', () => {
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
        expect(value.peek()).toStrictEqual(updatedOptions);
      });
      it('should update on child option changed', () => {
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested');
        component.option('nested.value', 'newValue');
        expect(value.peek()).toStrictEqual({
          value: 'newValue'
        });
      });
      it('should update to default value if updated to undefined', () => {
        const {
          component,
          optionsController
        } = setup(nestedPlainOptions, defaultNestedPlainOptions);
        const value = optionsController.oneWay('nested');
        component.option('nested', undefined);
        expect(value.peek()).toStrictEqual(defaultNestedPlainOptions.nested);
      });
    });
    describe('array options', () => {
      it('should update on whole array option changed', () => {
        const {
          component,
          optionsController
        } = setup(arrayOptions, defaultArrayOptions);
        const value = optionsController.oneWay('value');
        component.option('value', ['F', 'E']);
        expect(value.peek()).toStrictEqual(['F', 'E']);
      });
      it('should update on array element option changed', () => {
        const {
          component,
          optionsController
        } = setup(arrayOptions, defaultArrayOptions);
        const value = optionsController.oneWay('value');
        component.option('value[0]', 'F');
        expect(value.peek()).toStrictEqual(['F', 'B', 'C']);
      });
      it('should update on array element child option changed', () => {
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
        expect(value.peek()).toStrictEqual([{
          A: 'F',
          B: 'B_0'
        }, {
          A: 'A_1',
          B: 'B_1'
        }]);
      });
      it('should update to default value if updated to undefined', () => {
        const {
          component,
          optionsController
        } = setup(arrayOptions, defaultArrayOptions);
        const value = optionsController.oneWay('value');
        component.option('value', undefined);
        expect(value.peek()).toStrictEqual(defaultArrayOptions.value);
      });
      it('should update initial undefined value to updated value', () => {
        const {
          component,
          optionsController
        } = setup(arrayOptions, defaultArrayOptions);
        const value = optionsController.oneWay('optionalValue');
        component.option('optionalValue', ['F', 'E']);
        expect(value.peek()).toStrictEqual(['F', 'E']);
      });
    });
    describe('function options', () => {
      it('should update on option changed', () => {
        var _value$peek4;
        const {
          component,
          optionsController
        } = setup(functionOptions, defaultFunctionOptions);
        const value = optionsController.oneWay('value');
        // eslint-disable-next-line prefer-arrow-callback
        component.option('value', function newFn() {});
        expect((_value$peek4 = value.peek()) === null || _value$peek4 === void 0 ? void 0 : _value$peek4.name).toBe('newFn');
      });
      it('should update to default value if updated to undefined', () => {
        var _value$peek5, _defaultFunctionOptio2;
        const {
          component,
          optionsController
        } = setup(functionOptions, defaultFunctionOptions);
        const value = optionsController.oneWay('value');
        component.option('value', undefined);
        expect((_value$peek5 = value.peek()) === null || _value$peek5 === void 0 ? void 0 : _value$peek5.name).toBe((_defaultFunctionOptio2 = defaultFunctionOptions.value) === null || _defaultFunctionOptio2 === void 0 ? void 0 : _defaultFunctionOptio2.name);
      });
      it('should update initial undefined value to updated value', () => {
        var _value$peek6;
        const {
          component,
          optionsController
        } = setup(functionOptions, defaultFunctionOptions);
        const value = optionsController.oneWay('optionalValue');
        // eslint-disable-next-line prefer-arrow-callback
        component.option('optionalValue', function newFn() {});
        expect((_value$peek6 = value.peek()) === null || _value$peek6 === void 0 ? void 0 : _value$peek6.name).toBe('newFn');
      });
    });
    describe('mixed options child subscription', () => {
      it('should update on option changed', () => {
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedPlainOptions);
        const value = optionsController.oneWay('value.valueA');
        component.option('value.valueA', 'newValue');
        expect(value.peek()).toBe('newValue');
      });
      it('should update to default value if updated to undefined', () => {
        var _mixedComplexOptions$;
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedComplexOptions);
        const value = optionsController.oneWay('value.valueA');
        component.option('value.valueA', undefined);
        expect(value.peek()).toBe((_mixedComplexOptions$ = mixedComplexOptions.value) === null || _mixedComplexOptions$ === void 0 ? void 0 : _mixedComplexOptions$.valueA);
      });
      it('should update to undefined if parent option update to plain one', () => {
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedPlainOptions);
        const value = optionsController.oneWay('value.valueA');
        component.option('value', 'plain');
        expect(value.peek()).toBe(undefined);
      });
      it('should update to default value if parent updated to undefined', () => {
        var _mixedComplexOptions$2;
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedComplexOptions);
        const value = optionsController.oneWay('value.valueA');
        component.option('value', undefined);
        expect(value.peek()).toBe((_mixedComplexOptions$2 = mixedComplexOptions.value) === null || _mixedComplexOptions$2 === void 0 ? void 0 : _mixedComplexOptions$2.valueA);
      });
      it('should update to undefined if default value is plain', () => {
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedPlainOptions);
        const value = optionsController.oneWay('value.valueA');
        component.option('value', undefined);
        expect(value.peek()).toBe(undefined);
      });
    });
    describe('mixed options self subscription', () => {
      it('should update on option changed', () => {
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedPlainOptions);
        const value = optionsController.oneWay('value');
        component.option('value', {
          valueA: '1',
          valueB: '2'
        });
        expect(value.peek()).toStrictEqual({
          valueA: '1',
          valueB: '2'
        });
      });
      it('should update on option changed to plain', () => {
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedPlainOptions);
        const value = optionsController.oneWay('value');
        component.option('value', 'newValue');
        expect(value.peek()).toBe('newValue');
      });
      it('should update on child option changed', () => {
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedComplexOptions);
        const value = optionsController.oneWay('value');
        component.option('value.valueA', 'newValue');
        expect(value.peek()).toStrictEqual({
          valueA: 'newValue',
          valueB: 'B'
        });
      });
      it('should update to default value if updated to undefined', () => {
        const {
          component,
          optionsController
        } = setup(mixedComplexOptions, mixedPlainOptions);
        const value = optionsController.oneWay('value');
        component.option('value', undefined);
        expect(value.peek()).toStrictEqual(mixedPlainOptions.value);
      });
    });
  });
});
describe('twoWay', () => {
  const onOptionChangedTestMock = jest.fn();
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
  beforeEach(() => {
    onOptionChangedTestMock.mockClear();
  });
  it('should have initial value', () => {
    const {
      optionsController
    } = setup(testOptions, defaultTestOptions);
    const value = optionsController.twoWay('value');
    expect(value.value).toBe('initialValue');
  });
  it('should update on options changed', () => {
    const {
      component,
      optionsController
    } = setup(testOptions, defaultTestOptions);
    const value = optionsController.twoWay('value');
    const fn = jest.fn();
    value.subscribe(fn);
    component.option('value', 'newValue');
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith('newValue');
  });
  it('should return new value after update', () => {
    const {
      optionsController
    } = setup(testOptions, defaultTestOptions);
    const value = optionsController.twoWay('value');
    value.value = 'newValue';
    expect(value.value).toBe('newValue');
  });
  it('should call optionChanged on update', () => {
    const {
      component,
      optionsController
    } = setup(testOptions, defaultTestOptions);
    const value = optionsController.twoWay('value');
    value.value = 'newValue';
    expect(testOptions.onOptionChanged).toHaveBeenCalledTimes(1);
    expect(testOptions.onOptionChanged).toHaveBeenCalledWith({
      component,
      fullName: 'value',
      name: 'value',
      previousValue: 'initialValue',
      value: 'newValue'
    });
  });
});