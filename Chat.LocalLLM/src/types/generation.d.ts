import { TextGenerationSpecificParams } from '@huggingface/transformers';
import { GenerationConfig as HF_GenerationConfigOriginal } from './../../node_modules/@huggingface/transformers/types/generation/configuration_utils.d';

export type Partial2<T> = {
  [K in keyof T]?: T[K] | null;
};

export interface Message {
  role: string;
  content: string;
}

export type Chat = Message[];

export interface TextGenerationSingle {
  generated_text: string | Chat;
}
export type TextGenerationOutput = TextGenerationSingle[];

export interface GenerationConfig extends Omit<HF_GenerationConfigOriginal, 'forced_decoder_ids' | 'exponential_decay_length_penalty' | 'streamer'> {
  forced_decoder_ids: Array<(number | string)>[] | null = null;
  exponential_decay_length_penalty: number[] | null = null;
}

export type TextGenerationConfig = GenerationConfig & TextGenerationSpecificParams;

export type TextGenerationConfigCommand = Partial2<TextGenerationConfig>;
