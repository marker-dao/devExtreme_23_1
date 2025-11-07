/**
* DevExtreme (esm/__internal/scheduler/utils/macro_task_array/index.js)
* Version: 25.2.0
* Build date: Fri Nov 07 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dispatcher from './dispatcher';
import { macroTaskArrayForEach, macroTaskArrayMap } from './methods';
export default {
  forEach: macroTaskArrayForEach,
  map: macroTaskArrayMap,
  dispose: dispatcher.dispose
};
