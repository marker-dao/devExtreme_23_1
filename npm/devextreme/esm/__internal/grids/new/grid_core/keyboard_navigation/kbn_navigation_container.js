/**
* DevExtreme (esm/__internal/grids/new/grid_core/keyboard_navigation/kbn_navigation_container.js)
* Version: 25.1.0
* Build date: Fri May 02 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["elementRef", "navigationStrategy", "children"],
  _excluded2 = ["navigationStrategy", "elementRef", "children"],
  _excluded3 = ["enabled", "ref"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
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
/* eslint-disable spellcheck/spell-checker */
import { eventHandler, eventUtils, NativeEventListener } from '../../../../grids/new/grid_core/core/events/index';
import { Component, createRef } from 'inferno';
export const KbnNavigationContainerDisabled = props => {
  const {
      elementRef,
      children
    } = props,
    restProps = _objectWithoutPropertiesLoose(props, _excluded);
  return normalizeProps(createVNode(1, "div", null, [createVNode(1, "div", null, null, 1, {
    "data-dx-focus-decoy": false
  }), children, createVNode(1, "div", null, null, 1, {
    "data-dx-focus-decoy": false
  })], 0, _extends({}, restProps, {
    "data-dx-focus-container": false
  }), null, elementRef));
};
export class KbnNavigationContainerEnabled extends Component {
  constructor() {
    super(...arguments);
    this.elementRef = createRef();
    this.firstFocusDecoyRef = createRef();
    this.lastFocusDecoyRef = createRef();
    this.eventListener = new NativeEventListener();
  }
  componentDidMount() {
    const elementRef = this.getActualRef();
    this.eventListener.add(elementRef, 'focusout', this.onFocusOut.bind(this)).add(this.firstFocusDecoyRef, 'focusin', this.onDecoyFocusIn.bind(this)).add(this.lastFocusDecoyRef, 'focusin', this.onDecoyFocusIn.bind(this));
  }
  componentDidUpdate() {
    this.props.navigationStrategy.normalizeActiveIdx();
  }
  componentWillUnmount() {
    this.eventListener.unsubscribe();
  }
  render() {
    const _this$props = this.props,
      {
        navigationStrategy,
        children
      } = _this$props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded2);
    const ref = this.getActualRef();
    navigationStrategy.clear();
    return normalizeProps(createVNode(1, "div", null, [createVNode(1, "div", null, null, 1, {
      "data-dx-focus-decoy": true,
      "tabindex": 0
    }, null, this.firstFocusDecoyRef), children, createVNode(1, "div", null, null, 1, {
      "data-dx-focus-decoy": true,
      "tabindex": 0
    }, null, this.lastFocusDecoyRef)], 0, _extends({}, restProps, {
      "onKeyDown": this.onKeyDown.bind(this),
      "data-dx-focus-container": true
    }), null, ref));
  }
  onKeyDown(event) {
    const {
      navigationStrategy,
      onKeyDown
    } = this.props;
    const elementRef = this.getActualRef();
    if (event.key === 'Tab') {
      var _elementRef$current;
      navigationStrategy.setActiveItem(0, false);
      (_elementRef$current = elementRef.current) === null || _elementRef$current === void 0 || _elementRef$current.setAttribute('inert', '');
      eventUtils.markHandled(event);
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(event);
  }
  onFocusOut() {
    var _elementRef$current2;
    const elementRef = this.getActualRef();
    (_elementRef$current2 = elementRef.current) === null || _elementRef$current2 === void 0 || _elementRef$current2.removeAttribute('inert');
  }
  onDecoyFocusIn() {
    const {
      navigationStrategy,
      onFocusMoved
    } = this.props;
    navigationStrategy.setActiveItem(0, true);
    const nextActiveItem = navigationStrategy.getActiveItem();
    if (nextActiveItem) {
      onFocusMoved === null || onFocusMoved === void 0 || onFocusMoved(nextActiveItem.idx, nextActiveItem.element);
    }
  }
  getActualRef() {
    return this.props.elementRef ?? this.elementRef;
  }
}
__decorate([eventHandler, __metadata("design:type", Function), __metadata("design:paramtypes", [KeyboardEvent]), __metadata("design:returntype", void 0)], KbnNavigationContainerEnabled.prototype, "onKeyDown", null);
__decorate([eventHandler, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], KbnNavigationContainerEnabled.prototype, "onFocusOut", null);
__decorate([eventHandler, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], KbnNavigationContainerEnabled.prototype, "onDecoyFocusIn", null);
export const KbnNavigationContainer = props => {
  const {
      enabled
    } = props,
    restProps = _objectWithoutPropertiesLoose(props, _excluded3);
  return enabled ? normalizeProps(createComponentVNode(2, KbnNavigationContainerEnabled, _extends({}, restProps))) : normalizeProps(createComponentVNode(2, KbnNavigationContainerDisabled, _extends({}, restProps)));
};
