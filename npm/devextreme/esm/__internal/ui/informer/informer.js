/**
* DevExtreme (esm/__internal/ui/informer/informer.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from '../../../core/component_registrator';
import $ from '../../../core/renderer';
import { getImageContainer } from '../../core/utils/m_icon';
import Widget from '../../core/widget/widget';
export const INFORMER_CLASS = 'dx-informer';
const INFORMER_ERROR_CLASS = 'dx-informer-error';
const INFORMER_INFO_CLASS = 'dx-informer-info';
const INFORMER_ALIGNMENT_START_CLASS = 'dx-informer-alignment-start';
const INFORMER_ALIGNMENT_CENTER_CLASS = 'dx-informer-alignment-center';
const INFORMER_ALIGNMENT_END_CLASS = 'dx-informer-alignment-end';
const INFORMER_BG_CLASS = 'dx-informer-bg';
const INFORMER_TEXT_CLASS = 'dx-informer-text';
const INFORMER_ICON_CLASS = 'dx-informer-icon';
class Informer extends Widget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      contentAlignment: 'center',
      icon: '',
      showBackground: true,
      text: '',
      type: 'error'
    });
  }
  _initMarkup() {
    const {
      showBackground
    } = this.option();
    this.$element().addClass(INFORMER_CLASS);
    this.$element().toggleClass(INFORMER_BG_CLASS, showBackground);
    this._setAlignmentClass();
    this._setTypeClass();
    super._initMarkup();
    this._renderIcon();
    this._renderText();
  }
  _setAlignmentClass() {
    this.$element().removeClass(INFORMER_ALIGNMENT_START_CLASS).removeClass(INFORMER_ALIGNMENT_CENTER_CLASS).removeClass(INFORMER_ALIGNMENT_END_CLASS);
    const {
      contentAlignment
    } = this.option();
    switch (contentAlignment) {
      case 'start':
        this.$element().addClass(INFORMER_ALIGNMENT_START_CLASS);
        break;
      case 'end':
        this.$element().addClass(INFORMER_ALIGNMENT_END_CLASS);
        break;
      case 'center':
      default:
        this.$element().addClass(INFORMER_ALIGNMENT_CENTER_CLASS);
        break;
    }
  }
  _setTypeClass() {
    this.$element().removeClass(INFORMER_ERROR_CLASS).removeClass(INFORMER_INFO_CLASS);
    const {
      type
    } = this.option();
    switch (type) {
      case 'info':
        this.$element().addClass(INFORMER_INFO_CLASS);
        break;
      case 'error':
      default:
        this.$element().addClass(INFORMER_ERROR_CLASS);
        break;
    }
  }
  _renderIcon() {
    var _this$_$icon;
    (_this$_$icon = this._$icon) === null || _this$_$icon === void 0 || _this$_$icon.remove();
    const {
      icon
    } = this.option();
    const $icon = getImageContainer(icon);
    if (!$icon) {
      return;
    }
    this._$icon = $('<div>').addClass(INFORMER_ICON_CLASS).prependTo(this.$element()).append($icon);
  }
  _renderText() {
    const {
      text = ''
    } = this.option();
    this._$text = $('<div>').addClass(INFORMER_TEXT_CLASS).appendTo(this.$element()).text(text);
  }
  _updateText() {
    const {
      text = ''
    } = this.option();
    this._$text.text(text);
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'icon':
        this._renderIcon();
        break;
      case 'contentAlignment':
        this._setAlignmentClass();
        break;
      case 'showBackground':
        this.$element().toggleClass(INFORMER_BG_CLASS, value);
        break;
      case 'text':
        this._updateText();
        break;
      case 'type':
        this._setTypeClass();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
registerComponent('dxInformer', Informer);
export default Informer;
