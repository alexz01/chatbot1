export const SERVICE_PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";

export const HF_TOKEN = process.env.HF_TOKEN || '';
export const HF_HOME = process.env.HF_HOME || '/.hf';
export const MODEL_ID = process.env.MODEL_ID || 'openai-community/gpt2';
export const DEVICE_TYPE = process.env.DEVICE_TYPE || 'cpu'; // 'cpu', 'gpu', 'webgpu'
export const DTYPE = process.env.DTYPE || 'fp32'; // 'fp32', 'fp16', 'q4', 'q8'
