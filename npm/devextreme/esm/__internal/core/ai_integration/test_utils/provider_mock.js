/**
* DevExtreme (esm/__internal/core/ai_integration/test_utils/provider_mock.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export class Provider {
  sendRequest(params) {
    const {
      onChunk
    } = params;
    const promise = new Promise(resolve => {
      onChunk === null || onChunk === void 0 || onChunk('AI');
      onChunk === null || onChunk === void 0 || onChunk(' response');
      resolve('AI response');
    });
    const abort = () => {};
    return {
      promise,
      abort
    };
  }
}
