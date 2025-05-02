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
const SCROLLBAR_VISIBLE = {
  onScroll: 'onScroll',
  onHover: 'onHover',
  always: 'always',
  never: 'never'
};
let activeScrollbar = null;
class Scrollbar extends Widget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      // @ts-expect-error ts-error
      direction: null,
      visible: false,
      activeStateEnabled: false,
      visibilityMode: SCROLLBAR_VISIBLE.onScroll,
      containerSize: 0,
      contentSize: 0,
      expandable: true,
      scaleRatio: 1
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
    return (visibilityMode === SCROLLBAR_VISIBLE.onHover || visibilityMode === SCROLLBAR_VISIBLE.always) && expandable;
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
    if (visibilityMode === SCROLLBAR_VISIBLE.onScroll) {
      // @ts-expect-error ts-error
      // NOTE: need to relayout thumb and show it instantly
      this._$thumb.css('opacity');
    }
    visible = this._adjustVisibility(visible);
    this.option().visible = visible;
    this._$thumb.toggleClass('dx-state-invisible', !visible);
  }
  _adjustVisibility(visible) {
    if (this._baseContainerToContentRatio && !this._needScrollbar()) {
      return false;
    }
    const {
      visibilityMode
    } = this.option();
    // eslint-disable-next-line default-case
    switch (visibilityMode) {
      case SCROLLBAR_VISIBLE.onScroll:
        break;
      case SCROLLBAR_VISIBLE.onHover:
        visible = visible || !!this._isHovered;
        break;
      case SCROLLBAR_VISIBLE.never:
        visible = false;
        break;
      case SCROLLBAR_VISIBLE.always:
        visible = true;
        break;
    }
    return visible;
  }
  moveTo(location) {
    if (this._isHidden()) {
      return;
    }
    if (isPlainObject(location)) {
      location = location[this._prop] || 0;
    }
    const scrollBarLocation = {};
    scrollBarLocation[this._prop] = this._calculateScrollBarPosition(location);
    move(this._$thumb, scrollBarLocation);
  }
  _calculateScrollBarPosition(location) {
    return -location * this._thumbRatio;
  }
  _update() {
    // @ts-expect-error ts-error
    const containerSize = Math.round(this.option('containerSize'));
    // @ts-expect-error ts-error
    const contentSize = Math.round(this.option('contentSize'));
    // @ts-expect-error ts-error
    let baseContainerSize = Math.round(this.option('baseContainerSize'));
    // @ts-expect-error ts-error
    let baseContentSize = Math.round(this.option('baseContentSize'));
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
  // @ts-expect-error ts-error
  _isHidden() {
    const {
      visibilityMode
    } = this.option();
    return visibilityMode === SCROLLBAR_VISIBLE.never;
  }
  _needScrollbar() {
    return !this._isHidden() && this._baseContainerToContentRatio < 1;
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
    if (this._isHidden()) {
      return;
    }
    switch (args.name) {
      case 'containerSize':
      case 'contentSize':
        this.option()[args.name] = this._normalizeSize(args.value);
        this._update();
        break;
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
        // @ts-expect-error ts-error
        super._optionChanged.apply(this, arguments);
    }
  }
  update() {
    deferRenderer(() => {
      this._adjustVisibility() && this.option('visible', true);
    })();
  }
}
readyCallback.add(() => {
  // @ts-expect-error
  eventsEngine.subscribeGlobal(domAdapter.getDocument(), addNamespace(pointerEvents.up, SCROLLBAR), () => {
    if (activeScrollbar) {
      activeScrollbar.feedbackOff();
    }
  });
});
export default Scrollbar;