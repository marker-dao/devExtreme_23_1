export function joinStatePath(stateId, propertyName) {
  let separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
  return [stateId, propertyName].join(separator);
}
export function splitStatePath(statePath) {
  let separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';
  return statePath.split(separator).filter(Boolean);
}
export function isValidStatePath(statePath) {
  const parts = splitStatePath(statePath);
  return parts.length >= 2;
}
export function isObject(input) {
  return input !== undefined && input !== null && typeof input === 'object';
}
export function deepCopy(inputObject) {
  function iter(value, visited) {
    if (value === null || typeof value !== 'object') {
      return value;
    }
    if (visited.has(value)) {
      return visited.get(value);
    }
    if (value instanceof Date) {
      const dateCopy = new Date(value.getTime());
      visited.set(value, dateCopy);
      return dateCopy;
    }
    if (value instanceof RegExp) {
      const regExpCopy = new RegExp(value.source, value.flags);
      visited.set(value, regExpCopy);
      return regExpCopy;
    }
    if (Array.isArray(value)) {
      const arrayCopy = [];
      visited.set(value, arrayCopy);
      value.forEach((item, index) => {
        arrayCopy[index] = iter(item, visited);
      });
      return arrayCopy;
    }
    const objectCopy = {};
    visited.set(value, objectCopy);
    Object.keys(value).forEach(key => {
      const propertyValue = value[key];
      objectCopy[key] = iter(propertyValue, visited);
    });
    return objectCopy;
  }
  const result = iter(inputObject, new Map());
  return result;
}