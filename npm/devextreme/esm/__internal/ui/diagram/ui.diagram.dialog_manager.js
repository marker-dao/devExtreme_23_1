/**
* DevExtreme (esm/__internal/ui/diagram/ui.diagram.dialog_manager.js)
* Version: 26.1.0
* Build date: Wed Jan 14 2026
*
* Copyright (c) 2012 - 2026 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import { getWindow } from '../../../core/utils/window';
import FileUploader from '../../../ui/file_uploader';
import { getDiagram } from '../../ui/diagram/diagram.importer';
const DiagramDialogManager = {
  getConfigurations() {
    const {
      DiagramCommand
    } = getDiagram();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,no-return-assign
    return this.dialogList || (this.dialogList = [{
      command: DiagramCommand.InsertShapeImage,
      title: messageLocalization.format('dxDiagram-dialogInsertShapeImageTitle'),
      onGetContent: this.getChangeImageDialogContent
    }, {
      command: DiagramCommand.EditShapeImage,
      title: messageLocalization.format('dxDiagram-dialogEditShapeImageTitle'),
      onGetContent: this.getChangeImageDialogContent
    }]);
  },
  getChangeImageDialogContent(args) {
    const $uploader = $('<div>');
    args.component._createComponent($uploader, FileUploader, {
      selectButtonText: messageLocalization.format('dxDiagram-dialogEditShapeImageSelectButton'),
      accept: 'image/*',
      uploadMode: 'useForm',
      onValueChanged(e) {
        const window = getWindow();
        // @ts-expect-error ts-error
        const reader = new window.FileReader();
        reader.onload = () => {
          args.component._commandParameter = e.target.result;
        };
        reader.readAsDataURL(e.value[0]);
      }
    });
    return $uploader;
  },
  getDialogParameters(command) {
    const commandIndex = this.getConfigurations()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .map(c => c.command).indexOf(command);
    if (commandIndex >= 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.getConfigurations()[commandIndex];
    }
    return null;
  }
};
export default DiagramDialogManager;
