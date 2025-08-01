/**
* DevExtreme (esm/__internal/core/utils/m_inflector.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/naming-convention */
import { map } from '../../../core/utils/iterator';
const _normalize = function (text) {
  if (text === undefined || text === null) {
    return '';
  }
  return String(text);
};
const _upperCaseFirst = function (text) {
  return _normalize(text).charAt(0).toUpperCase() + text.substr(1);
};
const _chop = function (text) {
  return _normalize(text).replace(/([a-z\d])([A-Z])/g, '$1 $2').split(/[\s_-]+/);
};
export const dasherize = function (text) {
  return map(_chop(text), function (p) {
    return p.toLowerCase();
  }).join('-');
};
export const underscore = function (text) {
  return dasherize(text).replace(/-/g, '_');
};
export const camelize = function (text, upperFirst) {
  return map(_chop(text), function (p, i) {
    p = p.toLowerCase();
    if (upperFirst || i > 0) {
      p = _upperCaseFirst(p);
    }
    return p;
  }).join('');
};
export const humanize = function (text) {
  return _upperCaseFirst(dasherize(text).replace(/-/g, ' '));
};
export const titleize = function (text) {
  return map(_chop(text), function (p) {
    return _upperCaseFirst(p.toLowerCase());
  }).join(' ');
};
const DIGIT_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const captionize = function (name) {
  const captionList = [];
  let i;
  let char;
  let isPrevCharNewWord = false;
  let isNewWord = false;
  for (i = 0; i < name.length; i++) {
    char = name.charAt(i);
    isNewWord = char === char.toUpperCase() && char !== '-' && char !== ')' && char !== '/' || char in DIGIT_CHARS;
    if (char === '_' || char === '.') {
      char = ' ';
      isNewWord = true;
    } else if (i === 0) {
      char = char.toUpperCase();
      isNewWord = true;
    } else if (!isPrevCharNewWord && isNewWord) {
      if (captionList.length > 0) {
        captionList.push(' ');
      }
    }
    captionList.push(char);
    isPrevCharNewWord = isNewWord;
  }
  return captionList.join('');
};
export default {
  dasherize,
  underscore,
  camelize,
  humanize,
  titleize,
  captionize
};
