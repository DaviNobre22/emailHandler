import { Worker } from "bullmq";
import { redis } from "./config/redis";
import { QUEUEMAIL, EmailJobData } from "./config/queue";
import { env } from "./config/env";
import { createEmailService } from "./services/email-service";

async function startWorker() {
  const emailService = await createEmailService();

  const worker = new Worker<EmailJobData>(
    QUEUEMAIL,
    async (job) => {
      console.log(`Processing email job ${job.id}...`);

      try {
        await emailService.sendEmail(job.data);
        return { success: true, messageId: job.id };
      } catch (error) {
        console.error(`❌ Failed to send email - Job ID: ${job.id}`, error);
        throw error;
      }
    },
    {
      connection: redis,
      concurrency: env.worker.concurrency,
      limiter: {
        max: 10,
        duration: 1000,
      },
    },
  );

  worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed successfully`);
  });

  worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed:`, err.message);
  });

  worker.on("error", (err) => {
    console.error("Worker error:", err);
  });

  console.log("Email worker started and listening for jobs...");
}

startWorker().catch((error) => {
  console.error("Failed to start worker:", error);
  process.exit(1);
});
