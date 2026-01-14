/**
* DevExtreme (esm/__internal/core/utils/m_storage.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getWindow } from '../../../core/utils/window';
const window = getWindow();
const getSessionStorage = function () {
  let sessionStorage;
  try {
    sessionStorage = window.sessionStorage;
  } catch (e) {/* empty */}
  return sessionStorage;
};
export { getSessionStorage as sessionStorage };
