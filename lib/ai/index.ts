// lib/ai/index.ts
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { experimental_wrapLanguageModel as wrapLanguageModel, type LanguageModelV1CallOptions } from "ai";
import { customMiddleware } from "./custom-middleware";

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Create a wrapper class that implements LanguageModelV1
class GoogleAIWrapper {
  private readonly model: GenerativeModel;
  readonly specificationVersion = 'v1';
  readonly provider = 'google';
  readonly modelId: string;
  readonly defaultObjectGenerationMode = 'json';

  constructor(modelName: string) {
    this.model = genAI.getGenerativeModel({ model: modelName });
    this.modelId = modelName;
  }

  // Updated doGenerate method to accept LanguageModelV1CallOptions
  async doGenerate(options: LanguageModelV1CallOptions) {
    const result = await this.model.generateContent(options.messages[0].content);
    const response = await result.response;
    return {
      text: response.text(),
    };
  }

  // Updated doStream method to accept LanguageModelV1CallOptions
  async *doStream(options: LanguageModelV1CallOptions) {
    const result = await this.model.generateContentStream(options.messages[0].content);
    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        yield {
          text: text,
        };
      }
    }
  }
}

// Create wrapped models
export const geminiProModel = wrapLanguageModel({
  model: new GoogleAIWrapper("gemini-1.5-pro-002"),
  middleware: customMiddleware,
});

export const geminiFlashModel = wrapLanguageModel({
  model: new GoogleAIWrapper("gemini-1.5-flash-002"),
  middleware: customMiddleware,
});