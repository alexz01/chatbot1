
import { TextGenerationConfigCommand, TextGenerationOutput } from '../types/generation';
import { GeneratorService } from './../services/generator.service';
import { Body, Controller, Post, Route } from "tsoa";
import { injectable } from "tsyringe";

@injectable()
@Route("generator")
export class GeneratorController extends Controller {

  constructor(private generatorService: GeneratorService) {
    super();
  }

  @Post("/hello-world")
  public async getDefault(@Body() options: TextGenerationConfigCommand): Promise<TextGenerationOutput> {
    return await this.generatorService.generateText("Hello, world!", options);
  }

  @Post("/")
  public async generateText(@Body() input: { text: string }): Promise<TextGenerationOutput | TextGenerationOutput[]> {
    const response = await this.generatorService.generateText(input.text);
    return response;
  }
}
