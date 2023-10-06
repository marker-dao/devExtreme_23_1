/**
* DevExtreme (cjs/__internal/core/license/license_validation.test.js)
* Version: 23.2.0
* Build date: Fri Oct 06 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _errors = _interopRequireDefault(require("../../../core/errors"));
var _license_validation = require("./license_validation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
describe('license token', function () {
  it.each([{
    token: 'ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMxCn0=.DiDceRbil4IzXl5av7pNkKieyqHHhRf+CM477zDu4N9fyrhkQsjRourYvgVfkbSm+EQplkXhlMBc3s8Vm9n+VtPaMbeWXis92cdW/6HiT+Dm54xw5vZ5POGunKRrNYUzd9zTbYcz0bYA/dc/mHFeUdXA0UlKcx1uMaXmtJrkK74=',
    payload: {
      customerId: 'b1140b46-fde1-41bd-a280-4db9f8e7d9bd',
      maxVersionAllowed: 231
    }
  }, {
    token: 'ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogIjYxMjFmMDIyLTFjMTItNDNjZC04YWE0LTkwNzJkNDU4YjYxNCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMyCn0=.RENyZ3Ga5rCB7/XNKYbk2Ffv1n9bUexYNhyOlqcAD02YVnPw6XyQcN+ZORScKDU9gOInJ4o7vPxkgh10KvMZNn+FuBK8UcUR7kchk7z0CHGuOcIn2jD5X2hG6SYJ0UCBG/JDG35AL09T7Uv/pGj4PolRsANxtuMpoqmvX2D2vkU=',
    payload: {
      customerId: '6121f022-1c12-43cd-8aa4-9072d458b614',
      maxVersionAllowed: 232
    }
  }, {
    token: 'ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogIjM3Yjg4ZjBmLWQ0MmMtNDJiZS05YjhkLTU1ZGMwYzUzYzAxZiIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjIxCn0=.NVsilC5uWlD5QGS6bocLMlsVVK0VpZXYwU2DstUiLRpEI79/onuR8dGWasCLBo4PORDHPkNA/Ej8XeCHzJ0EkXRRZ7E2LrP/xlEfHRXTruvW4IEbZt3LiwJBt6/isLz+wzXtYtjV7tpE07/Y0TFoy+mWpHoU11GVtwKh6weRxkg=',
    payload: {
      customerId: '37b88f0f-d42c-42be-9b8d-55dc0c53c01f',
      maxVersionAllowed: 221
    }
  }])('verifies and decodes payload [%#]', function (_ref) {
    var token = _ref.token,
      expected = _ref.payload;
    var license = (0, _license_validation.parseLicenseKey)(token);
    expect(license.kind).toBe('verified');
    if (license.kind === 'verified') {
      expect(license.payload).toEqual(expected);
    }
  });
  it('verifies and decodes payload with extra fields', function () {
    var license = (0, _license_validation.parseLicenseKey)('ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMxLAogICJleHRyYUZpZWxkIjogIkE5OTk5OTkiCn0=.fqm8mVhQ9+x/R7E7MVwUP3nJaYL3KldhYffVXdDqPVyHIQi66Z2XZ2RdygH4J0jvUpjhZ6yzmGPV0J0WoPbKyhtnY4ELhove/IAwpn8WGfRw3wLSxfR+RWuaKcw2yvlUA1JqrQUrIrN23UwNQodbJ/hGm30s0h1bf8zCvQ/d31k=');
    expect(license.kind).toBe('verified');
    if (license.kind === 'verified') {
      expect(license.payload).toEqual({
        customerId: 'b1140b46-fde1-41bd-a280-4db9f8e7d9bd',
        maxVersionAllowed: 231,
        extraField: 'A999999'
      });
    }
  });
  it('fails if payload is not verified', function () {
    var license = (0, _license_validation.parseLicenseKey)('ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMxCn0=.NVsilC5uWlD5QGS6bocLMlsVVK0VpZXYwU2DstUiLRpEI79/onuR8dGWasCLBo4PORDHPkNA/Ej8XeCHzJ0EkXRRZ7E2LrP/xlEfHRXTruvW4IEbZt3LiwJBt6/isLz+wzXtYtjV7tpE07/Y0TFoy+mWpHoU11GVtwKh6weRxkg=');
    expect(license.kind).toBe('corrupted');
    if (license.kind === 'corrupted') {
      expect(license.error).toBe('verification');
    }
  });
  it('fails if payload is invalid JSON', function () {
    var license = (0, _license_validation.parseLicenseKey)('YWJj.vjx6wAI9jVkHJAnKcsuYNZ5UvCq3UhypQ+0f+kZ37/Qc1uj4BM6//Kfi4SVsXGOaOTFYWgzesROnHCp3jZRqphJwal4yXHD1sGFi6FEdB4MgdgNZvsZSnxNWLs/7s07CzuHLTpJrAG7sTdHVkQWZNnSCKjzV7909c/Stl9+hkLo=');
    expect(license.kind).toBe('corrupted');
    if (license.kind === 'corrupted') {
      expect(license.error).toBe('deserialization');
    }
  });
  it('fails if payload is invalid Base64', function () {
    var license = (0, _license_validation.parseLicenseKey)('ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogIjM3Yjg4ZjBmLWQ0MmMtNDJiZS05YjhkLTU1ZGMwYzUzYzAxZiIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjIxCn0-.EnP/RDKg0eSyaPU1eDUFll1lqOdYbhN3u73LhN1op8vjNwA0P1vKiT1DfQRmXudlleGWgDkLA2OmJYUER8j7I3LSFf3hLkBAoWoBErgveTb2zkbz8P1i9lE+XmzIXeYHyZBYUt0IPkNfajF9zzbSDDin1CvW7pnADi0vIeZ5ICQ=');
    expect(license.kind).toBe('corrupted');
    if (license.kind === 'corrupted') {
      expect(license.error).toBe('decoding');
    }
  });
  it.each(['ewogICJmb3JtYXQiOiAxLAogICJtYXhWZXJzaW9uQWxsb3dlZCI6IDIzMQp9.WH30cajUFcKqw/fwt4jITM/5tzVwPpbdbezhhdBi5oeOvU06zKY0J4M8gQy8GQ++RPYVCAo2md6vI9D80FD2CC4w+hpQLJNJJgNUHYPrgG6CX1yAB3M+NKHsPP9S71bXAgwvignb5uPo0R5emQzr4RKDhWQMKtgqEcRe+yme2mU=', 'ewogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMxCn0=.ok32DBaAgf3ijLmNQb+A0kUV2AiSivqvZJADdF607qqlAaduAVnotJtgdwm/Ib3MErfaGrDohCYoFMnKQevkRxFkA7tK3kOBnTZPUnZY0r3wyulMQmr4Qo+Sjf/fyXs4IYpGsC7/uJjgrCos8uzBegfmgfM93XSt6pKl9+c5xvc=', 'ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIKfQ==.resgTqmazrorRNw7mmtV31XQnmTSw0uLEArsmpzCjWMQJLocBfAjpFvKBf+SAG9q+1iOSFySj64Uv2xBVqHnyeNVBRbouOKOnAB8RpkKvN4sc5SDc8JAG5TkwPVSzK/VLBpQxpqbxlcrRfHwz9gXqQoPt4/ZVATn285iw3DW0CU='])('fails if payload misses required fields [%#]', function (token) {
    var license = (0, _license_validation.parseLicenseKey)(token);
    expect(license.kind).toBe('corrupted');
    if (license.kind === 'corrupted') {
      expect(license.error).toBe('payload');
    }
  });
  it('fails if payload has unsupported version', function () {
    var license = (0, _license_validation.parseLicenseKey)('ewogICJmb3JtYXQiOiAyLAogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMxCn0=.tTBymZMROsYyMiP6ldXFqGurbzqjhSQIu/pjyEUJA3v/57VgToomYl7FVzBj1asgHpadvysyTUiX3nFvPxbp166L3+LB3Jybw9ueMnwePu5vQOO0krqKLBqRq+TqHKn7k76uYRbkCIo5UajNfzetHhlkin3dJf3x2K/fcwbPW5A=');
    expect(license.kind).toBe('corrupted');
    if (license.kind === 'corrupted') {
      expect(license.error).toBe('version');
    }
  });
  it.each(['', '.', 'a', 'a.', '.a', '.a.', '.a.', '.a.b', 'a.b.', '.a.b.'])('is not parsed from invalid input [%#]', function (invalidInput) {
    var license = (0, _license_validation.parseLicenseKey)(invalidInput);
    expect(license.kind).toBe('corrupted');
    if (license.kind === 'corrupted') {
      expect(license.error).toBe('general');
    }
  });
});
describe('License check', function () {
  var TOKEN_23_1 = 'ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMxCn0=.DiDceRbil4IzXl5av7pNkKieyqHHhRf+CM477zDu4N9fyrhkQsjRourYvgVfkbSm+EQplkXhlMBc3s8Vm9n+VtPaMbeWXis92cdW/6HiT+Dm54xw5vZ5POGunKRrNYUzd9zTbYcz0bYA/dc/mHFeUdXA0UlKcx1uMaXmtJrkK74=';
  var TOKEN_23_2 = 'ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogIjYxMjFmMDIyLTFjMTItNDNjZC04YWE0LTkwNzJkNDU4YjYxNCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMyCn0=.RENyZ3Ga5rCB7/XNKYbk2Ffv1n9bUexYNhyOlqcAD02YVnPw6XyQcN+ZORScKDU9gOInJ4o7vPxkgh10KvMZNn+FuBK8UcUR7kchk7z0CHGuOcIn2jD5X2hG6SYJ0UCBG/JDG35AL09T7Uv/pGj4PolRsANxtuMpoqmvX2D2vkU=';
  var TOKEN_UNVERIFIED = 'ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMxCn0=.NVsilC5uWlD5QGS6bocLMlsVVK0VpZXYwU2DstUiLRpEI79/onuR8dGWasCLBo4PORDHPkNA/Ej8XeCHzJ0EkXRRZ7E2LrP/xlEfHRXTruvW4IEbZt3LiwJBt6/isLz+wzXtYtjV7tpE07/Y0TFoy+mWpHoU11GVtwKh6weRxkg=';
  var TOKEN_INVALID_JSON = 'YWJj.vjx6wAI9jVkHJAnKcsuYNZ5UvCq3UhypQ+0f+kZ37/Qc1uj4BM6//Kfi4SVsXGOaOTFYWgzesROnHCp3jZRqphJwal4yXHD1sGFi6FEdB4MgdgNZvsZSnxNWLs/7s07CzuHLTpJrAG7sTdHVkQWZNnSCKjzV7909c/Stl9+hkLo=';
  var TOKEN_INVALID_BASE64 = 'ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogIjM3Yjg4ZjBmLWQ0MmMtNDJiZS05YjhkLTU1ZGMwYzUzYzAxZiIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjIxCn0-.EnP/RDKg0eSyaPU1eDUFll1lqOdYbhN3u73LhN1op8vjNwA0P1vKiT1DfQRmXudlleGWgDkLA2OmJYUER8j7I3LSFf3hLkBAoWoBErgveTb2zkbz8P1i9lE+XmzIXeYHyZBYUt0IPkNfajF9zzbSDDin1CvW7pnADi0vIeZ5ICQ=';
  var TOKEN_MISSING_FIELD_1 = 'ewogICJmb3JtYXQiOiAxLAogICJtYXhWZXJzaW9uQWxsb3dlZCI6IDIzMQp9.WH30cajUFcKqw/fwt4jITM/5tzVwPpbdbezhhdBi5oeOvU06zKY0J4M8gQy8GQ++RPYVCAo2md6vI9D80FD2CC4w+hpQLJNJJgNUHYPrgG6CX1yAB3M+NKHsPP9S71bXAgwvignb5uPo0R5emQzr4RKDhWQMKtgqEcRe+yme2mU=';
  var TOKEN_MISSING_FIELD_2 = 'ewogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMxCn0=.ok32DBaAgf3ijLmNQb+A0kUV2AiSivqvZJADdF607qqlAaduAVnotJtgdwm/Ib3MErfaGrDohCYoFMnKQevkRxFkA7tK3kOBnTZPUnZY0r3wyulMQmr4Qo+Sjf/fyXs4IYpGsC7/uJjgrCos8uzBegfmgfM93XSt6pKl9+c5xvc=';
  var TOKEN_MISSING_FIELD_3 = 'ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIKfQ==.resgTqmazrorRNw7mmtV31XQnmTSw0uLEArsmpzCjWMQJLocBfAjpFvKBf+SAG9q+1iOSFySj64Uv2xBVqHnyeNVBRbouOKOnAB8RpkKvN4sc5SDc8JAG5TkwPVSzK/VLBpQxpqbxlcrRfHwz9gXqQoPt4/ZVATn285iw3DW0CU=';
  var TOKEN_UNSUPPORTED_VERSION = 'ewogICJmb3JtYXQiOiAyLAogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMxCn0=.tTBymZMROsYyMiP6ldXFqGurbzqjhSQIu/pjyEUJA3v/57VgToomYl7FVzBj1asgHpadvysyTUiX3nFvPxbp166L3+LB3Jybw9ueMnwePu5vQOO0krqKLBqRq+TqHKn7k76uYRbkCIo5UajNfzetHhlkin3dJf3x2K/fcwbPW5A=';
  beforeEach(function () {
    jest.spyOn(_errors.default, 'log').mockImplementation(function () {});
    (0, _license_validation.setLicenseCheckSkipCondition)(false);
  });
  afterEach(function () {
    jest.restoreAllMocks();
  });
  test('W0019 error should be logged if license is empty', function () {
    [['', '1.0'], [null, '1.0'], [undefined, '1.0']].forEach(function (_ref2, index) {
      var _ref3 = _slicedToArray(_ref2, 2),
        token = _ref3[0],
        version = _ref3[1];
      (0, _license_validation.verifyLicense)(token, version);
      expect(_errors.default.log).toHaveBeenCalledTimes(index + 1);
      expect(_errors.default.log).toHaveBeenCalledWith('W0019');
      (0, _license_validation.setLicenseCheckSkipCondition)(false);
    });
  });
  test('No messages should be logged if license is valid', function () {
    [[TOKEN_23_1, '23.1'], [TOKEN_23_1, '12.3'], [TOKEN_23_2, '23.1'], [TOKEN_23_2, '23.2']].forEach(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
        token = _ref5[0],
        version = _ref5[1];
      (0, _license_validation.verifyLicense)(token, version);
      expect(_errors.default.log).not.toHaveBeenCalled();
    });
  });
  test('Message should be logged only once', function () {
    (0, _license_validation.verifyLicense)('', '1.0');
    (0, _license_validation.verifyLicense)('', '1.0');
    (0, _license_validation.verifyLicense)('', '1.0');
    expect(_errors.default.log).toHaveBeenCalledTimes(1);
  });
  test('No messages should be logged if setLicenseCheckSkipCondition() used', function () {
    (0, _license_validation.setLicenseCheckSkipCondition)();
    (0, _license_validation.verifyLicense)('', '1.0');
    expect(_errors.default.log).not.toHaveBeenCalled();
  });
  test('W0020 error should be logged if license is outdated', function () {
    [[TOKEN_23_1, '23.2'], [TOKEN_23_2, '42.4']].forEach(function (_ref6, index) {
      var _ref7 = _slicedToArray(_ref6, 2),
        token = _ref7[0],
        version = _ref7[1];
      (0, _license_validation.verifyLicense)(token, version);
      expect(_errors.default.log).toHaveBeenCalledTimes(index + 1);
      expect(_errors.default.log).toHaveBeenCalledWith('W0020');
      (0, _license_validation.setLicenseCheckSkipCondition)(false);
    });
  });
  test('W0021 error should be logged if license is corrupted/invalid', function () {
    [[TOKEN_UNVERIFIED, '1.2.3'], [TOKEN_INVALID_JSON, '1.2.3'], [TOKEN_INVALID_BASE64, '1.2.3'], [TOKEN_MISSING_FIELD_1, '1.2.3'], [TOKEN_MISSING_FIELD_2, '1.2.3'], [TOKEN_MISSING_FIELD_3, '1.2.3'], [TOKEN_UNSUPPORTED_VERSION, '1.2.3'], ['Another', '1.2.3'], ['str@nge'], ['in.put'], ['3.2.1', '1.2.3'], [TOKEN_23_1, '123']].forEach(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 2),
        token = _ref9[0],
        version = _ref9[1];
      (0, _license_validation.verifyLicense)(token, version);
      expect(_errors.default.log).toHaveBeenCalledWith('W0021');
      (0, _license_validation.setLicenseCheckSkipCondition)(false);
    });
  });
});
