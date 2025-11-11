/**
* DevExtreme (esm/__internal/grids/new/grid_core/keyboard_navigation/with_navigation_item.js)
* Version: 25.2.0
* Build date: Tue Nov 11 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["elementRef", "tabIndex", "onKeyDown", "children"];
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
 @typescript-eslint/explicit-module-boundary-types,
 spellcheck/spell-checker
*/
import { eventHandler, eventUtils, NativeEventListener } from '../../../../grids/new/grid_core/core/events/index';
import { Component, createRef } from 'inferno';
export const withKbnNavigationItem = WrappedComponent => {
  class WithKbnNavigationItem extends Component {
    constructor() {
      super(...arguments);
      this.elementRef = createRef();
      this.eventListener = new NativeEventListener();
      this.navigationItem = {
        focus: () => {
          var _this$getActualRef$cu;
          (_this$getActualRef$cu = this.getActualRef().current) === null || _this$getActualRef$cu === void 0 || _this$getActualRef$cu.focus();
        },
        getElement: () => this.getActualRef().current
      };
    }
    componentDidMount() {
      const elementRef = this.getActualRef();
      const {
        navigationStrategy,
        navigationIdx
      } = this.props;
      navigationStrategy.setItem(navigationIdx, this.navigationItem);
      this.eventListener.add(elementRef, 'focusin', this.onFocusIn.bind(this));
    }
    componentDidUpdate() {
      this.props.navigationStrategy.setItem(this.props.navigationIdx, this.navigationItem);
    }
    componentWillUnmount() {
      this.eventListener.unsubscribe();
    }
    render() {
      const _this$props = this.props,
        {
          children
        } = _this$props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
      const ref = this.getActualRef();
      return normalizeProps(createComponentVNode(2, WrappedComponent, _extends({
        "elementRef": ref,
        "tabIndex": 0,
        "onKeyDown": this.onKeyDown.bind(this)
      }, restProps, {
        children: children
      })));
    }
    // TODO: KeyboardEvent
    onKeyDown(event) {
      const {
        navigationStrategy,
        onKeyDown,
        onFocusMoved
      } = this.props;
      const [eventHandled, newActiveItem] = navigationStrategy.getNewActiveItem(() => navigationStrategy.onKeyDown(event));
      if (eventHandled) {
        event.preventDefault();
        eventUtils.markHandled(event);
      }
      if (newActiveItem) {
        onFocusMoved === null || onFocusMoved === void 0 || onFocusMoved(newActiveItem.idx, newActiveItem.element);
      }
      onKeyDown === null || onKeyDown === void 0 || onKeyDown(event);
    }
    onFocusIn() {
      const {
        navigationStrategy,
        navigationIdx,
        onFocusMoved
      } = this.props;
      const [, newActiveItem] = navigationStrategy.getNewActiveItem(() => navigationStrategy.setActiveItem(navigationIdx, false));
      if (newActiveItem) {
        onFocusMoved === null || onFocusMoved === void 0 || onFocusMoved(newActiveItem.idx, newActiveItem.element);
      }
    }
    getActualRef() {
      return this.props.elementRef ?? this.elementRef;
    }
  }
  __decorate([eventHandler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  , __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], WithKbnNavigationItem.prototype, "onKeyDown", null);
  __decorate([eventHandler, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], WithKbnNavigationItem.prototype, "onFocusIn", null);
  return WithKbnNavigationItem;
};
