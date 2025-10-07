/**
* DevExtreme (cjs/__internal/grids/new/grid_core/keyboard_navigation/with_key_down_handler.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withKeyDownHandler = void 0;
var _inferno = require("inferno");
var _index = require("../../../../grids/new/grid_core/core/events/index");
var _utils = require("./utils");
const _excluded = ["onKeyDown", "keyDownConfig", "children"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* eslint-disable
 @typescript-eslint/explicit-function-return-type,
 @typescript-eslint/explicit-module-boundary-types
*/

const withKeyDownHandler = WrappedComponent => {
  class WithKeyDownHandler extends _inferno.Component {
    constructor() {
      super(...arguments);
      this.elementRef = (0, _inferno.createRef)();
    }
    render() {
      const _this$props = this.props,
        {
          children
        } = _this$props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, WrappedComponent, _extends({}, restProps, {
        "onKeyDown": this.onKeyDown.bind(this),
        children: children
      })));
    }
    // TODO: KeyboardEvent
    onKeyDown(event) {
      const {
        keyDownConfig,
        onKeyDown,
        caughtEventPreventDefault
      } = this.props;
      const ref = this.getActualRef();
      const fullKeyName = (0, _utils.getKeyWithModifications)(event);
      const handler = keyDownConfig === null || keyDownConfig === void 0 ? void 0 : keyDownConfig[fullKeyName];
      if (handler) {
        handler(event, ref);
        _index.eventUtils.markHandled(event);
      }
      if (handler && caughtEventPreventDefault) {
        event.preventDefault();
      }
      onKeyDown === null || onKeyDown === void 0 || onKeyDown(event);
    }
    getActualRef() {
      return this.props.elementRef ?? this.elementRef;
    }
  }
  __decorate([_index.eventHandler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  , __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], WithKeyDownHandler.prototype, "onKeyDown", null);
  return WithKeyDownHandler;
};
exports.withKeyDownHandler = withKeyDownHandler;
