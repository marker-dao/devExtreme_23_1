import _extends from "@babel/runtime/helpers/esm/extends";
import * as Base from '../../grid_core/content_view/options';
export const defaultOptions = _extends({
  wordWrapEnabled: false,
  cardsPerRow: 3,
  cardMinWidth: 250,
  cardCover: {
    aspectRatio: '1 / 1'
  },
  fieldHintEnabled: false
}, Base.defaultOptions);