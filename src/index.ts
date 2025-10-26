import { Elysia } from "elysia";
import { emailQueue } from "./config/queue";
import { authMiddleware } from "./middlewares/auth";
import { errorHandler } from "./middlewares/error-handler";
import { emailRoutes } from "./routes/email";
import { healthRoutes } from "./routes/health";

const app = new Elysia()
  .use(errorHandler)
  .get("/", () => ({
    message: "Async Email API",
    version: "1.0.0",
  }))
  .use(healthRoutes)
  .group("/api", (app) => app.use(authMiddleware).use(emailRoutes))
  .listen(3000);

console.log(
  `API server running at http://${app.server?.hostname}:${app.server?.port}`,
);
