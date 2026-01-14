import registerComponent from '../../../core/component_registrator';
import { getImageSourceType } from '../../../core/utils/icon';
import ValidationEngine from '../../../ui/validation_engine';
import { ComponentWrapper } from '../../core/r1/component_wrapper';
import { Button as ButtonComponent, buttonComponentProps, defaultOptions } from './button';
// STYLE button
export default class Button extends ComponentWrapper {
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
  get _validationGroupConfig() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ValidationEngine.getGroupConfig(this._findGroup());
  }
  getDefaultTemplateNames() {
    return ['content'];
  }
  getSupportedKeyNames() {
    return ['space', 'enter'];
  }
  getProps() {
    const props = super.getProps();
    props.onClick = _ref => {
      let {
        event
      } = _ref;
      this._clickAction({
        event,
        validationGroup: this._validationGroupConfig
      });
    };
    props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
    const iconType = getImageSourceType(props.icon);
    if (iconType === 'svg') {
      props.iconTemplate = this._createTemplateComponent(() => props.icon);
    }
    return props;
  }
  get viewRef() {
    return super.viewRef;
  }
  get _templatesInfo() {
    return {
      template: 'content'
    };
  }
  _toggleActiveState(_, value) {
    if (value) {
      var _this$viewRef;
      (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 || _this$viewRef.activate();
    } else {
      var _this$viewRef2;
      (_this$viewRef2 = this.viewRef) === null || _this$viewRef2 === void 0 || _this$viewRef2.deactivate();
    }
  }
  _getSubmitAction() {
    let needValidate = true;
    let validationStatus = 'valid';
    // @ts-expect-error badly typed base class
    return this._createAction(_ref2 => {
      let {
        event,
        submitInput
      } = _ref2;
      if (needValidate) {
        const validationGroup = this._validationGroupConfig;
        if (validationGroup !== undefined && validationGroup !== '') {
          const validationResult = validationGroup.validate();
          validationStatus = validationResult.status;
          if (validationResult.status === 'pending') {
            needValidate = false;
            this.option('disabled', true);
            validationResult.complete.then(_ref3 => {
              let {
                status
              } = _ref3;
              this.option('disabled', false);
              validationStatus = status;
              if (validationStatus === 'valid') {
                submitInput.click();
              }
              needValidate = true;
            });
          }
        }
      }
      if (validationStatus !== 'valid') {
        event.preventDefault();
      }
      event.stopPropagation();
    });
  }
  _initializeComponent() {
    super._initializeComponent();
    this._addAction('onSubmit', this._getSubmitAction());
    this._clickAction = this._createClickAction();
  }
  _initMarkup() {
    super._initMarkup();
    const $content = this.$element().find('.dx-button-content').first();
    const $template = $content.children().filter('.dx-template-wrapper');
    const $input = $content.children().filter('.dx-button-submit-input');
    if ($template.length) {
      $template.addClass('dx-button-content');
      $template.append($input);
      $content.replaceWith($template);
    }
  }
  _patchOptionValues(options) {
    return super._patchOptionValues(Object.assign({}, options, {
      templateData: options._templateData
    }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _findGroup() {
    const $element = this.$element();
    const validationGroup = this.option('validationGroup');
    return validationGroup !== undefined && validationGroup !== '' ? validationGroup
    // @ts-expect-error badly typed base class and ValidationEngine
    : ValidationEngine.findGroup($element, this._modelByElement($element));
  }
  _createClickAction() {
    // @ts-expect-error badly typed base class
    return this._createActionByOption('onClick', {
      excludeValidators: ['readOnly']
    });
  }
  _optionChanged(option) {
    switch (option.name) {
      case 'onClick':
        this._clickAction = this._createClickAction();
        break;
      default:
        break;
    }
    super._optionChanged(option);
  }
  focus() {
    var _this$viewRef3;
    (_this$viewRef3 = this.viewRef) === null || _this$viewRef3 === void 0 || _this$viewRef3.focus();
  }
  activate() {
    var _this$viewRef4;
    (_this$viewRef4 = this.viewRef) === null || _this$viewRef4 === void 0 || _this$viewRef4.activate();
  }
  deactivate() {
    var _this$viewRef5;
    (_this$viewRef5 = this.viewRef) === null || _this$viewRef5 === void 0 || _this$viewRef5.deactivate();
  }
  _getActionConfigs() {
    return {
      onClick: {
        excludeValidators: ['readOnly']
      },
      onSubmit: {}
    };
  }
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: ['onSubmit'],
      templates: ['template', 'iconTemplate'],
      props: buttonComponentProps
    };
  }
  // @ts-expect-error types error in R1
  get _viewComponent() {
    return ButtonComponent;
  }
}
registerComponent('dxButton', Button);
// @ts-expect-error types error in R1
Button.defaultOptions = defaultOptions;