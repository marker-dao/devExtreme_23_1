/**
* DevExtreme (cjs/__internal/ui/map/m_provider.dynamic.azure.js)
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
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _ajax = _interopRequireDefault(require("../../../core/utils/ajax"));
var _common = require("../../../core/utils/common");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _m_provider = _interopRequireDefault(require("./m_provider.dynamic"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-misused-promises */

const window = (0, _window.getWindow)();
const AZURE_BASE_LINK = 'https://atlas.microsoft.com/';
let AZURE_JS_URL = `${AZURE_BASE_LINK}sdk/javascript/mapcontrol/3/atlas.min.js`;
let AZURE_CSS_URL = `${AZURE_BASE_LINK}/sdk/javascript/mapcontrol/3/atlas.min.css`;
let CUSTOM_URL;
const MAP_MARKER_TOOLTIP_CLASS = 'dx-map-marker-tooltip';
const CAMERA_PADDING = 50;
const azureMapsLoaded = function () {
  var _window$atlas;
  // @ts-expect-error
  return (_window$atlas = window.atlas) === null || _window$atlas === void 0 ? void 0 : _window$atlas.Map;
};
let azureMapsLoader;
class AzureProvider extends _m_provider.default {
  _mapType(type) {
    const mapTypes = {
      roadmap: 'road',
      satellite: 'satellite',
      hybrid: 'satellite_road_labels'
    };
    return mapTypes[type] || mapTypes.roadmap;
  }
  _movementMode(type) {
    const movementTypes = {
      driving: 'car',
      walking: 'pedestrian'
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
        resolve(new atlas.data.Position(latLng.lng, latLng.lat));
      } else {
        this._geocodeLocation(location).then(geocodedLocation => {
          resolve(geocodedLocation);
        });
      }
    });
  }
  _geocodeLocationImpl(location) {
    return new Promise(resolve => {
      if (!(0, _type.isDefined)(location)) {
        resolve(new atlas.data.Position(0, 0));
        return;
      }
      const searchURL = `${AZURE_BASE_LINK}geocode?subscription-key=${this._keyOption('azure')}&api-version=2023-06-01&query=${location}&limit=1`;
      _ajax.default.sendRequest({
        url: CUSTOM_URL ?? searchURL,
        dataType: 'json'
      }).then(result => {
        var _result$features$;
        const coordinates = result === null || result === void 0 || (_result$features$ = result.features[0]) === null || _result$features$ === void 0 || (_result$features$ = _result$features$.geometry) === null || _result$features$ === void 0 ? void 0 : _result$features$.coordinates;
        if (coordinates) {
          resolve(new atlas.data.Position(coordinates[0], coordinates[1]));
        } else {
          resolve(new atlas.data.Position(0, 0));
        }
      });
    });
  }
  _normalizeLocation(location) {
    return {
      lat: location[1],
      lng: location[0]
    };
  }
  _normalizeLocationRect(locationRect) {
    return {
      northEast: {
        lat: locationRect[1],
        lng: locationRect[2]
      },
      southWest: {
        lat: locationRect[3],
        lng: locationRect[0]
      }
    };
  }
  _loadImpl() {
    return new Promise(resolve => {
      if (azureMapsLoaded()) {
        resolve();
        return;
      }
      if (!azureMapsLoader) {
        azureMapsLoader = this._loadMapResources();
      }
      azureMapsLoader.then(() => {
        if (azureMapsLoaded()) {
          resolve();
          return;
        }
        // @ts-expect-error ts-error
        this._loadMapResources().then(resolve);
      });
    });
  }
  _loadMapResources() {
    return Promise.all([this._loadMapScript(), this._loadMapStyles()]);
  }
  _loadMapScript() {
    return new Promise(resolve => {
      _ajax.default.sendRequest({
        url: AZURE_JS_URL,
        dataType: 'script'
      }).then(() => {
        resolve();
      });
    });
  }
  _loadMapStyles() {
    return new Promise(resolve => {
      _ajax.default.sendRequest({
        url: AZURE_CSS_URL,
        dataType: 'text'
      }).then(css => {
        (0, _renderer.default)('<style>').html(css).appendTo((0, _renderer.default)('head'));
        resolve();
      });
    });
  }
  _init() {
    this._createMap();
    return this._mapReadyPromise;
  }
  _createMap() {
    this._map = new atlas.Map(this._$container[0], {
      authOptions: {
        authType: 'subscriptionKey',
        subscriptionKey: this._keyOption('azure')
      },
      zoom: this._option('zoom'),
      style: this._mapType(this._option('type')),
      interactive: !this._option('disabled')
    });
    this._mapReadyPromise = new Promise(resolve => {
      this._map.events.add('ready', () => {
        resolve();
      });
    });
    this.updateControls();
  }
  _attachHandlers() {
    this._map.events.add('move', this._viewChangeHandler.bind(this));
    this._map.events.add('click', this._clickActionHandler.bind(this));
  }
  _viewChangeHandler() {
    const {
      bounds
    } = this._map.getCamera();
    this._option('bounds', this._normalizeLocationRect(bounds));
    const {
      center
    } = this._map.getCamera();
    this._option('center', this._normalizeLocation(center));
    if (!this._preventZoomChangeEvent) {
      this._option('zoom', this._map.getCamera().zoom);
    }
  }
  _clickActionHandler(e) {
    if (e.type === 'click') {
      this._fireClickAction({
        location: this._normalizeLocation(e.position),
        event: e.originalEvent
      });
    }
  }
  updateDimensions() {
    this._map.resize();
    return Promise.resolve();
  }
  updateDisabled() {
    const disabled = this._option('disabled');
    this._map.setUserInteraction({
      interactive: !disabled
    });
    return Promise.resolve();
  }
  updateMapType() {
    const newType = this._mapType(this._option('type'));
    const currentType = this._map.getStyle().style;
    if (newType !== currentType) {
      this._map.setStyle({
        style: newType
      });
    }
    return Promise.resolve();
  }
  updateBounds() {
    return Promise.all([this._resolveLocation(this._option('bounds.northEast')), this._resolveLocation(this._option('bounds.southWest'))]).then(result => {
      this._map.setCamera({
        bounds: [
        // @ts-expect-error ts-error
        result[1][0], result[1][1], result[0][0], result[0][1]],
        padding: 50
      });
    });
  }
  updateCenter() {
    return this._resolveLocation(this._option('center')).then(center => {
      this._map.setCamera({
        center
      });
    });
  }
  updateZoom() {
    this._map.setCamera({
      zoom: this._option('zoom')
    });
    return Promise.resolve();
  }
  updateControls() {
    const {
      controls
    } = this._option();
    if (controls) {
      this._map.controls.add([new atlas.control.CompassControl(), new atlas.control.PitchControl(), new atlas.control.StyleControl({
        mapStyles: ['road', 'satellite', 'satellite_road_labels']
      }), new atlas.control.ZoomControl()], {
        position: 'top-right'
      });
    } else {
      const allControls = this._map.controls.getControls();
      const controlsToRemove = allControls.slice(2);
      this._map.controls.remove(controlsToRemove);
    }
    return Promise.resolve();
  }
  _renderMarker(options) {
    return this._resolveLocation(options.location).then(location => {
      const markerOptions = {
        position: location
      };
      const icon = options.iconSrc || this._option('markerIconSrc');
      if (icon) {
        markerOptions.htmlContent = this._createIconTemplate(icon);
      }
      const marker = new atlas.HtmlMarker(markerOptions);
      this._map.markers.add(marker);
      const popup = this._renderTooltip(location, options.tooltip);
      let handler;
      if (options.onClick || options.tooltip) {
        const markerClickAction = this._mapWidget._createAction(options.onClick || _common.noop);
        const markerNormalizedLocation = this._normalizeLocation(location);
        handler = this._map.events.add('click', marker, () => {
          markerClickAction({
            location: markerNormalizedLocation
          });
          if (popup) {
            if (popup.isOpen()) {
              popup.close();
            } else {
              popup.open();
            }
          }
        });
      }
      return {
        location,
        marker,
        popup,
        handler
      };
    });
  }
  _renderTooltip(location, options) {
    if (!options) {
      return;
    }
    options = this._parseTooltipOptions(options);
    const $content = (0, _renderer.default)('<div>').html(options.text).addClass(MAP_MARKER_TOOLTIP_CLASS);
    const popup = new atlas.Popup({
      content: $content[0],
      position: location,
      pixelOffset: [0, -30]
    });
    this._map.popups.add(popup);
    if (options.visible) {
      popup.open();
    }
    return popup;
  }
  _destroyMarker(marker) {
    this._map.markers.remove(marker.marker);
    if (marker.popup) {
      this._map.popups.remove(marker.popup);
    }
    if (marker.handler) {
      this._map.events.remove(marker.handler);
    }
  }
  _renderRoute(options) {
    return Promise.all((0, _iterator.map)(options.locations, point => this._resolveLocation(point))).then(locations => new Promise(resolve => {
      const routeColor = new _color.default(options.color || this._defaultRouteColor()).toHex();
      const routeOpacity = options.opacity || this._defaultRouteOpacity();
      const queryCoordinates = locations.map(location => `${location[1]},${location[0]}`);
      const query = queryCoordinates.join(':');
      const routeType = this._movementMode(options.mode);
      const searchUrl = `${AZURE_BASE_LINK}route/directions/json?subscription-key=${this._keyOption('azure')}&api-version=1.0&query=${query}&travelMode=${routeType}`;
      _ajax.default.sendRequest({
        url: CUSTOM_URL ?? searchUrl,
        dataType: 'json'
      }).then(result => {
        if (result !== null && result !== void 0 && result.routes && result.routes.length > 0) {
          const route = result.routes[0];
          const routeCoordinates = route.legs.flatMap(leg => leg.points.map(point => [point.longitude, point.latitude]));
          const dataSource = new atlas.source.DataSource();
          dataSource.add(new atlas.data.Feature(new atlas.data.LineString(routeCoordinates), {}));
          const lineLayer = new atlas.layer.LineLayer(dataSource, null, {
            strokeColor: routeColor,
            strokeOpacity: routeOpacity,
            strokeWidth: options.weight || this._defaultRouteWeight()
          });
          this._map.sources.add(dataSource);
          this._map.layers.add(lineLayer);
          const bounds = atlas.data.BoundingBox.fromPositions(routeCoordinates);
          if (this._option('autoAdjust')) {
            this._map.setCamera({
              bounds,
              padding: 50
            });
          }
          resolve({
            instance: {
              dataSource,
              lineLayer
            },
            northEast: [bounds[2], bounds[3]],
            southWest: [bounds[0], bounds[1]]
          });
        }
      }).catch(e => {
        const dataSource = new atlas.source.DataSource();
        const lineLayer = new atlas.layer.LineLayer(dataSource, null, {});
        _ui.default.log('W1006', e);
        resolve({
          instance: {
            dataSource,
            lineLayer
          }
        });
      });
    }));
  }
  _destroyRoute(routeObject) {
    this._map.layers.remove(routeObject.instance.lineLayer);
    this._map.sources.remove(routeObject.instance.dataSource);
  }
  _fitBounds() {
    this._updateBounds();
    if (this._bounds && this._option('autoAdjust')) {
      const zoomBeforeFitting = this._map.getCamera().zoom;
      this._preventZoomChangeEvent = true;
      this._map.setCamera({
        bounds: this._bounds,
        padding: CAMERA_PADDING
      });
      const zoomAfterFitting = this._map.getCamera().zoom;
      if (zoomBeforeFitting < zoomAfterFitting) {
        this._map.setCamera({
          zoom: zoomBeforeFitting
        });
      } else {
        this._option('zoom', zoomAfterFitting);
      }
      delete this._preventZoomChangeEvent;
    }
    return Promise.resolve();
  }
  _extendBounds(location) {
    const [longitude, latitude] = location;
    const delta = 0.0001;
    if (this._bounds) {
      const newBounds = new atlas.data.BoundingBox([longitude, latitude, longitude, latitude]);
      this._bounds = atlas.data.BoundingBox.merge(this._bounds, newBounds);
    } else {
      this._bounds = new atlas.data.BoundingBox([longitude - delta, latitude - delta, longitude + delta, latitude + delta]);
    }
  }
  clean() {
    if (this._map) {
      this._map.events.remove('move', this._viewChangeHandler);
      this._map.events.remove('click', this._clickActionHandler);
      this._clearMarkers();
      this._clearRoutes();
      this._map.dispose();
    }
    return Promise.resolve();
  }
}
var _default = exports.default = AzureProvider;
