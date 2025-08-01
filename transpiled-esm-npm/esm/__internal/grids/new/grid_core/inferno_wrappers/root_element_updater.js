import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["rootElementRef", "ref", "className", "children"];
import { Component } from 'inferno';
export function normalizeEventName(name) {
  return name.substring(2).toLowerCase();
}
export class RootElementUpdater extends Component {
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