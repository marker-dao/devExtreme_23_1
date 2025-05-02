"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowCheckBoxesMode = exports.SelectionMode = void 0;
var SelectionMode;
(function (SelectionMode) {
  SelectionMode["Multiple"] = "multiple";
  SelectionMode["Single"] = "single";
  SelectionMode["None"] = "none";
})(SelectionMode || (exports.SelectionMode = SelectionMode = {}));
var ShowCheckBoxesMode;
(function (ShowCheckBoxesMode) {
  ShowCheckBoxesMode["Always"] = "always";
  ShowCheckBoxesMode["OnClick"] = "onClick";
  ShowCheckBoxesMode["OnLongTap"] = "onLongTap";
  ShowCheckBoxesMode["None"] = "none";
})(ShowCheckBoxesMode || (exports.ShowCheckBoxesMode = ShowCheckBoxesMode = {}));