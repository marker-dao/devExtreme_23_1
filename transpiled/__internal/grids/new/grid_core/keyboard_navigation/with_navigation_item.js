"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withKbnNavigationItem = void 0;
var _inferno = require("inferno");
var _index = require("../../../../grids/new/grid_core/core/events/index");
const _excluded = ["elementRef", "tabIndex", "onKeyDown", "children"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
 @typescript-eslint/explicit-module-boundary-types,
 spellcheck/spell-checker
*/

const withKbnNavigationItem = WrappedComponent => {
  class WithKbnNavigationItem extends _inferno.Component {
    constructor() {
      super(...arguments);
      this.elementRef = (0, _inferno.createRef)();
      this.eventListener = new _index.NativeEventListener();
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
      return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, WrappedComponent, Object.assign({
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
        _index.eventUtils.markHandled(event);
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
  __decorate([_index.eventHandler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  , __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], WithKbnNavigationItem.prototype, "onKeyDown", null);
  __decorate([_index.eventHandler, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], WithKbnNavigationItem.prototype, "onFocusIn", null);
  return WithKbnNavigationItem;
};
exports.withKbnNavigationItem = withKbnNavigationItem;