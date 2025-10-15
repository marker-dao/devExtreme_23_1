export const sortByGroupIndex = entities => entities.sort((a, b) => a.groupIndex - b.groupIndex);
export const sortByDuration = entities => entities.sort((a, b) => b.duration - a.duration);
export const sortByStartDate = entities => entities.sort((a, b) => a.startDateUTC - b.startDateUTC);