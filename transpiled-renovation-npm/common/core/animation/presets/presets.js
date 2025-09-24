"use strict";

var _m_presets = require("../../../../__internal/common/core/animation/presets/m_presets");
Object.keys(_m_presets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_presets[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_presets[key];
    }
  });
});