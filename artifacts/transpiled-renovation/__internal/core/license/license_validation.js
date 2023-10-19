"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.parseLicenseKey = parseLicenseKey;
exports.setLicenseCheckSkipCondition = setLicenseCheckSkipCondition;
exports.verifyLicense = verifyLicense;
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _version = require("../../../core/version");
var _byte_utils = require("./byte_utils");
var _key = require("./key");
var _pkcs = require("./pkcs1");
var _rsa_bigint = require("./rsa_bigint");
var _sha = require("./sha1");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var TokenKind;
(function (TokenKind) {
  TokenKind["corrupted"] = "corrupted";
  TokenKind["verified"] = "verified";
})(TokenKind || (TokenKind = {}));
var SPLITTER = '.';
var FORMAT = 1;
var GENERAL_ERROR = {
  kind: TokenKind.corrupted,
  error: 'general'
};
var VERIFICATION_ERROR = {
  kind: TokenKind.corrupted,
  error: 'verification'
};
var DECODING_ERROR = {
  kind: TokenKind.corrupted,
  error: 'decoding'
};
var DESERIALIZATION_ERROR = {
  kind: TokenKind.corrupted,
  error: 'deserialization'
};
var PAYLOAD_ERROR = {
  kind: TokenKind.corrupted,
  error: 'payload'
};
var VERSION_ERROR = {
  kind: TokenKind.corrupted,
  error: 'version'
};
var isLicenseVerified = false;
// verifies RSASSA-PKCS1-v1.5 signature
function verifySignature(_ref) {
  var text = _ref.text,
    encodedSignature = _ref.signature;
  return (0, _rsa_bigint.compareSignatures)({
    key: _key.PUBLIC_KEY,
    signature: (0, _byte_utils.base64ToBytes)(encodedSignature),
    actual: (0, _pkcs.pad)((0, _sha.sha1)(text))
  });
}
function parseLicenseKey(encodedKey) {
  if (encodedKey === undefined) {
    return GENERAL_ERROR;
  }
  var parts = encodedKey.split(SPLITTER);
  if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0) {
    return GENERAL_ERROR;
  }
  if (!verifySignature({
    text: parts[0],
    signature: parts[1]
  })) {
    return VERIFICATION_ERROR;
  }
  var decodedPayload = '';
  try {
    decodedPayload = atob(parts[0]);
  } catch (_a) {
    return DECODING_ERROR;
  }
  var payload = {};
  try {
    payload = JSON.parse(decodedPayload);
  } catch (_b) {
    return DESERIALIZATION_ERROR;
  }
  var _payload = payload,
    customerId = _payload.customerId,
    maxVersionAllowed = _payload.maxVersionAllowed,
    format = _payload.format,
    rest = __rest(payload, ["customerId", "maxVersionAllowed", "format"]);
  if (customerId === undefined || maxVersionAllowed === undefined || format === undefined) {
    return PAYLOAD_ERROR;
  }
  if (format !== FORMAT) {
    return VERSION_ERROR;
  }
  return {
    kind: TokenKind.verified,
    payload: _extends({
      customerId,
      maxVersionAllowed
    }, rest)
  };
}
function verifyLicense(licenseKey) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _version.version;
  if (isLicenseVerified) {
    return;
  }
  isLicenseVerified = true;
  var warning = null;
  try {
    if (!licenseKey) {
      warning = 'W0019';
      return;
    }
    var license = parseLicenseKey(licenseKey);
    if (license.kind === TokenKind.corrupted) {
      warning = 'W0021';
      return;
    }
    var _version$split$map = version.split('.').map(Number),
      _version$split$map2 = _slicedToArray(_version$split$map, 2),
      major = _version$split$map2[0],
      minor = _version$split$map2[1];
    if (!(major && minor)) {
      warning = 'W0021';
      return;
    }
    if (major * 10 + minor > license.payload.maxVersionAllowed) {
      warning = 'W0020';
    }
  } catch (e) {
    warning = 'W0021';
  } finally {
    if (warning) {
      _errors.default.log(warning);
    }
  }
}
function setLicenseCheckSkipCondition() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  /// #DEBUG
  isLicenseVerified = value;
  /// #ENDDEBUG
}
// NOTE: We need this default export
// to allow QUnit mock the verifyLicense function
var _default = {
  verifyLicense
};
exports.default = _default;