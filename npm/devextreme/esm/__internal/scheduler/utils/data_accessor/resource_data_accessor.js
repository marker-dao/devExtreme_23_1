/**
* DevExtreme (esm/__internal/scheduler/utils/data_accessor/resource_data_accessor.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { compileGetter, compileSetter } from '../../../../core/utils/data';
import { DataAccessor } from './data_accessor';
export class ResourceDataAccessor extends DataAccessor {
  constructor(config) {
    super();
    this.idExpr = config.valueExpr ?? 'id';
    this.textExpr = config.displayExpr ?? 'text';
    this.colorExpr = config.colorExpr ?? 'color';
    this.updateExpressions({
      idExpr: this.idExpr,
      textExpr: this.textExpr,
      colorExpr: this.colorExpr
    });
  }
  updateExpression(field, expr) {
    const name = field.replace('Expr', '');
    if (!expr) {
      /* eslint-disable @typescript-eslint/no-dynamic-delete */
      delete this.getter[name];
      delete this.setter[name];
      /* eslint-enable @typescript-eslint/no-dynamic-delete */
      return;
    }
    this.getter[name] = compileGetter(expr);
    this.setter[name] = compileSetter(expr);
  }
}
