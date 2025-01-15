// lib/ai/index.ts
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { 
  experimental_wrapLanguageModel as wrapLanguageModel, 
  type LanguageModelV1CallOptions,
  type LanguageModelV1,
  type LanguageModelV1Prompt,
  type LanguageModelV1Usage
} from "ai";
>>>>>>> REPLACE>

// lib/ai/index.ts
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { 
  experimental_wrapLanguageModel as wrapLanguageModel, 
  type LanguageModelV1CallOptions,
  type LanguageModelV1,
  type LanguageModelV1Message,
  type LanguageModelV1FinishReason,
  type LanguageModelV1FunctionToolCall,
  type LanguageModelV1LogProbs
} from "ai";
import { customMiddleware } from "./custom-middleware";

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Define core message types
type CoreMessage = {
  role: 'user' | 'system' | 'assistant';
  content: string;
};

type CoreSystemMessage = {
  role: 'system';
  content: string;
};

type CoreUserMessage = {
  role: 'user';
  content: string;
};

// Create a wrapper class that implements LanguageModelV1
class GoogleAIWrapper implements LanguageModelV1 {
  private readonly model: GenerativeModel;
  readonly specificationVersion = 'v1';
  readonly provider = 'google';
  readonly modelId: string;
  readonly defaultObjectGenerationMode = 'json';

  constructor(modelName: string) {
    this.model = genAI.getGenerativeModel({ model: modelName });
    this.modelId = modelName;
  }

  async doGenerate(options: LanguageModelV1CallOptions) {
    try {
      const prompt = options.prompt as LanguageModelV1Prompt;
      
      const result = await this.model.generateContent({
        contents: prompt.map(message => ({
          role: message.role === 'user' ? 'user' : 'model',
          parts: [{ text: message.content }]
        }))
      });
      
      const response = await result.response;
      const text = response.text();
      
      return {
        text: text || '',
        usage: {
          promptTokens: response.usageMetadata?.promptTokenCount || 0,
          completionTokens: response.usageMetadata?.promptTokenCount || 0
        },
        finishReason: 'stop',
        rawCall: {
          rawPrompt: prompt,
          rawSettings: options
        }
      };
>>>>>>> REPLACE>

// lib/ai/index.ts
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { 
  experimental_wrapLanguageModel as wrapLanguageModel, 
  type LanguageModelV1CallOptions,
  type LanguageModelV1,
  type LanguageModelV1Message,
  type LanguageModelV1FinishReason,
  type LanguageModelV1FunctionToolCall,
  type LanguageModelV1LogProbs
} from "ai";
import { customMiddleware } from "./custom-middleware";

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Define core message types
type CoreMessage = {
  role: 'user' | 'system' | 'assistant';
  content: string;
};

type CoreSystemMessage = {
  role: 'system';
  content: string;
};

type CoreUserMessage = {
  role: 'user';
  content: string;
};

// Create a wrapper class that implements LanguageModelV1
class GoogleAIWrapper implements LanguageModelV1 {
  private readonly model: GenerativeModel;
  readonly specificationVersion = 'v1';
  readonly provider = 'google';
  readonly modelId: string;
  readonly defaultObjectGenerationMode = 'json';

  constructor(modelName: string) {
    this.model = genAI.getGenerativeModel({ model: modelName });
    this.modelId = modelName;
  }

  async doGenerate(options: LanguageModelV1CallOptions) {
    try {
      const messages = options.input as LanguageModelV1Message[];
      
      const result = await this.model.generateContent({
        contents: messages.map(message => ({
          role: message.role === 'user' ? 'user' : 'model',
          parts: [{ text: message.content }]
        }))
      });
      
      const response = await result.response;
      const text = response.text();
      
      return {
        text: text || '',
        usage: {
          promptTokens: response.usageMetadata?.promptTokenCount || 0,
          completionTokens: response.usageMetadata?.completionTokenCount || 0
        },
        finishReason: 'stop' as LanguageModelV1FinishReason,
        rawCall: {
          rawPrompt: messages,
          rawSettings: options
        }
      };
    } catch (error) {
      console.error('Error in doGenerate:', error);
      throw error;
    }
  }

  async doStream(options: LanguageModelV1CallOptions) {
    const prompt = options.prompt as LanguageModelV1Prompt;
    const result = await this.model.generateContentStream({
      contents: prompt.map(message => ({
        role: message.role === 'user' ? 'user' : 'model',
        parts: [{ text: message.content }]
      }))
    });
    
    return {
      stream: new ReadableStream({
        async start(controller) {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue({
                type: 'text-delta',
                textDelta: text
              });
            }
          }
          controller.close();
        }
      }),
      rawCall: {
        rawPrompt: prompt,
        rawSettings: options
      }
    };
// lib/ai/index.ts
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { 
  experimental_wrapLanguageModel as wrapLanguageModel, 
  type LanguageModelV1CallOptions,
  type LanguageModelV1,
  type LanguageModelV1Message,
  type LanguageModelV1FinishReason,
  type LanguageModelV1FunctionToolCall,
  type LanguageModelV1LogProbs
} from "ai";
import { customMiddleware } from "./custom-middleware";

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Define core message types
type CoreMessage = {
  role: 'user' | 'system' | 'assistant';
  content: string;
};

type CoreSystemMessage = {
  role: 'system';
  content: string;
};

type CoreUserMessage = {
  role: 'user';
  content: string;
};

// Create a wrapper class that implements LanguageModelV1
class GoogleAIWrapper implements LanguageModelV1 {
  private readonly model: GenerativeModel;
  readonly specificationVersion = 'v1';
  readonly provider = 'google';
  readonly modelId: string;
  readonly defaultObjectGenerationMode = 'json';

  constructor(modelName: string) {
    this.model = genAI.getGenerativeModel({ model: modelName });
    this.modelId = modelName;
  }

  async doGenerate(options: LanguageModelV1CallOptions) {
    try {
      const messages = options.input as LanguageModelV1Message[];
      
      const result = await this.model.generateContent({
        contents: messages.map(message => ({
          role: message.role === 'user' ? 'user' : 'model',
          parts: [{ text: message.content }]
        }))
      });
      
      const response = await result.response;
      const text = response.text();
      
      return {
        text: text || '',
        usage: {
          promptTokens: response.usageMetadata?.promptTokenCount || 0,
          completionTokens: response.usageMetadata?.completionTokenCount || 0
        },
        finishReason: 'stop' as LanguageModelV1FinishReason,
        rawCall: {
          rawPrompt: messages,
          rawSettings: options
        }
      };
    } catch (error) {
      console.error('Error in doGenerate:', error);
      throw error;
    }
  }

  async *doStream(options: LanguageModelV1CallOptions) {
    const messages = options.input as LanguageModelV1Message[];
    const result = await this.model.generateContentStream({
      contents: messages.map(message => ({
        role: message.role === 'user' ? 'user' : 'model',
        parts: [{ text: message.content }]
      }))
    });
    
    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        yield {
          text: text,
          finishReason: 'stop' as LanguageModelV1FinishReason,
          rawChunk: chunk
        };
      }
    }
  }
}
