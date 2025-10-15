import { addCollectorByLevel } from './add_collector_by_level';
import { addLevel } from './add_level';
export const addCollector = (entities, options) => {
  const step1 = addLevel(entities, options);
  const step2 = addCollectorByLevel(step1, options);
  return step2;
};