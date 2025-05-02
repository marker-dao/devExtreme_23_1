"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PAGER_INFO_CLASS = exports.InfoText = void 0;
var _inferno = require("inferno");
var _index = require("../core/r1/runtime/inferno/index");
var _string = require("../../core/utils/string");
var _pagination_props = require("./common/pagination_props");
var _compatibility_utils = require("./utils/compatibility_utils");
const PAGER_INFO_CLASS = exports.PAGER_INFO_CLASS = 'dx-info';
const InfoTextDefaultProps = {
  pageCount: _pagination_props.PaginationDefaultProps.pageCount,
  pageIndex: _pagination_props.PaginationDefaultProps.pageIndex,
  itemCount: _pagination_props.PaginationDefaultProps.itemCount
};
class InfoText extends _index.BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.state = {};
    this.refs = null;
    // eslint-disable-next-line @stylistic/max-len
    this.rootElementRef = (0, _inferno.createRef)();
  }
  getInfoText() {
    return this.props.infoText ?? (0, _compatibility_utils.getLocalizationMessage)(this.context, 'dxPagination-infoText');
  }
  getText() {
    const {
      pageCount,
      pageIndex,
      itemCount
    } = this.props;
    return (0, _string.format)(this.getInfoText(), (pageIndex + 1).toString(), pageCount === null || pageCount === void 0 ? void 0 : pageCount.toString(), itemCount === null || itemCount === void 0 ? void 0 : itemCount.toString());
  }
  render() {
    return (0, _inferno.createVNode)(1, "div", PAGER_INFO_CLASS, this.getText(), 0, null, null, this.props.rootElementRef);
  }
}
exports.InfoText = InfoText;
InfoText.defaultProps = InfoTextDefaultProps;