/**
* DevExtreme (cjs/__internal/ui/diagram/ui.diagram.toolbox.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _size = require("../../../core/utils/size");
var _window = require("../../../core/utils/window");
var _accordion = _interopRequireDefault(require("../../../ui/accordion"));
var _diagram = require("../../ui/diagram/diagram.importer");
var _uiDiagram = _interopRequireDefault(require("../../ui/diagram/ui.diagram.floating_panel"));
var _m_tooltip = _interopRequireDefault(require("../../ui/m_tooltip"));
var _scroll_view = _interopRequireDefault(require("../../ui/scroll_view/scroll_view"));
var _m_text_box = _interopRequireDefault(require("../../ui/text_box/m_text_box"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const DIAGRAM_TOOLBOX_MIN_HEIGHT = 130;
const DIAGRAM_TOOLBOX_POPUP_CLASS = 'dx-diagram-toolbox-popup';
const DIAGRAM_TOOLBOX_PANEL_CLASS = 'dx-diagram-toolbox-panel';
const DIAGRAM_TOOLBOX_INPUT_CONTAINER_CLASS = 'dx-diagram-toolbox-input-container';
const DIAGRAM_TOOLBOX_INPUT_CLASS = 'dx-diagram-toolbox-input';
const DIAGRAM_TOOLTIP_DATATOGGLE = 'shape-toolbox-tooltip';
const DIAGRAM_TOOLBOX_START_DRAG_CLASS = '.dxdi-tb-start-drag-flag';
class DiagramToolbox extends _uiDiagram.default {
  _init() {
    super._init();
    this._toolboxes = [];
    this._filterText = '';
    this._createOnShapeCategoryRenderedAction();
    this._createOnFilterChangedAction();
  }
  _getPopupClass() {
    return DIAGRAM_TOOLBOX_POPUP_CLASS;
  }
  _getPopupHeight() {
    return this.isMobileView() ? '100%' : super._getPopupHeight();
  }
  _getPopupMaxHeight() {
    return this.isMobileView() ? '100%' : super._getPopupMaxHeight();
  }
  _getPopupMinHeight() {
    return DIAGRAM_TOOLBOX_MIN_HEIGHT;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getPopupPosition() {
    // @ts-expect-error ts-error
    const {
      offsetParent,
      offsetX,
      offsetY
    } = this.option();
    const position = {
      my: 'left top',
      at: 'left top',
      of: offsetParent
    };
    if (!this.isMobileView()) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return (0, _extend.extend)(position, {
        offset: `${offsetX} ${offsetY}`
      });
    }
    return position;
  }
  _getPopupAnimation() {
    const $parent = this.option('offsetParent');
    if (this.isMobileView()) {
      return {
        hide: this._getPopupSlideAnimationObject({
          direction: 'left',
          from: {
            position: {
              my: 'left top',
              at: 'left top',
              of: $parent
            }
          },
          to: {
            position: {
              my: 'right top',
              at: 'left top',
              of: $parent
            }
          }
        }),
        show: this._getPopupSlideAnimationObject({
          direction: 'right',
          from: {
            position: {
              my: 'right top',
              at: 'left top',
              of: $parent
            }
          },
          to: {
            position: {
              my: 'left top',
              at: 'left top',
              of: $parent
            }
          }
        })
      };
    }
    return super._getPopupAnimation();
  }
  _getPopupOptions() {
    const options = super._getPopupOptions();
    if (!this.isMobileView()) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return (0, _extend.extend)(options, {
        showTitle: true,
        toolbarItems: [{
          widget: 'dxButton',
          location: 'center',
          options: {
            activeStateEnabled: false,
            focusStateEnabled: false,
            hoverStateEnabled: false,
            icon: 'diagram-toolbox-drag',
            stylingMode: 'outlined',
            type: 'normal'
          }
        }]
      });
    }
    return options;
  }
  _renderPopupContent($parent) {
    let panelHeight = '100%';
    if (this.option('showSearch')) {
      const $inputContainer = (0, _renderer.default)('<div>').addClass(DIAGRAM_TOOLBOX_INPUT_CONTAINER_CLASS).appendTo($parent);
      this._updateElementWidth($inputContainer);
      this._renderSearchInput($inputContainer);
      if ((0, _window.hasWindow)()) {
        var _this$_searchInput;
        panelHeight = `calc(100% - ${(0, _size.getHeight)((_this$_searchInput = this._searchInput) === null || _this$_searchInput === void 0 ? void 0 : _this$_searchInput.$element())}px)`;
      }
    }
    const $panel = (0, _renderer.default)('<div>').addClass(DIAGRAM_TOOLBOX_PANEL_CLASS).appendTo($parent);
    (0, _size.setHeight)($panel, panelHeight);
    this._updateElementWidth($panel);
    this._renderScrollView($panel);
  }
  _updateElementWidth($element) {
    if (this.option('toolboxWidth') !== undefined) {
      // @ts-expect-error ts-error
      const {
        toolboxWidth
      } = this.option();
      $element.css('width', toolboxWidth);
    }
  }
  updateMaxHeight() {
    if (this.isMobileView()) return;
    let maxHeight = 6;
    if (this._popup) {
      const $title = this._getPopupTitle();
      maxHeight += (0, _size.getOuterHeight)($title);
    }
    if (this._accordion) {
      maxHeight += (0, _size.getOuterHeight)(this._accordion.$element());
    }
    if (this._searchInput) {
      maxHeight += (0, _size.getOuterHeight)(this._searchInput.$element());
    }
    this.option('maxHeight', maxHeight);
  }
  _renderSearchInput($parent) {
    const $input = (0, _renderer.default)('<div>').addClass(DIAGRAM_TOOLBOX_INPUT_CLASS).appendTo($parent);
    this._searchInput = this._createComponent($input, _m_text_box.default, {
      stylingMode: 'outlined',
      placeholder: _message.default.format('dxDiagram-uiSearch'),
      onValueChanged: data => {
        this._onInputChanged(data.value);
      },
      valueChangeEvent: 'keyup',
      buttons: [{
        name: 'search',
        location: 'after',
        options: {
          activeStateEnabled: false,
          focusStateEnabled: false,
          hoverStateEnabled: false,
          icon: 'search',
          stylingMode: 'outlined',
          type: 'normal',
          onClick: () => {
            var _this$_searchInput2;
            (_this$_searchInput2 = this._searchInput) === null || _this$_searchInput2 === void 0 || _this$_searchInput2.focus();
          }
        }
      }]
    });
  }
  _renderScrollView($parent) {
    const $scrollViewWrapper = (0, _renderer.default)('<div>').appendTo($parent);
    // @ts-expect-error ts-error
    this._scrollView = this._createComponent($scrollViewWrapper, _scroll_view.default);
    // Prevent scroll toolbox content for dragging vertically
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const _moveIsAllowed = this._scrollView._moveIsAllowed.bind(this._scrollView);
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    this._scrollView._moveIsAllowed = e => {
      // @ts-expect-error ts-error
      for (let i = 0; i < ((_this$_toolboxes = this._toolboxes) === null || _this$_toolboxes === void 0 ? void 0 : _this$_toolboxes.length); i += 1) {
        var _this$_toolboxes, _this$_toolboxes2;
        const $element = (_this$_toolboxes2 = this._toolboxes) === null || _this$_toolboxes2 === void 0 ? void 0 : _this$_toolboxes2[i];
        if ((0, _renderer.default)($element).children(DIAGRAM_TOOLBOX_START_DRAG_CLASS).length) {
          return false;
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return _moveIsAllowed(e);
    };
    const $accordion = (0, _renderer.default)('<div>').appendTo(this._scrollView.content());
    this._updateElementWidth($accordion);
    this._renderAccordion($accordion);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _getAccordionDataSource() {
    const result = [];
    const toolboxGroups = this.option('toolboxGroups');
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < toolboxGroups.length; i += 1) {
      const {
        category
      } = toolboxGroups[i];
      const {
        title
      } = toolboxGroups[i];
      const groupObj = {
        category,
        title: title || category,
        expanded: toolboxGroups[i].expanded,
        displayMode: toolboxGroups[i].displayMode,
        shapes: toolboxGroups[i].shapes,
        onTemplate: (widget, $element, data) => {
          var _this$_toolboxes3;
          const $toolboxElement = (0, _renderer.default)($element);
          this._onShapeCategoryRenderedAction({
            category: data.category,
            displayMode: data.displayMode,
            dataToggle: DIAGRAM_TOOLTIP_DATATOGGLE,
            shapes: data.shapes,
            $element: $toolboxElement
          });
          (_this$_toolboxes3 = this._toolboxes) === null || _this$_toolboxes3 === void 0 || _this$_toolboxes3.push($toolboxElement);
          if (this._filterText !== '') {
            var _this$_toolboxes4;
            this._onFilterChangedAction({
              text: this._filterText,
              // @ts-expect-error ts-error
              // eslint-disable-next-line no-unsafe-optional-chaining
              filteringToolboxes: ((_this$_toolboxes4 = this._toolboxes) === null || _this$_toolboxes4 === void 0 ? void 0 : _this$_toolboxes4.length) - 1
            });
          }
          this._createTooltips($toolboxElement);
        }
      };
      // @ts-expect-error ts-error
      result.push(groupObj);
    }
    return result;
  }
  _createTooltips($toolboxElement) {
    if (this._isTouchMode()) return;
    const targets = $toolboxElement.find(`[data-toggle="${DIAGRAM_TOOLTIP_DATATOGGLE}"]`);
    const $container = this.$element();
    // @ts-expect-error ts-error
    targets.each((_, element) => {
      const $target = (0, _renderer.default)(element);
      const title = $target.attr('title');
      if (title) {
        const $tooltip = (0, _renderer.default)('<div>').text(title).appendTo($container);
        this._createComponent($tooltip, _m_tooltip.default, {
          target: $target.get(0),
          showEvent: 'mouseenter',
          hideEvent: 'mouseleave',
          position: 'top',
          animation: {
            show: {
              type: 'fade',
              from: 0,
              to: 1,
              delay: 500
            },
            hide: {
              type: 'fade',
              from: 1,
              to: 0,
              delay: 100
            }
          }
        });
      }
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _isTouchMode() {
    const {
      Browser
    } = (0, _diagram.getDiagram)();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Browser.TouchUI;
  }
  _renderAccordion($container) {
    const {
      disabled
    } = this.option();
    this._accordion = this._createComponent($container, _accordion.default, {
      multiple: true,
      animationDuration: 0,
      activeStateEnabled: false,
      focusStateEnabled: false,
      hoverStateEnabled: false,
      collapsible: true,
      displayExpr: 'title',
      dataSource: this._getAccordionDataSource(),
      disabled,
      itemTemplate: (data, index, $element) => {
        data.onTemplate(this, $element, data);
      },
      onSelectionChanged: e => {
        this._updateScrollAnimateSubscription(e.component);
      },
      onContentReady: e => {
        e.component.option('selectedItems', []);
        const items = e.component.option('dataSource');
        for (let i = 0; i < (items === null || items === void 0 ? void 0 : items.length); i += 1) {
          if ((items === null || items === void 0 ? void 0 : items[i].expanded) === false) {
            e.component.collapseItem(i);
          } else if ((items === null || items === void 0 ? void 0 : items[i].expanded) === true) {
            e.component.expandItem(i);
          }
        }
        // expand first group
        if (items !== null && items !== void 0 && items.length && items[0].expanded === undefined) {
          e.component.expandItem(0);
        }
        this._updateScrollAnimateSubscription(e.component);
      }
    });
  }
  _updateScrollAnimateSubscription(component) {
    // @ts-expect-error ts-error
    component._deferredAnimate = new _deferred.Deferred();
    component._deferredAnimate.done(() => {
      this.updateMaxHeight();
      this._scrollView.update();
      this._updateScrollAnimateSubscription(component);
    });
  }
  _onInputChanged(text) {
    var _this$_toolboxes5;
    this._filterText = text;
    this._onFilterChangedAction({
      text: this._filterText,
      filteringToolboxes: (_this$_toolboxes5 = this._toolboxes) === null || _this$_toolboxes5 === void 0 ? void 0 : _this$_toolboxes5.map(($element, index) => index)
    });
    this.updateTooltips();
    this.updateMaxHeight();
    this._scrollView.update();
  }
  updateFilter() {
    this._onInputChanged(this._filterText);
  }
  updateTooltips() {
    var _this$_toolboxes6;
    (_this$_toolboxes6 = this._toolboxes) === null || _this$_toolboxes6 === void 0 || _this$_toolboxes6.forEach($element => {
      const $tooltipContainer = (0, _renderer.default)($element);
      this._createTooltips($tooltipContainer);
    });
  }
  _createOnShapeCategoryRenderedAction() {
    this._onShapeCategoryRenderedAction = this._createActionByOption(
    // @ts-expect-error ts-error
    'onShapeCategoryRendered');
  }
  _createOnFilterChangedAction() {
    // @ts-expect-error ts-error
    this._onFilterChangedAction = this._createActionByOption('onFilterChanged');
  }
  _optionChanged(args) {
    var _this$_accordion;
    switch (args.name) {
      case 'onShapeCategoryRendered':
        this._createOnShapeCategoryRenderedAction();
        break;
      case 'onFilterChanged':
        this._createOnFilterChangedAction();
        break;
      case 'showSearch':
      case 'toolboxWidth':
        this._invalidate();
        break;
      case 'toolboxGroups':
        (_this$_accordion = this._accordion) === null || _this$_accordion === void 0 || _this$_accordion.option('dataSource', this._getAccordionDataSource());
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = DiagramToolbox;
