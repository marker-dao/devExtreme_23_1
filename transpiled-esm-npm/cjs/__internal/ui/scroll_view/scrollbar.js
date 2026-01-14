"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _translator = require("../../../common/core/animation/translator");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../common/core/events/pointer"));
var _index = require("../../../common/core/events/utils/index");
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _ready_callbacks = _interopRequireDefault(require("../../../core/utils/ready_callbacks"));
var _type = require("../../../core/utils/type");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// @ts-expect-error ts-error

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
class Scrollbar extends _widget.default {
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
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
    this._$thumb = (0, _renderer.default)('<div>').addClass(SCROLLABLE_SCROLL_CLASS);
    (0, _renderer.default)('<div>').addClass(SCROLLABLE_SCROLL_CONTENT_CLASS).appendTo(this._$thumb);
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
    _events_engine.default.on(this._$thumb, (0, _index.addNamespace)(_pointer.default.down, SCROLLBAR), this.feedbackOn.bind(this));
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
    if ((0, _type.isPlainObject)(location)) {
      normalizedLocation = location[this._prop] || 0;
    }
    const scrollBarLocation = {};
    scrollBarLocation[this._prop] = this._calculateScrollBarPosition(normalizedLocation);
    (0, _translator.move)(this._$thumb, scrollBarLocation);
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
    return (0, _type.isPlainObject)(size) ? size[this._dimension] || 0 : size;
  }
  _clean() {
    super._clean();
    if (this === activeScrollbar) {
      activeScrollbar = null;
    }
    _events_engine.default.off(this._$thumb, `.${SCROLLBAR}`);
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
    (0, _common.deferRenderer)(() => {
      if (this._adjustVisibility()) {
        this.option('visible', true);
      }
    })();
  }
}
_ready_callbacks.default.add(() => {
  // @ts-expect-error ts-error
  _events_engine.default.subscribeGlobal(_dom_adapter.default.getDocument(), (0, _index.addNamespace)(_pointer.default.up, SCROLLBAR), () => {
    if (activeScrollbar) {
      activeScrollbar.feedbackOff();
    }
  });
});
var _default = exports.default = Scrollbar;