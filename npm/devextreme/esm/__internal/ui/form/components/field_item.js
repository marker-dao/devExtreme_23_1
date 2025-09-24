/**
* DevExtreme (esm/__internal/ui/form/components/field_item.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { name as clickEventName } from '../../../../common/core/events/click';
import eventsEngine from '../../../../common/core/events/core/events_engine';
import { getPublicElement } from '../../../../core/element';
import $ from '../../../../core/renderer';
import { captionize } from '../../../../core/utils/inflector';
import { format } from '../../../../core/utils/string';
import { current, isMaterialBased } from '../../../../ui/themes';
import errors from '../../../../ui/widget/ui.errors';
import { renderLabel } from '../../../ui/form/components/label';
import { FIELD_ITEM_CONTENT_CLASS } from '../../../ui/form/constants';
import Validator from '../../../ui/m_validator';
export const FLEX_LAYOUT_CLASS = 'dx-flex-layout';
export const FIELD_ITEM_OPTIONAL_CLASS = 'dx-field-item-optional';
export const FIELD_ITEM_REQUIRED_CLASS = 'dx-field-item-required';
export const FIELD_ITEM_CONTENT_WRAPPER_CLASS = 'dx-field-item-content-wrapper';
export const FIELD_ITEM_CONTENT_LOCATION_CLASS = 'dx-field-item-content-location-';
export const FIELD_ITEM_LABEL_ALIGN_CLASS = 'dx-field-item-label-align';
export const FIELD_ITEM_HELP_TEXT_CLASS = 'dx-field-item-help-text';
export const LABEL_VERTICAL_ALIGNMENT_CLASS = 'dx-label-v-align';
export const LABEL_HORIZONTAL_ALIGNMENT_CLASS = 'dx-label-h-align';
export const TOGGLE_CONTROLS_PADDING_CLASS = 'dx-toggle-controls-paddings';
const TEMPLATE_WRAPPER_CLASS = 'dx-template-wrapper';
const VALIDATION_TARGET_CLASS = 'dx-validation-target';
const INVALID_CLASS = 'dx-invalid';
function getValidationTarget($fieldEditorContainer) {
  const $editor = $fieldEditorContainer.children().first();
  return $editor.hasClass(TEMPLATE_WRAPPER_CLASS) ? $editor.children().first() : $editor;
}
function subscribeWrapperInvalidClassToggle(validationTargetInstance) {
  if (validationTargetInstance && isMaterialBased(current())) {
    const wrapperClass = `.${FIELD_ITEM_CONTENT_WRAPPER_CLASS}`;
    const toggleInvalidClass = _ref => {
      let {
        element,
        component
      } = _ref;
      const {
        isValid,
        validationMessageMode
      } = component.option();
      $(element).parents(wrapperClass).toggleClass(INVALID_CLASS, isValid === false && (component._isFocused() || validationMessageMode === 'always'));
    };
    validationTargetInstance.on('optionChanged', e => {
      if (e.name !== 'isValid') return;
      toggleInvalidClass(e);
    });
    validationTargetInstance.on('focusIn', toggleInvalidClass).on('focusOut', toggleInvalidClass).on('enterKey', toggleInvalidClass);
  }
}
function tryGetValidationTargetInstance($validationTarget) {
  var _$validationTarget$pa;
  // @ts-expect-error ts-error
  return ($validationTarget === null || $validationTarget === void 0 ? void 0 : $validationTarget.data(VALIDATION_TARGET_CLASS)) || ($validationTarget === null || $validationTarget === void 0 || (_$validationTarget$pa = $validationTarget.parent) === null || _$validationTarget$pa === void 0 || (_$validationTarget$pa = _$validationTarget$pa.call($validationTarget)) === null || _$validationTarget$pa === void 0 ? void 0 : _$validationTarget$pa.data(VALIDATION_TARGET_CLASS));
}
function getTemplateData(item, editorOptions, formOrLayoutManager) {
  return {
    dataField: item.dataField,
    editorType: item.editorType,
    editorOptions,
    component: formOrLayoutManager,
    name: item.name
  };
}
export function renderFieldItem(_ref2) {
  let {
    $parent,
    rootElementCssClassList,
    formOrLayoutManager,
    createComponentCallback,
    labelOptions,
    // TODO: move to 'item' ?
    labelNeedBaselineAlign,
    labelLocation,
    needRenderLabel,
    // TODO: move to 'labelOptions' ?
    formLabelLocation,
    // TODO: use 'labelOptions.location' instead ?
    item,
    // TODO: pass simple values instead of complex object
    editorOptions,
    isSimpleItem,
    isRequired,
    template,
    helpID,
    labelID,
    name,
    helpText,
    // TODO: move to 'item' ?
    requiredMessageTemplate,
    validationGroup
  } = _ref2;
  const $rootElement = $('<div>').addClass(rootElementCssClassList.join(' ')).appendTo($parent);
  $rootElement.addClass(isRequired ? FIELD_ITEM_REQUIRED_CLASS : FIELD_ITEM_OPTIONAL_CLASS);
  if (isSimpleItem) {
    $rootElement.addClass(FLEX_LAYOUT_CLASS);
  }
  if (isSimpleItem && labelNeedBaselineAlign) {
    // TODO: label related code, execute ony if needRenderLabel ?
    $rootElement.addClass(FIELD_ITEM_LABEL_ALIGN_CLASS);
  }
  //
  // Setup field editor container:
  //
  const $fieldEditorContainer = $('<div>');
  $fieldEditorContainer.data('dx-form-item', item);
  const locationClassSuffix = {
    right: 'left',
    left: 'right',
    top: 'bottom'
  };
  $fieldEditorContainer.addClass(FIELD_ITEM_CONTENT_CLASS)
  // @ts-expect-error ts-error
  .addClass(FIELD_ITEM_CONTENT_LOCATION_CLASS + locationClassSuffix[formLabelLocation]);
  //
  // Setup $label:
  //
  let $label = null;
  if (needRenderLabel) {
    if (labelOptions.labelTemplate) {
      labelOptions.labelTemplateData = getTemplateData(item, editorOptions, formOrLayoutManager);
    }
    $label = renderLabel(labelOptions);
  }
  if ($label) {
    const {
      editorType
    } = item;
    $rootElement.append($label);
    if (labelLocation === 'top' || labelLocation === 'left') {
      $rootElement.append($fieldEditorContainer);
    }
    if (labelLocation === 'right') {
      $rootElement.prepend($fieldEditorContainer);
    }
    if (labelLocation === 'top') {
      $rootElement.addClass(LABEL_VERTICAL_ALIGNMENT_CLASS);
    } else {
      $rootElement.addClass(LABEL_HORIZONTAL_ALIGNMENT_CLASS);
    }
    if (editorType === 'dxCheckBox' || editorType === 'dxSwitch') {
      eventsEngine.on($label, clickEventName, () => {
        // @ts-expect-error ts-error
        eventsEngine.trigger($fieldEditorContainer.children(), clickEventName);
      });
    }
    const toggleControls = ['dxCheckBox', 'dxSwitch', 'dxRadioGroup'];
    const isToggleControls = toggleControls.includes(editorType);
    const labelAlignment = labelOptions.alignment;
    const isLabelAlignmentLeft = labelAlignment === 'left' || !labelAlignment;
    const hasNotTemplate = !template;
    const isLabelOnTop = labelLocation === 'top';
    if (hasNotTemplate && isToggleControls && isLabelOnTop && isLabelAlignmentLeft) {
      $fieldEditorContainer.addClass(TOGGLE_CONTROLS_PADDING_CLASS);
    }
  } else {
    $rootElement.append($fieldEditorContainer);
  }
  //
  // Append field editor:
  //
  // eslint-disable-next-line @typescript-eslint/init-declarations
  let widgetInstance;
  if (template) {
    template.render({
      container: getPublicElement($fieldEditorContainer),
      model: getTemplateData(item, editorOptions, formOrLayoutManager),
      // @ts-expect-error ts-error
      onRendered() {
        const $validationTarget = getValidationTarget($fieldEditorContainer);
        const validationTargetInstance = tryGetValidationTargetInstance($validationTarget);
        subscribeWrapperInvalidClassToggle(validationTargetInstance);
      }
    });
  } else {
    const $div = $('<div>').appendTo($fieldEditorContainer);
    try {
      widgetInstance = createComponentCallback($div, item.editorType, editorOptions);
      widgetInstance.setAria('describedby', helpID);
      if (labelID) widgetInstance.setAria('labelledby', labelID);
      widgetInstance.setAria('required', isRequired);
    } catch (e) {
      // @ts-expect-error ts-error
      errors.log('E1035', e.message);
    }
  }
  //
  // Setup $validation:
  //
  const $validationTarget = getValidationTarget($fieldEditorContainer);
  const validationTargetInstance = $validationTarget === null || $validationTarget === void 0 ? void 0 : $validationTarget.data(VALIDATION_TARGET_CLASS);
  if (validationTargetInstance) {
    var _item$label;
    const isItemHaveCustomLabel = (_item$label = item.label) === null || _item$label === void 0 ? void 0 : _item$label.text;
    const itemName = isItemHaveCustomLabel ? null : name;
    const fieldName = isItemHaveCustomLabel ? item.label.text : itemName && captionize(itemName);
    let validationRules = null;
    if (isSimpleItem) {
      if (item.validationRules) {
        validationRules = item.validationRules;
      } else {
        const requiredMessage = format(requiredMessageTemplate, fieldName);
        validationRules = item.isRequired ? [{
          type: 'required',
          message: requiredMessage
        }] : null;
      }
    }
    if (Array.isArray(validationRules) && validationRules.length) {
      // @ts-expect-error ts-error
      createComponentCallback($validationTarget, Validator, {
        validationRules,
        validationGroup,
        dataGetter() {
          return {
            formItem: item
          };
        }
      });
    }
    subscribeWrapperInvalidClassToggle(validationTargetInstance);
  }
  //
  // Append help text elements:
  //
  if (helpText && isSimpleItem) {
    const $editorParent = $fieldEditorContainer.parent();
    // TODO: DOM hierarchy is changed here: new node is added between $editor and $editor.parent()
    $editorParent.append($('<div>').addClass(FIELD_ITEM_CONTENT_WRAPPER_CLASS).append($fieldEditorContainer).append($('<div>').addClass(FIELD_ITEM_HELP_TEXT_CLASS).attr('id', helpID).text(helpText)));
  }
  return {
    $fieldEditorContainer,
    $rootElement,
    widgetInstance
  };
}
