/**
* DevExtreme (esm/__internal/scheduler/utils/data_accessor/appointment_data_accessor.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { compileGetter, compileSetter } from '../../../../core/utils/data';
import dateSerialization from '../../../../core/utils/date_serialization';
import { DataAccessor } from './data_accessor';
const isDateField = field => field === 'startDate' || field === 'endDate';
const isBooleanField = field => field === 'allDay' || field === 'disabled';
export class AppointmentDataAccessor extends DataAccessor {
  constructor(fields) {
    let forceIsoDateParsing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let dateSerializationFormat = arguments.length > 2 ? arguments[2] : undefined;
    super();
    this.forceIsoDateParsing = forceIsoDateParsing;
    this.dateSerializationFormat = dateSerializationFormat;
    this.expr = _extends({}, fields);
    this.updateExpressions(fields);
  }
  getCommonAccessExpressions(expr) {
    return {
      getter: compileGetter(expr),
      setter: compileSetter(expr)
    };
  }
  getDateFieldAccessExpressions(expr) {
    const {
      getter: commonGetter,
      setter: commonSetter
    } = this.getCommonAccessExpressions(expr);
    // TODO: check cache usage, it sets once and forever now
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let serializationFormatCache;
    const getter = object => {
      const date = this.forceIsoDateParsing ? dateSerialization.deserializeDate(commonGetter(object)) : commonGetter(object);
      return date === undefined ? date : new Date(date);
    };
    const setter = (object, value) => {
      if (this.dateSerializationFormat) {
        serializationFormatCache = this.dateSerializationFormat;
      } else if (this.forceIsoDateParsing && !serializationFormatCache) {
        const oldValue = commonGetter(object);
        serializationFormatCache = dateSerialization.getDateSerializationFormat(oldValue);
      }
      const newValue = dateSerialization.serializeDate(value, serializationFormatCache);
      commonSetter(object, newValue);
    };
    return {
      getter,
      setter
    };
  }
  getBooleanFieldAccessExpressions(expr) {
    const {
      getter: commonGetter,
      setter
    } = this.getCommonAccessExpressions(expr);
    const getter = object => Boolean(commonGetter(object));
    return {
      getter,
      setter
    };
  }
  getAccessExpressions(name, expr) {
    switch (true) {
      case isBooleanField(name):
        return this.getBooleanFieldAccessExpressions(expr);
      case isDateField(name):
        return this.getDateFieldAccessExpressions(expr);
      default:
        return this.getCommonAccessExpressions(expr);
    }
  }
  updateExpression(field, expr) {
    const name = field.replace('Expr', '');
    if (!expr) {
      /* eslint-disable @typescript-eslint/no-dynamic-delete */
      delete this.getter[name];
      delete this.setter[name];
      delete this.expr[field];
      /* eslint-enable @typescript-eslint/no-dynamic-delete */
      return;
    }
    const {
      getter,
      setter
    } = this.getAccessExpressions(name, expr);
    this.getter[name] = getter;
    this.setter[name] = setter;
    this.expr[field] = expr;
  }
}
