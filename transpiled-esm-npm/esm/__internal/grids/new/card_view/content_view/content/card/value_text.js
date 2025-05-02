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