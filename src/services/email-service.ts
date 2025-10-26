import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { EmailJobData } from '../config/queue';

export async function createEmailService() {
  let transporter: nodemailer.Transporter;

  if (env.smtp.host && env.smtp.user && env.smtp.pass) {
    transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.secure,
      auth: {
        user: env.smtp.user,
        pass: env.smtp.pass,
      },
    });
    
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    
  }

  return {
    async sendEmail(data: EmailJobData) {
      const { to, subject, text } = data;

      const info = await transporter.sendMail({
        from: env.email.from,
        to,
        subject,
        text,
      });

      console.log(`Email sent`);
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Message ID: ${info.messageId}`);

      if (info.messageId && !env.smtp.host) {
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
          console.log(`   Preview: ${previewUrl}`);
        }
      }

      return info;
    },
  };
}