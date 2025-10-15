/**
* DevExtreme (esm/__internal/ui/map/provider.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { addNamespace } from '../../../common/core/events/utils/index';
import Class from '../../../core/class';
import { isNumeric, isPlainObject } from '../../../core/utils/type';
import { isDefined } from '../../core/utils/m_type';
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
    Class.abstract();
  }
  updateMapType() {
    Class.abstract();
  }
  updateDisabled() {
    Class.abstract();
  }
  updateBounds() {
    Class.abstract();
  }
  updateCenter() {
    Class.abstract();
  }
  updateZoom() {
    Class.abstract();
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
    Class.abstract();
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
    Class.abstract();
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
    if (isPlainObject(key)) {
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
    } else if (isPlainObject(location) && isNumeric(location.lat) && isNumeric(location.lng)) {
      return location;
    }
    return null;
  }
  _areBoundsSet() {
    const bounds = this._option('bounds');
    return isDefined(bounds === null || bounds === void 0 ? void 0 : bounds.northEast) && isDefined(bounds === null || bounds === void 0 ? void 0 : bounds.southWest);
  }
  _addEventNamespace(name) {
    // @ts-expect-error ts-error
    return addNamespace(name, this._mapWidget.NAME);
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
export default Provider;
