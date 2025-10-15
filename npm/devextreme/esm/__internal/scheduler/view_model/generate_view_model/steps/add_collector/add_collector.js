/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/add_collector/add_collector.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { addCollectorByLevel } from './add_collector_by_level';
import { addLevel } from './add_level';
export const addCollector = (entities, options) => {
  const step1 = addLevel(entities, options);
  const step2 = addCollectorByLevel(step1, options);
  return step2;
};
