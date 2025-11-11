/**
* DevExtreme (esm/__internal/ui/diagram/ui.diagram.scroll_view.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// TODO: Can we get rid of this dependency of the PivotGrid here?
import { calculateScrollbarWidth } from '../../../__internal/grids/pivot_grid/m_widget_utils';
import $ from '../../../core/renderer';
import { getHeight, getWidth } from '../../../core/utils/size';
import Widget from '../../core/widget/widget';
import { getDiagram } from '../../ui/diagram/diagram.importer';
import ScrollView from '../../ui/scroll_view/scroll_view';
class DiagramScrollView extends Widget {
  _init() {
    super._init();
    const {
      EventDispatcher
    } = getDiagram();
    this.onScroll = new EventDispatcher();
    this._createOnCreateDiagramAction();
  }
  _initMarkup() {
    super._initMarkup();
    const $scrollViewWrapper = $('<div>').appendTo(this.$element());
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
    this._scrollView = this._createComponent($scrollViewWrapper, ScrollView,
    // @ts-expect-error ts-error
    options);
    this._onCreateDiagramAction({
      $parent: $(this._scrollView.content()),
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
    } = getDiagram();
    const $element = (_this$_scrollView3 = this._scrollView) === null || _this$_scrollView3 === void 0 ? void 0 : _this$_scrollView3.$element();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return new Size(Math.floor(getWidth($element)), Math.floor(getHeight($element)));
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
    return useNativeScrolling ? calculateScrollbarWidth() : 0;
  }
  detachEvents() {}
  _raiseOnScroll(left, top) {
    const {
      Point
    } = getDiagram();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    this.onScroll.raise('notifyScrollChanged', () => new Point(left, top));
  }
  _raiseOnScrollWithoutPoint() {
    const {
      Point
    } = getDiagram();
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
export default DiagramScrollView;
