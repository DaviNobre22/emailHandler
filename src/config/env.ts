export const env = {
  apiToken: process.env.API_TOKEN || "DEFAULT",
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  email: {
    from: process.env.EMAIL_FROM || '"Async API" <noreply@example.com>',
  },

  worker: {
    concurrency: parseInt(process.env.WORKER_CONCURRENCY || "5"),
  },
};
