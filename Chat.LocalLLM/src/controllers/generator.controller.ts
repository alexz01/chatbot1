import { TextGenerationOutput } from './../models/generation.model';
import { GeneratorService } from './../services/generator.service';
import { Body, Controller, Get, Post, Route } from "tsoa";
import { injectable } from "tsyringe";

@injectable()
@Route("generator")
export class GeneratorController extends Controller {

  constructor(private generatorService: GeneratorService) {
    super();
  }

  @Get("/")
  public async getDefault(): Promise<TextGenerationOutput | TextGenerationOutput[]> {
    return await this.generatorService.generateText("Hello, world!");
  }

  @Post("/")
  public async generateText(@Body() input: { text: string }): Promise<TextGenerationOutput | TextGenerationOutput[]> {
    const response = await this.generatorService.generateText(input.text);
    return response;
  }
}
