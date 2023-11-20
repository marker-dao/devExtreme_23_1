import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["appointmentsContextValue", "children"];
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { AppointmentsContext } from './appointments_context';
export var viewFunction = viewModel => viewModel.props.children;
export var AppointmentsContextProviderProps = {};
export class AppointmentsContextProvider extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.__getterCache = {};
  }
  getChildContext() {
    return _extends({}, this.context, {
      [AppointmentsContext.id]: this.appointmentsContextValue || AppointmentsContext.defaultValue
    });
  }
  get appointmentsContextValue() {
    if (this.__getterCache['appointmentsContextValue'] !== undefined) {
      return this.__getterCache['appointmentsContextValue'];
    }
    return this.__getterCache['appointmentsContextValue'] = (() => {
      return this.props.appointmentsContextValue;
    })();
  }
  get restAttributes() {
    var _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  componentWillUpdate(nextProps, nextState, context) {
    if (this.props['appointmentsContextValue'] !== nextProps['appointmentsContextValue']) {
      this.__getterCache['appointmentsContextValue'] = undefined;
    }
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      appointmentsContextValue: this.appointmentsContextValue,
      restAttributes: this.restAttributes
    });
  }
}
AppointmentsContextProvider.defaultProps = AppointmentsContextProviderProps;