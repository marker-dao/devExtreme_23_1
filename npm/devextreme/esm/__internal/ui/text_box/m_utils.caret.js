/**
* DevExtreme (esm/__internal/ui/text_box/m_utils.caret.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import devices from '../../../core/devices';
import domAdapter from '../../../core/dom_adapter';
import $ from '../../../core/renderer';
import { isDefined } from '../../../core/utils/type';
const {
  ios,
  // @ts-expect-error
  mac
} = devices.real();
// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const isFocusingOnCaretChange = ios || mac;
const getCaret = input => {
  let range;
  try {
    range = {
      start: input.selectionStart,
      end: input.selectionEnd
    };
  } catch (e) {
    range = {
      start: 0,
      end: 0
    };
  }
  return range;
};
const setCaret = (input, position) => {
  const body = domAdapter.getBody();
  if (!body.contains(input) && !body.contains(input.getRootNode().host)) {
    return;
  }
  try {
    input.selectionStart = position.start;
    input.selectionEnd = position.end;
  } catch (e) {/* empty */}
};
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
const caret = function (input, position) {
  let force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  input = $(input).get(0);
  if (!isDefined(position)) {
    return getCaret(input);
  }
  // NOTE: AppleWebKit-based browsers focuses element input after caret position has changed
  if (!force && isFocusingOnCaretChange && domAdapter.getActiveElement(input) !== input) {
    return;
  }
  setCaret(input, position);
};
export default caret;
