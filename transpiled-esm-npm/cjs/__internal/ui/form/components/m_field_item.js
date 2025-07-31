"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TOGGLE_CONTROLS_PADDING_CLASS = exports.LABEL_VERTICAL_ALIGNMENT_CLASS = exports.LABEL_HORIZONTAL_ALIGNMENT_CLASS = exports.FLEX_LAYOUT_CLASS = exports.FIELD_ITEM_REQUIRED_CLASS = exports.FIELD_ITEM_OPTIONAL_CLASS = exports.FIELD_ITEM_LABEL_ALIGN_CLASS = exports.FIELD_ITEM_HELP_TEXT_CLASS = exports.FIELD_ITEM_CONTENT_WRAPPER_CLASS = exports.FIELD_ITEM_CONTENT_LOCATION_CLASS = void 0;
exports.renderFieldItem = renderFieldItem;
var _click = require("../../../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../../../common/core/events/core/events_engine"));
var _element = require("../../../../core/element");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _inflector = require("../../../../core/utils/inflector");
var _string = require("../../../../core/utils/string");
var _themes = require("../../../../ui/themes");
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _m_label = require("../../../ui/form/components/m_label");
var _constants = require("../../../ui/form/constants");
var _m_validator = _interopRequireDefault(require("../../../ui/m_validator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FLEX_LAYOUT_CLASS = exports.FLEX_LAYOUT_CLASS = 'dx-flex-layout';
const FIELD_ITEM_OPTIONAL_CLASS = exports.FIELD_ITEM_OPTIONAL_CLASS = 'dx-field-item-optional';
const FIELD_ITEM_REQUIRED_CLASS = exports.FIELD_ITEM_REQUIRED_CLASS = 'dx-field-item-required';
const FIELD_ITEM_CONTENT_WRAPPER_CLASS = exports.FIELD_ITEM_CONTENT_WRAPPER_CLASS = 'dx-field-item-content-wrapper';
const FIELD_ITEM_CONTENT_LOCATION_CLASS = exports.FIELD_ITEM_CONTENT_LOCATION_CLASS = 'dx-field-item-content-location-';
const FIELD_ITEM_LABEL_ALIGN_CLASS = exports.FIELD_ITEM_LABEL_ALIGN_CLASS = 'dx-field-item-label-align';
const FIELD_ITEM_HELP_TEXT_CLASS = exports.FIELD_ITEM_HELP_TEXT_CLASS = 'dx-field-item-help-text';
const LABEL_VERTICAL_ALIGNMENT_CLASS = exports.LABEL_VERTICAL_ALIGNMENT_CLASS = 'dx-label-v-align';
const LABEL_HORIZONTAL_ALIGNMENT_CLASS = exports.LABEL_HORIZONTAL_ALIGNMENT_CLASS = 'dx-label-h-align';
const TOGGLE_CONTROLS_PADDING_CLASS = exports.TOGGLE_CONTROLS_PADDING_CLASS = 'dx-toggle-controls-paddings';
const TEMPLATE_WRAPPER_CLASS = 'dx-template-wrapper';
const VALIDATION_TARGET_CLASS = 'dx-validation-target';
const INVALID_CLASS = 'dx-invalid';
function getValidationTarget($fieldEditorContainer) {
  const $editor = $fieldEditorContainer.children().first();
  return $editor.hasClass(TEMPLATE_WRAPPER_CLASS) ? $editor.children().first() : $editor;
}
function subscribeWrapperInvalidClassToggle(validationTargetInstance) {
  if (validationTargetInstance && (0, _themes.isMaterialBased)((0, _themes.current)())) {
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
      (0, _renderer.default)(element).parents(wrapperClass).toggleClass(INVALID_CLASS, isValid === false && (component._isFocused() || validationMessageMode === 'always'));
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
function renderFieldItem(_ref2) {
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
  const $rootElement = (0, _renderer.default)('<div>').addClass(rootElementCssClassList.join(' ')).appendTo($parent);
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
  const $fieldEditorContainer = (0, _renderer.default)('<div>');
  $fieldEditorContainer.data('dx-form-item', item);
  const locationClassSuffix = {
    right: 'left',
    left: 'right',
    top: 'bottom'
  };
  $fieldEditorContainer.addClass(_constants.FIELD_ITEM_CONTENT_CLASS)
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
    $label = (0, _m_label.renderLabel)(labelOptions);
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
      _events_engine.default.on($label, _click.name, () => {
        // @ts-expect-error ts-error
        _events_engine.default.trigger($fieldEditorContainer.children(), _click.name);
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
      container: (0, _element.getPublicElement)($fieldEditorContainer),
      model: getTemplateData(item, editorOptions, formOrLayoutManager),
      // @ts-expect-error ts-error
      onRendered() {
        const $validationTarget = getValidationTarget($fieldEditorContainer);
        const validationTargetInstance = tryGetValidationTargetInstance($validationTarget);
        subscribeWrapperInvalidClassToggle(validationTargetInstance);
      }
    });
  } else {
    const $div = (0, _renderer.default)('<div>').appendTo($fieldEditorContainer);
    try {
      widgetInstance = createComponentCallback($div, item.editorType, editorOptions);
      widgetInstance.setAria('describedby', helpID);
      if (labelID) widgetInstance.setAria('labelledby', labelID);
      widgetInstance.setAria('required', isRequired);
    } catch (e) {
      // @ts-expect-error ts-error
      _ui.default.log('E1035', e.message);
    }
  }
  //
  // Setup $validation:
  //
  const $validationTarget = getValidationTarget($fieldEditorContainer);
  const validationTargetInstance = $validationTarget && $validationTarget.data(VALIDATION_TARGET_CLASS);
  if (validationTargetInstance) {
    const isItemHaveCustomLabel = item.label && item.label.text;
    const itemName = isItemHaveCustomLabel ? null : name;
    const fieldName = isItemHaveCustomLabel ? item.label.text : itemName && (0, _inflector.captionize)(itemName);
    let validationRules = null;
    if (isSimpleItem) {
      if (item.validationRules) {
        validationRules = item.validationRules;
      } else {
        const requiredMessage = (0, _string.format)(requiredMessageTemplate, fieldName);
        validationRules = item.isRequired ? [{
          type: 'required',
          message: requiredMessage
        }] : null;
      }
    }
    if (Array.isArray(validationRules) && validationRules.length) {
      // @ts-expect-error ts-error
      createComponentCallback($validationTarget, _m_validator.default, {
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
    $editorParent.append((0, _renderer.default)('<div>').addClass(FIELD_ITEM_CONTENT_WRAPPER_CLASS).append($fieldEditorContainer).append((0, _renderer.default)('<div>').addClass(FIELD_ITEM_HELP_TEXT_CLASS).attr('id', helpID).text(helpText)));
  }
  return {
    $fieldEditorContainer,
    $rootElement,
    widgetInstance
  };
}