"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _guid = _interopRequireDefault(require("../../../core/guid"));
var _deferred = require("../../../core/utils/deferred");
var _m_collection_widget = _interopRequireDefault(require("../../ui/collection/m_collection_widget.edit"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class CollectionWidgetAsync extends _m_collection_widget.default {
  _initMarkup() {
    this._asyncTemplateItemsMap = {};
    super._initMarkup();
  }
  _render() {
    super._render();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._planPostRenderActions();
  }
  _renderItemContent(args) {
    const renderContentDeferred = (0, _deferred.Deferred)();
    const itemDeferred = (0, _deferred.Deferred)();
    const uniqueKey = `dx${new _guid.default()}`;
    this._asyncTemplateItemsMap[uniqueKey] = itemDeferred;
    const $itemContent = super._renderItemContent(_extends({}, args, {
      uniqueKey
    }));
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    itemDeferred.done(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      renderContentDeferred.resolve($itemContent);
    });
    // @ts-expect-error ts-error
    return renderContentDeferred.promise();
  }
  _onItemTemplateRendered(itemTemplate, renderArgs) {
    return () => {
      const {
        uniqueKey
      } = renderArgs;
      if (uniqueKey) {
        var _this$_asyncTemplateI;
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (_this$_asyncTemplateI = this._asyncTemplateItemsMap[uniqueKey]) === null || _this$_asyncTemplateI === void 0 || _this$_asyncTemplateI.resolve();
      }
    };
  }
  // eslint-disable-next-line class-methods-use-this
  _postProcessRenderItems() {}
  _planPostRenderActions() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const d = (0, _deferred.Deferred)();
    const asyncTemplateItems = Object.values(this._asyncTemplateItemsMap);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _deferred.when.apply(this, asyncTemplateItems).done(() => {
      // @ts-expect-error ts-error
      this._postProcessRenderItems(...args);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      d.resolve().done(() => {
        this._asyncTemplateItemsMap = {};
      });
    });
    return d.promise();
  }
  _clean() {
    super._clean();
    const asyncTemplateItems = Object.values(this._asyncTemplateItemsMap);
    asyncTemplateItems.forEach(item => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      item.reject();
    });
    this._asyncTemplateItemsMap = {};
  }
}
var _default = exports.default = CollectionWidgetAsync;