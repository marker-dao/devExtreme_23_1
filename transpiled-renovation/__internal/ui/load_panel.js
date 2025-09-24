"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _common = require("../../core/utils/common");
var _deferred = require("../../core/utils/deferred");
var _load_indicator = _interopRequireDefault(require("../../ui/load_indicator"));
var _themes = require("../../ui/themes");
var _overlay = _interopRequireDefault(require("../ui/overlay/overlay"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// STYLE loadPanel
const LOADPANEL_CLASS = 'dx-loadpanel';
const LOADPANEL_WRAPPER_CLASS = 'dx-loadpanel-wrapper';
const LOADPANEL_INDICATOR_CLASS = 'dx-loadpanel-indicator';
const LOADPANEL_MESSAGE_CLASS = 'dx-loadpanel-message';
const LOADPANEL_CONTENT_CLASS = 'dx-loadpanel-content';
const LOADPANEL_CONTENT_WRAPPER_CLASS = 'dx-loadpanel-content-wrapper';
const LOADPANEL_PANE_HIDDEN_CLASS = 'dx-loadpanel-pane-hidden';
class LoadPanel extends _overlay.default {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      escape: _common.noop
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      message: _message.default.format('Loading'),
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
        return (0, _themes.isMaterial)((0, _themes.current)());
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
        return (0, _themes.isFluent)((0, _themes.current)());
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
    super._render();
    this.$element().addClass(LOADPANEL_CLASS);
    this.$wrapper().addClass(LOADPANEL_WRAPPER_CLASS);
    this._updateWrapperAria();
  }
  _updateWrapperAria() {
    this.$wrapper().removeAttr('aria-label').removeAttr('role');
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
    const label = message || _message.default.format('Loading');
    const aria = {
      role: 'alert',
      'aria-label': label
    };
    return aria;
  }
  _renderContentImpl() {
    const result = super._renderContentImpl();
    this.$content().addClass(LOADPANEL_CONTENT_CLASS);
    this._$loadPanelContentWrapper = (0, _renderer.default)('<div>').addClass(LOADPANEL_CONTENT_WRAPPER_CLASS);
    this._$loadPanelContentWrapper.appendTo(this.$content());
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
    const deferred = (0, _deferred.Deferred)();
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
    const $message = (0, _renderer.default)('<div>').addClass(LOADPANEL_MESSAGE_CLASS).text(message);
    this._$loadPanelContentWrapper.append($message);
  }
  _renderLoadIndicator() {
    if (!this._$loadPanelContentWrapper || !this.option('showIndicator')) {
      return;
    }
    if (!this._$indicator) {
      this._$indicator = (0, _renderer.default)('<div>').addClass(LOADPANEL_INDICATOR_CLASS).appendTo(this._$loadPanelContentWrapper);
    }
    this._createComponent(this._$indicator, _load_indicator.default, {
      elementAttr: this._getAriaAttributes(),
      indicatorSrc: this.option('indicatorSrc')
    });
  }
  _cleanPreviousContent() {
    this.$content().find(`.${LOADPANEL_MESSAGE_CLASS}`).remove();
    this.$content().find(`.${LOADPANEL_INDICATOR_CLASS}`).remove();
    this._$indicator = undefined;
  }
  _togglePaneVisible() {
    this.$content().toggleClass(LOADPANEL_PANE_HIDDEN_CLASS, !this.option('showPane'));
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
(0, _component_registrator.default)('dxLoadPanel', LoadPanel);
var _default = exports.default = LoadPanel;