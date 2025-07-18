import { compileGetter, compileSetter } from '../../../../core/utils/data';
import { wrapToArray } from '../../../core/utils/m_array';
export const getResourceIndex = config => config.fieldExpr ?? config.field ?? '';
export const getAppointmentResourceAccessor = config => {
  const indexExpr = getResourceIndex(config);
  const getter = compileGetter(indexExpr);
  const setter = compileSetter(indexExpr);
  return {
    idsGetter: item => wrapToArray(getter(item) ?? []),
    idsSetter: (item, ids) => setter(item, ids)
  };
};