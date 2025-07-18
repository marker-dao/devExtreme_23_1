export const getName = () => 'dxCardView';
export const addWidgetPrefix = className => `dx-${getName().slice(2).toLowerCase()}${className ? `-${className}` : ''}`;