/**
* DevExtreme (cjs/__internal/file_management/remote_provider.js)
* Version: 26.1.0
* Build date: Tue Jan 13 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../common");
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _ajax = _interopRequireDefault(require("../../core/utils/ajax"));
var _common2 = require("../../core/utils/common");
var _data = require("../../core/utils/data");
var _deferred = require("../../core/utils/deferred");
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _provider_base = _interopRequireDefault(require("../file_management/provider_base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const window = (0, _window.getWindow)();
const FILE_CHUNK_BLOB_NAME = 'chunk';
const FILE_SYSTEM_COMMNAD = {
  GET_DIR_CONTENTS: 'GetDirContents',
  CREATE_DIR: 'CreateDir',
  RENAME: 'Rename',
  MOVE: 'Move',
  COPY: 'Copy',
  REMOVE: 'Remove',
  UPLOAD_CHUNK: 'UploadChunk',
  ABORT_UPLOAD: 'AbortUpload',
  DOWLOAD: 'Download'
};
const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST'
};
class RemoteFileSystemProvider extends _provider_base.default {
  constructor(options) {
    // eslint-disable-next-line no-param-reassign
    options = (0, _common2.ensureDefined)(options, {});
    super(options);
    this._endpointUrl = options.endpointUrl;
    this._beforeAjaxSend = options.beforeAjaxSend;
    this._beforeSubmit = options.beforeSubmit;
    this._requestHeaders = options.requestHeaders;
    // @ts-expect-error ts-error
    this._hasSubDirsGetter = (0, _data.compileGetter)(options.hasSubDirectoriesExpr ?? 'hasSubDirectories');
  }
  getItems(parentDirectory) {
    const pathInfo = parentDirectory.getFullPathInfo();
    return this._executeRequest(FILE_SYSTEM_COMMNAD.GET_DIR_CONTENTS, {
      pathInfo
    }).then(result => this._convertDataObjectsToFileItems(result.result, pathInfo));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renameItem(item, name) {
    return this._executeRequest(FILE_SYSTEM_COMMNAD.RENAME, {
      pathInfo: item.getFullPathInfo(),
      isDirectory: item.isDirectory,
      name
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createDirectory(parentDirectory, name) {
    return this._executeRequest(FILE_SYSTEM_COMMNAD.CREATE_DIR, {
      pathInfo: parentDirectory.getFullPathInfo(),
      name
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteItems(items) {
    return items.map(item => this._executeRequest(FILE_SYSTEM_COMMNAD.REMOVE, {
      pathInfo: item.getFullPathInfo(),
      isDirectory: item.isDirectory
    }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  moveItems(items, destinationDirectory) {
    return items.map(item => this._executeRequest(FILE_SYSTEM_COMMNAD.MOVE, {
      sourcePathInfo: item.getFullPathInfo(),
      sourceIsDirectory: item.isDirectory,
      destinationPathInfo: destinationDirectory.getFullPathInfo()
    }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copyItems(items, destinationFolder) {
    return items.map(item => this._executeRequest(FILE_SYSTEM_COMMNAD.COPY, {
      sourcePathInfo: item.getFullPathInfo(),
      sourceIsDirectory: item.isDirectory,
      destinationPathInfo: destinationFolder.getFullPathInfo()
    }));
  }
  uploadFileChunk(fileData, chunksInfo, destinationDirectory) {
    if (chunksInfo.chunkIndex === 0) {
      chunksInfo.customData.uploadId = new _common.Guid();
    }
    const args = {
      destinationPathInfo: destinationDirectory.getFullPathInfo(),
      chunkMetadata: JSON.stringify({
        UploadId: chunksInfo.customData.uploadId,
        FileName: fileData.name,
        Index: chunksInfo.chunkIndex,
        TotalCount: chunksInfo.chunkCount,
        FileSize: fileData.size
      })
    };
    const ajaxSettings = {
      url: this._endpointUrl,
      headers: this._requestHeaders || {},
      method: REQUEST_METHOD.POST,
      dataType: 'json',
      data: {
        [FILE_CHUNK_BLOB_NAME]: chunksInfo.chunkBlob,
        arguments: JSON.stringify(args),
        command: FILE_SYSTEM_COMMNAD.UPLOAD_CHUNK
      },
      upload: {
        onprogress: _common2.noop,
        onloadstart: _common2.noop,
        onabort: _common2.noop
      },
      xhrFields: {},
      cache: false
    };
    // @ts-expect-error ts-error
    const deferred = new _deferred.Deferred();
    this._beforeSendInternal(ajaxSettings);
    _ajax.default.sendRequest(ajaxSettings).done(result => {
      if (result.success) {
        deferred.resolve(result);
      } else {
        deferred.reject(result);
      }
    }).fail(deferred.reject);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return deferred.promise();
  }
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  abortFileUpload(fileData, chunksInfo,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  destinationDirectory) {
    return this._executeRequest(FILE_SYSTEM_COMMNAD.ABORT_UPLOAD, {
      uploadId: chunksInfo.customData.uploadId
    });
  }
  downloadItems(items) {
    const args = this._getDownloadArgs(items);
    const $form = (0, _renderer.default)('<form>').css({
      display: 'none'
    })
    // @ts-expect-error ts-error
    .attr({
      method: REQUEST_METHOD.POST,
      action: args.url
    });
    const formDataEntries = {
      command: args.command,
      arguments: args.arguments
    };
    this._beforeSubmitInternal(formDataEntries);
    this._appendFormDataInputsToForm(formDataEntries, $form);
    // @ts-expect-error ts-error
    $form.appendTo('body');
    // @ts-expect-error ts-error
    _events_engine.default.trigger($form, 'submit');
    // eslint-disable-next-line no-restricted-globals
    setTimeout(() => $form.remove());
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItemsContent(items) {
    const args = this._getDownloadArgs(items);
    const ajaxSettings = {
      url: args.url,
      headers: this._requestHeaders || {},
      method: REQUEST_METHOD.POST,
      responseType: 'arraybuffer',
      data: {
        command: args.command,
        arguments: args.arguments
      },
      upload: {
        onprogress: _common2.noop,
        onloadstart: _common2.noop,
        onabort: _common2.noop
      },
      xhrFields: {},
      cache: false
    };
    this._beforeSendInternal(ajaxSettings);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return _ajax.default.sendRequest(ajaxSettings);
  }
  _getDownloadArgs(items) {
    const pathInfoList = items.map(item => item.getFullPathInfo());
    const args = {
      pathInfoList
    };
    const argsStr = JSON.stringify(args);
    return {
      url: this._endpointUrl,
      arguments: argsStr,
      command: FILE_SYSTEM_COMMNAD.DOWLOAD
    };
  }
  _getItemsIds(items) {
    return items.map(it => it.relativeName);
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  _executeRequest(command, args) {
    const method = command === FILE_SYSTEM_COMMNAD.GET_DIR_CONTENTS ? REQUEST_METHOD.GET : REQUEST_METHOD.POST;
    // @ts-expect-error ts-error
    const deferred = new _deferred.Deferred();
    const ajaxSettings = {
      url: this._getEndpointUrl(command, args),
      headers: this._requestHeaders || {},
      method,
      dataType: 'json',
      data: {},
      xhrFields: {},
      cache: false
    };
    this._beforeSendInternal(ajaxSettings);
    _ajax.default.sendRequest(ajaxSettings).then(result => {
      if (result.success) {
        deferred.resolve(result);
      } else {
        deferred.reject(result);
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    e => deferred.reject(e));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return deferred.promise();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _beforeSubmitInternal(formDataEntries) {
    if ((0, _type.isFunction)(this._beforeSubmit)) {
      this._beforeSubmit({
        formData: formDataEntries
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _beforeSendInternal(ajaxSettings) {
    if ((0, _type.isFunction)(this._beforeAjaxSend)) {
      const ajaxArguments = {
        headers: ajaxSettings.headers,
        formData: ajaxSettings.data,
        xhrFields: ajaxSettings.xhrFields
      };
      this._beforeAjaxSend(ajaxArguments);
      ajaxSettings.headers = ajaxArguments.headers;
      ajaxSettings.data = ajaxArguments.formData;
      ajaxSettings.xhrFields = ajaxArguments.xhrFields;
    }
    if ((0, _type.isEmptyObject)(ajaxSettings.data)) {
      delete ajaxSettings.data;
      // if using core.utils.ajax
    } else if (ajaxSettings.responseType || ajaxSettings.upload) {
      ajaxSettings.data = this._createFormData(ajaxSettings.data);
    }
    // else using jQuery.ajax, keep plain object
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
  _createFormData(formDataEntries) {
    // @ts-expect-error ts-error
    const formData = new window.FormData();
    // eslint-disable-next-line no-restricted-syntax
    for (const entryName in formDataEntries) {
      if (Object.prototype.hasOwnProperty.call(formDataEntries, entryName) && (0, _type.isDefined)(formDataEntries[entryName])) {
        formData.append(entryName, formDataEntries[entryName]);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return formData;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _appendFormDataInputsToForm(formDataEntries, formElement) {
    // eslint-disable-next-line no-restricted-syntax
    for (const entryName in formDataEntries) {
      if (Object.prototype.hasOwnProperty.call(formDataEntries, entryName) && (0, _type.isDefined)(formDataEntries[entryName])) {
        // @ts-expect-error ts-error
        (0, _renderer.default)('<input>').attr({
          type: 'hidden',
          name: entryName,
          value: formDataEntries[entryName]
        }).appendTo(formElement);
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _getEndpointUrl(command, args) {
    const queryString = this._getQueryString({
      command,
      arguments: JSON.stringify(args)
    });
    const separator = this._endpointUrl && this._endpointUrl.indexOf('?') > 0 ? '&' : '?';
    return this._endpointUrl + separator + queryString;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _getQueryString(params) {
    const pairs = [];
    const keys = Object.keys(params);
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      let value = params[key];
      if (value === undefined) {
        // eslint-disable-next-line no-continue
        continue;
      }
      if (value === null) {
        value = '';
      }
      if (Array.isArray(value)) {
        this._processQueryStringArrayParam(key, value, pairs);
      } else {
        const pair = this._getQueryStringPair(key, value);
        pairs.push(pair);
      }
    }
    return pairs.join('&');
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _processQueryStringArrayParam(key, array, pairs) {
    (0, _iterator.each)(array, (_, item) => {
      const pair = this._getQueryStringPair(key, item);
      pairs.push(pair);
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _getQueryStringPair(key, value) {
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _hasSubDirs(dataObj) {
    const hasSubDirs = (0, _type.isFunction)(this._hasSubDirsGetter) && this._hasSubDirsGetter(dataObj);
    return typeof hasSubDirs === 'boolean' ? hasSubDirs : true;
  }
  _getKeyExpr(options) {
    return options.keyExpr ?? 'key';
  }
}
var _default = exports.default = RemoteFileSystemProvider;
