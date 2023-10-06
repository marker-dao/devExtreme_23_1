/**
* DevExtreme (esm/__internal/core/license/license_validation.js)
* Version: 23.2.0
* Build date: Fri Oct 06 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import errors from '../../../core/errors';
import { version as packageVersion } from '../../../core/version';
import { verify } from './rsa_pkcs1_sha1';
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
export function parseLicenseKey(encodedKey) {
  if (encodedKey === undefined) {
    return GENERAL_ERROR;
  }
  var parts = encodedKey.split(SPLITTER);
  if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0) {
    return GENERAL_ERROR;
  }
  if (!verify({
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
  var {
      customerId,
      maxVersionAllowed,
      format
    } = payload,
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
export function verifyLicense(licenseKey) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : packageVersion;
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
    var [major, minor] = version.split('.').map(Number);
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
      errors.log(warning);
    }
  }
}

// NOTE: We need this default export
// to allow QUnit mock the verifyLicense function
export default {
  verifyLicense
};
