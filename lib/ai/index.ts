import { google } from "@ai-sdk/google";
import { experimental_wrapLanguageModel as wrapLanguageModel } from "ai";

export const geminiProModel = wrapLanguageModel({
  model: google("gemini-1.5-pro-002"),
});

// Optional: Flash model for faster responses
export const geminiFlashModel = wrapLanguageModel({
  model: google("gemini-1.5-flash-002"),
});