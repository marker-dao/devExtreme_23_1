import { createVNode } from "inferno";
import { Component, createRef } from 'inferno';
import { ConfigContext } from '../core/config_context';
export class InfernoWrapper extends Component {
  constructor() {
    super(...arguments);
    this.ref = createRef();
  }
  render() {
    if (this.props.elementRef) {
      this.ref = this.props.elementRef;
    }
    return createVNode(1, "div", null, null, 1, {
      "onKeyDown": this.props.onKeyDown
    }, null, this.ref);
  }
  getComponentOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Object.assign({}, this.context[ConfigContext.id], this.props);
  }
  updateComponentRef() {
    if (this.props.componentRef) {
      // @ts-expect-error
      this.props.componentRef.current = this.component;
    }
  }
  updateComponentOptions(prevProps, props) {
    Object.keys(props).forEach(key => {
      if (props[key] !== prevProps[key]) {
        var _this$component;
        (_this$component = this.component) === null || _this$component === void 0 || _this$component.option(key, props[key]);
      }
    });
  }
  createComponent(ref, props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return new (this.getComponentFabric())(ref.current, props);
  }
  componentDidMount() {
    this.component = this.createComponent(this.ref, this.getComponentOptions());
    this.updateComponentRef();
  }
  componentDidUpdate(prevProps) {
    this.updateComponentOptions(prevProps, this.getComponentOptions());
    this.updateComponentRef();
  }
  componentWillUnmount() {
    var _this$component2;
    (_this$component2 = this.component) === null || _this$component2 === void 0 || _this$component2.dispose();
  }
}