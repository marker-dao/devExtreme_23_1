/**
* DevExtreme (cjs/__internal/ui/map/provider.dynamic.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _class = _interopRequireDefault(require("../../../core/class"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _provider = _interopRequireDefault(require("./provider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MAP_MARKER_CLASS = 'dx-map-marker';
class DynamicProvider extends _provider.default {
  constructor(map, $container) {
    super(map, $container);
    this._geocodedLocations = {};
  }
  _geocodeLocation(location) {
    return new Promise(resolve => {
      const cache = this._geocodedLocations;
      const cachedLocation = cache[location];
      if (cachedLocation) {
        resolve(cachedLocation);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._geocodeLocationImpl(location).then(geocodedLocation => {
          cache[location] = geocodedLocation;
          resolve(geocodedLocation);
        });
      }
    });
  }
  _renderImpl() {
    return this._load().then(() => this._init()).then(() => Promise.all([this.updateMapType(), this._areBoundsSet() ? this.updateBounds() : this.updateCenter()])).then(() => {
      this._attachHandlers();
      // NOTE: setTimeout is needed by providers to correctly initialize bounds
      return new Promise(resolve => {
        // eslint-disable-next-line no-restricted-globals
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    });
  }
  _load() {
    if (!this._mapsLoader) {
      this._mapsLoader = this._loadImpl();
    }
    this._markers = [];
    this._routes = [];
    return this._mapsLoader;
  }
  _loadImpl() {
    return Promise.resolve();
  }
  _init() {
    return Promise.resolve();
  }
  _attachHandlers() {
    _class.default.abstract();
  }
  addMarkers(markers) {
    return Promise.all(markers.map(options => this._addMarker(options))).then(markerObjects => {
      this._fitBounds();
      return [false, markerObjects.map(markerObject => markerObject.marker)];
    });
  }
  _addMarker(options) {
    return this._renderMarker(options).then(markerObject => {
      this._markers.push((0, _extend.extend)({
        options
      }, markerObject));
      this._fireMarkerAddedAction({
        options,
        originalMarker: markerObject.marker
      });
      return markerObject;
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _renderMarker(options) {
    return Promise.resolve({
      marker: {},
      location: {
        lat: 0,
        lng: 0
      }
    });
  }
  _createIconTemplate(iconSrc) {
    const $img = (0, _renderer.default)('<img>');
    $img.attr('src', iconSrc);
    $img.attr('alt', 'Marker icon');
    $img.addClass(MAP_MARKER_CLASS);
    return $img.get(0);
  }
  removeMarkers(markersOptionsToRemove) {
    markersOptionsToRemove.forEach(markerOptionToRemove => {
      this._removeMarker(markerOptionToRemove);
    });
    return Promise.resolve();
  }
  _removeMarker(markersOptionToRemove) {
    this._markers.forEach((markerObject, markerIndex) => {
      if (markerObject.options !== markersOptionToRemove) {
        return true;
      }
      this._destroyMarker(markerObject);
      this._markers.splice(markerIndex, 1);
      this._fireMarkerRemovedAction({
        options: markerObject.options
      });
      return false;
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _destroyMarker(marker) {
    _class.default.abstract();
  }
  _clearMarkers() {
    while (this._markers.length > 0) {
      this._removeMarker(this._markers[0].options);
    }
  }
  addRoutes(routes) {
    return Promise.all(routes.map(options => this._addRoute(options))).then(routeObjects => {
      this._fitBounds();
      return [false, routeObjects.map(routeObject => routeObject.instance)];
    });
  }
  _addRoute(options) {
    return this._renderRoute(options).then(routeObject => {
      this._routes.push((0, _extend.extend)({
        options
      }, routeObject));
      this._fireRouteAddedAction({
        options,
        originalRoute: routeObject.instance
      });
      return routeObject;
    });
  }
  _renderRoute(options) {
    return Promise.resolve({
      options,
      instance: {},
      northEast: [0, 0],
      southWest: [0, 0]
    });
  }
  removeRoutes() {
    let routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    routes.forEach(routeObject => {
      this._removeRoute(routeObject);
    });
    return Promise.resolve();
  }
  _removeRoute(options) {
    const routes = this._routes;
    routes.forEach((routeObject, routeIndex) => {
      if (routeObject.options !== options) {
        return true;
      }
      this._destroyRoute(routeObject);
      this._routes.splice(routeIndex, 1);
      this._fireRouteRemovedAction({
        options
      });
      return false;
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _destroyRoute(routeObject) {
    _class.default.abstract();
  }
  _geocodeLocationImpl(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  location) {
    return Promise.resolve([0, 0]);
  }
  _clearRoutes() {
    while (this._routes.length > 0) {
      this._removeRoute(this._routes[0].options);
    }
  }
  adjustViewport() {
    return this._fitBounds();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isEventsCanceled(e) {
    return true;
  }
  _fitBounds() {
    _class.default.abstract();
  }
  _updateBounds() {
    this._clearBounds();
    if (!this._option('autoAdjust')) {
      return;
    }
    this._markers.forEach(markerObject => {
      this._extendBounds(markerObject.location);
    });
    this._routes.forEach(routeObject => {
      if (routeObject.northEast) {
        this._extendBounds(routeObject.northEast);
      }
      if (routeObject.southWest) {
        this._extendBounds(routeObject.southWest);
      }
    });
  }
  _clearBounds() {
    this._bounds = null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _extendBounds(location) {
    _class.default.abstract();
  }
}
var _default = exports.default = DynamicProvider;
