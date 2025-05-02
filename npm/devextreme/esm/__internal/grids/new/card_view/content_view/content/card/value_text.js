/**
* DevExtreme (esm/__internal/grids/new/card_view/content_view/content/card/value_text.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode, createComponentVNode } from "inferno";
const ROOT_CLASS = 'dx-cardview-field-value';
const CLASS = {
  root: ROOT_CLASS,
  textPartHighlighted: `${ROOT_CLASS}__text-part--highlighted`
};
export const ValueText = _ref => {
  let {
    field,
    template: Template,
    fieldHintEnabled
  } = _ref;
  const classNames = [CLASS.root, `${CLASS.root}--text-align-${field.column.alignment}`].join(' ');
  const content = field.highlightedText ? field.highlightedText.map(_ref2 => {
    let {
      type,
      text: textPart
    } = _ref2;
    return createVNode(1, "span", type === 'highlighted' ? CLASS.textPartHighlighted : '', textPart, 0);
  }) : field.text;
  return createVNode(1, "div", classNames, Template ? createComponentVNode(2, Template, {
    "field": field
  }) : content, 0, {
    "title": fieldHintEnabled ? field.text : undefined
  });
};
