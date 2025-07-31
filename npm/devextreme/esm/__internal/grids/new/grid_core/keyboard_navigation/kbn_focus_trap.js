/**
* DevExtreme (esm/__internal/grids/new/grid_core/keyboard_navigation/kbn_focus_trap.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["elementRef", "children"],
  _excluded2 = ["elementRef", "onKeyDown", "children"],
  _excluded3 = ["enabled", "ref", "onKeyDown"];
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
import { ALL_FOCUSABLE_ELEMENTS_SELECTOR } from './const';
// NOTE: Return same DOM structure to prevent unexpected markup behavior
export const KbnFocusTrapDisabled = props => {
  const {
      elementRef,
      children
    } = props,
    restProps = _objectWithoutPropertiesLoose(props, _excluded);
  return normalizeProps(createVNode(1, "div", null, createVNode(1, "div", null, [createVNode(1, "div", null, null, 1, {
    "data-dx-focus-decoy": false
  }), children, createVNode(1, "div", null, null, 1, {
    "data-dx-focus-decoy": false
  })], 0, {
    "data-dx-focus-trap-content": false
  }), 2, _extends({}, restProps), null, elementRef));
};
export class KbnFocusTrapEnabled extends Component {
  constructor() {
    super(...arguments);
    this.elementRef = createRef();
    this.firstFocusDecoyRef = createRef();
    this.lastFocusDecoyRef = createRef();
    this.eventListener = new NativeEventListener();
  }
  componentDidMount() {
    this.eventListener.add(this.firstFocusDecoyRef, 'focusin', this.onFirstDecoyFocusIn.bind(this)).add(this.lastFocusDecoyRef, 'focusin', this.onLastDecoyFocusIn.bind(this));
  }
  componentWillUnmount() {
    this.eventListener.unsubscribe();
  }
  render() {
    const _this$props = this.props,
      {
        children
      } = _this$props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded2);
    const ref = this.getActualRef();
    return normalizeProps(createVNode(1, "div", null, createVNode(1, "div", null, [createVNode(1, "div", null, null, 1, {
      "data-dx-focus-decoy": true,
      "tabindex": 0
    }, null, this.firstFocusDecoyRef), children, createVNode(1, "div", null, null, 1, {
      "data-dx-focus-decoy": true,
      "tabindex": 0
    }, null, this.lastFocusDecoyRef)], 0, {
      "data-dx-focus-trap-content": true,
      "onKeyDown": this.onContentKeyDown.bind(this)
    }), 2, _extends({
      "onKeyDown": this.onKeyDown.bind(this)
    }, restProps), null, ref));
  }
  // TODO: KeyboardEvent
  onKeyDown(event) {
    var _this$props$onKeyDown, _this$props2;
    if (event.key === 'Enter' && !event.shiftKey) {
      this.focusLastChild();
      eventUtils.markHandled(event);
    }
    (_this$props$onKeyDown = (_this$props2 = this.props).onKeyDown) === null || _this$props$onKeyDown === void 0 || _this$props$onKeyDown.call(_this$props2, event);
  }
  // TODO: KeyboardEvent
  onContentKeyDown(event) {
    if (event.key === 'Escape') {
      var _this$getActualRef$cu;
      (_this$getActualRef$cu = this.getActualRef().current) === null || _this$getActualRef$cu === void 0 || _this$getActualRef$cu.focus();
      eventUtils.markHandled(event);
    }
    eventUtils.markIgnored(event);
  }
  onFirstDecoyFocusIn() {
    this.focusLastChild();
  }
  onLastDecoyFocusIn() {
    const firstFocusableElement = this.getInnerFocusableElement('first');
    firstFocusableElement === null || firstFocusableElement === void 0 || firstFocusableElement.focus();
  }
  focusLastChild() {
    const lastFocusableElement = this.getInnerFocusableElement('last');
    lastFocusableElement === null || lastFocusableElement === void 0 || lastFocusableElement.focus();
  }
  getActualRef() {
    return this.props.elementRef ?? this.elementRef;
  }
  getInnerFocusableElement(type) {
    var _elementRef$current;
    const elementRef = this.getActualRef();
    const focusableElements = (_elementRef$current = elementRef.current) === null || _elementRef$current === void 0 ? void 0 : _elementRef$current.querySelectorAll(ALL_FOCUSABLE_ELEMENTS_SELECTOR);
    const focusableElementsCount = (focusableElements === null || focusableElements === void 0 ? void 0 : focusableElements.length) ?? 0;
    // NOTE: We always have two focusable decoys
    if (!focusableElements || focusableElementsCount < 3) {
      return null;
    }
    return type === 'first' ? focusableElements[1] : focusableElements[focusableElementsCount - 2];
  }
}
__decorate([eventHandler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], KbnFocusTrapEnabled.prototype, "onKeyDown", null);
__decorate([eventHandler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], KbnFocusTrapEnabled.prototype, "onContentKeyDown", null);
__decorate([eventHandler, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], KbnFocusTrapEnabled.prototype, "onFirstDecoyFocusIn", null);
__decorate([eventHandler, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], KbnFocusTrapEnabled.prototype, "onLastDecoyFocusIn", null);
export const KbnFocusTrap = props => {
  const {
      enabled,
      onKeyDown
    } = props,
    restProps = _objectWithoutPropertiesLoose(props, _excluded3);
  return enabled ? normalizeProps(createComponentVNode(2, KbnFocusTrapEnabled, _extends({}, restProps, {
    "onKeyDown": onKeyDown
  }))) : normalizeProps(createComponentVNode(2, KbnFocusTrapDisabled, _extends({}, restProps, {
    "onKeyDown": onKeyDown
  })));
};
