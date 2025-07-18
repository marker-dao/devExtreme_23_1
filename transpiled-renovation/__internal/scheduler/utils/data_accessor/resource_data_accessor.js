"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceDataAccessor = void 0;
var _data = require("../../../../core/utils/data");
var _data_accessor = require("./data_accessor");
class ResourceDataAccessor extends _data_accessor.DataAccessor {
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
    this.getter[name] = (0, _data.compileGetter)(expr);
    this.setter[name] = (0, _data.compileSetter)(expr);
  }
}
exports.ResourceDataAccessor = ResourceDataAccessor;