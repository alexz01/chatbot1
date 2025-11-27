export interface Message {
  role: string;
  content: string;
}

export type Chat = Message[];

export interface TextGenerationSingle {
  generated_text: string | Chat;
}
export type TextGenerationOutput = TextGenerationSingle[];
