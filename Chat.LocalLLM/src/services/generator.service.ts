import { TextGenerationConfig } from './../../node_modules/@huggingface/transformers/types/pipelines.d';
import { Chat, TextGenerationConfigCommand, TextGenerationOutput } from '../types/generation';
import { pipeline, TextGenerationPipeline, PretrainedModelOptions } from '@huggingface/transformers';
import { DEVICE_TYPE, DTYPE, HF_HOME, MODEL_ID } from '../constants';
import { singleton } from 'tsyringe';

@singleton()
export class GeneratorService {
  private _pipelineInstance: Promise<TextGenerationPipeline>;

  constructor() {
    const options: PretrainedModelOptions = {
      cache_dir: HF_HOME,
      device: DEVICE_TYPE as PretrainedModelOptions['device'],
      dtype: DTYPE as PretrainedModelOptions['dtype'],
      progress_callback: (progressInfo) => {
        switch (progressInfo.status) {
          case "initiate":
            console.log('Initiate:', progressInfo.name, progressInfo.file)
            break;
          case "download":
            console.log('Download:', progressInfo.name, progressInfo.file)
            break;
          case "progress":
            console.log('Progress:', progressInfo.name, progressInfo.file, Math.round(progressInfo.progress), '%')
            break;
          case "done":
            console.log('Done:', progressInfo.name, progressInfo.file)
            break;
          case "ready":
            console.log('Model is ready for use:', progressInfo.model, 'for task:', progressInfo.task);
            break;
        }
      }
    };

    this._pipelineInstance = pipeline<'text-generation'>('text-generation', MODEL_ID, options);
  }

  public async generateText(texts: string, options?: TextGenerationConfigCommand): Promise<TextGenerationOutput>;
  public async generateText(texts: string[], options?: TextGenerationConfigCommand): Promise<TextGenerationOutput[]>;
  public async generateText(texts: Chat, options?: TextGenerationConfigCommand): Promise<TextGenerationOutput>;
  public async generateText(texts: Chat[], options?: TextGenerationConfigCommand): Promise<TextGenerationOutput[]>;
  public async generateText(texts: string | string[] | Chat | Chat[], options?: TextGenerationConfigCommand): Promise<TextGenerationOutput | TextGenerationOutput[]> {
    const model = await this._pipelineInstance;
    const result = await model(texts, options as TextGenerationConfig);
    return result;
  }
}
