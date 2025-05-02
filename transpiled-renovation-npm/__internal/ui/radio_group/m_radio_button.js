"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _click = require("../../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _index = require("../../../common/core/events/utils/index");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _editor = _interopRequireDefault(require("../../ui/editor/editor"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const RADIO_BUTTON_CLASS = 'dx-radiobutton';
const RADIO_BUTTON_ICON_CLASS = 'dx-radiobutton-icon';
const RADIO_BUTTON_ICON_DOT_CLASS = 'dx-radiobutton-icon-dot';
const RADIO_BUTTON_CHECKED_CLASS = 'dx-radiobutton-checked';
const RADIO_BUTTON_ICON_CHECKED_CLASS = 'dx-radiobutton-icon-checked';
class RadioButton extends _editor.default {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  _supportedKeys() {
    const click = function (e) {
      e.preventDefault();
      this._clickAction({
        event: e
      });
    };
    return _extends({}, super._supportedKeys(), {
      space: click
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      hoverStateEnabled: true,
      activeStateEnabled: true,
      value: false
    });
  }
  // eslint-disable-next-line class-methods-use-this
  _canValueBeChangedByClick() {
    return true;
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  }
  _init() {
    super._init();
    this.$element().addClass(RADIO_BUTTON_CLASS);
  }
  _initMarkup() {
    super._initMarkup();
    this._renderIcon();
    this._renderCheckedState(this.option('value'));
    this._renderClick();
    this.setAria('role', 'radio');
  }
  _renderIcon() {
    this._$icon = (0, _renderer.default)('<div>').addClass(RADIO_BUTTON_ICON_CLASS);
    (0, _renderer.default)('<div>').addClass(RADIO_BUTTON_ICON_DOT_CLASS).appendTo(this._$icon);
    this.$element().append(this._$icon);
  }
  _renderCheckedState(checked) {
    this.$element().toggleClass(RADIO_BUTTON_CHECKED_CLASS, checked).find(`.${RADIO_BUTTON_ICON_CLASS}`).toggleClass(RADIO_BUTTON_ICON_CHECKED_CLASS, checked);
    this.setAria('checked', checked);
  }
  _renderClick() {
    // @ts-expect-error ts-error
    const eventName = (0, _index.addNamespace)(_click.name, this.NAME);
    this._clickAction = this._createAction(args => {
      this._clickHandler(args.event);
    });
    _events_engine.default.off(this.$element(), eventName);
    _events_engine.default.on(this.$element(), eventName, e => {
      var _this$_clickAction;
      (_this$_clickAction = this._clickAction) === null || _this$_clickAction === void 0 || _this$_clickAction.call(this, {
        event: e
      });
    });
  }
  _clickHandler(e) {
    this._saveValueChangeEvent(e);
    this.option('value', true);
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'value':
        this._renderCheckedState(args.value);
        super._optionChanged(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
}
(0, _component_registrator.default)('dxRadioButton', RadioButton);
var _default = exports.default = RadioButton;