import _extends from "@babel/runtime/helpers/esm/extends";
export const plainViewModel = viewModel => viewModel.flatMap(appointment => appointment.settings.map(setting => _extends({}, setting, {
  itemData: appointment.itemData
})));