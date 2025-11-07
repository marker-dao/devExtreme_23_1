/**
* DevExtreme (esm/__internal/common/core/animation/translator.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { data as elementData, removeData } from '../../../../core/element_data';
import $ from '../../../../core/renderer';
import { type } from '../../../../core/utils/type';
const TRANSLATOR_DATA_KEY = 'dxTranslator';
const TRANSFORM_MATRIX_REGEX = /matrix(3d)?\((.+?)\)/;
const TRANSLATE_REGEX = /translate(?:3d)?\((.+?)\)/;
export const locate = function ($element) {
  // eslint-disable-next-line no-param-reassign
  $element = $($element);
  const translate = getTranslate($element);
  return {
    left: translate.x,
    top: translate.y
  };
};
function isPercentValue(value) {
  return type(value) === 'string' && value[value.length - 1] === '%';
}
function cacheTranslate($element, translate) {
  if ($element.length) {
    elementData($element.get(0), TRANSLATOR_DATA_KEY, translate);
  }
}
export const clearCache = function ($element) {
  if ($element.length) {
    removeData($element.get(0), TRANSLATOR_DATA_KEY);
  }
};
export const getTranslateCss = function (translate) {
  translate.x = translate.x || 0;
  translate.y = translate.y || 0;
  const xValueString = isPercentValue(translate.x) ? translate.x : `${translate.x}px`;
  const yValueString = isPercentValue(translate.y) ? translate.y : `${translate.y}px`;
  return `translate(${xValueString}, ${yValueString})`;
};
export const getTranslate = function ($element) {
  let result = $element.length ? elementData($element.get(0), TRANSLATOR_DATA_KEY) : null;
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
export const move = function ($element,
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
position) {
  // eslint-disable-next-line no-param-reassign
  $element = $($element);
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
export const resetPosition = function ($element, finishTransition) {
  // eslint-disable-next-line no-param-reassign
  $element = $($element);
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
export const parseTranslate = function (translateString) {
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
