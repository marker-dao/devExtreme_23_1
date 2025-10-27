export const getPrompt = prompt => prompt ?? '';
export const isPromptChanged = (initialPrompt, currentPrompt) => getPrompt(initialPrompt) !== getPrompt(currentPrompt);