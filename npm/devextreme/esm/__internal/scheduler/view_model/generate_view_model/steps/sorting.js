/**
* DevExtreme (esm/__internal/scheduler/view_model/generate_view_model/steps/sorting.js)
* Version: 25.2.0
* Build date: Wed Oct 15 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export const sortByGroupIndex = entities => entities.sort((a, b) => a.groupIndex - b.groupIndex);
export const sortByDuration = entities => entities.sort((a, b) => b.duration - a.duration);
export const sortByStartDate = entities => entities.sort((a, b) => a.startDateUTC - b.startDateUTC);
