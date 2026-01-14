/**
* DevExtreme (data/local_store.d.ts)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
  LocalStoreOptions,
  LocalStore,
} from '../common/data';

export {
  LocalStoreOptions,
} from '../common/data';

export default LocalStore;

/**
* @public
* @deprecated Use LocalStoreOptions from /common/data instead
* @namespace DevExpress.data.LocalStore
*/
export type Options<
  TItem = any,
  TKey = any,
> = LocalStoreOptions<TItem, TKey>;
