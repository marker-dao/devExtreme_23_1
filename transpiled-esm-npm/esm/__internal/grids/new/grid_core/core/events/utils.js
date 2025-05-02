const markIgnored = event => {
  event.dxIgnore = true;
};
const markHandled = event => {
  event.dxHandled = true;
};
export const eventUtils = {
  markHandled,
  markIgnored
};