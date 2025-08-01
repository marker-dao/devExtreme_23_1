/**
* DevExtreme (file_management/object_provider.d.ts)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import FileSystemProviderBase, {
    FileSystemProviderBaseOptions,
} from './provider_base';

/** @public */
export type Options = ObjectFileSystemProviderOptions;

/**
 * @deprecated Use Options instead
 * @namespace DevExpress.fileManagement
 * @docid
 */
export interface ObjectFileSystemProviderOptions extends FileSystemProviderBaseOptions<ObjectFileSystemProvider> {
    /**
     * @docid
     * @public
     */
    contentExpr?: string | Function;
    /**
     * @docid
     * @public
     */
    data?: Array<any>;
    /**
     * @docid
     * @public
     */
    itemsExpr?: string | Function;
}
/**
 * @docid
 * @inherits FileSystemProviderBase
 * @namespace DevExpress.fileManagement
 * @public
 * @options ObjectFileSystemProviderOptions
 */
export default class ObjectFileSystemProvider extends FileSystemProviderBase {
    constructor(options?: Options);
}
