/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import { Component, findDOMFromVNode } from 'inferno';
import { InfernoEffectHost } from './effect_host';
const areObjectsEqual = (firstObject, secondObject) => {
  const bothAreObjects = firstObject instanceof Object && secondObject instanceof Object;
  if (!bothAreObjects) {
    return firstObject === secondObject;
  }
  const firstObjectKeys = Object.keys(firstObject);
  const secondObjectKeys = Object.keys(secondObject);
  if (firstObjectKeys.length !== secondObjectKeys.length) {
    return false;
  }
  const hasDifferentElement = firstObjectKeys.some(key => firstObject[key] !== secondObject[key]);
  return !hasDifferentElement;
};
export class BaseInfernoComponent extends Component {
  constructor() {
    super(...arguments);
    this._pendingContext = this.context;
  }
  componentWillReceiveProps(_, context) {
    this._pendingContext = context ?? {};
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !areObjectsEqual(this.props, nextProps) || !areObjectsEqual(this.state, nextState) || !areObjectsEqual(this.context, this._pendingContext);
  }
}
export class InfernoComponent extends BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this._effects = [];
  }
  createEffects() {
    return [];
  }
  updateEffects() {}
  componentWillMount() {
    InfernoEffectHost.lock();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentWillUpdate(_nextProps, _nextState, _context) {
    InfernoEffectHost.lock();
  }
  componentDidMount() {
    InfernoEffectHost.callbacks.push(() => {
      this._effects = this.createEffects();
    });
    InfernoEffectHost.callEffects();
  }
  componentDidUpdate() {
    InfernoEffectHost.callbacks.push(() => this.updateEffects());
    InfernoEffectHost.callEffects();
  }
  destroyEffects() {
    this._effects.forEach(e => e.dispose());
  }
  componentWillUnmount() {
    this.destroyEffects();
  }
}
export class InfernoWrapperComponent extends InfernoComponent {
  constructor() {
    super(...arguments);
    this.vDomElement = null;
  }
  vDomUpdateClasses() {
    var _el$className;
    const el = this.vDomElement;
    const currentClasses = (_el$className = el.className) !== null && _el$className !== void 0 && _el$className.length ? el.className.split(' ') : [];
    const addedClasses = currentClasses.filter(className => !el.dxClasses.previous.includes(className));
    const removedClasses = el.dxClasses.previous.filter(className => !currentClasses.includes(className));
    addedClasses.forEach(value => {
      const indexInRemoved = el.dxClasses.removed.indexOf(value);
      if (indexInRemoved > -1) {
        el.dxClasses.removed.splice(indexInRemoved, 1);
      } else if (!el.dxClasses.added.includes(value)) {
        el.dxClasses.added.push(value);
      }
    });
    removedClasses.forEach(value => {
      const indexInAdded = el.dxClasses.added.indexOf(value);
      if (indexInAdded > -1) {
        el.dxClasses.added.splice(indexInAdded, 1);
      } else if (!el.dxClasses.removed.includes(value)) {
        el.dxClasses.removed.push(value);
      }
    });
  }
  componentDidMount() {
    var _el$className2;
    const el = findDOMFromVNode(this.$LI, true);
    this.vDomElement = el;
    super.componentDidMount();
    el.dxClasses = el.dxClasses || {
      removed: [],
      added: [],
      previous: []
    };
    el.dxClasses.previous = el !== null && el !== void 0 && (_el$className2 = el.className) !== null && _el$className2 !== void 0 && _el$className2.length ? el.className.split(' ') : [];
  }
  componentDidUpdate() {
    super.componentDidUpdate();
    const el = this.vDomElement;
    if (el !== null) {
      var _el$className3;
      el.dxClasses.added.forEach(className => el.classList.add(className));
      el.dxClasses.removed.forEach(className => el.classList.remove(className));
      el.dxClasses.previous = (_el$className3 = el.className) !== null && _el$className3 !== void 0 && _el$className3.length ? el.className.split(' ') : [];
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate = super.shouldComponentUpdate(nextProps, nextState);
    if (shouldUpdate) {
      this.vDomUpdateClasses();
    }
    return shouldUpdate;
  }
}