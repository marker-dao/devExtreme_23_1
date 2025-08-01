/**
* DevExtreme (esm/__internal/scheduler/utils/data_accessor/appointment_resource_data_accessor.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
