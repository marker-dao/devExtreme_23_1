import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["config"];
import { createVNode, normalizeProps } from "inferno";
import { hideWave, initConfig, showWave } from '../../../ui/widget/utils.ink_ripple';
import { BaseInfernoComponent } from '../../core/r1/runtime/inferno/index';
export const defaultInkRippleProps = {
  config: {}
};
export class InkRipple extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.__getterCache = {};
    this.state = {};
    this.hideWave = this.hideWave.bind(this);
    this.showWave = this.showWave.bind(this);
  }
  get getConfig() {
    if (this.__getterCache.getConfig === undefined) {
      this.__getterCache.getConfig = initConfig(this.props.config);
    }
    return this.__getterCache.getConfig;
  }
  get restAttributes() {
    const _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hideWave(opts) {
    hideWave(this.getConfig, opts);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  showWave(opts) {
    showWave(this.getConfig, opts);
  }
  componentWillUpdate(nextProps) {
    if (this.props.config !== nextProps.config) {
      this.__getterCache.getConfig = undefined;
    }
  }
  render() {
    return normalizeProps(createVNode(1, "div", "dx-inkripple", null, 1, _extends({}, this.restAttributes)));
  }
}
InkRipple.defaultProps = defaultInkRippleProps;