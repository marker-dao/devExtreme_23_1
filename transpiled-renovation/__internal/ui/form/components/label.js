"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET_LABEL_WIDTH_BY_TEXT_CLASS = exports.FIELD_ITEM_REQUIRED_MARK_CLASS = exports.FIELD_ITEM_OPTIONAL_MARK_CLASS = exports.FIELD_ITEM_LABEL_TEXT_CLASS = exports.FIELD_ITEM_LABEL_LOCATION_CLASS = void 0;
exports.renderLabel = renderLabel;
exports.setLabelWidthByMaxLabelWidth = setLabelWidthByMaxLabelWidth;
var _element = require("../../../../core/element");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _type = require("../../../../core/utils/type");
var _constants = require("../../../ui/form/constants");
var _formLayout_manager = require("../../../ui/form/form.layout_manager.utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// TODO: exported for tests only
const GET_LABEL_WIDTH_BY_TEXT_CLASS = exports.GET_LABEL_WIDTH_BY_TEXT_CLASS = 'dx-layout-manager-hidden-label';
const FIELD_ITEM_REQUIRED_MARK_CLASS = exports.FIELD_ITEM_REQUIRED_MARK_CLASS = 'dx-field-item-required-mark';
const FIELD_ITEM_LABEL_LOCATION_CLASS = exports.FIELD_ITEM_LABEL_LOCATION_CLASS = 'dx-field-item-label-location-';
const FIELD_ITEM_OPTIONAL_MARK_CLASS = exports.FIELD_ITEM_OPTIONAL_MARK_CLASS = 'dx-field-item-optional-mark';
const FIELD_ITEM_LABEL_TEXT_CLASS = exports.FIELD_ITEM_LABEL_TEXT_CLASS = 'dx-field-item-label-text';
function renderLabelMark(markOptions) {
  const markText = (0, _formLayout_manager.getLabelMarkText)(markOptions);
  if (markText === '') {
    return (0, _renderer.default)();
  }
  const markClass = markOptions.showRequiredMark ? FIELD_ITEM_REQUIRED_MARK_CLASS : FIELD_ITEM_OPTIONAL_MARK_CLASS;
  return (0, _renderer.default)('<span>').addClass(markClass).text(markText);
}
function renderLabel(_ref) {
  let {
    text,
    id,
    location,
    alignment,
    labelID = null,
    markOptions = {},
    labelTemplate,
    labelTemplateData,
    onLabelTemplateRendered
  } = _ref;
  if ((!(0, _type.isDefined)(text) || text.length <= 0) && !(0, _type.isDefined)(labelTemplate)) {
    return null;
  }
  const $label = (0, _renderer.default)('<label>').addClass(`${_constants.FIELD_ITEM_LABEL_CLASS} ${FIELD_ITEM_LABEL_LOCATION_CLASS}${location}`).attr('for', id).attr('id', labelID)
  // @ts-expect-error ts-error
  .css('textAlign', alignment);
  const $labelContainer = (0, _renderer.default)('<span>').addClass(_constants.FIELD_ITEM_LABEL_CONTENT_CLASS);
  let $labelContent = (0, _renderer.default)('<span>').addClass(FIELD_ITEM_LABEL_TEXT_CLASS);
  // @ts-expect-error ts-error
  $labelContent.text(text);
  if (labelTemplate) {
    $labelContent = (0, _renderer.default)('<div>').addClass('dx-field-item-custom-label-content');
    labelTemplateData.text = text;
    labelTemplate.render({
      container: (0, _element.getPublicElement)($labelContent),
      model: labelTemplateData,
      // @ts-expect-error ts-error
      onRendered() {
        onLabelTemplateRendered === null || onLabelTemplateRendered === void 0 || onLabelTemplateRendered();
      }
    });
  }
  return $label.append($labelContainer.append($labelContent).append(renderLabelMark(markOptions)));
}
function getLabelWidthByHTML(labelContent) {
  let result = 0;
  const itemsCount = labelContent.children.length;
  for (let i = 0; i < itemsCount; i += 1) {
    const child = labelContent.children[i];
    result += child.offsetWidth;
  }
  return result;
}
function setLabelWidthByMaxLabelWidth($targetContainer, labelsSelector) {
  const labelContentItemsSelector = `${labelsSelector} > .${_constants.FIELD_ITEM_LABEL_CLASS}:not(.${FIELD_ITEM_LABEL_LOCATION_CLASS}top) > .${_constants.FIELD_ITEM_LABEL_CONTENT_CLASS}`;
  const $labelContentItems = $targetContainer.find(labelContentItemsSelector);
  const labelContentItemCount = $labelContentItems.length;
  let labelWidth = 0;
  let maxWidth = 0;
  for (let i = 0; i < labelContentItemCount; i += 1) {
    labelWidth = getLabelWidthByHTML($labelContentItems[i]);
    if (labelWidth > maxWidth) {
      maxWidth = labelWidth;
    }
  }
  for (let i = 0; i < labelContentItemCount; i += 1) {
    $labelContentItems[i].style.width = `${maxWidth}px`;
  }
}