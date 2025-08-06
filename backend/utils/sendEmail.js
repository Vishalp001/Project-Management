import nodemailer from 'nodemailer'
import { config } from 'dotenv'

config()

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // your app password
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  }

  await transporter.sendMail(mailOptions)
}

export default sendEmail
