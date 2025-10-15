"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortByStartDate = exports.sortByGroupIndex = exports.sortByDuration = void 0;
const sortByGroupIndex = entities => entities.sort((a, b) => a.groupIndex - b.groupIndex);
exports.sortByGroupIndex = sortByGroupIndex;
const sortByDuration = entities => entities.sort((a, b) => b.duration - a.duration);
exports.sortByDuration = sortByDuration;
const sortByStartDate = entities => entities.sort((a, b) => a.startDateUTC - b.startDateUTC);
exports.sortByStartDate = sortByStartDate;