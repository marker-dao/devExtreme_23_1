/**
* DevExtreme (cjs/__internal/ui/diagram/ui.diagram.scroll_view.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _m_widget_utils = require("../../../__internal/grids/pivot_grid/m_widget_utils");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _size = require("../../../core/utils/size");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _diagram = require("../../ui/diagram/diagram.importer");
var _scroll_view = _interopRequireDefault(require("../../ui/scroll_view/scroll_view"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// TODO: Can we get rid of this dependency of the PivotGrid here?

class DiagramScrollView extends _widget.default {
  _init() {
    super._init();
    const {
      EventDispatcher
    } = (0, _diagram.getDiagram)();
    this.onScroll = new EventDispatcher();
    this._createOnCreateDiagramAction();
  }
  _initMarkup() {
    super._initMarkup();
    const $scrollViewWrapper = (0, _renderer.default)('<div>').appendTo(this.$element());
    const options = {
      direction: 'both',
      bounceEnabled: false,
      scrollByContent: false,
      onScroll: _ref => {
        let {
          scrollOffset
        } = _ref;
        this._raiseOnScroll(scrollOffset.left, scrollOffset.top);
      }
    };
    const {
      useNativeScrolling
    } = this.option();
    if (useNativeScrolling !== undefined) {
      // @ts-expect-error ts-error
      options.useNative = useNativeScrolling;
    }
    this._scrollView = this._createComponent($scrollViewWrapper, _scroll_view.default,
    // @ts-expect-error ts-error
    options);
    this._onCreateDiagramAction({
      $parent: (0, _renderer.default)(this._scrollView.content()),
      scrollView: this
    });
  }
  setScroll(left, top) {
    var _this$_scrollView;
    (_this$_scrollView = this._scrollView) === null || _this$_scrollView === void 0 || _this$_scrollView.scrollTo({
      left,
      top
    });
    this._raiseOnScrollWithoutPoint();
  }
  offsetScroll(left, top) {
    var _this$_scrollView2;
    (_this$_scrollView2 = this._scrollView) === null || _this$_scrollView2 === void 0 || _this$_scrollView2.scrollBy({
      left,
      top
    });
    this._raiseOnScrollWithoutPoint();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getSize() {
    var _this$_scrollView3;
    const {
      Size
    } = (0, _diagram.getDiagram)();
    const $element = (_this$_scrollView3 = this._scrollView) === null || _this$_scrollView3 === void 0 ? void 0 : _this$_scrollView3.$element();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return new Size(Math.floor((0, _size.getWidth)($element)), Math.floor((0, _size.getHeight)($element)));
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getScrollContainer() {
    var _this$_scrollView4;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (_this$_scrollView4 = this._scrollView) === null || _this$_scrollView4 === void 0 ? void 0 : _this$_scrollView4.$element()[0];
  }
  getScrollBarWidth() {
    const {
      useNativeScrolling
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return useNativeScrolling ? (0, _m_widget_utils.calculateScrollbarWidth)() : 0;
  }
  detachEvents() {}
  _raiseOnScroll(left, top) {
    const {
      Point
    } = (0, _diagram.getDiagram)();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    this.onScroll.raise('notifyScrollChanged', () => new Point(left, top));
  }
  _raiseOnScrollWithoutPoint() {
    const {
      Point
    } = (0, _diagram.getDiagram)();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    this.onScroll.raise('notifyScrollChanged', () => {
      var _this$_scrollView5, _this$_scrollView6;
      return new Point((_this$_scrollView5 = this._scrollView) === null || _this$_scrollView5 === void 0 ? void 0 : _this$_scrollView5.scrollLeft(), (_this$_scrollView6 = this._scrollView) === null || _this$_scrollView6 === void 0 ? void 0 : _this$_scrollView6.scrollTop());
    });
  }
  _createOnCreateDiagramAction() {
    this._onCreateDiagramAction = this._createActionByOption('onCreateDiagram');
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'onCreateDiagram':
        this._createOnCreateDiagramAction();
        break;
      case 'useNativeScrolling':
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = DiagramScrollView;
