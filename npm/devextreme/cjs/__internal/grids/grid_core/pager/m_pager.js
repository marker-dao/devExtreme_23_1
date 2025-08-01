/**
* DevExtreme (cjs/__internal/grids/grid_core/pager/m_pager.js)
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
exports.pagerModule = exports.PagerView = exports.MAX_PAGES_COUNT = void 0;
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _type = require("../../../../core/utils/type");
var _window = require("../../../../core/utils/window");
var _pagination = _interopRequireDefault(require("../../../pagination/wrappers/pagination"));
var _m_modules = _interopRequireDefault(require("../m_modules"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PAGER_CLASS = 'pager';
const MAX_PAGES_COUNT = exports.MAX_PAGES_COUNT = 10;
const getPageIndex = function (dataController) {
  // eslint-disable-next-line radix
  return 1 + (parseInt(dataController.pageIndex()) || 0);
};
// TODO getController
class PagerView extends _m_modules.default.View {
  init() {
    const dataController = this.getController('data');
    dataController.changed.add(e => {
      if (e && e.repaintChangesOnly) {
        const pager = this._pager;
        if (pager) {
          pager.option({
            pageIndex: getPageIndex(dataController),
            pageSize: dataController.pageSize(),
            pageCount: dataController.pageCount(),
            itemCount: dataController.totalCount(),
            hasKnownLastPage: dataController.hasKnownLastPage()
          });
        } else {
          this.render();
        }
      } else if (!e || e.changeType !== 'update' && e.changeType !== 'updateSelection' && e.changeType !== 'updateFocusedRow') {
        this._pager = null;
        this.render();
      }
    });
  }
  dispose() {
    this._pager = null;
  }
  optionChanged(args) {
    const {
      name
    } = args;
    const isPager = name === 'pager';
    const isPaging = name === 'paging';
    const isDataSource = name === 'dataSource';
    const isScrolling = name === 'scrolling';
    const dataController = this.getController('data');
    if (isPager || isPaging || isScrolling || isDataSource) {
      args.handled = true;
      if (dataController.skipProcessingPagingChange(args.fullName)) {
        return;
      }
      if (isPager || isPaging) {
        this._pageSizes = null;
      }
      if (!isDataSource) {
        this._pager = null;
        this._invalidate();
        if ((0, _window.hasWindow)() && isPager && this.component) {
          // @ts-expect-error
          this.component.resize();
        }
      }
    }
  }
  _renderCore() {
    const that = this;
    const $element = that.element().addClass(that.addWidgetPrefix(PAGER_CLASS));
    const pagerOptions = that.option('pager') ?? {};
    const dataController = that.getController('data');
    const keyboardController = that.getController('keyboardNavigation');
    const options = {
      maxPagesCount: MAX_PAGES_COUNT,
      pageIndex: getPageIndex(dataController),
      pageCount: dataController.pageCount(),
      pageSize: dataController.pageSize(),
      showPageSizeSelector: pagerOptions.showPageSizeSelector,
      showInfo: pagerOptions.showInfo,
      displayMode: pagerOptions.displayMode,
      pagesNavigatorVisible: pagerOptions.visible,
      showNavigationButtons: pagerOptions.showNavigationButtons,
      label: pagerOptions.label,
      allowedPageSizes: that.getPageSizes(),
      itemCount: dataController.totalCount(),
      hasKnownLastPage: dataController.hasKnownLastPage(),
      rtlEnabled: that.option('rtlEnabled'),
      isGridCompatibilityMode: true,
      _getParentComponentRootNode: () => this.component.element(),
      _skipValidation: true,
      pageIndexChanged(pageIndex) {
        if (dataController.pageIndex() !== pageIndex - 1) {
          dataController.pageIndex(pageIndex - 1);
        }
      },
      pageSizeChanged(pageSize) {
        dataController.pageSize(pageSize);
      },
      onKeyDown: e => keyboardController && keyboardController.executeAction('onKeyDown', e)
    };
    if ((0, _type.isDefined)(pagerOptions.infoText)) {
      options.infoText = pagerOptions.infoText;
    }
    if (this._pager) {
      this._pager.repaint();
      return;
    }
    if ((0, _window.hasWindow)()) {
      this._pager = that._createComponent($element, _pagination.default, options);
    } else {
      $element.addClass('dx-pager').html('<div class="dx-pages"><div class="dx-page"></div></div>');
    }
  }
  getPager() {
    return this._pager;
  }
  getPageSizes() {
    const that = this;
    const dataController = that.getController('data');
    const pagerOptions = that.option('pager');
    const allowedPageSizes = pagerOptions && pagerOptions.allowedPageSizes;
    const pageSize = dataController.pageSize();
    if (!(0, _type.isDefined)(that._pageSizes) || !that._pageSizes.includes(pageSize)) {
      that._pageSizes = [];
      if (pagerOptions) {
        if (Array.isArray(allowedPageSizes)) {
          that._pageSizes = allowedPageSizes;
        } else if (allowedPageSizes && pageSize > 1) {
          that._pageSizes = [Math.floor(pageSize / 2), pageSize, pageSize * 2];
        }
      }
    }
    return that._pageSizes;
  }
  isVisible() {
    const dataController = this.getController('data');
    const pagerOptions = this.option('pager');
    let pagerVisible = pagerOptions && pagerOptions.visible;
    const scrolling = this.option('scrolling');
    if (pagerVisible === 'auto') {
      // @ts-expect-error
      if (scrolling && (scrolling.mode === 'virtual' || scrolling.mode === 'infinite')) {
        pagerVisible = false;
      } else {
        pagerVisible = dataController.pageCount() > 1 || dataController.isLoaded() && !dataController.hasKnownLastPage();
      }
    }
    return !!pagerVisible;
  }
  getHeight() {
    return this.getElementHeight();
  }
}
exports.PagerView = PagerView;
const pagerModule = exports.pagerModule = {
  defaultOptions() {
    return {
      pager: {
        visible: 'auto',
        showPageSizeSelector: false,
        allowedPageSizes: 'auto',
        label: _message.default.format('dxPager-ariaLabel')
      }
    };
  },
  views: {
    pagerView: PagerView
  }
};
