/**
* DevExtreme (bundles/__internal/scheduler/options_validator/common/validator_rules.test.js)
* Version: 23.2.3
* Build date: Fri Nov 24 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _validator_rules = require("../../../scheduler/options_validator/common/validator_rules");
var validationFunctions = _interopRequireWildcard(require("./validation_functions"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
describe('mustBeInteger', () => {
  let mock = null;
  beforeEach(() => {
    mock = jest.spyOn(validationFunctions, 'isInteger');
  });
  afterEach(() => {
    mock === null || mock === void 0 ? void 0 : mock.mockReset();
  });
  it('should call isInteger function', () => {
    (0, _validator_rules.mustBeInteger)(10);
    expect(mock).toHaveBeenCalledWith(10);
  });
  it('should return true if valid', () => {
    mock === null || mock === void 0 ? void 0 : mock.mockImplementation(() => true);
    const result = (0, _validator_rules.mustBeInteger)(10);
    expect(result).toBe(true);
  });
  it('should return error (string) if invalid', () => {
    mock === null || mock === void 0 ? void 0 : mock.mockImplementation(() => false);
    const result = (0, _validator_rules.mustBeInteger)(10.5);
    expect(result).toBe('10.5 must be an integer.');
  });
  it('should be the function with the correct name', () => {
    const func = _validator_rules.mustBeInteger;
    expect(func.name).toBe('mustBeInteger');
  });
});
describe('mustBeGreaterThan', () => {
  let mock = null;
  beforeEach(() => {
    mock = jest.spyOn(validationFunctions, 'greaterThan');
  });
  afterEach(() => {
    mock === null || mock === void 0 ? void 0 : mock.mockReset();
  });
  it('should call greaterThan function', () => {
    const func = (0, _validator_rules.mustBeGreaterThan)(10, true);
    func(15);
    expect(mock).toHaveBeenCalledWith(15, 10, true);
  });
  it('should return true if valid', () => {
    mock === null || mock === void 0 ? void 0 : mock.mockImplementation(() => true);
    const func = (0, _validator_rules.mustBeGreaterThan)(10, true);
    const result = func(15);
    expect(result).toBe(true);
  });
  it('should return error (string) if invalid with strict: true', () => {
    mock === null || mock === void 0 ? void 0 : mock.mockImplementation(() => false);
    const func = (0, _validator_rules.mustBeGreaterThan)(15, true);
    const result = func(10);
    expect(result).toBe('10 must be > than 15.');
  });
  it('should return error (string) if invalid with strict: false', () => {
    mock === null || mock === void 0 ? void 0 : mock.mockImplementation(() => false);
    const func = (0, _validator_rules.mustBeGreaterThan)(15, false);
    const result = func(10);
    expect(result).toBe('10 must be >= than 15.');
  });
  it('should be the function with the correct name', () => {
    const func = (0, _validator_rules.mustBeGreaterThan)(15, false);
    expect(func.name).toBe('mustBeGreaterThan');
  });
});
describe('mustBeLessThan', () => {
  let mock = null;
  beforeEach(() => {
    mock = jest.spyOn(validationFunctions, 'lessThan');
  });
  afterEach(() => {
    mock === null || mock === void 0 ? void 0 : mock.mockReset();
  });
  it('should call lessThan function', () => {
    const func = (0, _validator_rules.mustBeLessThan)(10, true);
    func(5);
    expect(mock).toHaveBeenCalledWith(5, 10, true);
  });
  it('should return true if valid', () => {
    mock === null || mock === void 0 ? void 0 : mock.mockImplementation(() => true);
    const func = (0, _validator_rules.mustBeLessThan)(10, true);
    const result = func(5);
    expect(result).toBe(true);
  });
  it('should return error (string) if invalid with strict: true', () => {
    mock === null || mock === void 0 ? void 0 : mock.mockImplementation(() => false);
    const func = (0, _validator_rules.mustBeLessThan)(10, true);
    const result = func(15);
    expect(result).toBe('15 must be < than 10.');
  });
  it('should return error (string) if invalid with strict: false', () => {
    mock === null || mock === void 0 ? void 0 : mock.mockImplementation(() => false);
    const func = (0, _validator_rules.mustBeLessThan)(10, false);
    const result = func(15);
    expect(result).toBe('15 must be <= than 10.');
  });
  it('should be the function with the correct name', () => {
    const func = (0, _validator_rules.mustBeLessThan)(15, false);
    expect(func.name).toBe('mustBeLessThan');
  });
});
describe('mustBeInRange', () => {
  let mock = null;
  beforeEach(() => {
    mock = jest.spyOn(validationFunctions, 'inRange');
  });
  afterEach(() => {
    mock === null || mock === void 0 ? void 0 : mock.mockReset();
  });
  it('should call inRange function', () => {
    const func = (0, _validator_rules.mustBeInRange)([0, 10]);
    func(5);
    expect(mock).toHaveBeenCalledWith(5, [0, 10]);
  });
  it('should return true if valid', () => {
    mock === null || mock === void 0 ? void 0 : mock.mockImplementation(() => true);
    const func = (0, _validator_rules.mustBeInRange)([0, 10]);
    const result = func(5);
    expect(result).toBe(true);
  });
  it('should return error (string) if invalid ', () => {
    mock === null || mock === void 0 ? void 0 : mock.mockImplementation(() => false);
    const func = (0, _validator_rules.mustBeInRange)([0, 10]);
    const result = func(15);
    expect(result).toBe('15 must be in range [0, 10].');
  });
  it('should be the function with the correct name', () => {
    const func = (0, _validator_rules.mustBeInRange)([0, 10]);
    expect(func.name).toBe('mustBeInRange');
  });
});
describe('mustBeDivisibleBy', () => {
  let mock = null;
  beforeEach(() => {
    mock = jest.spyOn(validationFunctions, 'divisibleBy');
  });
  afterEach(() => {
    mock === null || mock === void 0 ? void 0 : mock.mockReset();
  });
  it('should call divisibleBy function', () => {
    const func = (0, _validator_rules.mustBeDivisibleBy)(10);
    func(100);
    expect(mock).toHaveBeenCalledWith(100, 10);
  });
  it('should return true if valid', () => {
    mock === null || mock === void 0 ? void 0 : mock.mockImplementation(() => true);
    const func = (0, _validator_rules.mustBeDivisibleBy)(5);
    const result = func(10);
    expect(result).toBe(true);
  });
  it('should return error (string) if invalid ', () => {
    mock === null || mock === void 0 ? void 0 : mock.mockImplementation(() => false);
    const func = (0, _validator_rules.mustBeDivisibleBy)(5);
    const result = func(6);
    expect(result).toBe('6 must be divisible by 5.');
  });
  it('should be the function with the correct name', () => {
    const func = (0, _validator_rules.mustBeDivisibleBy)(5);
    expect(func.name).toBe('mustBeDivisibleBy');
  });
});
