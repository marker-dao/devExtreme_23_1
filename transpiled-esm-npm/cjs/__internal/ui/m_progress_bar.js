"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _type = require("../../core/utils/type");
var _m_track_bar = _interopRequireDefault(require("../ui/m_track_bar"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PROGRESSBAR_CLASS = 'dx-progressbar';
const PROGRESSBAR_CONTAINER_CLASS = 'dx-progressbar-container';
const PROGRESSBAR_RANGE_CONTAINER_CLASS = 'dx-progressbar-range-container';
const PROGRESSBAR_RANGE_CLASS = 'dx-progressbar-range';
const PROGRESSBAR_WRAPPER_CLASS = 'dx-progressbar-wrapper';
const PROGRESSBAR_STATUS_CLASS = 'dx-progressbar-status';
const PROGRESSBAR_INDETERMINATE_SEGMENT_CONTAINER = 'dx-progressbar-animating-container';
const PROGRESSBAR_INDETERMINATE_SEGMENT = 'dx-progressbar-animating-segment';
class ProgressBar extends _m_track_bar.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      value: 0,
      statusFormat(ratio) {
        return `Progress: ${Math.round(ratio * 100)}%`;
      },
      showStatus: true,
      // @ts-expect-error ts-error
      onComplete: null,
      activeStateEnabled: false,
      statusPosition: 'bottom left',
      _animatingSegmentCount: 0
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device(device) {
        return device.platform === 'android';
      },
      options: {
        _animatingSegmentCount: 2
      }
    }]);
  }
  _toggleReadOnlyState() {
    this.setAria('readonly', undefined);
  }
  _initMarkup() {
    this._renderStatus();
    this._createCompleteAction();
    super._initMarkup();
    this.$element().addClass(PROGRESSBAR_CLASS);
    this._$wrapper.addClass(PROGRESSBAR_WRAPPER_CLASS);
    this._$bar.addClass(PROGRESSBAR_CONTAINER_CLASS);
    this.setAria('role', 'progressbar');
    (0, _renderer.default)('<div>').addClass(PROGRESSBAR_RANGE_CONTAINER_CLASS).appendTo(this._$wrapper).append(this._$bar);
    this._$range.addClass(PROGRESSBAR_RANGE_CLASS);
    const {
      showStatus
    } = this.option();
    this._toggleStatus(showStatus);
  }
  // eslint-disable-next-line class-methods-use-this
  _useTemplates() {
    return false;
  }
  _createCompleteAction() {
    this._completeAction = this._createActionByOption('onComplete');
  }
  _renderStatus() {
    this._$status = (0, _renderer.default)('<div>').addClass(PROGRESSBAR_STATUS_CLASS);
  }
  _renderIndeterminateState() {
    this._$segmentContainer = (0, _renderer.default)('<div>').addClass(PROGRESSBAR_INDETERMINATE_SEGMENT_CONTAINER);
    const {
      _animatingSegmentCount: segments
    } = this.option();
    for (let i = 0; i < segments; i += 1) {
      (0, _renderer.default)('<div>').addClass(PROGRESSBAR_INDETERMINATE_SEGMENT).addClass(`${PROGRESSBAR_INDETERMINATE_SEGMENT}-${i + 1}`).appendTo(this._$segmentContainer);
    }
    this._$segmentContainer.appendTo(this._$wrapper);
  }
  _toggleStatus(value) {
    const {
      statusPosition
    } = this.option();
    const splitPosition = statusPosition.split(' ');
    if (value) {
      if (splitPosition[0] === 'top' || splitPosition[0] === 'left') {
        this._$status.prependTo(this._$wrapper);
      } else {
        this._$status.appendTo(this._$wrapper);
      }
    } else {
      this._$status.detach();
    }
    this._togglePositionClass();
  }
  _togglePositionClass() {
    const {
      statusPosition
    } = this.option();
    const splitPosition = statusPosition.split(' ');
    this._$wrapper.removeClass('dx-position-top-left dx-position-top-right dx-position-bottom-left dx-position-bottom-right dx-position-left dx-position-right');
    let positionClass = `dx-position-${splitPosition[0]}`;
    if (splitPosition[1]) {
      positionClass += `-${splitPosition[1]}`;
    }
    this._$wrapper.addClass(positionClass);
  }
  _toggleIndeterminateState(value) {
    if (value) {
      this._renderIndeterminateState();
      // @ts-expect-error ts-error
      this._$bar.toggle(false);
    } else {
      var _this$_$segmentContai;
      // @ts-expect-error ts-error
      this._$bar.toggle(true);
      (_this$_$segmentContai = this._$segmentContainer) === null || _this$_$segmentContai === void 0 || _this$_$segmentContai.remove();
      delete this._$segmentContainer;
    }
  }
  _renderValue() {
    const {
      value,
      max
    } = this.option();
    if (!value && value !== 0) {
      this._toggleIndeterminateState(true);
      return;
    }
    if (this._$segmentContainer) {
      this._toggleIndeterminateState(false);
    }
    if (value === max) {
      this._completeAction();
    }
    super._renderValue();
    this._setStatus();
  }
  _setStatus() {
    const {
      statusFormat
    } = this.option();
    let format = statusFormat;
    if ((0, _type.isFunction)(format)) {
      format = format.bind(this);
    } else {
      // @ts-expect-error ts-error
      format = function (value) {
        return value;
      };
    }
    // @ts-expect-error ts-error
    const statusText = format(this._currentRatio, this.option('value'));
    this._$status.text(statusText);
  }
  _dispose() {
    this._$status.remove();
    super._dispose();
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'statusFormat':
        this._setStatus();
        break;
      case 'showStatus':
        this._toggleStatus(value);
        break;
      case 'statusPosition':
        {
          const {
            showStatus
          } = this.option();
          this._toggleStatus(showStatus);
          break;
        }
      case 'onComplete':
        this._createCompleteAction();
        break;
      case '_animatingSegmentCount':
        break;
      default:
        super._optionChanged(args);
    }
  }
}
(0, _component_registrator.default)('dxProgressBar', ProgressBar);
var _default = exports.default = ProgressBar;