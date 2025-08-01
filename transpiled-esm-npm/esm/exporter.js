import { fileSaver } from './__internal/exporter/file_saver';
import { imageCreator, testFormats, getData as getImageData } from './__internal/exporter/image_creator';
import { svgCreator, getData as getSvgData } from './__internal/exporter/svg_creator';
import { isFunction as _isFunction, isBoolean } from './core/utils/type';
import { Deferred } from './core/utils/deferred';
import { getData } from './__internal/exporter/pdf_creator';
function _export(data, options, getData) {
  if (!data) {
    return new Deferred().resolve();
  }

  // TODO: Can the following actions be not defined? (since they are provided by a widget not by a user)
  const exportingAction = options.exportingAction;
  const exportedAction = options.exportedAction;
  const fileSavingAction = options.fileSavingAction;
  const eventArgs = {
    fileName: options.fileName,
    format: options.format,
    cancel: false
  };
  if (isBoolean(options.selectedRowsOnly)) {
    eventArgs.selectedRowsOnly = options.selectedRowsOnly;
  }
  _isFunction(exportingAction) && exportingAction(eventArgs);
  if (!eventArgs.cancel) {
    return getData(data, options).then(blob => {
      _isFunction(exportedAction) && exportedAction();
      if (_isFunction(fileSavingAction)) {
        eventArgs.data = blob;
        fileSavingAction(eventArgs);
      }
      if (!eventArgs.cancel) {
        const format = options.format === 'xlsx' ? 'EXCEL' : options.format;
        fileSaver.saveAs(eventArgs.fileName, format, blob);
      }
    });
  }
  return new Deferred().resolve();
}
export { _export as export, fileSaver };
export const image = {
  creator: imageCreator,
  getData: getImageData,
  testFormats: testFormats
};
export const pdf = {
  getData: getData
};
export const svg = {
  creator: svgCreator,
  getData: getSvgData
};