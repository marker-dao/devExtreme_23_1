/**
* DevExtreme (cjs/__internal/common/core/animation/translator.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPosition = exports.parseTranslate = exports.move = exports.locate = exports.getTranslateCss = exports.getTranslate = exports.clearCache = void 0;
var _element_data = require("../../../../core/element_data");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _type = require("../../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-use-before-define */

const TRANSLATOR_DATA_KEY = 'dxTranslator';
const TRANSFORM_MATRIX_REGEX = /matrix(3d)?\((.+?)\)/;
const TRANSLATE_REGEX = /translate(?:3d)?\((.+?)\)/;
const locate = function ($element) {
  // eslint-disable-next-line no-param-reassign
  $element = (0, _renderer.default)($element);
  const translate = getTranslate($element);
  return {
    left: translate.x,
    top: translate.y
  };
};
exports.locate = locate;
function isPercentValue(value) {
  return (0, _type.type)(value) === 'string' && value[value.length - 1] === '%';
}
function cacheTranslate($element, translate) {
  if ($element.length) {
    (0, _element_data.data)($element.get(0), TRANSLATOR_DATA_KEY, translate);
  }
}
const clearCache = function ($element) {
  if ($element.length) {
    (0, _element_data.removeData)($element.get(0), TRANSLATOR_DATA_KEY);
  }
};
exports.clearCache = clearCache;
const getTranslateCss = function (translate) {
  translate.x = translate.x || 0;
  translate.y = translate.y || 0;
  const xValueString = isPercentValue(translate.x) ? translate.x : `${translate.x}px`;
  const yValueString = isPercentValue(translate.y) ? translate.y : `${translate.y}px`;
  return `translate(${xValueString}, ${yValueString})`;
};
exports.getTranslateCss = getTranslateCss;
const getTranslate = function ($element) {
  let result = $element.length ? (0, _element_data.data)($element.get(0), TRANSLATOR_DATA_KEY) : null;
  if (!result) {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const transformValue = $element.css('transform') || getTranslateCss({
      x: 0,
      y: 0
    });
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    let matrix = transformValue.match(TRANSFORM_MATRIX_REGEX);
    const is3D = matrix && matrix[1];
    if (matrix) {
      matrix = matrix[2].split(',');
      if (is3D === '3d') {
        matrix = matrix.slice(12, 15);
      } else {
        matrix.push('0');
        matrix = matrix.slice(4, 7);
      }
    } else {
      matrix = ['0', '0', '0'];
    }
    result = {
      x: parseFloat(matrix[0]),
      y: parseFloat(matrix[1]),
      z: parseFloat(matrix[2])
    };
    cacheTranslate($element, result);
  }
  return result;
};
exports.getTranslate = getTranslate;
const move = function ($element,
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
position) {
  // eslint-disable-next-line no-param-reassign
  $element = (0, _renderer.default)($element);
  const {
    left,
    top
  } = position;
  // eslint-disable-next-line @typescript-eslint/init-declarations
  let translate;
  if (left === undefined) {
    translate = getTranslate($element);
    translate.y = top || 0;
  } else if (top === undefined) {
    translate = getTranslate($element);
    translate.x = left || 0;
  } else {
    translate = {
      x: left || 0,
      y: top || 0,
      z: 0
    };
    cacheTranslate($element, translate);
  }
  $element.css({
    transform: getTranslateCss(translate)
  });
  if (isPercentValue(left) || isPercentValue(top)) {
    clearCache($element);
  }
};
exports.move = move;
const resetPosition = function ($element, finishTransition) {
  // eslint-disable-next-line no-param-reassign
  $element = (0, _renderer.default)($element);
  // eslint-disable-next-line @typescript-eslint/init-declarations
  let originalTransition;
  const stylesConfig = {
    left: 0,
    top: 0,
    transform: 'none'
  };
  if (finishTransition) {
    originalTransition = $element.css('transition');
    // @ts-expect-error
    stylesConfig.transition = 'none';
  }
  $element.css(stylesConfig);
  clearCache($element);
  if (finishTransition) {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    $element.get(0).offsetHeight;
    $element.css('transition', originalTransition);
  }
};
exports.resetPosition = resetPosition;
const parseTranslate = function (translateString) {
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  let result = translateString.match(TRANSLATE_REGEX);
  if (!result || !result[1]) {
    return undefined;
  }
  result = result[1].split(',');
  return {
    x: parseFloat(result[0]),
    y: parseFloat(result[1]),
    z: parseFloat(result[2])
  };
};
exports.parseTranslate = parseTranslate;
