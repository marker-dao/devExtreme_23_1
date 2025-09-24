import { getResourceIndex } from '../data_accessor/appointment_resource_data_accessor';
import { ResourceLoader } from '../loader/resource_loader';
import { getAppointmentColor } from './appointment_color_utils';
import { getAppointmentGroupValues, getAppointmentResources } from './appointment_groups_utils';
import { groupResources } from './group_utils';
export class ResourceManager {
  constructor(config) {
    this.resources = [];
    this.resourceById = {};
    this.groups = [];
    this.groupsLeafs = [];
    this.groupsTree = [];
    config === null || config === void 0 || config.filter(getResourceIndex).forEach(item => {
      const loader = new ResourceLoader(item);
      this.resourceById[loader.resourceIndex] = loader;
      this.resources.push(loader);
    });
  }
  async load(groupsToLoad) {
    let forceReload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    await Promise.all(groupsToLoad.map(group => {
      var _this$resourceById$gr;
      return (_this$resourceById$gr = this.resourceById[group]) === null || _this$resourceById$gr === void 0 ? void 0 : _this$resourceById$gr.load(forceReload);
    }));
  }
  async loadGroupResources() {
    let groups = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let forceReload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    await this.load(groups, forceReload);
    const {
      groupTree,
      groupLeafs
    } = groupResources(this.resourceById, groups);
    this.groups = groups;
    this.groupsLeafs = groupLeafs;
    this.groupsTree = groupTree;
  }
  groupCount() {
    return this.groupsLeafs.length;
  }
  groupResources() {
    return this.groups.map(group => this.resourceById[group]).filter(Boolean);
  }
  async loadAppointmentsResources(items) {
    let forceReload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const groupsToLoad = Object.keys(this.resourceById).filter(resourceIndex => !this.resourceById[resourceIndex].isLoaded() && items.some(item => this.resourceById[resourceIndex].idsGetter(item).length > 0));
    await this.load(groupsToLoad, forceReload);
  }
  async getAppointmentColor(appointmentConfig) {
    return getAppointmentColor(this.resources, this.groupsLeafs, this.groups, appointmentConfig);
  }
  async getAppointmentResourcesValues(appointment) {
    const appointmentGroups = getAppointmentGroupValues(appointment, this.resources);
    const groups = Object.keys(appointmentGroups);
    await this.load(groups);
    return getAppointmentResources(appointmentGroups, this.resourceById);
  }
  dispose() {
    Object.values(this.resourceById).forEach(item => item.dispose());
  }
}