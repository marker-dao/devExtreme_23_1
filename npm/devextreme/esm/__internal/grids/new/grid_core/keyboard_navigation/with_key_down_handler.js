/**
* DevExtreme (esm/__internal/grids/new/grid_core/keyboard_navigation/with_key_down_handler.js)
* Version: 25.2.0
* Build date: Tue Oct 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["onKeyDown", "keyDownConfig", "children"];
import { createComponentVNode, normalizeProps } from "inferno";
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* eslint-disable
 @typescript-eslint/explicit-function-return-type,
 @typescript-eslint/explicit-module-boundary-types
*/
import { eventHandler, eventUtils } from '../../../../grids/new/grid_core/core/events/index';
import { Component, createRef } from 'inferno';
import { getKeyWithModifications } from './utils';
export const withKeyDownHandler = WrappedComponent => {
  class WithKeyDownHandler extends Component {
    constructor() {
      super(...arguments);
      this.elementRef = createRef();
    }
    render() {
      const _this$props = this.props,
        {
          children
        } = _this$props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      return normalizeProps(createComponentVNode(2, WrappedComponent, _extends({}, restProps, {
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
      const fullKeyName = getKeyWithModifications(event);
      const handler = keyDownConfig === null || keyDownConfig === void 0 ? void 0 : keyDownConfig[fullKeyName];
      if (handler) {
        handler(event, ref);
        eventUtils.markHandled(event);
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
  __decorate([eventHandler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  , __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], WithKeyDownHandler.prototype, "onKeyDown", null);
  return WithKeyDownHandler;
};
