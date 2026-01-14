import { each } from '../../core/utils/iterator';
export const PATH_SEPARATOR = '/';
export const getFileExtension = path => {
  const index = path.lastIndexOf('.');
  return index !== -1 ? path.substring(index) : '';
};
export const getName = path => {
  const index = path.lastIndexOf(PATH_SEPARATOR);
  return index !== -1 ? path.substring(index + PATH_SEPARATOR.length) : path;
};
export const getParentPath = path => {
  const index = path.lastIndexOf(PATH_SEPARATOR);
  return index !== -1 ? path.substring(0, index) : '';
};
export const getEscapedFileName = fileName => fileName.replace(/\/{1,1}/g, '//');
export const pathCombine = function () {
  let result = '';
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  each(args, (_, arg) => {
    if (arg) {
      if (result) {
        result += PATH_SEPARATOR;
      }
      result += arg;
    }
  });
  return result;
};
export const getPathParts = (path, includeFullPath) => {
  if (!path || path === '/') {
    return [];
  }
  const result = [];
  let pathPart = '';
  for (let i = 0; i < path.length; i += 1) {
    let char = path.charAt(i);
    if (char === PATH_SEPARATOR) {
      const nextChar = path.charAt(i + 1);
      if (nextChar !== PATH_SEPARATOR) {
        // eslint-disable-next-line max-depth
        if (pathPart) {
          result.push(pathPart);
          pathPart = '';
        }
        char = nextChar;
      }
      i += 1;
    }
    pathPart += char;
  }
  if (pathPart) {
    result.push(pathPart);
  }
  if (includeFullPath) {
    for (let i = 0; i < result.length; i += 1) {
      result[i] = pathCombine(i === 0 ? '' : result[i - 1], getEscapedFileName(result[i]));
    }
  }
  return result;
};