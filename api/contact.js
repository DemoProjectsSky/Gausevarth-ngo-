
import nodemailer from 'nodemailer'

const clean = (value) =>
  typeof value === 'string' ? value.trim() : ''

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed.',
    })
  }

  const name = clean(req.body?.name)
  const mobile = clean(req.body?.mobile)
  const email = clean(req.body?.email)
  const reason = clean(req.body?.reason)
  const message = clean(req.body?.message)

  if (!name || !mobile || !reason || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields.',
    })
  }

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid 10-digit Indian mobile number.',
    })
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address.',
    })
  }

  const allowedReasons = [
    'Donation',
    'Volunteering',
    'Cow Rescue',
    'Gau Seva',
    'Partnership',
    'General Inquiry',
  ]

  if (!allowedReasons.includes(reason)) {
    return res.status(400).json({
      success: false,
      message: 'Please select a valid inquiry reason.',
    })
  }

  if (
    name.length > 100 ||
    mobile.length > 10 ||
    email.length > 254 ||
    message.length > 5000
  ) {
    return res.status(400).json({
      success: false,
      message: 'Some fields exceed the allowed length.',
    })
  }

  const EMAIL_USER = process.env.EMAIL_USER
  const EMAIL_PASS = process.env.EMAIL_PASS
  const CONTACT_TO = process.env.CONTACT_TO

  if (!EMAIL_USER || !EMAIL_PASS || !CONTACT_TO) {
    console.error('Email environment variables are missing.')

    return res.status(500).json({
      success: false,
      message: 'Email service is not configured. Please try again later.',
    })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Gausevarth NGO Website" <${EMAIL_USER}>`,
      to: CONTACT_TO,
      replyTo: email || undefined,
      subject: `NGO Contact Form - ${reason}`,
      text: [
        'New message received from the Gausevarth NGO website.',
        '',
        `Name: ${name}`,
        `Mobile: ${mobile}`,
        `Email: ${email || 'Not provided'}`,
        `Reason: ${reason}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    })

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!',
    })
  } catch (error) {
    console.error('Contact email failed:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Unable to send your message right now. Please try again later.',
    })
  }
}
