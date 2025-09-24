import { isClient, registerCustomComponents, renderTrialPanel } from './trial_panel.client';
export function showTrialPanel(buyNowUrl, licensingDocUrl, version, subscriptions, customStyles) {
  if (isClient()) {
    renderTrialPanel(buyNowUrl, licensingDocUrl, version, subscriptions, customStyles);
  }
}
export function registerTrialPanelComponents(customStyles) {
  if (isClient()) {
    registerCustomComponents(customStyles);
  }
}