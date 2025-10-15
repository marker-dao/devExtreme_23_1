/**
* DevExtreme (cjs/__internal/ui/map/provider.dynamic.google.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
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
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _ajax = _interopRequireDefault(require("../../../core/utils/ajax"));
var _common = require("../../../core/utils/common");
var _extend = require("../../../core/utils/extend");
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _provider = _interopRequireDefault(require("./provider.dynamic"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-misused-promises */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global google */

const window = (0, _window.getWindow)();
const GOOGLE_MAP_READY = '_googleScriptReady';
let GOOGLE_URL = `https://maps.googleapis.com/maps/api/js?callback=${GOOGLE_MAP_READY}&libraries=marker&loading=async`;
const INFO_WINDOW_CLASS = 'gm-style-iw';
// eslint-disable-next-line @typescript-eslint/init-declarations
let CustomMarker;
const initCustomMarkerClass = function initCustomMarkerClass() {
  CustomMarker = function CreateCustomMarker(options) {
    this._position = options.position;
    this._offset = options.offset;
    this._$overlayContainer = (0, _renderer.default)('<div>').css({
      position: 'absolute',
      display: 'none',
      cursor: 'pointer'
    }).append(options.html);
    this.setMap(options.map);
  };
  CustomMarker.prototype = new google.maps.OverlayView();
  CustomMarker.prototype.onAdd = function onAdd() {
    const $pane = (0, _renderer.default)(this.getPanes().overlayMouseTarget);
    $pane.append(this._$overlayContainer);
    this._clickListener = google.maps.event.addDomListener(this._$overlayContainer.get(0), 'click', e => {
      google.maps.event.trigger(this, 'click');
      e.preventDefault();
    });
    this.draw();
  };
  CustomMarker.prototype.onRemove = function onRemove() {
    google.maps.event.removeListener(this._clickListener);
    this._$overlayContainer.remove();
  };
  CustomMarker.prototype.draw = function draw() {
    const position = this.getProjection().fromLatLngToDivPixel(this._position);
    this._$overlayContainer.css({
      left: position.x + this._offset.left,
      top: position.y + this._offset.top,
      display: 'block'
    });
  };
};
// @ts-expect-error ts-error
const googleMapsLoaded = () => {
  var _window$google;
  return Boolean((_window$google = window.google) === null || _window$google === void 0 ? void 0 : _window$google.maps);
};
// eslint-disable-next-line @typescript-eslint/init-declarations
let googleMapsLoader;
class GoogleProvider extends _provider.default {
  _mapType(type) {
    const mapTypes = {
      hybrid: google.maps.MapTypeId.HYBRID,
      roadmap: google.maps.MapTypeId.ROADMAP,
      satellite: google.maps.MapTypeId.SATELLITE
    };
    if (!type) {
      return mapTypes.hybrid;
    }
    return mapTypes[type] ?? mapTypes.hybrid;
  }
  _movementMode() {
    let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    const movementTypes = {
      driving: google.maps.TravelMode.DRIVING,
      walking: google.maps.TravelMode.WALKING
    };
    if (!type) {
      return movementTypes.driving;
    }
    return movementTypes[type] ?? type;
  }
  _resolveLocation(location) {
    return new Promise(resolve => {
      const latLng = this._getLatLng(location);
      if (latLng) {
        resolve(new google.maps.LatLng(latLng.lat, latLng.lng));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this._geocodeLocation(location).then(geocodedLocation => {
          resolve(geocodedLocation);
        });
      }
    });
  }
  _geocodeLocationImpl(location) {
    return new Promise(resolve => {
      if (!(0, _type.isDefined)(location)) {
        resolve(new google.maps.LatLng(0, 0));
        return;
      }
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        address: location
      }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          resolve(results[0].geometry.location);
        } else {
          _ui.default.log('W1006', status);
          resolve(new google.maps.LatLng(0, 0));
        }
      });
    });
  }
  _normalizeLocation(location) {
    return {
      lat: location.lat(),
      lng: location.lng()
    };
  }
  _normalizeLocationRect(locationRect) {
    return {
      northEast: this._normalizeLocation(locationRect.getNorthEast()),
      southWest: this._normalizeLocation(locationRect.getSouthWest())
    };
  }
  _loadImpl() {
    return new Promise(resolve => {
      if (googleMapsLoaded()) {
        resolve();
      } else {
        if (!googleMapsLoader) {
          googleMapsLoader = this._loadMapScript();
        }
        googleMapsLoader.then(() => {
          if (googleMapsLoaded()) {
            resolve();
            return;
          }
          this._loadMapScript().then(resolve).catch(() => {});
        });
      }
    }).then(() => {
      initCustomMarkerClass();
    });
  }
  _loadMapScript() {
    return new Promise(resolve => {
      const key = this._keyOption('google');
      window[GOOGLE_MAP_READY] = resolve;
      _ajax.default.sendRequest({
        url: GOOGLE_URL + (key ? `&key=${key}` : ''),
        dataType: 'script'
      });
    }).then(() => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete window[GOOGLE_MAP_READY];
      } catch (e) {
        window[GOOGLE_MAP_READY] = undefined;
      }
    });
  }
  _init() {
    return new Promise(resolve => {
      this._resolveLocation(this._option('center')).then(center => {
        const disableDefaultUI = !this._option('controls');
        const providerConfig = this._option('providerConfig');
        const mapId = (providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.mapId) ?? '';
        this._map = new google.maps.Map(this._$container[0], {
          center,
          disableDefaultUI,
          mapId,
          zoom: this._option('zoom')
        });
        const listener = google.maps.event.addListener(this._map, 'idle', () => {
          resolve(listener);
        });
      }).catch(() => {});
    }).then(listener => {
      google.maps.event.removeListener(listener);
    });
  }
  _attachHandlers() {
    this._boundsChangeListener = google.maps.event.addListener(this._map, 'bounds_changed', this._boundsChangeHandler.bind(this));
    this._clickListener = google.maps.event.addListener(this._map, 'click', this._clickActionHandler.bind(this));
  }
  _boundsChangeHandler() {
    const bounds = this._map.getBounds();
    this._option('bounds', this._normalizeLocationRect(bounds));
    const center = this._map.getCenter();
    this._option('center', this._normalizeLocation(center));
    if (!this._preventZoomChangeEvent) {
      this._option('zoom', this._map.getZoom());
    }
  }
  _clickActionHandler(e) {
    this._fireClickAction({
      location: this._normalizeLocation(e.latLng),
      event: e.domEvent
    });
  }
  updateDimensions() {
    const center = this._option('center');
    google.maps.event.trigger(this._map, 'resize');
    this._option('center', center);
    return this.updateCenter();
  }
  updateMapType() {
    const type = this._option('type');
    this._map.setMapTypeId(this._mapType(type));
    return Promise.resolve();
  }
  updateBounds() {
    const bounds = this._option('bounds');
    return Promise.all([this._resolveLocation(bounds === null || bounds === void 0 ? void 0 : bounds.northEast), this._resolveLocation(bounds === null || bounds === void 0 ? void 0 : bounds.southWest)]).then(result => {
      const mapBounds = new google.maps.LatLngBounds();
      mapBounds.extend(result[0]);
      mapBounds.extend(result[1]);
      this._map.fitBounds(mapBounds);
    });
  }
  updateCenter() {
    return this._resolveLocation(this._option('center')).then(center => {
      this._map.setCenter(center);
      this._option('center', this._normalizeLocation(center));
    });
  }
  updateZoom() {
    this._map.setZoom(this._option('zoom'));
    return Promise.resolve();
  }
  updateControls() {
    const showDefaultUI = this._option('controls');
    this._map.setOptions({
      disableDefaultUI: !showDefaultUI
    });
    return Promise.resolve();
  }
  isEventsCanceled(e) {
    var _this$_map;
    const gestureHandling = (_this$_map = this._map) === null || _this$_map === void 0 ? void 0 : _this$_map.get('gestureHandling');
    const isInfoWindowContent = (0, _renderer.default)(e.target).closest(`.${INFO_WINDOW_CLASS}`).length > 0;
    if (isInfoWindowContent || _devices.default.real().deviceType !== 'desktop' && gestureHandling === 'cooperative') {
      return false;
    }
    return super.isEventsCanceled(e);
  }
  _renderMarker(options) {
    const {
      location: markerLocation
    } = options;
    return this._resolveLocation(markerLocation).then(location => {
      // eslint-disable-next-line @typescript-eslint/init-declarations
      let marker;
      if (options.html) {
        marker = new CustomMarker({
          map: this._map,
          position: location,
          html: options.html,
          offset: (0, _extend.extend)({
            top: 0,
            left: 0
          }, options.htmlOffset)
        });
      } else {
        const providerConfig = this._option('providerConfig');
        const useAdvancedMarkers = (providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.useAdvancedMarkers) ?? true;
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        const icon = options.iconSrc || this._option('markerIconSrc');
        if (useAdvancedMarkers) {
          const content = icon ? this._createIconTemplate(icon) : undefined;
          marker = new google.maps.marker.AdvancedMarkerElement({
            position: location,
            map: this._map,
            content
          });
        } else {
          marker = new google.maps.Marker({
            position: location,
            map: this._map,
            icon
          });
        }
      }
      const infoWindow = this._renderTooltip(marker, options.tooltip);
      // eslint-disable-next-line @typescript-eslint/init-declarations
      let listener;
      if (options.onClick || options.tooltip) {
        const markerClickAction = this._mapWidget._createAction(options.onClick ?? _common.noop);
        const markerNormalizedLocation = this._normalizeLocation(location);
        listener = google.maps.event.addListener(marker, 'click', () => {
          markerClickAction({
            location: markerNormalizedLocation
          });
          if (infoWindow) {
            infoWindow.open(this._map, marker);
          }
        });
      }
      return {
        location,
        marker,
        listener
      };
    });
  }
  _renderTooltip(marker, options) {
    if (!options) {
      return undefined;
    }
    const parsedOptions = this._parseTooltipOptions(options);
    const infoWindow = new google.maps.InfoWindow({
      content: parsedOptions.text
    });
    if (parsedOptions.visible) {
      infoWindow.open(this._map, marker);
    }
    return infoWindow;
  }
  _destroyMarker(marker) {
    marker.marker.setMap(null);
    if (marker.listener) {
      google.maps.event.removeListener(marker.listener);
    }
  }
  _renderRoute(options) {
    const locations = options.locations ?? [];
    return Promise.all(locations.map(point => this._resolveLocation(point))).then(resolvedLocations => new Promise(resolve => {
      const origin = resolvedLocations.shift();
      const destination = resolvedLocations.pop();
      const waypoints = resolvedLocations.map(location => ({
        location,
        stopover: true
      }));
      const request = {
        origin,
        destination,
        waypoints,
        optimizeWaypoints: true,
        travelMode: this._movementMode(options.mode ?? '')
      };
      new google.maps.DirectionsService().route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          const color = new _color.default(options.color || this._defaultRouteColor()).toHex();
          const directionOptions = {
            directions: response,
            map: this._map,
            suppressMarkers: true,
            preserveViewport: true,
            polylineOptions: {
              // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
              strokeWeight: options.weight || this._defaultRouteWeight(),
              // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
              strokeOpacity: options.opacity || this._defaultRouteOpacity(),
              strokeColor: color
            }
          };
          const route = new google.maps.DirectionsRenderer(directionOptions);
          const {
            bounds
          } = response.routes[0];
          resolve({
            instance: route,
            northEast: bounds.getNorthEast(),
            southWest: bounds.getSouthWest()
          });
        } else {
          _ui.default.log('W1006', status);
          resolve({
            instance: new google.maps.DirectionsRenderer({})
          });
        }
      });
    }));
  }
  _destroyRoute(routeObject) {
    routeObject.instance.setMap(null);
  }
  _fitBounds() {
    this._updateBounds();
    if (this._bounds && this._option('autoAdjust')) {
      const zoomBeforeFitting = this._map.getZoom();
      this._preventZoomChangeEvent = true;
      this._map.fitBounds(this._bounds);
      this._boundsChangeHandler();
      const zoomAfterFitting = this._map.getZoom();
      if (zoomBeforeFitting < zoomAfterFitting) {
        this._map.setZoom(zoomBeforeFitting);
      } else {
        this._option('zoom', zoomAfterFitting);
      }
      delete this._preventZoomChangeEvent;
    }
    return Promise.resolve();
  }
  _extendBounds(location) {
    if (this._bounds) {
      this._bounds.extend(location);
    } else {
      this._bounds = new google.maps.LatLngBounds();
      this._bounds.extend(location);
    }
  }
  clean() {
    if (this._map) {
      google.maps.event.removeListener(this._boundsChangeListener);
      google.maps.event.removeListener(this._clickListener);
      this._clearMarkers();
      this._clearRoutes();
      delete this._map;
      this._$container.empty();
    }
    return Promise.resolve();
  }
}
var _default = exports.default = GoogleProvider;
