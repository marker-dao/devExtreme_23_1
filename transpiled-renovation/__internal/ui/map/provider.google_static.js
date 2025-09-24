"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _color = _interopRequireDefault(require("../../../color"));
var _click = require("../../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _size = require("../../../core/utils/size");
var _provider = _interopRequireDefault(require("./provider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-misused-promises */

let GOOGLE_STATIC_URL = 'https://maps.google.com/maps/api/staticmap?';
class GoogleStaticProvider extends _provider.default {
  _locationToString(location) {
    const latLng = this._getLatLng(location);
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    return latLng ? `${latLng.lat},${latLng.lng}` : location.toString().replace(/ /g, '+');
  }
  _renderImpl() {
    return this._updateMap();
  }
  updateDimensions() {
    return this._updateMap();
  }
  updateMapType() {
    return this._updateMap();
  }
  updateBounds() {
    return Promise.resolve();
  }
  updateCenter() {
    return this._updateMap();
  }
  updateZoom() {
    return this._updateMap();
  }
  updateControls() {
    return Promise.resolve();
  }
  addMarkers() {
    let markers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return this._updateMap().then(result => {
      markers.forEach(options => {
        this._fireMarkerAddedAction({
          options
        });
      });
      return result;
    });
  }
  removeMarkers() {
    let markers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return this._updateMap().then(result => {
      markers.forEach(options => {
        this._fireMarkerRemovedAction({
          options
        });
      });
      return result;
    });
  }
  adjustViewport() {
    return Promise.resolve();
  }
  addRoutes() {
    let routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return this._updateMap().then(result => {
      routes.forEach(options => {
        this._fireRouteAddedAction({
          options
        });
      });
      return result;
    });
  }
  removeRoutes() {
    let routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return this._updateMap().then(result => {
      routes.forEach(options => {
        this._fireRouteRemovedAction({
          options
        });
      });
      return result;
    });
  }
  clean() {
    this._$container.css('backgroundImage', 'none');
    _events_engine.default.off(this._$container, this._addEventNamespace(_click.name));
    return Promise.resolve();
  }
  mapRendered() {
    return true;
  }
  _updateMap() {
    const key = this._keyOption('googleStatic');
    const providerConfig = this._option('providerConfig');
    const mapId = providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.mapId;
    const $container = this._$container;
    const requestOptions = ['sensor=false', `size=${Math.round((0, _size.getWidth)($container))}x${Math.round((0, _size.getHeight)($container))}`, `maptype=${this._option('type')}`, `center=${this._locationToString(this._option('center'))}`, `zoom=${this._option('zoom')}`, this._markersSubstring()];
    requestOptions.push(...this._routeSubstrings());
    if (key) {
      requestOptions.push(`key=${key}`);
    }
    if (mapId) {
      requestOptions.push(`map_id=${mapId}`);
    }
    const request = GOOGLE_STATIC_URL + requestOptions.join('&');
    this._$container.css('background', `url("${request}") no-repeat 0 0`);
    this._attachClickEvent();
    return Promise.resolve(true);
  }
  _markersSubstring() {
    const markers = [];
    const markerIcon = this._option('markerIconSrc');
    const markersOption = this._option('markers') ?? [];
    if (markerIcon) {
      markers.push(`icon:${markerIcon}`);
    }
    markersOption.forEach(marker => {
      markers.push(this._locationToString(marker.location));
    });
    return `markers=${markers.join('|')}`;
  }
  _routeSubstrings() {
    const routes = [];
    const routesOptions = this._option('routes') ?? [];
    routesOptions.forEach(route => {
      const color = new _color.default(route.color ?? this._defaultRouteColor()).toHex().replace('#', '0x');
      const opacity = Math.round((route.opacity ?? this._defaultRouteOpacity()) * 255).toString(16);
      const width = route.weight ?? this._defaultRouteWeight();
      const locations = [];
      const routeLocations = route.locations ?? [];
      routeLocations.forEach(routePoint => {
        locations.push(this._locationToString(routePoint));
      });
      routes.push(`path=color:${color}${opacity}|weight:${width}|${locations.join('|')}`);
    });
    return routes;
  }
  _attachClickEvent() {
    const eventName = this._addEventNamespace(_click.name);
    _events_engine.default.off(this._$container, eventName);
    _events_engine.default.on(this._$container, eventName, e => {
      this._fireClickAction({
        event: e
      });
    });
  }
}
/// #DEBUG
// @ts-expect-error ts-error
GoogleStaticProvider.remapConstant = newValue => {
  GOOGLE_STATIC_URL = newValue;
};
/// #ENDDEBUG
var _default = exports.default = GoogleStaticProvider;