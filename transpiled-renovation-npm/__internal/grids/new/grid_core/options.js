"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptionsRules = exports.defaultOptions = void 0;
var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));
var _themes = require("../../../../ui/themes");
var columnChooser = _interopRequireWildcard(require("./column_chooser/index"));
var columnsController = _interopRequireWildcard(require("./columns_controller/index"));
var contentView = _interopRequireWildcard(require("./content_view/index"));
var dataController = _interopRequireWildcard(require("./data_controller/index"));
var editing = _interopRequireWildcard(require("./editing/index"));
var headerFilter = _interopRequireWildcard(require("./filtering/header_filter/index"));
var _index7 = require("./filtering/index");
var keyboardNavigation = _interopRequireWildcard(require("./keyboard_navigation/index"));
var pager = _interopRequireWildcard(require("./pager/index"));
var searchPanel = _interopRequireWildcard(require("./search/index"));
var selection = _interopRequireWildcard(require("./selection/index"));
var sortingController = _interopRequireWildcard(require("./sorting_controller/index"));
var toolbar = _interopRequireWildcard(require("./toolbar/index"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const defaultOptions = exports.defaultOptions = _extends({}, dataController.defaultOptions, sortingController.defaultOptions, columnsController.defaultOptions, pager.defaultOptions, _index7.filterPanel.defaultOptions, headerFilter.defaultOptions, contentView.defaultOptions, searchPanel.defaultOptions, columnChooser.defaultOptions, selection.defaultOptions, toolbar.defaultOptions, editing.defaultOptions, keyboardNavigation.defaultOptions, {
  searchText: ''
});
// TODO: separate by modules
// TODO: add typing for defaultOptionRules
const defaultOptionsRules = exports.defaultOptionsRules = [{
  device() {
    // @ts-expect-error
    return (0, _themes.isMaterialBased)();
  },
  options: {
    headerFilter: {
      height: 315
    },
    editing: {
      useIcons: true
    },
    selection: {
      showCheckBoxesMode: 'always'
    }
  }
}, {
  device() {
    return _browser.default.webkit;
  },
  options: {
    loadingTimeout: 30,
    loadPanel: {
      animation: {
        show: {
          easing: 'cubic-bezier(1, 0, 1, 0)',
          duration: 500,
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          }
        }
      }
    }
  }
}];