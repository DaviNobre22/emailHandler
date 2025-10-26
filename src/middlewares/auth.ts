import { Elysia } from "elysia";
import { env } from "../config/env";

export const authMiddleware = (app: Elysia) =>
  app.derive(({ headers, set }) => {
    const auth = headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      set.status = 401;
      throw new Error("Missing or invalid authorization header");
    }

    const token = auth.substring(7);

    if (token !== env.apiToken) {
      set.status = 401;
      throw new Error("Invalid token");
    }

    return {};
  });
