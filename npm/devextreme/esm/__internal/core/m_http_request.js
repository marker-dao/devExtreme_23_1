/**
* DevExtreme (esm/__internal/core/m_http_request.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import injector from '../../core/utils/dependency_injector';
import { getWindow } from '../../core/utils/window';
const window = getWindow();
const nativeXMLHttpRequest = {
  getXhr() {
    // @ts-expect-error no XMLHttpRequest on Window
    return new window.XMLHttpRequest();
  }
};
const httpRequest = injector(nativeXMLHttpRequest);
export { httpRequest };
