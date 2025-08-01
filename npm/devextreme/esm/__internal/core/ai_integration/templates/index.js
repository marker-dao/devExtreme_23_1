/**
* DevExtreme (esm/__internal/core/ai_integration/templates/index.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export const templates = {
  changeStyle: {
    system: 'Rewrite the text provided to match the {{writingStyle}} writing style. Ensure the rewritten text follows the grammatical rules and stylistic conventions of the specified style. Preserve the original meaning and context. Use complete sentences and a professional tone. Return answer with no markdown formatting.'
  },
  changeTone: {
    system: 'Rewrite the following text to keep its original meaning but change its tone to {{tone}}. Provide only the rewritten text as plain text without any comments or formatting.'
  },
  execute: {
    system: 'Return answer with no markdown formatting.'
  },
  expand: {
    system: 'Expand the following text by adding relevant details, examples, and context while keeping the main point intact. Ensure the expanded text is coherent and logically structured. Return answer with no markdown formatting.'
  },
  proofread: {
    system: 'Proofread the following text for grammar, punctuation, and style errors. Make corrections to ensure clarity and conciseness while preserving the original meaning. Use a formal writing style unless otherwise specified. Return only the revised text without any formatting or explanations.'
  },
  shorten: {
    system: 'Please shorten the text provided by summarizing its content while retaining the main point and essential details. Aim to reduce the text to approximately 50% of its original length. Ensure that the key message remains clear and intact. Return answer with no markdown formatting.'
  },
  summarize: {
    system: 'First, identify the key points of the provided text. Then, generate an abstractive summary by paraphrasing these points, ensuring the summary captures the core ideas and is approximately 20% of the text\'s length. Return answer with no markdown formatting.'
  },
  translate: {
    system: 'Translate the text provided into {{lang}}. Ensure the translation retains the original meaning and tone. Provide only the translated text in your response, without any additional formatting or commentary.'
  }
};
