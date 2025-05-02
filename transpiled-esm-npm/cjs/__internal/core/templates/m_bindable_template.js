"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BindableTemplate = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _remove = require("../../../common/core/events/remove");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _template_base = require("../../../core/templates/template_base");
var _type = require("../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const watchChanges = function () {
  const globalWatch = (data, watchMethod, callback) => watchMethod(() => data, callback);
  const fieldsWatch = function (data, watchMethod, fields, fieldsMap, callback) {
    const resolvedData = {};
    const missedFields = fields.slice();
    const watchHandlers = fields.map(name => {
      const fieldGetter = fieldsMap[name];
      return watchMethod(fieldGetter ? () => fieldGetter(data) : () => data[name], value => {
        resolvedData[name] = value;
        if (missedFields.length) {
          const index = missedFields.indexOf(name);
          if (index >= 0) {
            missedFields.splice(index, 1);
          }
        }
        if (!missedFields.length) {
          callback(resolvedData);
        }
      });
    });
    return function () {
      watchHandlers.forEach(dispose => dispose());
    };
  };
  return function (rawData, watchMethod, fields, fieldsMap, callback) {
    let fieldsDispose;
    const globalDispose = globalWatch(rawData, watchMethod, dataWithRawFields => {
      fieldsDispose && fieldsDispose();
      if ((0, _type.isPrimitive)(dataWithRawFields)) {
        callback(dataWithRawFields);
        return;
      }
      fieldsDispose = fieldsWatch(dataWithRawFields, watchMethod, fields, fieldsMap, callback);
    });
    return function () {
      fieldsDispose && fieldsDispose();
      globalDispose && globalDispose();
    };
  };
}();
class BindableTemplate extends _template_base.TemplateBase {
  constructor(render, fields, watchMethod, fieldsMap) {
    super();
    this._render = render;
    this._fields = fields;
    this._fieldsMap = fieldsMap || {};
    this._watchMethod = watchMethod;
  }
  // @ts-expect-error renderCore differs from baseTemplate
  _renderCore(options) {
    const $container = (0, _renderer.default)(options.container);
    const dispose = watchChanges(options.model, this._watchMethod, this._fields, this._fieldsMap, data => {
      $container.empty();
      this._render($container, data, options.model);
    });
    _events_engine.default.on($container, _remove.removeEvent, dispose);
    return $container.contents();
  }
}
exports.BindableTemplate = BindableTemplate;