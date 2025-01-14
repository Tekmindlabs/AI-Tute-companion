// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'gemini-1.5-pro',
    label: 'Gemini 1.5 Pro',
    apiIdentifier: 'gemini-1.5-pro-002',
    description: 'For complex, multi-step tasks with advanced capabilities',
  },
  {
    id: 'gemini-1.5-flash',
    label: 'Gemini 1.5 Flash',
    apiIdentifier: 'gemini-1.5-flash-002',
    description: 'Fast, efficient model for lightweight tasks',
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'gemini-1.5-flash';