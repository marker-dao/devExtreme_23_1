import { createValidatorRule } from '../core/index';
import { divisibleBy, greaterThan, inRange, isInteger, lessThan } from './validation_functions';
export const mustBeInteger = createValidatorRule('mustBeInteger', value => isInteger(value));
export const mustBeGreaterThan = function (minimalValue) {
  let strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return createValidatorRule('mustBeGreaterThan', value => greaterThan(value, minimalValue, strict));
};
export const mustBeLessThan = function (maximalValue) {
  let strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return createValidatorRule('mustBeLessThan', value => lessThan(value, maximalValue, strict));
};
export const mustBeInRange = range => createValidatorRule('mustBeInRange', value => inRange(value, range));
export const mustBeDivisibleBy = divider => createValidatorRule('mustBeDivisibleBy', value => divisibleBy(value, divider));