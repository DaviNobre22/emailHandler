import { Elysia } from "elysia";

export const errorHandler = (app: Elysia) =>
  app.onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      set.status = 400;
      return {
        success: false,
        error: "Validation failed",
        details: error.message,
      };
    }

    if (error instanceof Error && error.message.includes("authorization")) {
      return {
        success: false,
        error: error.message,
      };
    }

    set.status = 500;
    return {
      success: false,
      error: "Internal server error",
    };
  });
