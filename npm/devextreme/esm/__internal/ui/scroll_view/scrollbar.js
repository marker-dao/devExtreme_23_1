/**
* DevExtreme (esm/__internal/ui/scroll_view/scrollbar.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { move } from '../../../common/core/animation/translator';
import eventsEngine from '../../../common/core/events/core/events_engine';
import pointerEvents from '../../../common/core/events/pointer';
import { addNamespace } from '../../../common/core/events/utils/index';
import domAdapter from '../../../core/dom_adapter';
import $ from '../../../core/renderer';
// @ts-expect-error ts-error
import { deferRenderer } from '../../../core/utils/common';
import readyCallback from '../../../core/utils/ready_callbacks';
import { isPlainObject } from '../../../core/utils/type';
import Widget from '../../core/widget/widget';
const SCROLLBAR = 'dxScrollbar';
const SCROLLABLE_SCROLLBAR_CLASS = 'dx-scrollable-scrollbar';
const SCROLLABLE_SCROLLBAR_ACTIVE_CLASS = `${SCROLLABLE_SCROLLBAR_CLASS}-active`;
const SCROLLABLE_SCROLL_CLASS = 'dx-scrollable-scroll';
const SCROLLABLE_SCROLL_CONTENT_CLASS = 'dx-scrollable-scroll-content';
const HOVER_ENABLED_STATE = 'dx-scrollbar-hoverable';
const HORIZONTAL = 'horizontal';
const THUMB_MIN_SIZE = 15;
const DEFAULT_SCALE_RATIO = 1;
const DEFAULT_SIZE = 0;
const MIN_CONTAINER_TO_CONTENT_RATIO = 1;
let activeScrollbar = null;
class Scrollbar extends Widget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      visible: false,
      activeStateEnabled: false,
      visibilityMode: 'onScroll',
      containerSize: DEFAULT_SIZE,
      contentSize: DEFAULT_SIZE,
      expandable: true,
      scaleRatio: DEFAULT_SCALE_RATIO
    });
  }
  _init() {
    super._init();
    this._isHovered = false;
  }
  _initMarkup() {
    this._renderThumb();
    super._initMarkup();
  }
  _render() {
    super._render();
    this._renderDirection();
    this._update();
    this._attachPointerDownHandler();
    this.option('hoverStateEnabled', this._isHoverMode());
    const {
      hoverStateEnabled
    } = this.option();
    this.$element().toggleClass(HOVER_ENABLED_STATE, hoverStateEnabled);
  }
  _renderThumb() {
    this._$thumb = $('<div>').addClass(SCROLLABLE_SCROLL_CLASS);
    $('<div>').addClass(SCROLLABLE_SCROLL_CONTENT_CLASS).appendTo(this._$thumb);
    this.$element().addClass(SCROLLABLE_SCROLLBAR_CLASS).append(this._$thumb);
  }
  isThumb($element) {
    return !!this.$element().find($element).length;
  }
  _isHoverMode() {
    const {
      visibilityMode,
      expandable
    } = this.option();
    return (visibilityMode === 'onHover' || visibilityMode === 'always') && expandable;
  }
  _renderDirection() {
    const {
      direction
    } = this.option();
    this.$element().addClass(`dx-scrollbar-${direction}`);
    this._dimension = direction === HORIZONTAL ? 'width' : 'height';
    this._prop = direction === HORIZONTAL ? 'left' : 'top';
  }
  _attachPointerDownHandler() {
    eventsEngine.on(this._$thumb, addNamespace(pointerEvents.down, SCROLLBAR), this.feedbackOn.bind(this));
  }
  feedbackOn(e) {
    e === null || e === void 0 || e.preventDefault();
    this.$element().addClass(SCROLLABLE_SCROLLBAR_ACTIVE_CLASS);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    activeScrollbar = this;
  }
  feedbackOff() {
    this.$element().removeClass(SCROLLABLE_SCROLLBAR_ACTIVE_CLASS);
    activeScrollbar = null;
  }
  cursorEnter() {
    this._isHovered = true;
    if (this._needScrollbar()) {
      this.option('visible', true);
    }
  }
  cursorLeave() {
    this._isHovered = false;
    this.option('visible', false);
  }
  _renderDimensions() {
    this._$thumb.css({
      width: this.option('width'),
      height: this.option('height')
    });
  }
  _toggleVisibility(visible) {
    const {
      visibilityMode
    } = this.option();
    if (visibilityMode === 'onScroll') {
      // NOTE: need to relayout thumb and show it instantly
      this._$thumb.css('opacity');
    }
    const adjustedVisible = this._adjustVisibility(visible);
    this.option().visible = adjustedVisible;
    this._$thumb.toggleClass('dx-state-invisible', !adjustedVisible);
  }
  _adjustVisibility(visible) {
    if (this._baseContainerToContentRatio && !this._needScrollbar()) {
      return false;
    }
    const {
      visibilityMode
    } = this.option();
    let adjustedVisible = visible;
    switch (visibilityMode) {
      case 'onScroll':
        break;
      case 'onHover':
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        adjustedVisible = adjustedVisible || !!this._isHovered;
        break;
      case 'never':
        adjustedVisible = false;
        break;
      case 'always':
        adjustedVisible = true;
        break;
      default:
        break;
    }
    // @ts-expect-error ts-error
    return adjustedVisible;
  }
  moveTo(location) {
    if (this._isAlwaysHidden()) {
      return;
    }
    let normalizedLocation = location;
    if (isPlainObject(location)) {
      normalizedLocation = location[this._prop] || 0;
    }
    const scrollBarLocation = {};
    scrollBarLocation[this._prop] = this._calculateScrollBarPosition(normalizedLocation);
    move(this._$thumb, scrollBarLocation);
  }
  _calculateScrollBarPosition(location) {
    return -location * this._thumbRatio;
  }
  _getSizes() {
    const {
      containerSize,
      contentSize,
      baseContainerSize,
      baseContentSize
    } = this.option();
    return {
      containerSize: Math.round(containerSize),
      contentSize: Math.round(contentSize),
      baseContainerSize: Math.round(baseContainerSize),
      baseContentSize: Math.round(baseContentSize)
    };
  }
  _update() {
    const {
      containerSize,
      contentSize
    } = this._getSizes();
    let {
      baseContainerSize,
      baseContentSize
    } = this._getSizes();
    // NOTE: if current scrollbar's using outside of scrollable
    if (isNaN(baseContainerSize)) {
      baseContainerSize = containerSize;
      baseContentSize = contentSize;
    }
    const {
      scaleRatio
    } = this.option();
    this._baseContainerToContentRatio = baseContentSize ? baseContainerSize / baseContentSize : baseContainerSize;
    this._realContainerToContentRatio = contentSize ? containerSize / contentSize : containerSize;
    const thumbSize = Math.round(Math.max(Math.round(containerSize * this._realContainerToContentRatio), THUMB_MIN_SIZE));
    this._thumbRatio = (containerSize - thumbSize) / (scaleRatio * (contentSize - containerSize));
    this.option(this._dimension, thumbSize / scaleRatio);
    this.$element().css('display', this._needScrollbar() ? '' : 'none');
  }
  _isAlwaysHidden() {
    const {
      visibilityMode
    } = this.option();
    return visibilityMode === 'never';
  }
  _needScrollbar() {
    return !this._isAlwaysHidden() && this._baseContainerToContentRatio < MIN_CONTAINER_TO_CONTENT_RATIO;
  }
  containerToContentRatio() {
    return this._realContainerToContentRatio;
  }
  _normalizeSize(size) {
    return isPlainObject(size) ? size[this._dimension] || 0 : size;
  }
  _clean() {
    super._clean();
    if (this === activeScrollbar) {
      activeScrollbar = null;
    }
    eventsEngine.off(this._$thumb, `.${SCROLLBAR}`);
  }
  _optionChanged(args) {
    if (this._isAlwaysHidden()) {
      return;
    }
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'containerSize':
      case 'contentSize':
        {
          this.option()[name] = this._normalizeSize(value);
          this._update();
          break;
        }
      case 'baseContentSize':
      case 'baseContainerSize':
        this._update();
        break;
      case 'visibilityMode':
      case 'direction':
        this._invalidate();
        break;
      case 'scaleRatio':
        this._update();
        break;
      default:
        super._optionChanged(args);
    }
  }
  update() {
    deferRenderer(() => {
      if (this._adjustVisibility()) {
        this.option('visible', true);
      }
    })();
  }
}
readyCallback.add(() => {
  // @ts-expect-error ts-error
  eventsEngine.subscribeGlobal(domAdapter.getDocument(), addNamespace(pointerEvents.up, SCROLLBAR), () => {
    if (activeScrollbar) {
      activeScrollbar.feedbackOff();
    }
  });
});
export default Scrollbar;
