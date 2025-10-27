export class ToolbarModel {
  constructor(element) {
    this.element = element;
  }
  getPrevButton() {
    var _this$element;
    return (_this$element = this.element) === null || _this$element === void 0 ? void 0 : _this$element.querySelector('.dx-scheduler-navigator-previous');
  }
  getNextButton() {
    var _this$element2;
    return (_this$element2 = this.element) === null || _this$element2 === void 0 ? void 0 : _this$element2.querySelector('.dx-scheduler-navigator-next');
  }
}