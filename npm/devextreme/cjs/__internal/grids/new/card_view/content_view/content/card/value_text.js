/**
* DevExtreme (cjs/__internal/grids/new/card_view/content_view/content/card/value_text.js)
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
exports.ValueText = void 0;
var _inferno = require("inferno");
var _element = require("../../../../../../../core/element");
var _renderer = _interopRequireDefault(require("../../../../../../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-non-null-assertion */

const ROOT_CLASS = 'dx-cardview-field-value';
const CLASS = {
  root: ROOT_CLASS,
  textPartHighlighted: `${ROOT_CLASS}__text-part--highlighted`
};
class ValueText extends _inferno.Component {
  constructor() {
    super(...arguments);
    this.ref = (0, _inferno.createRef)();
    this.onClick = e => {
      var _this$props$onClick, _this$props;
      const args = {
        event: e,
        fieldValueElement: (0, _element.getPublicElement)((0, _renderer.default)(this.ref.current)),
        field: this.props.field
      };
      (_this$props$onClick = (_this$props = this.props).onClick) === null || _this$props$onClick === void 0 || _this$props$onClick.call(_this$props, args);
    };
    this.onDblClick = e => {
      var _this$props$onDblClic, _this$props2;
      const args = {
        event: e,
        fieldValueElement: (0, _element.getPublicElement)((0, _renderer.default)(this.ref.current)),
        field: this.props.field
      };
      (_this$props$onDblClic = (_this$props2 = this.props).onDblClick) === null || _this$props$onDblClic === void 0 || _this$props$onDblClic.call(_this$props2, args);
    };
  }
  render() {
    const classNames = [CLASS.root, `${CLASS.root}--text-align-${this.props.field.column.alignment}`].join(' ');
    const content = this.props.field.highlightedText ? this.props.field.highlightedText.map(_ref => {
      let {
        type,
        text: textPart
      } = _ref;
      return (0, _inferno.createVNode)(1, "span", type === 'highlighted' ? CLASS.textPartHighlighted : '', textPart, 0);
    }) : this.props.field.text;
    const Template = this.props.template;
    return (0, _inferno.createVNode)(1, "div", classNames, Template ? (0, _inferno.createComponentVNode)(2, Template, {
      "field": this.props.field
    }) : content, 0, {
      "onClick": this.onClick,
      "onDblClick": this.onDblClick,
      "title": this.props.fieldHintEnabled ? this.props.field.text : undefined
    }, null, this.ref);
  }
  componentDidMount() {
    var _this$props$onPrepare, _this$props3;
    const args = {
      fieldValueElement: (0, _element.getPublicElement)((0, _renderer.default)(this.ref.current)),
      field: this.props.field
    };
    (_this$props$onPrepare = (_this$props3 = this.props).onPrepared) === null || _this$props$onPrepare === void 0 || _this$props$onPrepare.call(_this$props3, args);
  }
}
exports.ValueText = ValueText;
