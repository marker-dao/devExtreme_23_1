/**
* DevExtreme (esm/__internal/ui/button/button.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { click } from '../../../common/core/events/short';
import messageLocalization from '../../../common/core/localization/message';
import devices from '../../../core/devices';
import { convertRulesToOptions, createDefaultOptionRules } from '../../../core/options/utils';
import { getImageSourceType } from '../../../core/utils/icon';
import { camelize } from '../../../core/utils/inflector';
import { current, isMaterial } from '../../../ui/themes';
import { BaseWidgetDefaultProps } from '../../core/r1/base_props';
import { createReRenderEffect, InfernoEffect, InfernoWrapperComponent } from '../../core/r1/runtime/inferno/index';
import { getTemplate } from '../../core/r1/utils/index';
import { Widget } from '../../core/r1/widget';
import { combineClasses } from '../../core/utils/combine_classes';
import { createRef as infernoCreateRef } from 'inferno';
import { Icon } from './icon';
import { InkRipple } from './ink_ripple';
export const BUTTON_CLASS = 'dx-button';
const stylingModes = ['outlined', 'text', 'contained'];
export const buttonComponentProps = ['accessKey', 'activeStateEnabled', 'className', 'disabled', 'focusStateEnabled', 'height', 'hint', 'hoverStateEnabled', 'icon', 'iconPosition', 'iconTemplate', 'onClick', 'onKeyDown', 'onSubmit', 'pressed', 'rtlEnabled', 'stylingMode', 'tabIndex', 'template', 'templateData', 'text', 'type', 'useInkRipple', 'useSubmitBehavior', 'visible', 'width'];
const getCssClasses = model => {
  const {
    icon,
    iconPosition,
    stylingMode,
    text,
    type
  } = model;
  const isValidStylingMode = stylingMode && stylingModes.includes(stylingMode);
  const classesMap = {
    [BUTTON_CLASS]: true,
    [`dx-button-mode-${isValidStylingMode ? stylingMode : 'contained'}`]: true,
    [`dx-button-${type ?? 'normal'}`]: true,
    'dx-button-has-text': !!text,
    'dx-button-has-icon': !!icon,
    'dx-button-icon-right': iconPosition !== 'left'
  };
  return combineClasses(classesMap);
};
const omit = (obj, excludedKeys) => {
  const excludedSet = new Set(excludedKeys);
  return Object.keys(obj).reduce((result, key) => {
    if (!excludedSet.has(key)) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};
export const defaultButtonProps = _extends({}, BaseWidgetDefaultProps, {
  activeStateEnabled: true,
  hoverStateEnabled: true,
  icon: '',
  iconPosition: 'left',
  stylingMode: 'contained',
  text: '',
  type: 'normal',
  useInkRipple: false,
  useSubmitBehavior: false,
  templateData: {}
});
export const defaultOptionRules = createDefaultOptionRules([{
  device: () => devices.real().deviceType === 'desktop' && !devices.isSimulator(),
  options: {
    focusStateEnabled: true
  }
}, {
  device: () => isMaterial(current()),
  options: {
    useInkRipple: true
  }
}]);
export class Button extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.contentRef = infernoCreateRef();
    this.inkRippleRef = infernoCreateRef();
    this.submitInputRef = infernoCreateRef();
    this.widgetRef = infernoCreateRef();
    this.__getterCache = {};
    this.state = {};
    this.focus = this.focus.bind(this);
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.submitEffect = this.submitEffect.bind(this);
    this.onActive = this.onActive.bind(this);
    this.onInactive = this.onInactive.bind(this);
    this.onWidgetClick = this.onWidgetClick.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }
  createEffects() {
    return [new InfernoEffect(this.submitEffect, [this.props.onSubmit, this.props.useSubmitBehavior]), createReRenderEffect()];
  }
  updateEffects() {
    var _this$_effects$;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 || _this$_effects$.update([this.props.onSubmit, this.props.useSubmitBehavior]);
  }
  submitEffect() {
    const namespace = 'UIFeedback';
    const {
      onSubmit,
      useSubmitBehavior
    } = this.props;
    const submitInput = this.submitInputRef.current;
    if (useSubmitBehavior && onSubmit) {
      click.on(submitInput, event => onSubmit({
        event,
        submitInput
      }), {
        namespace
      });
      return () => click.off(submitInput, {
        namespace
      });
    }
    return undefined;
  }
  onActive(event) {
    if (this.props.useInkRipple) {
      var _this$inkRippleRef$cu;
      (_this$inkRippleRef$cu = this.inkRippleRef.current) === null || _this$inkRippleRef$cu === void 0 || _this$inkRippleRef$cu.showWave({
        element: this.contentRef.current,
        event
      });
    }
  }
  onInactive(event) {
    if (this.props.useInkRipple) {
      var _this$inkRippleRef$cu2;
      (_this$inkRippleRef$cu2 = this.inkRippleRef.current) === null || _this$inkRippleRef$cu2 === void 0 || _this$inkRippleRef$cu2.hideWave({
        element: this.contentRef.current,
        event
      });
    }
  }
  onWidgetClick(event) {
    const {
      onClick,
      useSubmitBehavior
    } = this.props;
    onClick === null || onClick === void 0 || onClick({
      event
    });
    if (useSubmitBehavior) {
      var _this$submitInputRef$;
      (_this$submitInputRef$ = this.submitInputRef.current) === null || _this$submitInputRef$ === void 0 || _this$submitInputRef$.click();
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  keyDown(e) {
    const {
      onKeyDown
    } = this.props;
    const {
      keyName,
      originalEvent,
      which
    } = e;
    const result = onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);
    if (result !== null && result !== void 0 && result.cancel) {
      return result;
    }
    if (keyName === 'space' || which === 'space' || keyName === 'enter' || which === 'enter') {
      originalEvent.preventDefault();
      this.onWidgetClick(originalEvent);
    }
    return undefined;
  }
  get aria() {
    const {
      icon,
      text
    } = this.props;
    let label = text ?? '';
    if (!text && icon) {
      const iconSource = getImageSourceType(icon);
      switch (iconSource) {
        case 'image':
          {
            const notURLRegexp = /^(?!(?:https?:\/\/)|(?:ftp:\/\/)|(?:www\.))[^\s]+$/;
            const isPathToImage = !icon.includes('base64') && notURLRegexp.test(icon);
            label = isPathToImage ? icon.replace(/.+\/([^.]+)\..+$/, '$1') : '';
            break;
          }
        case 'dxIcon':
          label = messageLocalization.format(camelize(icon, true)) || icon;
          break;
        case 'fontIcon':
          label = icon;
          break;
        case 'svg':
          {
            var _titleRegexp$exec;
            const titleRegexp = /<title>(.*?)<\/title>/;
            label = ((_titleRegexp$exec = titleRegexp.exec(icon)) === null || _titleRegexp$exec === void 0 ? void 0 : _titleRegexp$exec[1]) ?? '';
            break;
          }
        default:
          break;
      }
    }
    return _extends({
      role: 'button'
    }, label ? {
      label
    } : {});
  }
  get cssClasses() {
    return getCssClasses(this.props);
  }
  get iconSource() {
    return this.props.icon ?? '';
  }
  get inkRippleConfig() {
    if (this.__getterCache.inkRippleConfig === undefined) {
      const {
        icon,
        text
      } = this.props;
      this.__getterCache.inkRippleConfig = !text && icon ? {
        isCentered: true,
        useHoldAnimation: false,
        waveSizeCoefficient: 1
      } : {};
    }
    return this.__getterCache.inkRippleConfig;
  }
  get buttonTemplateData() {
    const {
      icon,
      text,
      templateData
    } = this.props;
    return _extends({
      icon,
      text
    }, templateData);
  }
  get restAttributes() {
    const excludedKeys = [...buttonComponentProps, 'children'];
    return omit(this.props, excludedKeys);
  }
  focus() {
    var _this$widgetRef$curre;
    (_this$widgetRef$curre = this.widgetRef.current) === null || _this$widgetRef$curre === void 0 || _this$widgetRef$curre.focus();
  }
  activate() {
    var _this$widgetRef$curre2;
    (_this$widgetRef$curre2 = this.widgetRef.current) === null || _this$widgetRef$curre2 === void 0 || _this$widgetRef$curre2.activate();
  }
  deactivate() {
    var _this$widgetRef$curre3;
    (_this$widgetRef$curre3 = this.widgetRef.current) === null || _this$widgetRef$curre3 === void 0 || _this$widgetRef$curre3.deactivate();
  }
  componentWillUpdate(nextProps) {
    super.componentWillUpdate();
    if (this.props.icon !== nextProps.icon || this.props.text !== nextProps.text) {
      this.__getterCache.inkRippleConfig = undefined;
    }
  }
  render() {
    const {
      children,
      iconPosition,
      text
    } = this.props;
    const ButtonTemplate = getTemplate(this.props.template);
    const IconTemplate = getTemplate(this.props.iconTemplate);
    const renderText = !this.props.template && !children && text !== '';
    const isIconLeft = iconPosition === 'left';
    const iconComponent = !ButtonTemplate && !children && (this.iconSource || IconTemplate) && createComponentVNode(2, Icon, {
      "source": this.iconSource,
      "position": iconPosition,
      "iconTemplate": IconTemplate
    });
    return normalizeProps(createComponentVNode(2, Widget, _extends({
      "accessKey": this.props.accessKey,
      "activeStateEnabled": this.props.activeStateEnabled,
      "aria": this.aria,
      "className": this.props.className,
      "classes": this.cssClasses,
      "disabled": this.props.disabled,
      "focusStateEnabled": this.props.focusStateEnabled,
      "height": this.props.height,
      "hint": this.props.hint,
      "hoverStateEnabled": this.props.hoverStateEnabled,
      "onActive": this.onActive,
      "onClick": this.onWidgetClick,
      "onInactive": this.onInactive,
      "onKeyDown": this.keyDown,
      "rtlEnabled": this.props.rtlEnabled,
      "tabIndex": this.props.tabIndex,
      "visible": this.props.visible,
      "width": this.props.width
    }, this.restAttributes, {
      children: createVNode(1, "div", "dx-button-content", [ButtonTemplate ? ButtonTemplate({
        data: this.buttonTemplateData
      }) : children, isIconLeft && iconComponent, renderText && createVNode(1, "span", "dx-button-text", text, 0), !isIconLeft && iconComponent, this.props.useSubmitBehavior && createVNode(64, "input", "dx-button-submit-input", null, 1, {
        "type": "submit",
        "tabindex": -1
      }, null, this.submitInputRef), this.props.useInkRipple && createComponentVNode(2, InkRipple, {
        "config": this.inkRippleConfig
      }, null, this.inkRippleRef)], 0, null, null, this.contentRef)
    }), null, this.widgetRef));
  }
}
Button.defaultProps = _extends({}, defaultButtonProps, convertRulesToOptions(defaultOptionRules));
// eslint-disable-next-line @typescript-eslint/naming-convention
const __defaultOptionRules = [];
export function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  Button.defaultProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(Button.defaultProps), Object.getOwnPropertyDescriptors(convertRulesToOptions(defaultOptionRules)), Object.getOwnPropertyDescriptors(convertRulesToOptions(__defaultOptionRules))));
}
