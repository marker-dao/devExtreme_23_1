/**
* DevExtreme (esm/renovation/ui/scheduler/appointments_context_provider.js)
* Version: 23.2.2
* Build date: Wed Nov 22 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
