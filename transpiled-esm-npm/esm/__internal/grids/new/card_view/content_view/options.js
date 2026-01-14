import * as Base from '../../grid_core/content_view/options';
export const defaultOptions = Object.assign({
  wordWrapEnabled: false,
  cardsPerRow: 3,
  cardMinWidth: 250,
  cardCover: {
    aspectRatio: '1 / 1'
  },
  fieldHintEnabled: false
}, Base.defaultOptions);