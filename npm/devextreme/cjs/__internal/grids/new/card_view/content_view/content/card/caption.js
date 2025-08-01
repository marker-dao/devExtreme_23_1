/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/content/card/caption.js)
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
exports.Caption = void 0;
var _inferno = require("inferno");
var _element = require("../../../../../../../core/element");
var _renderer = _interopRequireDefault(require("../../../../../../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-non-null-assertion */

class Caption extends _inferno.Component {
  constructor() {
    super(...arguments);
    this.ref = (0, _inferno.createRef)();
    this.onClick = e => {
      var _this$props$onClick, _this$props;
      const args = {
        event: e,
        fieldCaptionElement: (0, _element.getPublicElement)((0, _renderer.default)(this.ref.current)),
        field: this.props.field
      };
      (_this$props$onClick = (_this$props = this.props).onClick) === null || _this$props$onClick === void 0 || _this$props$onClick.call(_this$props, args);
    };
    this.onDblClick = e => {
      var _this$props$onDblClic, _this$props2;
      const args = {
        event: e,
        fieldCaptionElement: (0, _element.getPublicElement)((0, _renderer.default)(this.ref.current)),
        field: this.props.field
      };
      (_this$props$onDblClic = (_this$props2 = this.props).onDblClick) === null || _this$props$onDblClic === void 0 || _this$props$onDblClic.call(_this$props2, args);
    };
  }
  render() {
    const Template = this.props.template;
    return (0, _inferno.createVNode)(1, "div", "dx-cardview-field-caption", Template ? (0, _inferno.createComponentVNode)(2, Template, {
      "field": this.props.field
    }) : (0, _inferno.createFragment)([this.props.field.column.caption, (0, _inferno.createTextVNode)(":")], 0), 0, {
      "onClick": this.onClick,
      "onDblClick": this.onDblClick
    }, null, this.ref);
  }
  componentDidMount() {
    var _this$props$onPrepare, _this$props3;
    const args = {
      fieldCaptionElement: (0, _element.getPublicElement)((0, _renderer.default)(this.ref.current)),
      field: this.props.field
    };
    (_this$props$onPrepare = (_this$props3 = this.props).onPrepared) === null || _this$props$onPrepare === void 0 || _this$props$onPrepare.call(_this$props3, args);
  }
}
exports.Caption = Caption;
