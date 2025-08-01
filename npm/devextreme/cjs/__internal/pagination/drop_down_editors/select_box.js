/**
* DevExtreme (cjs/__internal/pagination/drop_down_editors/select_box.js)
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
exports.SelectBox = exports.NumberBoxDefaultProps = void 0;
var _inferno = require("inferno");
var _index = require("../../core/r1/runtime/inferno/index");
var _select_box = _interopRequireDefault(require("../../../ui/select_box"));
var _dom_component_wrapper = require("../../core/r1/dom_component_wrapper");
var _editor_label_props = require("../editors/common/editor_label_props");
var _editor_props = require("../editors/common/editor_props");
var _editor_state_props = require("../editors/common/editor_state_props");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-explicit-any */
const NumberBoxDefaultProps = exports.NumberBoxDefaultProps = _extends({}, _editor_props.EditorDefaultProps, _editor_state_props.EditorStateDefaultProps, _editor_label_props.EditorLabelDefaultProps, {
  placeholder: '',
  hoverStateEnabled: true,
  searchEnabled: false,
  value: null,
  isReactComponentWrapper: true
});
class SelectBox extends _index.BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.state = {};
    this.refs = null;
  }
  /* istanbul ignore next: WA for Angular */
  get componentProps() {
    return this.props;
  }
  render() {
    return (0, _inferno.createComponentVNode)(2, _dom_component_wrapper.DomComponentWrapper, {
      "componentType": _select_box.default,
      "componentProps": this.componentProps,
      "templateNames": ['dropDownButtonTemplate', 'groupTemplate', 'itemTemplate']
    });
  }
}
exports.SelectBox = SelectBox;
SelectBox.defaultProps = NumberBoxDefaultProps;
