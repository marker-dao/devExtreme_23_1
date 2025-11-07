/**
* DevExtreme (esm/__internal/ui/form/form.layout_manager.utils.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Guid from '../../../core/guid';
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import { captionize } from '../../../core/utils/inflector';
import { isDefined, isFunction } from '../../../core/utils/type';
import { SIMPLE_ITEM_TYPE } from '../../ui/form/constants';
const EDITORS_WITH_ARRAY_VALUE = ['dxTagBox', 'dxRangeSlider', 'dxDateRangeBox'];
const EDITORS_WITH_MULTIPLE_INPUT_FIELDS = ['dxRangeSlider', 'dxDateRangeBox'];
const EDITORS_WITH_SPECIFIC_LABELS = ['dxRangeSlider', 'dxSlider'];
export const EDITORS_WITHOUT_LABELS = ['dxCalendar', 'dxCheckBox', 'dxHtmlEditor', 'dxRadioGroup', 'dxRangeSlider', 'dxSlider', 'dxSwitch'];
const DROP_DOWN_EDITORS = ['dxSelectBox', 'dxDropDownBox', 'dxTagBox', 'dxLookup', 'dxAutocomplete', 'dxColorBox', 'dxDateBox', 'dxDateRangeBox'];
// eslint-disable-next-line @typescript-eslint/naming-convention
function _hasRequiredRuleInSet(rules) {
  return rules === null || rules === void 0 ? void 0 : rules.some(rule => rule.type === 'required');
}
export function convertToLabelMarkOptions(_ref, isRequired) {
  let {
    showRequiredMark,
    requiredMark,
    showOptionalMark,
    optionalMark
  } = _ref;
  return {
    showRequiredMark: showRequiredMark && isRequired,
    requiredMark,
    showOptionalMark: showOptionalMark && !isRequired,
    optionalMark
  };
}
// eslint-disable-next-line @typescript-eslint/naming-convention
function _convertToLabelOptions(_ref2) {
  let {
    item,
    id,
    isRequired,
    managerMarkOptions,
    showColonAfterLabel,
    labelLocation,
    labelTemplate,
    formLabelMode,
    onLabelTemplateRendered
  } = _ref2;
  const isEditorWithoutLabels = EDITORS_WITHOUT_LABELS.includes(item.editorType);
  const labelOptions = extend({
    showColon: showColonAfterLabel,
    location: labelLocation,
    id,
    visible: formLabelMode === 'outside' || isEditorWithoutLabels && formLabelMode !== 'hidden',
    isRequired
  }, item ? item.label : {}, {
    markOptions: convertToLabelMarkOptions(managerMarkOptions, isRequired),
    labelTemplate,
    onLabelTemplateRendered
  });
  const editorsRequiringIdForLabel = ['dxRadioGroup', 'dxCheckBox', 'dxLookup', 'dxSlider', 'dxRangeSlider', 'dxSwitch', 'dxHtmlEditor', 'dxDateRangeBox']; // TODO: support "dxCalendar"
  if (editorsRequiringIdForLabel.includes(item.editorType)) {
    labelOptions.labelID = `dx-label-${new Guid()}`;
  }
  if (!labelOptions.text && item.dataField) {
    labelOptions.text = captionize(item.dataField);
  }
  if (labelOptions.text) {
    labelOptions.textWithoutColon = labelOptions.text;
    labelOptions.text += labelOptions.showColon ? ':' : '';
  }
  return labelOptions;
}
function getDropDownEditorOptions($parent, editorType, editorInputId) {
  const isDropDownEditor = DROP_DOWN_EDITORS.includes(editorType);
  if (!isDropDownEditor) {
    return {};
  }
  return {
    onPopupInitialized: _ref3 => {
      let {
        component,
        popup
      } = _ref3;
      const {
        openOnFieldClick
      } = component.option();
      const {
        hideOnOutsideClick: initialHideOnOutsideClick
      } = popup.option();
      // Do not overwrite boolean hideOnOutsideClick
      if (openOnFieldClick && isFunction(initialHideOnOutsideClick)) {
        const hideOnOutsideClick = e => {
          const $target = $(e.target);
          const $label = $parent.find(`label[for="${editorInputId}"]`);
          const isLabelClicked = !!$target.closest($label).length;
          return !isLabelClicked && initialHideOnOutsideClick(e);
        };
        component.option('dropDownOptions', {
          hideOnOutsideClick
        });
        popup.option({
          hideOnOutsideClick
        });
      }
    }
  };
}
// eslint-disable-next-line @typescript-eslint/naming-convention
function _convertToEditorOptions(_ref4) {
  let {
    $parent,
    editorType,
    defaultEditorName,
    editorValue,
    canAssignUndefinedValueToEditor,
    externalEditorOptions,
    editorInputId,
    editorValidationBoundary,
    editorStylingMode,
    formLabelMode,
    labelText,
    labelMark
  } = _ref4;
  const editorOptionsWithValue = {};
  if (editorValue !== undefined || canAssignUndefinedValueToEditor) {
    editorOptionsWithValue.value = editorValue;
  }
  if (EDITORS_WITH_ARRAY_VALUE.includes(editorType)) {
    editorOptionsWithValue.value = editorOptionsWithValue.value || [];
  }
  let labelMode = externalEditorOptions === null || externalEditorOptions === void 0 ? void 0 : externalEditorOptions.labelMode;
  if (!isDefined(labelMode)) {
    labelMode = formLabelMode === 'outside' ? 'hidden' : formLabelMode;
  }
  const stylingMode = (externalEditorOptions === null || externalEditorOptions === void 0 ? void 0 : externalEditorOptions.stylingMode) || editorStylingMode;
  const useSpecificLabelOptions = EDITORS_WITH_SPECIFIC_LABELS.includes(editorType);
  const dropDownEditorOptions = getDropDownEditorOptions($parent, editorType, editorInputId);
  const result = extend(true, editorOptionsWithValue, externalEditorOptions, dropDownEditorOptions, {
    inputAttr: {
      id: editorInputId
    },
    validationBoundary: editorValidationBoundary,
    stylingMode,
    label: useSpecificLabelOptions ? externalEditorOptions === null || externalEditorOptions === void 0 ? void 0 : externalEditorOptions.label : labelText,
    labelMode,
    labelMark
  });
  if (externalEditorOptions) {
    if (result.dataSource) {
      result.dataSource = externalEditorOptions.dataSource;
    }
    if (result.items) {
      result.items = externalEditorOptions.items;
    }
  }
  if (defaultEditorName) {
    if (EDITORS_WITH_MULTIPLE_INPUT_FIELDS.includes(editorType)) {
      if (editorType === 'dxRangeSlider') {
        // eslint-disable-next-line max-depth
        if (!result.startName) {
          result.startName = `${defaultEditorName}Start`;
        }
        // eslint-disable-next-line max-depth
        if (!result.endName) {
          result.endName = `${defaultEditorName}End`;
        }
      }
      if (editorType === 'dxDateRangeBox') {
        // eslint-disable-next-line max-depth
        if (!result.startDateName) {
          result.startDateName = `${defaultEditorName}Start`;
        }
        // eslint-disable-next-line max-depth
        if (!result.endDateName) {
          result.endDateName = `${defaultEditorName}End`;
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return result;
    }
    if (!result.name) {
      result.name = defaultEditorName;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result;
}
export function convertToRenderFieldItemOptions(_ref5) {
  let {
    $parent,
    rootElementCssClassList,
    formOrLayoutManager,
    createComponentCallback,
    item,
    template,
    labelTemplate,
    name,
    formLabelLocation,
    requiredMessageTemplate,
    validationGroup,
    editorValue,
    canAssignUndefinedValueToEditor,
    editorValidationBoundary,
    editorStylingMode,
    showColonAfterLabel,
    managerLabelLocation,
    itemId,
    managerMarkOptions,
    labelMode,
    onLabelTemplateRendered
  } = _ref5;
  const isRequired = isDefined(item.isRequired) ? item.isRequired : !!_hasRequiredRuleInSet(item.validationRules);
  const isSimpleItem = item.itemType === SIMPLE_ITEM_TYPE;
  const helpID = item.helpText ? `dx-${new Guid()}` : null;
  const labelOptions = _convertToLabelOptions({
    item,
    id: itemId,
    isRequired,
    managerMarkOptions,
    showColonAfterLabel,
    labelLocation: managerLabelLocation,
    formLabelMode: labelMode,
    labelTemplate,
    onLabelTemplateRendered
  });
  const needRenderLabel = !!labelOptions.visible
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  && !!(labelOptions.text || labelOptions.labelTemplate && isSimpleItem);
  const {
    location: labelLocation,
    labelID
  } = labelOptions;
  const labelNeedBaselineAlign = labelLocation !== 'top' && ['dxTextArea', 'dxRadioGroup', 'dxCalendar', 'dxHtmlEditor'].includes(item.editorType ?? '');
  const editorOptions = _convertToEditorOptions({
    $parent,
    editorType: item.editorType,
    editorValue,
    defaultEditorName: item.dataField,
    canAssignUndefinedValueToEditor,
    externalEditorOptions: item.editorOptions,
    editorInputId: itemId,
    editorValidationBoundary,
    editorStylingMode,
    formLabelMode: labelMode,
    labelText: labelOptions.textWithoutColon,
    labelMark: labelOptions.markOptions.showRequiredMark ? String.fromCharCode(160) + labelOptions.markOptions.requiredMark : ''
  });
  const needRenderOptionalMarkAsHelpText = labelOptions.markOptions.showOptionalMark && !labelOptions.visible && editorOptions.labelMode !== 'hidden' && !isDefined(item.helpText);
  const helpText = needRenderOptionalMarkAsHelpText ? labelOptions.markOptions.optionalMark : item.helpText;
  return {
    $parent,
    rootElementCssClassList,
    formOrLayoutManager,
    createComponentCallback,
    labelOptions,
    labelNeedBaselineAlign,
    labelLocation,
    needRenderLabel,
    item,
    isSimpleItem,
    isRequired,
    template,
    helpID,
    labelID,
    name,
    helpText,
    formLabelLocation,
    requiredMessageTemplate,
    validationGroup,
    editorOptions
  };
}
export function getLabelMarkText(_ref6) {
  let {
    showRequiredMark,
    requiredMark,
    showOptionalMark,
    optionalMark
  } = _ref6;
  if (!showRequiredMark && !showOptionalMark) {
    return '';
  }
  return String.fromCharCode(160) + (showRequiredMark ? requiredMark : optionalMark);
}
