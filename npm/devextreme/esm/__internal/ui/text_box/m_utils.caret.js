/**
* DevExtreme (esm/__internal/ui/text_box/m_utils.caret.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import devices from '../../../core/devices';
import domAdapter from '../../../core/dom_adapter';
import $ from '../../../core/renderer';
import { isDefined } from '../../../core/utils/type';
const {
  ios,
  // @ts-expect-error Device type doesn't contain mac
  mac
} = devices.real();
// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const isFocusingOnCaretChange = ios || mac;
const getCaret = input => {
  let range = {
    start: 0,
    end: 0
  };
  try {
    range = {
      start: input.selectionStart ?? 0,
      end: input.selectionEnd ?? 0
    };
  } catch (e) {
    range = {
      start: 0,
      end: 0
    };
  }
  return range;
};
export const setCaret = (input, selection) => {
  try {
    input.selectionStart = selection.start;
    input.selectionEnd = selection.end;
  } catch {/** empty */}
};
const caret = function (input, selection) {
  let force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const inputElement = $(input).get(0);
  if (!isDefined(selection)) {
    return getCaret(inputElement);
  }
  // NOTE: AppleWebKit-based browsers focuses element input after caret position has changed
  if (!force && isFocusingOnCaretChange && domAdapter.getActiveElement(inputElement) !== inputElement) {
    return undefined;
  }
  setCaret(inputElement, selection);
  return undefined;
};
export default caret;
