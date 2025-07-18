import _extends from "@babel/runtime/helpers/esm/extends";
import DataSource from '../../../../data/data_source';
import { normalizeDataSourceOptions } from '../../../data/data_source/m_utils';
export const normalizeDataSource = function (dataSourceOptions) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!dataSourceOptions) {
    return undefined;
  }
  if (dataSourceOptions instanceof DataSource) {
    return dataSourceOptions;
  }
  const result = _extends({}, normalizeDataSourceOptions(dataSourceOptions, {}), options);
  return new DataSource(result);
};
export const loadResource = async function (dataSource) {
  let forceReload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!dataSource) {
    return [];
  }
  if (forceReload) {
    return new Promise((resolve, reject) => {
      dataSource.reload().then(resolve, reject);
    });
  }
  if (dataSource.isLoaded()) {
    return dataSource.items();
  }
  return new Promise((resolve, reject) => {
    dataSource.load().then(resolve, reject);
  });
};