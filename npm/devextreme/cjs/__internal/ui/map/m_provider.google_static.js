/**
* DevExtreme (cjs/__internal/ui/map/m_provider.google_static.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _color = _interopRequireDefault(require("../../../color"));
var _click = require("../../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _iterator = require("../../../core/utils/iterator");
var _size = require("../../../core/utils/size");
var _m_provider = _interopRequireDefault(require("./m_provider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-misused-promises */

let GOOGLE_STATIC_URL = 'https://maps.google.com/maps/api/staticmap?';
class GoogleStaticProvider extends _m_provider.default {
  _locationToString(location) {
    const latLng = this._getLatLng(location);
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
  addMarkers(options) {
    const that = this;
    return this._updateMap().then(result => {
      (0, _iterator.each)(options, (_, options) => {
        that._fireMarkerAddedAction({
          options
        });
      });
      return result;
    });
  }
  removeMarkers(options) {
    const that = this;
    return this._updateMap().then(result => {
      (0, _iterator.each)(options, (_, options) => {
        that._fireMarkerRemovedAction({
          options
        });
      });
      return result;
    });
  }
  adjustViewport() {
    return Promise.resolve();
  }
  addRoutes(options) {
    const that = this;
    return this._updateMap().then(result => {
      (0, _iterator.each)(options, (_, options) => {
        that._fireRouteAddedAction({
          options
        });
      });
      return result;
    });
  }
  removeRoutes(options) {
    const that = this;
    return this._updateMap().then(result => {
      (0, _iterator.each)(options, (_, options) => {
        that._fireRouteRemovedAction({
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
    requestOptions.push.apply(requestOptions, this._routeSubstrings());
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
    const that = this;
    const markers = [];
    const markerIcon = this._option('markerIconSrc');
    if (markerIcon) {
      // @ts-expect-error
      markers.push(`icon:${markerIcon}`);
    }
    (0, _iterator.each)(this._option('markers'), (_, marker) => {
      // @ts-expect-error
      markers.push(that._locationToString(marker.location));
    });
    return `markers=${markers.join('|')}`;
  }
  _routeSubstrings() {
    const that = this;
    const routes = [];
    (0, _iterator.each)(this._option('routes'), (_, route) => {
      const color = new _color.default(route.color || that._defaultRouteColor()).toHex().replace('#', '0x');
      const opacity = Math.round((route.opacity || that._defaultRouteOpacity()) * 255).toString(16);
      const width = route.weight || that._defaultRouteWeight();
      const locations = [];
      (0, _iterator.each)(route.locations, (_, routePoint) => {
        // @ts-expect-error
        locations.push(that._locationToString(routePoint));
      });
      // @ts-expect-error
      routes.push(`path=color:${color}${opacity}|weight:${width}|${locations.join('|')}`);
    });
    return routes;
  }
  _attachClickEvent() {
    const that = this;
    const eventName = this._addEventNamespace(_click.name);
    _events_engine.default.off(this._$container, eventName);
    _events_engine.default.on(this._$container, eventName, e => {
      that._fireClickAction({
        event: e
      });
    });
  }
}
var _default = exports.default = GoogleStaticProvider;
