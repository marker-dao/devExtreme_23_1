"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupModel = void 0;
class PopupModel {
  constructor(element) {
    this.getLabelIdByText = labelText => {
      const labels = Array.from(this.element.querySelectorAll('label'));
      const label = labels.find(l => {
        var _l$textContent;
        return l === null || l === void 0 || (_l$textContent = l.textContent) === null || _l$textContent === void 0 || (_l$textContent = _l$textContent.trim()) === null || _l$textContent === void 0 ? void 0 : _l$textContent.startsWith(labelText);
      });
      if (!label) {
        throw new Error(`Label with text "${labelText}" not found`);
      }
      const forId = label.getAttribute('for');
      if (!forId) {
        throw new Error(`Label with text "${labelText}" has no "for" attribute`);
      }
      return forId;
    };
    this.getInputByLabel = labelText => {
      const forId = this.getLabelIdByText(labelText);
      const input = this.element.querySelector(`input#${forId}`);
      if (!input) {
        throw new Error(`Input with id "${forId}" not found`);
      }
      return input;
    };
    this.setInputValueByLabel = (labelText, value) => {
      const input = this.getInputByLabel(labelText);
      if (!input) {
        throw new Error(`Input with label "${labelText}" not found`);
      }
      input.value = '';
      value.split('').forEach(char => {
        input.value += char;
        input.dispatchEvent(new Event('input', {
          bubbles: true
        }));
        input.dispatchEvent(new KeyboardEvent('keydown', {
          bubbles: true,
          key: char
        }));
        input.dispatchEvent(new KeyboardEvent('keypress', {
          bubbles: true,
          key: char
        }));
        input.dispatchEvent(new KeyboardEvent('keyup', {
          bubbles: true,
          key: char
        }));
      });
      input.dispatchEvent(new Event('change', {
        bubbles: true
      }));
      input.dispatchEvent(new Event('input', {
        bubbles: true
      }));
      return input;
    };
    this.getSwitchByName = name => {
      const hiddenInput = this.element.querySelector(`input[name=${name}]`);
      if (!hiddenInput) {
        throw new Error(`Switch with name "${name}" not found`);
      }
      return hiddenInput;
    };
    this.selectRadio = value => {
      const group = this.element.querySelector('[role="radiogroup"]');
      if (!group) throw new Error('Radiogroup not found');
      const radios = Array.from(group.querySelectorAll('[role="radio"]'));
      const target = radios.find(radio => {
        var _radio$getAttribute, _radio$textContent;
        const label = (_radio$getAttribute = radio.getAttribute('aria-label')) === null || _radio$getAttribute === void 0 ? void 0 : _radio$getAttribute.trim();
        const text = (_radio$textContent = radio.textContent) === null || _radio$textContent === void 0 ? void 0 : _radio$textContent.trim();
        return label === value || text === value;
      });
      if (!target) throw new Error(`Radio with value "${value}" not found`);
      radios.forEach(r => {
        r.setAttribute('aria-checked', 'false');
        r.classList.remove('dx-item-selected', 'dx-radiobutton-checked');
      });
      target.setAttribute('aria-checked', 'true');
      target.classList.add('dx-item-selected', 'dx-radiobutton-checked');
      target.dispatchEvent(new MouseEvent('click', {
        bubbles: true
      }));
      return target;
    };
    this.getSelectedRadio = () => this.element.querySelector('[role="radio"][aria-checked="true"]');
    this.getSelectedRadioValue = () => {
      var _selected$textContent;
      const selected = this.getSelectedRadio();
      return (selected === null || selected === void 0 ? void 0 : selected.getAttribute('aria-label')) ?? (selected === null || selected === void 0 || (_selected$textContent = selected.textContent) === null || _selected$textContent === void 0 ? void 0 : _selected$textContent.trim()) ?? null;
    };
    this.getForm = () => this.element.querySelector('.dx-form');
    this.getTitle = () => document.querySelector('.dx-popup-title');
    this.getDoneButton = () => {
      const doneButton = this.element.querySelector('.dx-button.dx-popup-done');
      if (!doneButton) {
        throw new Error('Done button not found');
      }
      return doneButton;
    };
    this.getCancelButton = () => {
      const cancelButton = this.element.querySelector('.dx-button.dx-popup-cancel');
      if (!cancelButton) {
        throw new Error('Cancel button not found');
      }
      return cancelButton;
    };
    this.getCloseButton = () => {
      const closeButton = this.element.querySelector('.dx-closebutton.dx-button');
      if (!closeButton) {
        throw new Error('Close button not found');
      }
      return closeButton;
    };
    this.getFormEditor = fieldName => {
      const form = this.getForm();
      if (form === null) {
        return null;
      }
      return form.querySelector(`[data-field="${fieldName}"]`);
    };
    this.getEditSeriesButton = () => {
      const editSeriesButton = document.querySelector('[aria-label="Edit series"]');
      if (!editSeriesButton) {
        throw new Error('Edit series button not found');
      }
      return editSeriesButton;
    };
    this.element = element;
  }
}
exports.PopupModel = PopupModel;