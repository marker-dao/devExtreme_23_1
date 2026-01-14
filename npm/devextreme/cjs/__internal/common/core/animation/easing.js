/**
* DevExtreme (cjs/__internal/common/core/animation/easing.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertTransitionTimingFuncToEasing = void 0;
exports.getEasing = getEasing;
exports.setEasing = setEasing;
var _type = require("../../../../core/utils/type");
const CSS_TRANSITION_EASING_REGEX = /cubic-bezier\((\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\)/;
const TransitionTimingFuncMap = {
  linear: 'cubic-bezier(0, 0, 1, 1)',
  swing: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
  ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  'ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
  'ease-out': 'cubic-bezier(0, 0, 0.58, 1)',
  'ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)'
};
const polynomBezier = (x1, y1, x2, y2) => {
  const Cx = 3 * x1;
  const Bx = 3 * (x2 - x1) - Cx;
  const Ax = 1 - Cx - Bx;
  const Cy = 3 * y1;
  const By = 3 * (y2 - y1) - Cy;
  const Ay = 1 - Cy - By;
  const bezierX = t => t * (Cx + t * (Bx + t * Ax));
  const bezierY = t => t * (Cy + t * (By + t * Ay));
  const derivativeX = t => Cx + t * (2 * Bx + t * 3 * Ax);
  const findXFor = t => {
    let x = t;
    let i = 0;
    // eslint-disable-next-line no-undef-init
    let z = undefined;
    while (i < 14) {
      z = bezierX(x) - t;
      if (Math.abs(z) < 1e-3) {
        break;
      }
      x -= z / derivativeX(x);
      i += 1;
    }
    return x;
  };
  return t => bezierY(findXFor(t));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let easing = {};
const convertTransitionTimingFuncToEasing = cssTransitionEasing => {
  // eslint-disable-next-line no-param-reassign
  cssTransitionEasing = TransitionTimingFuncMap[cssTransitionEasing] || cssTransitionEasing;
  // eslint-disable-next-line @stylistic/max-len
  let coeffs = CSS_TRANSITION_EASING_REGEX.exec(cssTransitionEasing);
  const numCoeffs = [];
  let forceName = null;
  if (!coeffs) {
    forceName = 'linear';
    coeffs = TransitionTimingFuncMap[forceName].match(CSS_TRANSITION_EASING_REGEX);
  }
  // @ts-expect-error
  coeffs = coeffs.slice(1, 5);
  for (let i = 0; i < coeffs.length; i += 1) {
    numCoeffs[i] = parseFloat(coeffs[i]);
  }
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const easingName = forceName || `cubicbezier_${numCoeffs.join('_').replace(/\./g, 'p')}`;
  if (!(0, _type.isFunction)(easing[easingName])) {
    easing[easingName] = function (x, t, b, c, d) {
      return c * polynomBezier(numCoeffs[0], numCoeffs[1], numCoeffs[2], numCoeffs[3])(t / d) + b;
    };
  }
  return easingName;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.convertTransitionTimingFuncToEasing = convertTransitionTimingFuncToEasing;
function setEasing(value) {
  easing = value;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getEasing(name) {
  return easing[name];
}
