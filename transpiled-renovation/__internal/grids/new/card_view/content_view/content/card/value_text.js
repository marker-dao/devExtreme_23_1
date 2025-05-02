"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueText = void 0;
var _inferno = require("inferno");
const ROOT_CLASS = 'dx-cardview-field-value';
const CLASS = {
  root: ROOT_CLASS,
  textPartHighlighted: `${ROOT_CLASS}__text-part--highlighted`
};
const ValueText = _ref => {
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
    return (0, _inferno.createVNode)(1, "span", type === 'highlighted' ? CLASS.textPartHighlighted : '', textPart, 0);
  }) : field.text;
  return (0, _inferno.createVNode)(1, "div", classNames, Template ? (0, _inferno.createComponentVNode)(2, Template, {
    "field": field
  }) : content, 0, {
    "title": fieldHintEnabled ? field.text : undefined
  });
};
exports.ValueText = ValueText;