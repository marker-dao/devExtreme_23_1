/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '../m_modules';
export class AIColumnCacheController extends Controller {
  clearCache(columnName) {}
  getCachedResponse(columnName, keys) {
    return {};
  }
  getCachedString(columnName, key) {
    return null;
  }
  isEmptyCache(columnName) {
    return true;
  }
}