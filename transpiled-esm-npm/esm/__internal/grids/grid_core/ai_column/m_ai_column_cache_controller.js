/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '../m_modules';
export class AiColumnCacheController extends Controller {
  clearCache(columnName) {}
  getCachedResponse(columnName, keys) {
    return null;
  }
  getCachedString(columnName, key) {
    return null;
  }
  isEmptyCache(columnName) {
    return true;
  }
}