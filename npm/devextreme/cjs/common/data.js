/**
* DevExtreme (cjs/common/data.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "ArrayStore", {
  enumerable: true,
  get: function () {
    return _array_store.default;
  }
});
Object.defineProperty(exports, "CustomStore", {
  enumerable: true,
  get: function () {
    return _custom_store.CustomStore;
  }
});
Object.defineProperty(exports, "DataHelperMixin", {
  enumerable: true,
  get: function () {
    return _m_data_helper.default;
  }
});
Object.defineProperty(exports, "DataSource", {
  enumerable: true,
  get: function () {
    return _data_source.default;
  }
});
Object.defineProperty(exports, "EdmLiteral", {
  enumerable: true,
  get: function () {
    return _utils2.EdmLiteral;
  }
});
Object.defineProperty(exports, "EndpointSelector", {
  enumerable: true,
  get: function () {
    return _endpoint_selector.default;
  }
});
Object.defineProperty(exports, "LocalStore", {
  enumerable: true,
  get: function () {
    return _local_store.default;
  }
});
Object.defineProperty(exports, "ODataContext", {
  enumerable: true,
  get: function () {
    return _context.default;
  }
});
Object.defineProperty(exports, "ODataStore", {
  enumerable: true,
  get: function () {
    return _store.default;
  }
});
Object.defineProperty(exports, "applyChanges", {
  enumerable: true,
  get: function () {
    return _apply_changes.default;
  }
});
Object.defineProperty(exports, "base64_encode", {
  enumerable: true,
  get: function () {
    return _utils.base64_encode;
  }
});
Object.defineProperty(exports, "compileGetter", {
  enumerable: true,
  get: function () {
    return _utils.compileGetter;
  }
});
Object.defineProperty(exports, "compileSetter", {
  enumerable: true,
  get: function () {
    return _utils.compileSetter;
  }
});
Object.defineProperty(exports, "errorHandler", {
  enumerable: true,
  get: function () {
    return _errors.errorHandler;
  }
});
Object.defineProperty(exports, "isGroupItemsArray", {
  enumerable: true,
  get: function () {
    return _custom_store.isGroupItemsArray;
  }
});
Object.defineProperty(exports, "isItemsArray", {
  enumerable: true,
  get: function () {
    return _custom_store.isItemsArray;
  }
});
Object.defineProperty(exports, "isLoadResultObject", {
  enumerable: true,
  get: function () {
    return _custom_store.isLoadResultObject;
  }
});
Object.defineProperty(exports, "keyConverters", {
  enumerable: true,
  get: function () {
    return _utils2.keyConverters;
  }
});
Object.defineProperty(exports, "query", {
  enumerable: true,
  get: function () {
    return _query.default;
  }
});
Object.defineProperty(exports, "setErrorHandler", {
  enumerable: true,
  get: function () {
    return _errors.setErrorHandler;
  }
});
var _apply_changes = _interopRequireDefault(require("./data/apply_changes"));
var _array_store = _interopRequireDefault(require("./data/array_store"));
var _custom_store = require("./data/custom_store");
var _data_source = _interopRequireDefault(require("./data/data_source"));
var _endpoint_selector = _interopRequireDefault(require("./data/endpoint_selector"));
var _errors = require("./data/errors");
var _local_store = _interopRequireDefault(require("./data/local_store"));
var _query = _interopRequireDefault(require("./data/query"));
var _utils = require("./data/utils");
var _m_data_helper = _interopRequireDefault(require("../__internal/data/m_data_helper"));
var _context = _interopRequireDefault(require("./data/odata/context"));
var _store = _interopRequireDefault(require("./data/odata/store"));
var _utils2 = require("./data/odata/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
