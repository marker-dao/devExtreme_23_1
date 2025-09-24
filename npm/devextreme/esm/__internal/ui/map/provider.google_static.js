/**
* DevExtreme (esm/__internal/ui/map/provider.google_static.js)
* Version: 25.2.0
* Build date: Wed Sep 24 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/no-misused-promises */
import Color from '../../../color';
import { name as clickEventName } from '../../../common/core/events/click';
import eventsEngine from '../../../common/core/events/core/events_engine';
import { getHeight, getWidth } from '../../../core/utils/size';
import Provider from './provider';
let GOOGLE_STATIC_URL = 'https://maps.google.com/maps/api/staticmap?';
class GoogleStaticProvider extends Provider {
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
    eventsEngine.off(this._$container, this._addEventNamespace(clickEventName));
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
    const requestOptions = ['sensor=false', `size=${Math.round(getWidth($container))}x${Math.round(getHeight($container))}`, `maptype=${this._option('type')}`, `center=${this._locationToString(this._option('center'))}`, `zoom=${this._option('zoom')}`, this._markersSubstring()];
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
      const color = new Color(route.color ?? this._defaultRouteColor()).toHex().replace('#', '0x');
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
    const eventName = this._addEventNamespace(clickEventName);
    eventsEngine.off(this._$container, eventName);
    eventsEngine.on(this._$container, eventName, e => {
      this._fireClickAction({
        event: e
      });
    });
  }
}
export default GoogleStaticProvider;
