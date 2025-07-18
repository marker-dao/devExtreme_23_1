import { isObject } from '../../../../../../core/utils/type';
export const isAllowedColumnValue = value => isObject(value) || typeof value === 'string';
export const isCorrectColumnIdx = pathIdx => !isNaN(+pathIdx) && pathIdx !== null;
export const getColumnIdxFromPath = path => +path[1];
export const getColumnOptionPathStr = path => [...path].splice(2).join('.');