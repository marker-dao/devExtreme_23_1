import errors from '../../../../../ui/widget/ui.errors';
export const throwError = (errorCode, message) => {
  throw errors.Error(errorCode, message);
};