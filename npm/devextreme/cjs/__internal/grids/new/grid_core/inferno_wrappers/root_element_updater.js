/**
* DevExtreme (cjs/__internal/grids/new/grid_core/inferno_wrappers/root_element_updater.js)
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
exports.RootElementUpdater = void 0;
exports.normalizeEventName = normalizeEventName;
var _inferno = require("inferno");
const _excluded = ["rootElementRef", "ref", "className", "children"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function normalizeEventName(name) {
  return name.substring(2).toLowerCase();
}
class RootElementUpdater extends _inferno.Component {
  constructor() {
    super(...arguments);
    this.previousClasses = [];
    this.previousAttributes = {};
  }
  render() {
    // @ts-expect-error
    return this.props.children;
  }
  updateClasses(element) {
    const currentClassName = this.props.className;
    const currentClasses = (currentClassName === null || currentClassName === void 0 ? void 0 : currentClassName.split(' ')) ?? [];
    const addedClasses = currentClasses.filter(cls => !this.previousClasses.includes(cls));
    const removedClasses = this.previousClasses.filter(cls => !currentClasses.includes(cls));
    addedClasses.forEach(cls => {
      element.classList.add(cls);
    });
    removedClasses.forEach(cls => {
      element.classList.remove(cls);
    });
    this.previousClasses = currentClasses;
  }
  updateAttributes(element) {
    const _this$props = this.props,
      currentAttributes = _objectWithoutPropertiesLoose(_this$props, _excluded);
    const currentAttributeKeys = Object.keys(currentAttributes);
    const previousAttributeKeys = Object.keys(this.previousAttributes);
    currentAttributeKeys.forEach(attrName => {
      if (attrName.startsWith('on')) {
        if (previousAttributeKeys.includes(attrName)) {
          element.removeEventListener(normalizeEventName(attrName),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          this.previousAttributes[attrName]);
        }
        element.addEventListener(normalizeEventName(attrName), currentAttributes[attrName]);
      } else {
        element[attrName] = currentAttributes[attrName];
      }
    });
    const removedAttrKeys = previousAttributeKeys.filter(attrName => !currentAttributeKeys.includes(attrName));
    removedAttrKeys.forEach(attrName => {
      if (attrName.startsWith('on')) {
        element.removeEventListener(normalizeEventName(attrName),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.previousAttributes[attrName]);
      } else {
        element.removeAttribute(attrName);
      }
    });
    this.previousAttributes = currentAttributes;
  }
  updateClassesAndAttributes() {
    const element = this.props.rootElementRef.current;
    if (!element) {
      throw new Error('root element is not provided');
    }
    this.updateClasses(element);
    this.updateAttributes(element);
  }
  componentDidMount() {
    this.updateClassesAndAttributes();
  }
  componentDidUpdate() {
    this.updateClassesAndAttributes();
  }
}
exports.RootElementUpdater = RootElementUpdater;
