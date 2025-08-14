import path from "path";
import hbs from "nodemailer-express-handlebars";
import { transporter } from "./transporter";
import { IEmailOptions } from "@/types/email";

const handlebarOptions = {
  viewEngine: {
    extname: ".handlebars",
    defaultLayout: undefined,
    partialsDir: path.join(process.cwd(), "templates"),
  },
  viewPath: path.join(process.cwd(), "templates"),
  extName: ".handlebars",
};

transporter.use("compile", hbs(handlebarOptions));

export default async function sendMail({
  to,
  subject,
  context,
  template,
}: IEmailOptions) {
  const from = process.env.SMTP_EMAIL;
  const mailOptions = {
    from,
    replyTo: from,
    to,
    subject,
    template,
    context: {
      ...context,
      year: new Date().getFullYear(),
      companyLink: `${process.env.NEXT_PUBLIC_APP_URL}`,
    },
  };

  return transporter.sendMail(mailOptions);
}
