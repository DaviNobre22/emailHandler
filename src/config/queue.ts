import { Queue } from "bullmq";
import { redis } from "./redis";

export const QUEUEMAIL = `email-queue`;

export const emailQueue = new Queue(QUEUEMAIL, {
  connection: redis,
});

export interface EmailJobData {
  to: string;
  subject: string;
  text: string;
  timestamp: string;
}
