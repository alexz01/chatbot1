import { TextGenerationOutput } from './../models/generation.model';
import { pipeline, env, TextGenerationPipeline, PretrainedModelOptions } from '@huggingface/transformers';
import { ENABLE_GPU, HF_HOME, MODEL_ID } from '../constants';
import { singleton } from 'tsyringe';

@singleton()
export class GeneratorService {
  private _pipelineInstance: Promise<TextGenerationPipeline>;

  constructor() {
    env.cacheDir = HF_HOME;

    const options: PretrainedModelOptions = {};

    if (ENABLE_GPU) {
      options['device'] = 'webgpu';
    }

    this._pipelineInstance = pipeline<'text-generation'>('text-generation', MODEL_ID, options);
  }

  public async generateText(inputText: string): Promise<TextGenerationOutput | TextGenerationOutput[]> {
    const model = await this._pipelineInstance;
    const result = await model(inputText);
    return result;
  }
}
