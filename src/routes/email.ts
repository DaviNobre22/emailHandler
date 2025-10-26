import { Elysia, t } from 'elysia';
import { emailQueue } from '../config/queue';

export const emailRoutes = (app: Elysia) =>
  app.post(
    '/send-email',
    async ({ body, set }) => {
      try {
        const job = await emailQueue.add('send-email', {
          to: body.to,
          subject: body.subject,
          text: body.text,
          timestamp: new Date().toISOString(),
        });

        set.status = 202;
        return {
          success: true,
          message: 'Email queued for delivery',
          jobId: job.id,
        };
      } catch (error) {
        set.status = 500;
        return {
          success: false,
          error: 'Failed to queue email',
        };
      }
    },
    {
      body: t.Object({
        to: t.String({ format: 'email' }),
        subject: t.String({ minLength: 1, maxLength: 255 }),
        text: t.String({ minLength: 1, maxLength: 10000 }),
      }),
    }
  );