/**
* DevExtreme (cjs/__internal/ui/map/provider.js)
* Version: 25.2.0
* Build date: Mon Oct 27 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("../../../common/core/events/utils/index");
var _class = _interopRequireDefault(require("../../../core/class"));
var _type = require("../../../core/utils/type");
var _m_type = require("../../core/utils/m_type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Provider {
  constructor(map, $container) {
    this._mapWidget = map;
    this._$container = $container;
  }
  _defaultRouteWeight() {
    return 5;
  }
  _defaultRouteOpacity() {
    return 0.5;
  }
  _defaultRouteColor() {
    return '#0000FF';
  }
  render(markerOptions, routeOptions) {
    return this._renderImpl().then(() => Promise.all([this._applyFunctionIfNeeded('addMarkers', markerOptions), this._applyFunctionIfNeeded('addRoutes', routeOptions)]).then(() => true));
  }
  _renderImpl() {
    return Promise.resolve();
  }
  updateDimensions() {
    _class.default.abstract();
  }
  updateMapType() {
    _class.default.abstract();
  }
  updateDisabled() {
    _class.default.abstract();
  }
  updateBounds() {
    _class.default.abstract();
  }
  updateCenter() {
    _class.default.abstract();
  }
  updateZoom() {
    _class.default.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateControls(markers, routes) {
    return Promise.resolve();
  }
  updateMarkers(markerOptionsToRemove, markerOptionsToAdd) {
    return new Promise(resolve => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._applyFunctionIfNeeded('removeMarkers', markerOptionsToRemove).then(removeValue => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._applyFunctionIfNeeded('addMarkers', markerOptionsToAdd).then(addValue => {
          resolve(addValue || removeValue);
        });
      });
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addMarkers(options) {
    return Promise.resolve();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeMarkers(options) {
    return Promise.resolve();
  }
  adjustViewport() {
    _class.default.abstract();
  }
  updateRoutes(routeOptionsToRemove, routeOptionsToAdd) {
    return new Promise(resolve => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this._applyFunctionIfNeeded('removeRoutes', routeOptionsToRemove).then(removeValue => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._applyFunctionIfNeeded('addRoutes', routeOptionsToAdd).then(addValue => {
          resolve(addValue || removeValue);
        });
      });
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addRoutes(options) {
    return Promise.resolve();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeRoutes(options) {
    return Promise.resolve();
  }
  clean() {
    _class.default.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map() {
    return this._map;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isEventsCanceled(e) {
    return false;
  }
  _option(name, value) {
    if (value === undefined) {
      const mapOptions = this._mapWidget.option();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return mapOptions[name];
    }
    this._mapWidget.setOptionSilent(name, value);
    return undefined;
  }
  _keyOption(providerName) {
    const key = this._option('apiKey') ?? '';
    if (typeof key === 'string') {
      return key;
    }
    if ((0, _type.isPlainObject)(key)) {
      return key[providerName] ?? '';
    }
    return '';
  }
  _parseTooltipOptions(option) {
    const isStringOption = typeof option === 'string';
    return {
      text: isStringOption ? option : option.text ?? '',
      visible: isStringOption ? false : option.isShown ?? false
    };
  }
  _getLatLng(location) {
    if (typeof location === 'string') {
      const coords = location.split(',').map(item => item.trim());
      const numericRegex = /^[-+]?[0-9]*\.?[0-9]*$/;
      if (coords.length === 2 && numericRegex.exec(coords[0]) && numericRegex.exec(coords[1])) {
        return {
          lat: parseFloat(coords[0]),
          lng: parseFloat(coords[1])
        };
      }
    } else if (Array.isArray(location) && location.length === 2) {
      return {
        lat: location[0],
        lng: location[1]
      };
    } else if ((0, _type.isPlainObject)(location) && (0, _type.isNumeric)(location.lat) && (0, _type.isNumeric)(location.lng)) {
      return location;
    }
    return null;
  }
  _areBoundsSet() {
    const bounds = this._option('bounds');
    return (0, _m_type.isDefined)(bounds === null || bounds === void 0 ? void 0 : bounds.northEast) && (0, _m_type.isDefined)(bounds === null || bounds === void 0 ? void 0 : bounds.southWest);
  }
  _addEventNamespace(name) {
    // @ts-expect-error ts-error
    return (0, _index.addNamespace)(name, this._mapWidget.NAME);
  }
  _applyFunctionIfNeeded(fnName, array) {
    if (!array.length) {
      return Promise.resolve();
    }
    const isMarkersUpdate = fnName === 'addMarkers' || fnName === 'removeMarkers';
    if (isMarkersUpdate) {
      return this[fnName](array);
    }
    return this[fnName](array);
  }
  _fireClickAction(actionArguments) {
    this._mapWidget._createActionByOption('onClick')(actionArguments);
  }
  _fireMarkerAddedAction(actionArguments) {
    this._mapWidget._createActionByOption('onMarkerAdded')(actionArguments);
  }
  _fireMarkerRemovedAction(actionArguments) {
    this._mapWidget._createActionByOption('onMarkerRemoved')(actionArguments);
  }
  _fireRouteAddedAction(actionArguments) {
    this._mapWidget._createActionByOption('onRouteAdded')(actionArguments);
  }
  _fireRouteRemovedAction(actionArguments) {
    this._mapWidget._createActionByOption('onRouteRemoved')(actionArguments);
  }
}
var _default = exports.default = Provider;
