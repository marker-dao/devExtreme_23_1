import { getAppointmentResourceAccessor, getResourceIndex } from '../data_accessor/appointment_resource_data_accessor';
import { ResourceDataAccessor } from '../data_accessor/resource_data_accessor';
import { Loader } from './loader';
export class ResourceLoader extends Loader {
  constructor(config) {
    super(config, {
      pageSize: 0
    });
    const accessor = getAppointmentResourceAccessor(config);
    this.idsGetter = accessor.idsGetter;
    this.idsSetter = accessor.idsSetter;
    this.dataAccessor = new ResourceDataAccessor(config);
    this.allowMultiple = Boolean(config.allowMultiple);
    this.useColorAsDefault = Boolean(config.useColorAsDefault);
    this.resourceIndex = String(getResourceIndex(config));
    this.resourceName = config.label;
    this.onInit();
  }
  onLoadTransform(items) {
    return items.map(item => ({
      id: this.dataAccessor.get('id', item),
      text: this.dataAccessor.get('text', item),
      color: this.dataAccessor.get('color', item)
    }));
  }
  applyChanges(items) {
    super.applyChanges(items);
  }
  onLoadError() {}
  onChange() {}
}