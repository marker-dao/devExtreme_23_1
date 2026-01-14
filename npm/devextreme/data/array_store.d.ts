/**
* DevExtreme (data/array_store.d.ts)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { ArrayStore, ArrayStoreOptions } from '../common/data';

export {
    ArrayStoreOptions,
} from '../common/data';

/**
 * @public
 * @deprecated Use ArrayStoreOptions from /common/data instead
 * @namespace DevExpress.data.ArrayStore
 */
export type Options<
    TItem = any,
    TKey = any,
> = ArrayStoreOptions<TItem, TKey>;

export default ArrayStore;
