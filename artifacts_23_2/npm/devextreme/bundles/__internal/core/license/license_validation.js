/**
* DevExtreme (bundles/__internal/core/license/license_validation.js)
* Version: 23.2.2
* Build date: Mon Nov 20 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.parseLicenseKey = parseLicenseKey;
exports.setLicenseCheckSkipCondition = setLicenseCheckSkipCondition;
exports.validateLicense = validateLicense;
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _version = require("../../../core/version");
var _byte_utils = require("./byte_utils");
var _key = require("./key");
var _pkcs = require("./pkcs1");
var _rsa_bigint = require("./rsa_bigint");
var _sha = require("./sha1");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  TokenKind["internal"] = "internal";
})(TokenKind || (TokenKind = {}));
const SPLITTER = '.';
const FORMAT = 1;
const RTM_MIN_PATCH_VERSION = 3;
const GENERAL_ERROR = {
  kind: TokenKind.corrupted,
  error: 'general'
};
const VERIFICATION_ERROR = {
  kind: TokenKind.corrupted,
  error: 'verification'
};
const DECODING_ERROR = {
  kind: TokenKind.corrupted,
  error: 'decoding'
};
const DESERIALIZATION_ERROR = {
  kind: TokenKind.corrupted,
  error: 'deserialization'
};
const PAYLOAD_ERROR = {
  kind: TokenKind.corrupted,
  error: 'payload'
};
const VERSION_ERROR = {
  kind: TokenKind.corrupted,
  error: 'version'
};
let validationPerformed = false;
// verifies RSASSA-PKCS1-v1.5 signature
function verifySignature(_ref) {
  let {
    text,
    signature: encodedSignature
  } = _ref;
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
  const parts = encodedKey.split(SPLITTER);
  if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0) {
    return GENERAL_ERROR;
  }
  if (!verifySignature({
    text: parts[0],
    signature: parts[1]
  })) {
    return VERIFICATION_ERROR;
  }
  let decodedPayload = '';
  try {
    decodedPayload = atob(parts[0]);
  } catch (_a) {
    return DECODING_ERROR;
  }
  let payload = {};
  try {
    payload = JSON.parse(decodedPayload);
  } catch (_b) {
    return DESERIALIZATION_ERROR;
  }
  const {
      customerId,
      maxVersionAllowed,
      format,
      internalUsageId
    } = payload,
    rest = __rest(payload, ["customerId", "maxVersionAllowed", "format", "internalUsageId"]);
  if (internalUsageId !== undefined) {
    return {
      kind: TokenKind.internal,
      internalUsageId
    };
  }
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
function getLicenseCheckParams(_ref2) {
  let {
    licenseKey,
    version
  } = _ref2;
  let preview = false;
  try {
    const [major, minor, patch] = version.split('.').map(Number);
    preview = isNaN(patch) || patch < RTM_MIN_PATCH_VERSION;
    if (!licenseKey) {
      return {
        preview,
        error: 'W0019'
      };
    }
    const license = parseLicenseKey(licenseKey);
    if (license.kind === TokenKind.corrupted) {
      return {
        preview,
        error: 'W0021'
      };
    }
    if (license.kind === TokenKind.internal) {
      return {
        preview,
        internal: true,
        error: license.internalUsageId === _key.INTERNAL_USAGE_ID ? undefined : 'W0020'
      };
    }
    if (!(major && minor)) {
      return {
        preview,
        error: 'W0021'
      };
    }
    if (major * 10 + minor > license.payload.maxVersionAllowed) {
      return {
        preview,
        error: 'W0020'
      };
    }
    return {
      preview,
      error: undefined
    };
  } catch (_a) {
    return {
      preview,
      error: 'W0021'
    };
  }
}
function validateLicense(licenseKey) {
  let version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _version.version;
  if (validationPerformed) {
    return;
  }
  validationPerformed = true;
  const {
    preview,
    internal,
    error
  } = getLicenseCheckParams({
    licenseKey,
    version
  });
  if (error) {
    _errors.default.log(preview ? 'W0022' : error);
    return;
  }
  if (preview && !internal) {
    _errors.default.log('W0022');
  }
}
function setLicenseCheckSkipCondition() {
  let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
}
// NOTE: We need this default export
// to allow QUnit mock the validateLicense function
var _default = {
  validateLicense
};
exports.default = _default;
