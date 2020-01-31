import { createTransport } from 'nodemailer'

const { EMAIL_USER, EMAIL_PASS, EMAIL_SERVICE } = process.env

export const transporter = createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
})
