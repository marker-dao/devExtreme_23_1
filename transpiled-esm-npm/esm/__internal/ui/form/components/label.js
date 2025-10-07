import { getPublicElement } from '../../../../core/element';
import $ from '../../../../core/renderer';
import { isDefined } from '../../../../core/utils/type';
import { FIELD_ITEM_LABEL_CLASS, FIELD_ITEM_LABEL_CONTENT_CLASS } from '../../../ui/form/constants';
import { getLabelMarkText } from '../../../ui/form/form.layout_manager.utils';
// TODO: exported for tests only
export const GET_LABEL_WIDTH_BY_TEXT_CLASS = 'dx-layout-manager-hidden-label';
export const FIELD_ITEM_REQUIRED_MARK_CLASS = 'dx-field-item-required-mark';
export const FIELD_ITEM_LABEL_LOCATION_CLASS = 'dx-field-item-label-location-';
export const FIELD_ITEM_OPTIONAL_MARK_CLASS = 'dx-field-item-optional-mark';
export const FIELD_ITEM_LABEL_TEXT_CLASS = 'dx-field-item-label-text';
function renderLabelMark(markOptions) {
  const markText = getLabelMarkText(markOptions);
  if (markText === '') {
    return $();
  }
  const markClass = markOptions.showRequiredMark ? FIELD_ITEM_REQUIRED_MARK_CLASS : FIELD_ITEM_OPTIONAL_MARK_CLASS;
  return $('<span>').addClass(markClass).attr('aria-hidden', 'true').text(markText);
}
export function renderLabel(_ref) {
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
  if ((!isDefined(text) || text.length <= 0) && !isDefined(labelTemplate)) {
    return null;
  }
  const $label = $('<label>').addClass(`${FIELD_ITEM_LABEL_CLASS} ${FIELD_ITEM_LABEL_LOCATION_CLASS}${location}`).attr('for', id).attr('id', labelID)
  // @ts-expect-error ts-error
  .css('textAlign', alignment);
  const $labelContainer = $('<span>').addClass(FIELD_ITEM_LABEL_CONTENT_CLASS);
  let $labelContent = $('<span>').addClass(FIELD_ITEM_LABEL_TEXT_CLASS);
  // @ts-expect-error ts-error
  $labelContent.text(text);
  if (labelTemplate) {
    $labelContent = $('<div>').addClass('dx-field-item-custom-label-content');
    labelTemplateData.text = text;
    labelTemplate.render({
      container: getPublicElement($labelContent),
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
export function setLabelWidthByMaxLabelWidth($targetContainer, labelsSelector) {
  const labelContentItemsSelector = `${labelsSelector} > .${FIELD_ITEM_LABEL_CLASS}:not(.${FIELD_ITEM_LABEL_LOCATION_CLASS}top) > .${FIELD_ITEM_LABEL_CONTENT_CLASS}`;
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