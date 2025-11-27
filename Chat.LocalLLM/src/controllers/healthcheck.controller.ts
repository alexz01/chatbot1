import { Controller, Get, Route } from "tsoa";
import { injectable } from "tsyringe";

@injectable()
@Route("healthcheck")
export class HealthcheckController extends Controller {

    @Get("/")
    public async getMessage(): Promise<{ message: string }> {
        return { message: "Everything works!" };
    }
}
