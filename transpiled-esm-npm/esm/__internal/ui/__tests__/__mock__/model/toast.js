import Toast from '../../../../../ui/toast';
export class ToastModel {
  constructor(root) {
    this.root = root;
  }
  getElement() {
    return this.root;
  }
  getInstance() {
    return Toast.getInstance(this.root);
  }
}