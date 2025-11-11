/**
* DevExtreme (cjs/__internal/ui/diagram/ui.diagram.properties_panel.js)
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
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _size = require("../../../core/utils/size");
var _diagram = _interopRequireDefault(require("../../ui/diagram/diagram.commands_manager"));
var _uiDiagram = _interopRequireDefault(require("../../ui/diagram/ui.diagram.floating_panel"));
var _scroll_view = _interopRequireDefault(require("../../ui/scroll_view/scroll_view"));
var _tab_panel = _interopRequireDefault(require("../../ui/tab_panel/tab_panel"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DIAGRAM_PROPERTIES_POPUP_WIDTH = 420;
const DIAGRAM_PROPERTIES_POPUP_HEIGHT = 340;
const DIAGRAM_PROPERTIES_POPUP_CLASS = 'dx-diagram-properties-popup';
const DIAGRAM_PROPERTIES_POPUP_NOTABS_CLASS = 'dx-diagram-properties-popup-notabs';
const DIAGRAM_PROPERTIES_PANEL_CLASS = 'dx-diagram-properties-panel';
const DIAGRAM_PROPERTIES_PANEL_GROUP_TITLE_CLASS = 'dx-diagram-properties-panel-group-title';
const DIAGRAM_PROPERTIES_PANEL_GROUP_TOOLBAR_CLASS = 'dx-diagram-properties-panel-group-toolbar';
class DiagramPropertiesPanel extends _uiDiagram.default {
  _init() {
    super._init();
    this._commandTabs = _diagram.default.getPropertyPanelCommandTabs(this.option('propertyTabs'));
    this._createOnCreateToolbar();
    this._createOnSelectedGroupChanged();
  }
  _initMarkup() {
    this._toolbars = [];
    this._selectedToolbar = undefined;
    super._initMarkup();
  }
  _getPopupClass() {
    let className = DIAGRAM_PROPERTIES_POPUP_CLASS;
    if (!this._hasTabPanel()) {
      className += ` ${DIAGRAM_PROPERTIES_POPUP_NOTABS_CLASS}`;
    }
    return className;
  }
  _getPopupWidth() {
    return this.isMobileView() ? '100%' : DIAGRAM_PROPERTIES_POPUP_WIDTH;
  }
  _getPopupHeight() {
    return DIAGRAM_PROPERTIES_POPUP_HEIGHT;
  }
  _getPopupPosition() {
    // @ts-expect-error ts-error
    const {
      offsetParent,
      offsetX,
      offsetY
    } = this.option();
    if (this.isMobileView()) {
      return {
        my: 'left bottom',
        at: 'left bottom',
        of: offsetParent
      };
    }
    return {
      my: 'right bottom',
      at: 'right bottom',
      of: offsetParent,
      offset: `-${offsetX} -${offsetY}`
    };
  }
  _getPopupAnimation() {
    const $parent = this.option('offsetParent');
    if (this.isMobileView()) {
      return {
        hide: this._getPopupSlideAnimationObject({
          direction: 'bottom',
          from: {
            position: {
              my: 'left bottom',
              at: 'left bottom',
              of: $parent
            }
          },
          to: {
            position: {
              my: 'left top',
              at: 'left bottom',
              of: $parent
            }
          }
        }),
        show: this._getPopupSlideAnimationObject({
          direction: 'top',
          from: {
            position: {
              my: 'left top',
              at: 'left bottom',
              of: $parent
            }
          },
          to: {
            position: {
              my: 'left bottom',
              at: 'left bottom',
              of: $parent
            }
          }
        })
      };
    }
    return super._getPopupAnimation();
  }
  _getPopupOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _extend.extend)(super._getPopupOptions(), {
      showTitle: this.isMobileView(),
      showCloseButton: this.isMobileView()
    });
  }
  _renderPopupContent($parent) {
    if (!this._commandTabs.length) return;
    const $panel = (0, _renderer.default)('<div>').addClass(DIAGRAM_PROPERTIES_PANEL_CLASS).appendTo($parent);
    if (this._hasTabPanel()) {
      this._renderTabPanel($panel);
    } else {
      this._renderTabContent($panel, this._commandTabs[0], 0, true);
    }
  }
  _hasTabPanel() {
    return this._commandTabs.length > 1;
  }
  _renderTabPanel($parent) {
    const $tabPanel = (0, _renderer.default)('<div>').appendTo($parent);
    this._tabPanel = this._createComponent($tabPanel, _tab_panel.default, {
      focusStateEnabled: false,
      dataSource: this._commandTabs,
      itemTemplate: (data, index, $element) => {
        // @ts-expect-error ts-error
        this._renderTabContent($element, data, index);
      },
      onSelectionChanged: () => {
        this._onSelectedGroupChangedAction();
        this._onPointerUpAction();
      },
      onContentReady: e => {
        var _this$_popup;
        (_this$_popup = this._popup) === null || _this$_popup === void 0 || _this$_popup.option('height', (0, _size.getHeight)(e.component.$element()) + this._getVerticalPaddingsAndBorders());
        if (this._firstScrollView) {
          this._scrollViewHeight = (0, _size.getOuterHeight)(this._firstScrollView.$element());
          this._firstScrollView.option('height', this._scrollViewHeight);
        }
      }
    });
  }
  _renderTabContent($parent, tab, index, isSingleTab) {
    const $scrollViewWrapper = (0, _renderer.default)('<div>').appendTo($parent);
    const scrollView = this._createComponent($scrollViewWrapper, _scroll_view.default, {
      height: this._scrollViewHeight
    });
    this._renderTabInnerContent(scrollView.content(), tab, index);
    if (isSingleTab) {
      var _this$_popup2;
      (_this$_popup2 = this._popup) === null || _this$_popup2 === void 0 || _this$_popup2.option('height', (0, _size.getHeight)(scrollView.$element()) + this._getVerticalPaddingsAndBorders());
    } else {
      this._firstScrollView = this._firstScrollView || scrollView;
    }
  }
  _renderTabInnerContent($parent, group, index) {
    if (group.groups) {
      group.groups.forEach(sg => {
        this._renderTabGroupContent($parent, index, sg.title, sg.commands);
      });
    } else if (group.commands) {
      this._renderTabGroupContent($parent, index, undefined, group.commands);
    }
  }
  _renderTabGroupContent($parent, index, title, commands) {
    if (title) {
      (0, _renderer.default)('<div>').addClass(DIAGRAM_PROPERTIES_PANEL_GROUP_TITLE_CLASS).appendTo($parent).text(title);
    }
    const $toolbar = (0, _renderer.default)('<div>').addClass(DIAGRAM_PROPERTIES_PANEL_GROUP_TOOLBAR_CLASS).appendTo($parent);
    const args = {
      $parent: $toolbar,
      commands
    };
    this._onCreateToolbarAction(args);
    if (!this._toolbars[index]) {
      this._toolbars[index] = [];
    }
    // @ts-expect-error ts-error
    this._toolbars[index].push(args.toolbar);
    // @ts-expect-error ts-error
    this._selectedToolbar = args.toolbar;
  }
  getActiveToolbars() {
    const index = this._tabPanel ? this._tabPanel.option('selectedIndex') : 0;
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._toolbars[index];
  }
  _createOnCreateToolbar() {
    // @ts-expect-error ts-error
    this._onCreateToolbarAction = this._createActionByOption('onCreateToolbar');
  }
  _createOnSelectedGroupChanged() {
    this._onSelectedGroupChangedAction = this._createActionByOption(
    // @ts-expect-error ts-error
    'onSelectedGroupChanged');
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'onCreateToolbar':
        this._createOnCreateToolbar();
        break;
      case 'onSelectedGroupChanged':
        this._createOnSelectedGroupChanged();
        break;
      case 'propertyTabs':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = DiagramPropertiesPanel;
