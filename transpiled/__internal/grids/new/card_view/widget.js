"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CardViewBase = exports.CardView = void 0;
var _component_registrator = _interopRequireDefault(require("../../../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _extend = require("../../../../core/utils/extend");
var _main_view = require("../../../grids/new/grid_core/main_view");
var _options_controller = require("../../../grids/new/grid_core/options_controller/options_controller");
var _widget = require("../../../grids/new/grid_core/widget");
var ContentViewModule = _interopRequireWildcard(require("./content_view/index"));
var _controller = require("./context_menu/controller");
var _view = require("./context_menu/view");
var di = _interopRequireWildcard(require("./di"));
var _view2 = require("./header_panel/view");
var _main_view2 = require("./main_view");
var _options = require("./options");
var _options_controller2 = require("./options_controller");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable max-classes-per-file */ /* eslint-disable spellcheck/spell-checker */
class CardViewBase extends _widget.GridCoreNew {
  _registerDIContext() {
    super._registerDIContext();
    di.register(this.diContext);
    this.diContext.register(_main_view.MainView, _main_view2.MainView);
    const optionsController = new _options_controller2.OptionsController(this);
    this.diContext.registerInstance(_options_controller2.OptionsController, optionsController);
    // @ts-expect-error
    this.diContext.registerInstance(_options_controller.OptionsController, optionsController);
  }
  _initMarkup() {
    super._initMarkup();
    (0, _renderer.default)(this.$element()).addClass('dx-cardview');
  }
  _initDIContext() {
    super._initDIContext();
    this.contentView = this.diContext.get(ContentViewModule.View);
    this.headerPanel = this.diContext.get(_view2.HeaderPanelView);
    this.contextMenu = this.diContext.get(_view.ContextMenuView);
    this.contextMenuController = this.diContext.get(_controller.ContextMenuController);
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), (0, _extend.extend)(true, {}, _options.defaultOptions));
  }
}
exports.CardViewBase = CardViewBase;
class CardView extends ContentViewModule.PublicMethods(CardViewBase) {}
// @ts-expect-error
exports.CardView = CardView;
(0, _component_registrator.default)('dxCardView', CardView);
var _default = exports.default = CardView;