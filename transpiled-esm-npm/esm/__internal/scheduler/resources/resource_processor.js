import { wrapToArray } from '../../../core/utils/array';
import { getFieldExpr, getIdExpr, getTextExpr, getWrappedDataSource } from './m_utils';
// TODO(6): merge it with main resource loading to load resource only once
const loadResource = dataSourceConfig => {
  if (!dataSourceConfig) {
    return Promise.resolve([]);
  }
  const dataSource = getWrappedDataSource(dataSourceConfig);
  if (dataSource.isLoaded()) {
    return Promise.resolve(dataSource.items());
  }
  return new Promise((resolve, reject) => {
    dataSource.load().done(list => resolve(list)).fail(() => reject());
  });
};
const getAppointmentResources = (resourceMap, rawAppointment) => Object.entries(resourceMap).reduce((result, _ref) => {
  let [fieldName, data] = _ref;
  const item = {
    label: data.label,
    values: []
  };
  if (fieldName in rawAppointment) {
    wrapToArray(rawAppointment[fieldName]).forEach(value => {
      item.values.push(data.texts.get(value) ?? '');
    });
  }
  if (item.values.length) {
    result.push(item);
  }
  return result;
}, []);
export class ResourceProcessor {
  constructor() {
    let resourceConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let resourceMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.resourceConfig = resourceConfig;
    this.resourceMap = resourceMap;
  }
  async getAppointmentResourcesValues(rawAppointment) {
    if (this.resourceConfig.length === 0) {
      return Promise.resolve([]);
    }
    return this.loadDataSource().then(resourceMap => getAppointmentResources(resourceMap, rawAppointment));
  }
  loadDataSource() {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }
    this.loadingPromise = Promise.all(this.resourceConfig.map(resource => loadResource(resource.dataSource).then(items => this.onResourceLoaded(resource, items)))).then(() => this.resourceMap);
    return this.loadingPromise;
  }
  onResourceLoaded(resource, items) {
    const idExpr = getIdExpr(resource);
    const textExpr = getTextExpr(resource);
    this.resourceMap[getFieldExpr(resource)] = {
      label: resource.label,
      texts: items.reduce((result, item) => {
        result.set(item[idExpr], item[textExpr] ?? '');
        return result;
      }, new Map())
    };
  }
}