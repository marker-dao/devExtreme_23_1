/**
* DevExtreme (esm/__internal/ui/load_indicator.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import messageLocalization from '../../common/core/localization/message';
import registerComponent from '../../core/component_registrator';
import $ from '../../core/renderer';
import { getHeight, getWidth } from '../../core/utils/size';
import { current, isGeneric, isMaterialBased } from '../../ui/themes';
import Widget from '../core/widget/widget';
import supportUtils from '../core/utils/m_support';
export const LOADINDICATOR_CLASS = 'dx-loadindicator';
export const LOADINDICATOR_WRAPPER_CLASS = 'dx-loadindicator-wrapper';
export const LOADINDICATOR_CONTENT_CLASS = 'dx-loadindicator-content';
export const LOADINDICATOR_ICON_CLASS = 'dx-loadindicator-icon';
export const LOADINDICATOR_SEGMENT_CLASS = 'dx-loadindicator-segment';
export const LOADINDICATOR_SEGMENT_INNER_CLASS = 'dx-loadindicator-segment-inner';
export const LOADINDICATOR_IMAGE_CLASS = 'dx-loadindicator-image';
export var AnimationType;
(function (AnimationType) {
  AnimationType["Circle"] = "circle";
  AnimationType["Sparkle"] = "sparkle";
})(AnimationType || (AnimationType = {}));
export const ANIMATION_TYPE_CLASSES = {
  [AnimationType.Circle]: 'dx-loadindicator-content-circle',
  [AnimationType.Sparkle]: 'dx-loadindicator-content-sparkle'
};
class LoadIndicator extends Widget {
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
    const themeName = current();
    return super._defaultOptionsRules().concat([{
      device() {
        return isMaterialBased(themeName);
      },
      options: {
        _animatingSegmentCount: 2,
        _animatingSegmentInner: true
      }
    }, {
      device() {
        return isGeneric(themeName);
      },
      options: {
        _animatingSegmentCount: 7
      }
    }]);
  }
  _useTemplates() {
    return false;
  }
  _init() {
    super._init();
    this.$element().addClass(LOADINDICATOR_CLASS);
    const label = messageLocalization.format('Loading');
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
    this._$wrapper = $('<div>').addClass(LOADINDICATOR_WRAPPER_CLASS);
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
    this._$content = $('<div>').addClass(contentClasses);
    this._$wrapper.append(this._$content);
  }
  _renderMarkup() {
    const {
      indicatorSrc
    } = this.option();
    const isAnimationAvailable = supportUtils.animation();
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
    this._$indicator = $('<div>').addClass(LOADINDICATOR_ICON_CLASS);
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
      const $segment = $('<div>').addClass(LOADINDICATOR_SEGMENT_CLASS).addClass(`${LOADINDICATOR_SEGMENT_CLASS}${i}`);
      if (segmentInner) {
        const $segmentInner = $('<div>').addClass(LOADINDICATOR_SEGMENT_INNER_CLASS);
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
      const elementWidth = getWidth(this.$element());
      const elementHeight = getHeight(this.$element());
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
registerComponent('dxLoadIndicator', LoadIndicator);
export default LoadIndicator;
