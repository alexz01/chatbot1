import "reflect-metadata";
import express from "express";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";
import { HF_HOME, HF_TOKEN, MODEL_ID, NODE_ENV, SERVICE_PORT } from "./constants";
import { ValidateError } from "tsoa";

const app = express();
// Use body parser to read sent json payloads
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// tsoa-generated routes
RegisterRoutes(app);

if (NODE_ENV === "development") {
  app.use("/docs", swaggerUi.serve, async (_req: express.Request, res: express.Response) => {
    return res.send(
      swaggerUi.generateHTML(await import("../build/swagger.json"))
    );
  });
  app.get("/", (_req: express.Request, res: express.Response) => {
    res.redirect("/docs");
  });

  app.use(function errorHandler(
    err: unknown,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): express.Response | void {
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).json({
        message: "Validation Failed",
        details: err?.fields,
      });
    }
    if (err instanceof Error) {
      console.error(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    next();
  });
}

app.listen(SERVICE_PORT, () => {
  console.log('environment:', NODE_ENV);
  console.log('MODEL_ID:', MODEL_ID.replace('.*', '*'));
  console.log('HF_TOKEN:', HF_TOKEN);
  console.log('HF_HOME:', HF_HOME);
  console.log(`🚀 Server running on http://localhost:${SERVICE_PORT}`);
});
