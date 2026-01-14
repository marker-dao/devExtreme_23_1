import { createFragment } from "inferno";
import dxPopup from '../../../../../ui/popup';
import { createPortal } from 'inferno';
import { wrapRef } from './utils';
import { InfernoWrapper } from './widget_wrapper';
export class Popup extends InfernoWrapper {
  constructor() {
    super(...arguments);
    this.contentRef = {};
  }
  render() {
    return createFragment([super.render(), this.contentRef.current && createPortal(this.props.children, this.contentRef.current)], 0);
  }
  transformRef(props) {
    var _props;
    // @ts-expect-error
    if ((_props = props) !== null && _props !== void 0 && (_props = _props.position) !== null && _props !== void 0 && (_props = _props.of) !== null && _props !== void 0 && _props.current) {
      // eslint-disable-next-line no-param-reassign
      props = Object.assign({}, props, {
        position: Object.assign({}, props.position, {
          // @ts-expect-error
          of: wrapRef(props.position.of)
        })
      });
    }
    return props;
  }
  createComponent(ref, props) {
    return super.createComponent(ref, this.transformRef(props));
  }
  updateComponentOptions(prevProps, props) {
    super.updateComponentOptions(prevProps, this.transformRef(props));
  }
  getComponentFabric() {
    return dxPopup;
  }
  componentDidMount() {
    super.componentDidMount();
    // @ts-expect-error
    this.contentRef.current = this.component.$content().get(0);
    this.setState({});
  }
}