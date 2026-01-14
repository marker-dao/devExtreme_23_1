import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { InfernoComponent, InfernoEffect } from '../core/r1/runtime/inferno/index';
import { Widget } from '../core/r1/widget';
import { createRef as infernoCreateRef } from 'inferno';
import { combineClasses } from '../core/r1/utils/render_utils';
import { registerKeyboardAction } from '../ui/shared/accessibility';
import { LIGHT_MODE_CLASS, PAGER_CLASS, PAGINATION_CLASS, PAGINATION_PAGE_INDEXES_CLASS, PAGINATION_PAGES_CLASS } from './common/consts';
import { KeyboardActionContext } from './common/keyboard_action_context';
import { PaginationConfigProvider } from './common/pagination_config_provider';
import { PaginationDefaultProps } from './common/pagination_props';
import { InfoText } from './info';
import { PageSizeSelector } from './page_size/selector';
import { PageIndexSelector } from './pages/page_index_selector';
export const PaginationContentDefaultProps = Object.assign({}, PaginationDefaultProps, {
  infoTextVisible: true,
  isLargeDisplayMode: true
});
export class PaginationContent extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.refs = null;
    // eslint-disable-next-line @stylistic/max-len
    this.widgetElementRef = infernoCreateRef();
    // eslint-disable-next-line @stylistic/max-len
    this.widgetRootElementRef = infernoCreateRef();
    this.pagesRef = infernoCreateRef();
    this.infoTextRef = infernoCreateRef();
    this.__getterCache = {
      keyboardAction: undefined
    };
    this.state = {};
    this.__getterCache = {};
    this.setRootElementRef = this.setRootElementRef.bind(this);
    this.createFakeInstance = this.createFakeInstance.bind(this);
  }
  createEffects() {
    return [new InfernoEffect(this.setRootElementRef, [])];
  }
  getChildContext() {
    return Object.assign({}, this.context, {
      [KeyboardActionContext.id]: this.getKeyboardAction() || KeyboardActionContext.defaultValue
    });
  }
  setRootElementRef() {
    const {
      rootElementRef
    } = this.props;
    if (rootElementRef && this.widgetRootElementRef) {
      rootElementRef.current = this.widgetRootElementRef.current;
    }
  }
  getWidgetRootElement() {
    var _this$widgetRootEleme;
    return (_this$widgetRootEleme = this.widgetRootElementRef) === null || _this$widgetRootEleme === void 0 ? void 0 : _this$widgetRootEleme.current;
  }
  createFakeInstance() {
    return {
      option: () => false,
      element: () => this.getWidgetRootElement(),
      // NOTE: Fix of the T1285596
      //
      // 1) For Pagination used inside the DataGrid
      // In this case the instance element should be
      // DataGrid for correct keyboard shortcuts handling.
      //
      // 2) For standalone Pagination pass the instance mock
      // In this case the element should be Pagination root node
      //
      // See the ui/shared/accessibility.js "selectView" util function for more details.
      component: this.props._getParentComponentRootNode ? {
        element: () => {
          var _this$props$_getParen, _this$props;
          return (_this$props$_getParen = (_this$props = this.props)._getParentComponentRootNode) === null || _this$props$_getParen === void 0 ? void 0 : _this$props$_getParen.call(_this$props);
        }
      } : {
        element: () => this.getWidgetRootElement()
      },
      _createActionByOption: () => e => {
        var _this$props$onKeyDown, _this$props2;
        (_this$props$onKeyDown = (_this$props2 = this.props).onKeyDown) === null || _this$props$onKeyDown === void 0 || _this$props$onKeyDown.call(_this$props2, e);
      }
    };
  }
  getKeyboardAction() {
    return {
      registerKeyboardAction: (element, action) => {
        const fakePaginationInstance = this.createFakeInstance();
        // TODO Pager: Get rid of this utils usage
        return registerKeyboardAction('pager', fakePaginationInstance, element, undefined, action);
      }
    };
  }
  getInfoVisible() {
    const {
      infoTextVisible,
      showInfo
    } = this.props;
    return !!showInfo && infoTextVisible;
  }
  getPageIndexSelectorVisible() {
    return this.props.pageSize !== 0;
  }
  getNormalizedDisplayMode() {
    const {
      displayMode,
      lightModeEnabled
    } = this.props;
    if (displayMode === 'adaptive' && lightModeEnabled !== undefined) {
      return lightModeEnabled ? 'compact' : 'full';
    }
    return displayMode ?? 'adaptive';
  }
  getPagesContainerVisible() {
    return !!this.props.pagesNavigatorVisible && this.props.pageCount > 0;
  }
  getPagesContainerVisibility() {
    const {
      pagesNavigatorVisible,
      pageCount,
      hasKnownLastPage,
      showInfo,
      showNavigationButtons,
      showPageSizeSelector
    } = this.props;
    const shouldHideBasedOnPageCount = pagesNavigatorVisible === 'auto' && pageCount === 1 && hasKnownLastPage;
    const hasExplicitVisibleComponents = Boolean(showInfo) || Boolean(showNavigationButtons) || showPageSizeSelector === true;
    const shouldHide = shouldHideBasedOnPageCount && !hasExplicitVisibleComponents;
    const result = shouldHide ? 'hidden' : undefined;
    return result;
  }
  getIsLargeDisplayMode() {
    const displayMode = this.getNormalizedDisplayMode();
    let result = false;
    if (displayMode === 'adaptive') {
      result = this.props.isLargeDisplayMode;
    } else {
      result = displayMode === 'full';
    }
    return result;
  }
  getClasses() {
    const classesMap = {
      [`${this.props.className}`]: !!this.props.className,
      [PAGER_CLASS]: !!this.props.isGridCompatibilityMode,
      [PAGINATION_CLASS]: !this.props.isGridCompatibilityMode,
      [LIGHT_MODE_CLASS]: !this.getIsLargeDisplayMode()
    };
    return combineClasses(classesMap);
  }
  getAria() {
    return {
      role: 'navigation',
      label: this.props.label ?? ''
    };
  }
  componentWillUpdate(nextProps) {
    super.componentWillUpdate();
    if (this.props.onKeyDown !== nextProps.onKeyDown) {
      this.__getterCache.keyboardAction = undefined;
    }
  }
  render() {
    const {
      isGridCompatibilityMode,
      rtlEnabled,
      visible,
      showPageSizeSelector,
      allowedPageSizesRef,
      pageSize,
      pageSizeChangedInternal,
      allowedPageSizes,
      infoTextRef,
      infoText,
      pageCount,
      pageIndex,
      itemCount,
      pagesRef,
      hasKnownLastPage,
      maxPagesCount,
      pageIndexChangedInternal,
      pagesCountText,
      showNavigationButtons,
      style,
      width,
      height,
      elementAttr,
      hint,
      disabled,
      tabIndex,
      accessKey,
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.props;
    const content = normalizeProps(createComponentVNode(2, Widget, Object.assign({
      "rootElementRef": this.widgetRootElementRef,
      "rtlEnabled": rtlEnabled,
      "classes": this.getClasses(),
      "visible": visible,
      "aria": this.getAria(),
      "style": style,
      "width": width,
      "height": height,
      "hint": hint,
      "disabled": disabled,
      "tabIndex": tabIndex,
      "accessKey": accessKey,
      "activeStateEnabled": activeStateEnabled,
      "focusStateEnabled": focusStateEnabled,
      "hoverStateEnabled": hoverStateEnabled
    }, elementAttr, {
      children: [showPageSizeSelector && createComponentVNode(2, PageSizeSelector, {
        "rootElementRef": allowedPageSizesRef,
        "isLargeDisplayMode": this.getIsLargeDisplayMode(),
        "itemCount": itemCount,
        "pageSize": pageSize,
        "pageSizeChangedInternal": pageSizeChangedInternal,
        "allowedPageSizes": allowedPageSizes
      }), this.getPagesContainerVisible() && createVNode(1, "div", PAGINATION_PAGES_CLASS, [this.getInfoVisible() && createComponentVNode(2, InfoText, {
        "rootElementRef": infoTextRef,
        "infoText": infoText,
        "pageCount": pageCount,
        "pageIndex": pageIndex,
        "itemCount": itemCount
      }), this.getPageIndexSelectorVisible() && createVNode(1, "div", PAGINATION_PAGE_INDEXES_CLASS, createComponentVNode(2, PageIndexSelector, {
        "hasKnownLastPage": hasKnownLastPage,
        "isLargeDisplayMode": this.getIsLargeDisplayMode(),
        "maxPagesCount": maxPagesCount,
        "pageCount": pageCount,
        "pageIndex": pageIndex,
        "pageIndexChangedInternal": pageIndexChangedInternal,
        "pagesCountText": pagesCountText,
        "showNavigationButtons": showNavigationButtons,
        "itemCount": itemCount
      }), 2, null, null, pagesRef)], 0, {
        "style": {
          visibility: this.getPagesContainerVisibility()
        }
      })]
    })));
    return createComponentVNode(2, PaginationConfigProvider, {
      "isGridCompatibilityMode": isGridCompatibilityMode,
      children: content
    });
  }
}
PaginationContent.defaultProps = PaginationContentDefaultProps;