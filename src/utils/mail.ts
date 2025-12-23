import { mailTransporter } from '../config/mail';

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async ({
  to,
  subject,
  html,
}: SendMailOptions) => {
  return mailTransporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    html,
  });
};
