/**
* DevExtreme (esm/__internal/ui/load_panel.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["src"];
import messageLocalization from '../../common/core/localization/message';
import registerComponent from '../../core/component_registrator';
import $ from '../../core/renderer';
import { noop } from '../../core/utils/common';
import { Deferred } from '../../core/utils/deferred';
import LoadIndicator from '../../ui/load_indicator';
import { current, isFluent, isMaterial } from '../../ui/themes';
import Overlay from '../ui/overlay/overlay';
// STYLE loadPanel
const LOADPANEL_CLASS = 'dx-loadpanel';
const LOADPANEL_WRAPPER_CLASS = 'dx-loadpanel-wrapper';
const LOADPANEL_INDICATOR_CLASS = 'dx-loadpanel-indicator';
const LOADPANEL_MESSAGE_CLASS = 'dx-loadpanel-message';
const LOADPANEL_CONTENT_CLASS = 'dx-loadpanel-content';
const LOADPANEL_CONTENT_WRAPPER_CLASS = 'dx-loadpanel-content-wrapper';
const LOADPANEL_PANE_HIDDEN_CLASS = 'dx-loadpanel-pane-hidden';
class LoadPanel extends Overlay {
  _supportedKeys() {
    return Object.assign({}, super._supportedKeys(), {
      escape: noop
    });
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      message: messageLocalization.format('Loading'),
      width: 222,
      height: 90,
      // @ts-expect-error 'null' is not assignable
      animation: null,
      showIndicator: true,
      indicatorSrc: '',
      showPane: true,
      delay: 0,
      templatesRenderAsynchronously: false,
      hideTopOverlayHandler: null,
      focusStateEnabled: false,
      propagateOutsideClick: true,
      preventScrollEvents: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: {
        platform: 'generic'
      },
      options: {
        shadingColor: 'transparent'
      }
    }, {
      device() {
        return isMaterial(current());
      },
      options: {
        message: '',
        width: 60,
        height: 60,
        maxHeight: 60,
        maxWidth: 60
      }
    }, {
      device() {
        return isFluent(current());
      },
      options: {
        width: 'auto',
        height: 'auto'
      }
    }]);
  }
  _init() {
    super._init();
  }
  _render() {
    var _this$$wrapper;
    super._render();
    this.$element().addClass(LOADPANEL_CLASS);
    (_this$$wrapper = this.$wrapper()) === null || _this$$wrapper === void 0 || _this$$wrapper.addClass(LOADPANEL_WRAPPER_CLASS);
    this._updateWrapperAria();
  }
  _setDeprecatedOptions() {
    super._setDeprecatedOptions();
    this._deprecatedOptions = Object.assign({}, this._deprecatedOptions, {
      // @ts-expect-error ts-error
      indicatorSrc: {
        since: '25.2',
        alias: 'indicatorOptions.src'
      }
    });
  }
  _updateWrapperAria() {
    var _this$$wrapper2;
    (_this$$wrapper2 = this.$wrapper()) === null || _this$$wrapper2 === void 0 || _this$$wrapper2.removeAttr('aria-label').removeAttr('role');
    const showIndicator = this.option('showIndicator');
    if (!showIndicator) {
      const aria = this._getAriaAttributes();
      // @ts-expect-error attr should have overload
      this.$wrapper().attr(aria);
    }
  }
  _getAriaAttributes() {
    const {
      message
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const label = message || messageLocalization.format('Loading');
    const aria = {
      role: 'alert',
      'aria-label': label
    };
    return aria;
  }
  _renderContentImpl() {
    const $content = this.$content();
    if (!$content) {
      return Promise.resolve(undefined);
    }
    const result = super._renderContentImpl();
    $content.addClass(LOADPANEL_CONTENT_CLASS);
    this._$loadPanelContentWrapper = $('<div>').addClass(LOADPANEL_CONTENT_WRAPPER_CLASS);
    this._$loadPanelContentWrapper.appendTo($content);
    this._togglePaneVisible();
    this._cleanPreviousContent();
    this._renderLoadIndicator();
    this._renderMessage();
    return result;
  }
  _show() {
    const {
      delay
    } = this.option();
    if (!delay) {
      return super._show();
    }
    const deferred = Deferred();
    const callBase = super._show.bind(this);
    this._clearShowTimeout();
    // eslint-disable-next-line no-restricted-globals -- needed for delayed panel show
    this._showTimeout = setTimeout(() => {
      // @ts-expect-error done should be typed
      callBase().done(() => {
        deferred.resolve();
      });
    }, delay);
    return deferred.promise();
  }
  _hide() {
    this._clearShowTimeout();
    return super._hide();
  }
  _clearShowTimeout() {
    clearTimeout(this._showTimeout);
  }
  _renderMessage() {
    if (!this._$loadPanelContentWrapper) {
      return;
    }
    const {
      message
    } = this.option();
    if (!message) {
      return;
    }
    const $message = $('<div>').addClass(LOADPANEL_MESSAGE_CLASS).text(message);
    this._$loadPanelContentWrapper.append($message);
  }
  _renderLoadIndicator() {
    if (!this._$loadPanelContentWrapper || !this.option('showIndicator')) {
      return;
    }
    if (!this._$indicator) {
      this._$indicator = $('<div>').addClass(LOADPANEL_INDICATOR_CLASS).appendTo(this._$loadPanelContentWrapper);
    }
    const {
      indicatorOptions = {},
      indicatorSrc
    } = this.option();
    const {
        src
      } = indicatorOptions,
      restIndicatorOptions = _objectWithoutPropertiesLoose(indicatorOptions, _excluded);
    this._createComponent(this._$indicator, LoadIndicator, Object.assign({
      elementAttr: this._getAriaAttributes(),
      indicatorSrc: src ?? indicatorSrc
    }, restIndicatorOptions));
  }
  _cleanPreviousContent() {
    var _this$$content, _this$$content2;
    (_this$$content = this.$content()) === null || _this$$content === void 0 || _this$$content.find(`.${LOADPANEL_MESSAGE_CLASS}`).remove();
    (_this$$content2 = this.$content()) === null || _this$$content2 === void 0 || _this$$content2.find(`.${LOADPANEL_INDICATOR_CLASS}`).remove();
    this._$indicator = undefined;
  }
  _togglePaneVisible() {
    var _this$$content3;
    (_this$$content3 = this.$content()) === null || _this$$content3 === void 0 || _this$$content3.toggleClass(LOADPANEL_PANE_HIDDEN_CLASS, !this.option('showPane'));
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'delay':
        break;
      case 'message':
      case 'showIndicator':
        this._cleanPreviousContent();
        this._renderLoadIndicator();
        this._renderMessage();
        this._updateWrapperAria();
        break;
      case 'showPane':
        this._togglePaneVisible();
        break;
      case 'indicatorSrc':
      case 'indicatorOptions':
        this._renderLoadIndicator();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _dispose() {
    this._clearShowTimeout();
    super._dispose();
  }
}
registerComponent('dxLoadPanel', LoadPanel);
export default LoadPanel;
