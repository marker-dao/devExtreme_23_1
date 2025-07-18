"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceManager = void 0;
var _appointment_resource_data_accessor = require("../data_accessor/appointment_resource_data_accessor");
var _resource_loader = require("../loader/resource_loader");
var _appointment_color_utils = require("./appointment_color_utils");
var _appointment_groups_utils = require("./appointment_groups_utils");
var _group_utils = require("./group_utils");
class ResourceManager {
  constructor(config) {
    this.resources = [];
    this.resourceById = {};
    this.groups = [];
    this.groupsLeafs = [];
    this.groupsTree = [];
    config === null || config === void 0 || config.filter(_appointment_resource_data_accessor.getResourceIndex).forEach(item => {
      const loader = new _resource_loader.ResourceLoader(item);
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
    } = (0, _group_utils.groupResources)(this.resourceById, groups);
    this.groups = groups;
    this.groupsLeafs = groupLeafs;
    this.groupsTree = groupTree;
    // TODO(9): Get rid of it as soon as you can. Fallback, this class has all necessary
    return this.groupResources();
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
    return (0, _appointment_color_utils.getAppointmentColor)(this.resources, this.groupsLeafs, this.groups, appointmentConfig);
  }
  async getAppointmentResourcesValues(appointment) {
    const appointmentGroups = (0, _appointment_groups_utils.getAppointmentGroupValues)(appointment, this.resources);
    const groups = Object.keys(appointmentGroups);
    await this.load(groups);
    return (0, _appointment_groups_utils.getAppointmentResources)(appointmentGroups, this.resourceById);
  }
  dispose() {
    Object.values(this.resourceById).forEach(item => item.dispose());
  }
}
exports.ResourceManager = ResourceManager;