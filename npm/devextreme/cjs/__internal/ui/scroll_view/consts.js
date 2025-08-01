/**
* DevExtreme (cjs/__internal/ui/scroll_view/consts.js)
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
exports.VALIDATE_WHEEL_TIMEOUT = exports.TopPocketState = exports.ShowScrollbarMode = exports.SCROLL_LINE_HEIGHT = exports.SCROLLVIEW_TOP_POCKET_CLASS = exports.SCROLLVIEW_REACHBOTTOM_TEXT_CLASS = exports.SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS = exports.SCROLLVIEW_REACHBOTTOM_CLASS = exports.SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS = exports.SCROLLVIEW_PULLDOWN_TEXT_CLASS = exports.SCROLLVIEW_PULLDOWN_READY_CLASS = exports.SCROLLVIEW_PULLDOWN_LOADING_CLASS = exports.SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = exports.SCROLLVIEW_PULLDOWN_IMAGE_CLASS = exports.SCROLLVIEW_PULLDOWN = exports.SCROLLVIEW_CONTENT_CLASS = exports.SCROLLVIEW_BOTTOM_POCKET_CLASS = exports.SCROLLABLE_WRAPPER_CLASS = exports.SCROLLABLE_SIMULATED_CLASS = exports.SCROLLABLE_SCROLL_CONTENT_CLASS = exports.SCROLLABLE_SCROLL_CLASS = exports.SCROLLABLE_SCROLLBAR_SIMULATED = exports.SCROLLABLE_SCROLLBAR_CLASS = exports.SCROLLABLE_SCROLLBAR_ACTIVE_CLASS = exports.SCROLLABLE_SCROLLBARS_HIDDEN = exports.SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE = exports.SCROLLABLE_DISABLED_CLASS = exports.SCROLLABLE_CONTENT_CLASS = exports.SCROLLABLE_CONTAINER_CLASS = exports.PULLDOWN_ICON_CLASS = exports.KEY_CODES = exports.HOVER_ENABLED_STATE = exports.HIDE_SCROLLBAR_TIMEOUT = exports.DIRECTION_VERTICAL = exports.DIRECTION_HORIZONTAL = exports.DIRECTION_BOTH = void 0;
const SCROLL_LINE_HEIGHT = exports.SCROLL_LINE_HEIGHT = 40;
const DIRECTION_VERTICAL = exports.DIRECTION_VERTICAL = 'vertical';
const DIRECTION_HORIZONTAL = exports.DIRECTION_HORIZONTAL = 'horizontal';
const DIRECTION_BOTH = exports.DIRECTION_BOTH = 'both';
const SCROLLABLE_SIMULATED_CLASS = exports.SCROLLABLE_SIMULATED_CLASS = 'dx-scrollable-simulated';
const SCROLLABLE_CONTENT_CLASS = exports.SCROLLABLE_CONTENT_CLASS = 'dx-scrollable-content';
const SCROLLABLE_WRAPPER_CLASS = exports.SCROLLABLE_WRAPPER_CLASS = 'dx-scrollable-wrapper';
const SCROLLABLE_CONTAINER_CLASS = exports.SCROLLABLE_CONTAINER_CLASS = 'dx-scrollable-container';
const SCROLLABLE_DISABLED_CLASS = exports.SCROLLABLE_DISABLED_CLASS = 'dx-scrollable-disabled';
const SCROLLABLE_SCROLLBAR_SIMULATED = exports.SCROLLABLE_SCROLLBAR_SIMULATED = 'dx-scrollable-scrollbar-simulated';
const SCROLLABLE_SCROLLBARS_HIDDEN = exports.SCROLLABLE_SCROLLBARS_HIDDEN = 'dx-scrollable-scrollbars-hidden';
const SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE = exports.SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE = 'dx-scrollable-scrollbars-alwaysvisible';
const SCROLLABLE_SCROLLBAR_CLASS = exports.SCROLLABLE_SCROLLBAR_CLASS = 'dx-scrollable-scrollbar';
const SCROLLABLE_SCROLLBAR_ACTIVE_CLASS = exports.SCROLLABLE_SCROLLBAR_ACTIVE_CLASS = 'dx-scrollable-scrollbar-active';
const SCROLLABLE_SCROLL_CLASS = exports.SCROLLABLE_SCROLL_CLASS = 'dx-scrollable-scroll';
const SCROLLABLE_SCROLL_CONTENT_CLASS = exports.SCROLLABLE_SCROLL_CONTENT_CLASS = 'dx-scrollable-scroll-content';
const HOVER_ENABLED_STATE = exports.HOVER_ENABLED_STATE = 'dx-scrollbar-hoverable';
const SCROLLVIEW_CONTENT_CLASS = exports.SCROLLVIEW_CONTENT_CLASS = 'dx-scrollview-content';
const SCROLLVIEW_TOP_POCKET_CLASS = exports.SCROLLVIEW_TOP_POCKET_CLASS = 'dx-scrollview-top-pocket';
const SCROLLVIEW_PULLDOWN = exports.SCROLLVIEW_PULLDOWN = 'dx-scrollview-pull-down';
const SCROLLVIEW_PULLDOWN_LOADING_CLASS = exports.SCROLLVIEW_PULLDOWN_LOADING_CLASS = 'dx-scrollview-pull-down-loading';
const SCROLLVIEW_PULLDOWN_READY_CLASS = exports.SCROLLVIEW_PULLDOWN_READY_CLASS = 'dx-scrollview-pull-down-ready';
const SCROLLVIEW_PULLDOWN_IMAGE_CLASS = exports.SCROLLVIEW_PULLDOWN_IMAGE_CLASS = 'dx-scrollview-pull-down-image';
const SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = exports.SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = 'dx-scrollview-pull-down-indicator';
const SCROLLVIEW_PULLDOWN_TEXT_CLASS = exports.SCROLLVIEW_PULLDOWN_TEXT_CLASS = 'dx-scrollview-pull-down-text';
const SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS = exports.SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS = 'dx-scrollview-pull-down-text-visible';
const PULLDOWN_ICON_CLASS = exports.PULLDOWN_ICON_CLASS = 'dx-icon-pulldown';
const SCROLLVIEW_BOTTOM_POCKET_CLASS = exports.SCROLLVIEW_BOTTOM_POCKET_CLASS = 'dx-scrollview-bottom-pocket';
const SCROLLVIEW_REACHBOTTOM_CLASS = exports.SCROLLVIEW_REACHBOTTOM_CLASS = 'dx-scrollview-scrollbottom';
const SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS = exports.SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS = 'dx-scrollview-scrollbottom-indicator';
const SCROLLVIEW_REACHBOTTOM_TEXT_CLASS = exports.SCROLLVIEW_REACHBOTTOM_TEXT_CLASS = 'dx-scrollview-scrollbottom-text';
const TopPocketState = exports.TopPocketState = {
  STATE_RELEASED: 0,
  STATE_READY: 1,
  STATE_REFRESHING: 2,
  STATE_LOADING: 3,
  STATE_TOUCHED: 4,
  STATE_PULLED: 5
};
const ShowScrollbarMode = exports.ShowScrollbarMode = {
  HOVER: 'onHover',
  ALWAYS: 'always',
  NEVER: 'never',
  SCROLL: 'onScroll'
};
const KEY_CODES = exports.KEY_CODES = {
  PAGE_UP: 'pageUp',
  PAGE_DOWN: 'pageDown',
  END: 'end',
  HOME: 'home',
  LEFT: 'leftArrow',
  UP: 'upArrow',
  RIGHT: 'rightArrow',
  DOWN: 'downArrow'
};
const VALIDATE_WHEEL_TIMEOUT = exports.VALIDATE_WHEEL_TIMEOUT = 500;
const HIDE_SCROLLBAR_TIMEOUT = exports.HIDE_SCROLLBAR_TIMEOUT = 500;
