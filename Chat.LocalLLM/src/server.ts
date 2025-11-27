import "reflect-metadata";
import express from "express";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";
import { HF_HOME, HF_TOKEN, MODEL_ID, NODE_ENV, SERVICE_PORT } from "./constants";

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
}

app.listen(SERVICE_PORT, () => {
  console.log('environment:', NODE_ENV);
  console.log('MODEL_ID:', MODEL_ID.replace('.*', '*'));
  console.log('HF_TOKEN:', HF_TOKEN);
  console.log('HF_HOME:', HF_HOME);
  console.log(`🚀 Server running on http://localhost:${SERVICE_PORT}`);
});
