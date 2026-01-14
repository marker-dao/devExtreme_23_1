/**
* DevExtreme (esm/__internal/viz/sankey/data_validator.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import graphModule from './graph';
const validator = {
  validate(data, incidentOccurred) {
    let result = null;
    if (this._hasCycle(data)) {
      // @ts-expect-error
      result = 'E2006';
      incidentOccurred('E2006');
    }
    return result;
  },
  _hasCycle(data) {
    return graphModule.struct.hasCycle(data);
  }
};
export default validator;
