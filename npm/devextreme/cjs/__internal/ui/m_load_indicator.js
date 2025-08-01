/**
* DevExtreme (cjs/__internal/ui/m_load_indicator.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LOADINDICATOR_WRAPPER_CLASS = exports.LOADINDICATOR_SEGMENT_INNER_CLASS = exports.LOADINDICATOR_SEGMENT_CLASS = exports.LOADINDICATOR_IMAGE_CLASS = exports.LOADINDICATOR_ICON_CLASS = exports.LOADINDICATOR_CONTENT_CLASS = exports.LOADINDICATOR_CLASS = exports.AnimationType = exports.ANIMATION_TYPE_CLASSES = void 0;
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _size = require("../../core/utils/size");
var _themes = require("../../ui/themes");
var _widget = _interopRequireDefault(require("../core/widget/widget"));
var _m_support = _interopRequireDefault(require("../core/utils/m_support"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LOADINDICATOR_CLASS = exports.LOADINDICATOR_CLASS = 'dx-loadindicator';
const LOADINDICATOR_WRAPPER_CLASS = exports.LOADINDICATOR_WRAPPER_CLASS = 'dx-loadindicator-wrapper';
const LOADINDICATOR_CONTENT_CLASS = exports.LOADINDICATOR_CONTENT_CLASS = 'dx-loadindicator-content';
const LOADINDICATOR_ICON_CLASS = exports.LOADINDICATOR_ICON_CLASS = 'dx-loadindicator-icon';
const LOADINDICATOR_SEGMENT_CLASS = exports.LOADINDICATOR_SEGMENT_CLASS = 'dx-loadindicator-segment';
const LOADINDICATOR_SEGMENT_INNER_CLASS = exports.LOADINDICATOR_SEGMENT_INNER_CLASS = 'dx-loadindicator-segment-inner';
const LOADINDICATOR_IMAGE_CLASS = exports.LOADINDICATOR_IMAGE_CLASS = 'dx-loadindicator-image';
var AnimationType;
(function (AnimationType) {
  AnimationType["Circle"] = "circle";
  AnimationType["Sparkle"] = "sparkle";
})(AnimationType || (exports.AnimationType = AnimationType = {}));
const ANIMATION_TYPE_CLASSES = exports.ANIMATION_TYPE_CLASSES = {
  [AnimationType.Circle]: 'dx-loadindicator-content-circle',
  [AnimationType.Sparkle]: 'dx-loadindicator-content-sparkle'
};
class LoadIndicator extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      _animatingSegmentCount: 1,
      _animatingSegmentInner: false,
      animationType: AnimationType.Circle,
      activeStateEnabled: false,
      hoverStateEnabled: false,
      indicatorSrc: ''
    });
  }
  _defaultOptionsRules() {
    const themeName = (0, _themes.current)();
    return super._defaultOptionsRules().concat([{
      device() {
        return (0, _themes.isMaterialBased)(themeName);
      },
      options: {
        _animatingSegmentCount: 2,
        _animatingSegmentInner: true
      }
    }, {
      device() {
        return (0, _themes.isGeneric)(themeName);
      },
      options: {
        _animatingSegmentCount: 7
      }
    }]);
  }
  // eslint-disable-next-line class-methods-use-this
  _useTemplates() {
    return false;
  }
  _init() {
    super._init();
    this.$element().addClass(LOADINDICATOR_CLASS);
    const label = _message.default.format('Loading');
    const aria = {
      role: 'alert',
      label
    };
    this.setAria(aria);
  }
  _initMarkup() {
    super._initMarkup();
    this._renderWrapper();
    this._renderIndicatorContent();
    this._renderMarkup();
  }
  _renderWrapper() {
    this._$wrapper = (0, _renderer.default)('<div>').addClass(LOADINDICATOR_WRAPPER_CLASS);
    this.$element().append(this._$wrapper);
  }
  _getAnimationTypeContentClass() {
    const {
      animationType
    } = this.option();
    return animationType && ANIMATION_TYPE_CLASSES[animationType];
  }
  _renderIndicatorContent() {
    const animationClass = this._getAnimationTypeContentClass() ?? '';
    const contentClasses = [LOADINDICATOR_CONTENT_CLASS, animationClass].join(' ');
    this._$content = (0, _renderer.default)('<div>').addClass(contentClasses);
    this._$wrapper.append(this._$content);
  }
  _renderMarkup() {
    const {
      indicatorSrc
    } = this.option();
    const isAnimationAvailable = _m_support.default.animation();
    if (indicatorSrc) {
      this._renderImageMarkup();
    } else if (isAnimationAvailable) {
      this._renderAnimationMarkup();
    }
  }
  _getSegmentParams() {
    const {
      animationType,
      _animatingSegmentCount: animatingSegmentCount,
      _animatingSegmentInner: animatingSegmentInner
    } = this.option();
    switch (animationType) {
      case AnimationType.Sparkle:
        return {
          segmentCount: 2,
          segmentInner: false
        };
      case AnimationType.Circle:
      default:
        return {
          segmentCount: animatingSegmentCount ?? 0,
          segmentInner: Boolean(animatingSegmentInner)
        };
    }
  }
  _renderAnimationMarkup() {
    this._$indicator = (0, _renderer.default)('<div>').addClass(LOADINDICATOR_ICON_CLASS);
    this._$content.append(this._$indicator);
    const params = this._getSegmentParams();
    this._renderSegments(params);
  }
  _renderSegments(params) {
    const {
      segmentCount,
      segmentInner
    } = params;
    for (let i = segmentCount; i >= 0; i -= 1) {
      var _this$_$indicator;
      const $segment = (0, _renderer.default)('<div>').addClass(LOADINDICATOR_SEGMENT_CLASS).addClass(`${LOADINDICATOR_SEGMENT_CLASS}${i}`);
      if (segmentInner) {
        const $segmentInner = (0, _renderer.default)('<div>').addClass(LOADINDICATOR_SEGMENT_INNER_CLASS);
        $segment.append($segmentInner);
      }
      (_this$_$indicator = this._$indicator) === null || _this$_$indicator === void 0 || _this$_$indicator.append($segment);
    }
  }
  _renderImageMarkup() {
    const {
      indicatorSrc
    } = this.option();
    this._$wrapper.addClass(LOADINDICATOR_IMAGE_CLASS);
    this._$wrapper.css('backgroundImage', `url(${indicatorSrc})`);
  }
  _renderDimensions() {
    super._renderDimensions();
    this._updateContentSizeForAnimation();
  }
  _updateContentSizeForAnimation() {
    if (!this._$indicator) {
      return;
    }
    const {
      width,
      height
    } = this.option();
    if (width || height) {
      const elementWidth = (0, _size.getWidth)(this.$element());
      const elementHeight = (0, _size.getHeight)(this.$element());
      const minDimension = Math.min(elementHeight, elementWidth);
      this._$wrapper.css({
        height: minDimension,
        width: minDimension,
        fontSize: minDimension
      });
    }
  }
  _clean() {
    super._clean();
    this._removeMarkupForAnimation();
    this._removeMarkupForImage();
  }
  _removeMarkupForAnimation() {
    if (!this._$indicator) {
      return;
    }
    this._$indicator.remove();
    this._$indicator = undefined;
  }
  _removeMarkupForImage() {
    this._$wrapper.css('backgroundImage', 'none');
  }
  _optionChanged(args) {
    switch (args.name) {
      case '_animatingSegmentCount':
      case '_animatingSegmentInner':
      case 'animationType':
      case 'indicatorSrc':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
(0, _component_registrator.default)('dxLoadIndicator', LoadIndicator);
var _default = exports.default = LoadIndicator;
