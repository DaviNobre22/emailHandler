import { Elysia } from "elysia";
import { redis } from "../config/redis";
import { emailQueue } from "../config/queue";

export const healthRoutes = (app: Elysia) =>
  app.get("/health", async () => {
    try {
      await redis.ping();
      const queueHealth = await emailQueue.getJobCounts();

      return {
        status: "healthy",
        redis: "connected",
        queue: queueHealth,
      };
    } catch (error) {
      return {
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  });
