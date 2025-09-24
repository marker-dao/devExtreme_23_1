/**
* DevExtreme (cjs/__internal/grids/new/card_view/di.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;
var _index = require("../../../core/state_manager/index");
var BaseContentViewModule = _interopRequireWildcard(require("../grid_core/content_view/index"));
var _controller = require("../grid_core/context_menu/controller");
var _di = require("../grid_core/di");
var ContentViewModule = _interopRequireWildcard(require("./content_view/index"));
var _controller2 = require("./context_menu/controller");
var _view = require("./context_menu/view");
var _controller3 = require("./header_panel/controller");
var _view2 = require("./header_panel/view");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function register(diContext) {
  (0, _index.setupStateManager)({
    diContext,
    componentName: 'CardView'
  });
  (0, _di.register)(diContext);
  diContext.register(ContentViewModule.View);
  // TODO: fix after refactoring View Composition
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  diContext.addAlias(BaseContentViewModule.View, ContentViewModule.View);
  diContext.register(_controller3.HeaderPanelController);
  diContext.register(_view2.HeaderPanelView);
  diContext.register(_view.ContextMenuView);
  diContext.register(_controller2.ContextMenuController);
  diContext.addAlias(_controller.BaseContextMenuController, _controller2.ContextMenuController);
}
