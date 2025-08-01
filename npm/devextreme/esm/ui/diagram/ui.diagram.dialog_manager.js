/**
* DevExtreme (esm/ui/diagram/ui.diagram.dialog_manager.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { getDiagram } from './diagram.importer';
import messageLocalization from '../../common/core/localization/message';
import FileUploader from '../file_uploader';
import { getWindow } from '../../core/utils/window';
const DiagramDialogManager = {
  getConfigurations: function () {
    const {
      DiagramCommand
    } = getDiagram();
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
  getChangeImageDialogContent: function (args) {
    const $uploader = $('<div>');
    args.component._createComponent($uploader, FileUploader, {
      selectButtonText: messageLocalization.format('dxDiagram-dialogEditShapeImageSelectButton'),
      accept: 'image/*',
      uploadMode: 'useForm',
      onValueChanged: function (e) {
        const window = getWindow();
        const reader = new window.FileReader();
        reader.onload = function (e) {
          args.component._commandParameter = e.target.result;
        };
        reader.readAsDataURL(e.value[0]);
      }
    });
    return $uploader;
  },
  getDialogParameters(command) {
    const commandIndex = this.getConfigurations().map(c => c.command).indexOf(command);
    if (commandIndex >= 0) {
      return this.getConfigurations()[commandIndex];
    } else {
      return null;
    }
  }
};
export default DiagramDialogManager;
