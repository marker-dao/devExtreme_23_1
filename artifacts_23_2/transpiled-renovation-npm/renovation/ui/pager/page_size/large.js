"use strict";

exports.viewFunction = exports.PageSizeLargeProps = exports.PageSizeLarge = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _combine_classes = require("../../../utils/combine_classes");
var _light_button = require("../common/light_button");
var _pager_props = require("../common/pager_props");
var _consts = require("../common/consts");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _string = require("../../../../core/utils/string");
const _excluded = ["pageSize", "pageSizeChange", "pageSizes"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
const viewFunction = _ref => {
  let {
    pageSizesText
  } = _ref;
  return (0, _inferno.createFragment)(pageSizesText.map(_ref2 => {
    let {
      className,
      click,
      label,
      text
    } = _ref2;
    return (0, _inferno.createComponentVNode)(2, _light_button.LightButton, {
      "className": className,
      "label": label,
      "onClick": click,
      children: text
    }, text);
  }), 0);
};
exports.viewFunction = viewFunction;
const PageSizeLargeProps = {};
exports.PageSizeLargeProps = PageSizeLargeProps;
const PageSizeLargePropsType = Object.defineProperties({}, {
  pageSize: {
    get: function () {
      return _pager_props.InternalPagerProps.pageSize;
    },
    configurable: true,
    enumerable: true
  }
});
let PageSizeLarge = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(PageSizeLarge, _BaseInfernoComponent);
  function PageSizeLarge(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.__getterCache = {};
    _this.onPageSizeChange = _this.onPageSizeChange.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = PageSizeLarge.prototype;
  _proto.onPageSizeChange = function onPageSizeChange(processedPageSize) {
    return () => {
      this.props.pageSizeChange(processedPageSize);
      return this.props.pageSize;
    };
  };
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    if (this.props['pageSize'] !== nextProps['pageSize'] || this.props['pageSizes'] !== nextProps['pageSizes'] || this.props['pageSizeChange'] !== nextProps['pageSizeChange']) {
      this.__getterCache['pageSizesText'] = undefined;
    }
  };
  _proto.render = function render() {
    const props = this.props;
    return viewFunction({
      props: _extends({}, props),
      pageSizesText: this.pageSizesText,
      restAttributes: this.restAttributes
    });
  };
  _createClass(PageSizeLarge, [{
    key: "pageSizesText",
    get: function () {
      if (this.__getterCache['pageSizesText'] !== undefined) {
        return this.__getterCache['pageSizesText'];
      }
      return this.__getterCache['pageSizesText'] = (() => {
        const {
          pageSize,
          pageSizes
        } = this.props;
        return pageSizes.map((_ref3, index) => {
          let {
            text,
            value: processedPageSize
          } = _ref3;
          const selected = processedPageSize === pageSize;
          const className = (0, _combine_classes.combineClasses)({
            [selected ? _consts.PAGER_SELECTED_PAGE_SIZE_CLASS : _consts.PAGER_PAGE_SIZE_CLASS]: true,
            [_consts.FIRST_CHILD_CLASS]: index === 0
          });
          return {
            className,
            click: this.onPageSizeChange(processedPageSize),
            label: (0, _string.format)(_message.default.getFormatter('dxPager-pageSize'), processedPageSize || _message.default.getFormatter('dxPager-pageSizesAllText')),
            text
          };
        });
      })();
    }
  }, {
    key: "restAttributes",
    get: function () {
      const _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return restProps;
    }
  }]);
  return PageSizeLarge;
}(_inferno2.BaseInfernoComponent);
exports.PageSizeLarge = PageSizeLarge;
PageSizeLarge.defaultProps = PageSizeLargePropsType;