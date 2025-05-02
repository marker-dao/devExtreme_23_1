import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["accessKey", "activeStateEnabled", "aria", "children", "className", "classes", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "isDirty", "isValid", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "tabIndex", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];
import { createFragment, createComponentVNode, normalizeProps } from "inferno";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Guid from '../../../../core/guid';
import { convertRulesToOptions } from '../../../../core/options/utils';
import { createReRenderEffect, InfernoEffect, InfernoWrapperComponent } from '../../../core/r1/runtime/inferno/index';
import { Widget, WidgetDefaultProps } from '../../../core/r1/widget';
import { combineClasses } from '../../../core/utils/combine_classes';
import { createRef as infernoCreateRef, Fragment } from 'inferno';
import { ValidationMessage } from '../wrappers/validation_message';
const getCssClasses = model => {
  const {
    classes,
    isValid,
    readOnly
  } = model;
  const classesMap = {
    'dx-state-readonly': !!readOnly,
    'dx-invalid': !isValid,
    [String(classes)]: !!classes
  };
  return combineClasses(classesMap);
};
export const defaultEditorProps = _extends({}, WidgetDefaultProps, {
  readOnly: false,
  name: '',
  validationError: null,
  validationErrors: null,
  validationMessageMode: 'auto',
  validationMessagePosition: 'bottom',
  validationStatus: 'valid',
  isValid: true,
  isDirty: false,
  inputAttr: {},
  defaultValue: null,
  valueChange: () => {}
});
export class Editor extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.widgetRef = infernoCreateRef();
    this.rootElementRef = infernoCreateRef();
    this.__getterCache = {};
    this.state = {
      validationMessageGuid: `dx-${new Guid()}`,
      isValidationMessageVisible: false,
      value: this.props.value !== undefined ? this.props.value : this.props.defaultValue
    };
    this.updateValidationMessageVisibility = this.updateValidationMessageVisibility.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.onFocusIn = this.onFocusIn.bind(this);
  }
  createEffects() {
    return [new InfernoEffect(this.updateValidationMessageVisibility, [this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors]), createReRenderEffect()];
  }
  updateEffects() {
    var _this$_effects;
    (_this$_effects = this._effects) === null || _this$_effects === void 0 || (_this$_effects = _this$_effects[0]) === null || _this$_effects === void 0 || _this$_effects.update([this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors]);
  }
  updateValidationMessageVisibility() {
    this.setState(() => ({
      isValidationMessageVisible: this.shouldShowValidationMessage
    }));
  }
  onFocusIn(event) {
    const {
      onFocusIn
    } = this.props;
    onFocusIn === null || onFocusIn === void 0 || onFocusIn(event);
  }
  get cssClasses() {
    return `${getCssClasses(_extends({}, this.props, {
      value: this.props.value !== undefined ? this.props.value : this.state.value
    }))}`;
  }
  get shouldShowValidationMessage() {
    const {
      isValid,
      validationStatus
    } = this.props;
    const validationErrors = this.validationErrors ?? [];
    const isEditorValid = isValid && validationStatus !== 'invalid';
    return !isEditorValid && validationErrors.length > 0;
  }
  get aria() {
    const {
      isValid,
      readOnly
    } = this.props;
    const result = {
      readonly: readOnly ? 'true' : 'false',
      invalid: !isValid ? 'true' : 'false'
    };
    if (this.shouldShowValidationMessage) {
      result.describedBy = this.state.validationMessageGuid;
    }
    return _extends({}, result, this.props.aria);
  }
  get validationErrors() {
    if (this.__getterCache.validationErrors !== undefined) {
      return this.__getterCache.validationErrors;
    }
    // eslint-disable-next-line no-return-assign, @typescript-eslint/no-explicit-any
    return this.__getterCache.validationErrors = (() => {
      const {
        validationError,
        validationErrors
      } = this.props;
      let allValidationErrors = validationErrors && [...validationErrors];
      if (!allValidationErrors && validationError) {
        allValidationErrors = [_extends({}, validationError)];
      }
      return allValidationErrors;
    })();
  }
  get validationMessageTarget() {
    var _this$rootElementRef;
    return (_this$rootElementRef = this.rootElementRef) === null || _this$rootElementRef === void 0 ? void 0 : _this$rootElementRef.current;
  }
  get restAttributes() {
    const _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  focus() {
    this.widgetRef.current.focus();
  }
  blur() {
    this.widgetRef.current.blur();
  }
  componentWillUpdate(nextProps) {
    super.componentWillUpdate();
    if (this.props.validationError !== nextProps.validationError || this.props.validationErrors !== nextProps.validationErrors) {
      this.__getterCache.validationErrors = undefined;
    }
  }
  render() {
    return normalizeProps(createComponentVNode(2, Widget, _extends({
      "rootElementRef": this.rootElementRef,
      "aria": this.aria,
      "classes": this.cssClasses,
      "activeStateEnabled": this.props.activeStateEnabled,
      "focusStateEnabled": this.props.focusStateEnabled,
      "hoverStateEnabled": this.props.hoverStateEnabled,
      "accessKey": this.props.accessKey,
      "className": this.props.className,
      "rtlEnabled": this.props.rtlEnabled,
      "hint": this.props.hint,
      "disabled": this.props.disabled,
      "height": this.props.height,
      "width": this.props.width,
      "onFocusIn": this.props.onFocusIn,
      "onClick": this.props.onClick,
      "onKeyDown": this.props.onKeyDown,
      "tabIndex": this.props.tabIndex,
      "visible": this.props.visible
    }, this.restAttributes, {
      children: createFragment([this.props.children, this.state.isValidationMessageVisible && createComponentVNode(2, ValidationMessage, {
        "validationErrors": this.validationErrors,
        "mode": this.props.validationMessageMode,
        "positionSide": this.props.validationMessagePosition,
        "rtlEnabled": this.props.rtlEnabled,
        "target": this.validationMessageTarget,
        "boundary": this.validationMessageTarget,
        "visualContainer": this.validationMessageTarget,
        "contentId": this.state.validationMessageGuid
      })], 0)
    }), null, this.widgetRef));
  }
}
// eslint-disable-next-line @typescript-eslint/naming-convention
function __processTwoWayProps(defaultProps) {
  const twoWayProps = ['value'];
  return Object.keys(defaultProps).reduce((props, propName) => {
    const propValue = defaultProps[propName];
    const defaultPropName = twoWayProps.some(p => p === propName) ? `default${propName.charAt(0).toUpperCase()}${propName.slice(1)}` : propName;
    props[defaultPropName] = propValue;
    return props;
  }, {});
}
Editor.defaultProps = defaultEditorProps;
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-explicit-any
const __defaultOptionRules = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  Editor.defaultProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(Editor.defaultProps), Object.getOwnPropertyDescriptors(__processTwoWayProps(convertRulesToOptions(__defaultOptionRules)))));
}