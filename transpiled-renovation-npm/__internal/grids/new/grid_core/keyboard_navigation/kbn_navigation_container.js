"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KbnNavigationContainerEnabled = exports.KbnNavigationContainerDisabled = exports.KbnNavigationContainer = void 0;
var _inferno = require("inferno");
var _index = require("../../../../grids/new/grid_core/core/events/index");
const _excluded = ["elementRef", "navigationStrategy", "children"],
  _excluded2 = ["navigationStrategy", "elementRef", "children"],
  _excluded3 = ["enabled", "ref"];
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
/* eslint-disable spellcheck/spell-checker */

const KbnNavigationContainerDisabled = props => {
  const {
      elementRef,
      children
    } = props,
    restProps = _objectWithoutPropertiesLoose(props, _excluded);
  return (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", null, [(0, _inferno.createVNode)(1, "div", null, null, 1, {
    "data-dx-focus-decoy": false
  }), children, (0, _inferno.createVNode)(1, "div", null, null, 1, {
    "data-dx-focus-decoy": false
  })], 0, _extends({}, restProps, {
    "data-dx-focus-container": false
  }), null, elementRef));
};
exports.KbnNavigationContainerDisabled = KbnNavigationContainerDisabled;
class KbnNavigationContainerEnabled extends _inferno.Component {
  constructor() {
    super(...arguments);
    this.elementRef = (0, _inferno.createRef)();
    this.firstFocusDecoyRef = (0, _inferno.createRef)();
    this.lastFocusDecoyRef = (0, _inferno.createRef)();
    this.eventListener = new _index.NativeEventListener();
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
    return (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", null, [(0, _inferno.createVNode)(1, "div", null, null, 1, {
      "data-dx-focus-decoy": true,
      "tabindex": 0
    }, null, this.firstFocusDecoyRef), children, (0, _inferno.createVNode)(1, "div", null, null, 1, {
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
      _index.eventUtils.markHandled(event);
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
exports.KbnNavigationContainerEnabled = KbnNavigationContainerEnabled;
__decorate([_index.eventHandler, __metadata("design:type", Function), __metadata("design:paramtypes", [KeyboardEvent]), __metadata("design:returntype", void 0)], KbnNavigationContainerEnabled.prototype, "onKeyDown", null);
__decorate([_index.eventHandler, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], KbnNavigationContainerEnabled.prototype, "onFocusOut", null);
__decorate([_index.eventHandler, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], KbnNavigationContainerEnabled.prototype, "onDecoyFocusIn", null);
const KbnNavigationContainer = props => {
  const {
      enabled
    } = props,
    restProps = _objectWithoutPropertiesLoose(props, _excluded3);
  return enabled ? (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, KbnNavigationContainerEnabled, _extends({}, restProps))) : (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, KbnNavigationContainerDisabled, _extends({}, restProps)));
};
exports.KbnNavigationContainer = KbnNavigationContainer;