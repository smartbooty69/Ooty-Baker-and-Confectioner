# Email Setup Guide

This guide provides detailed instructions for configuring email functionality in the Ooty Baker Next.js application.

## Why Email is Needed

The application uses email to:
- Send OTP (One-Time Password) codes for password reset
- Verify user identity during password recovery

## Quick Setup Options

### 🚀 Quick Start: Mailtrap (Recommended for Development)

**Best for:** Development and testing

1. Sign up at [mailtrap.io](https://mailtrap.io) (free)
2. Create an inbox
3. Copy SMTP credentials
4. Add to `.env`:

```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-username
SMTP_PASSWORD=your-mailtrap-password
SMTP_FROM=noreply@ootybaker.com
```

**Advantages:**
- ✅ Free tier (500 emails/month)
- ✅ No real emails sent
- ✅ View emails in dashboard
- ✅ No authentication setup needed

### 📧 Gmail Setup (Production Ready)

**Best for:** Production with Gmail account

1. **Enable 2-Factor Authentication:**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password:**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Copy the 16-character password

3. **Update `.env`:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
SMTP_FROM=your-email@gmail.com
```

**Important:** Remove spaces from the App Password when pasting.

### 🏢 Custom SMTP Server

**Best for:** Production with your own domain

If you have your own email server or use a service like:
- SendGrid
- Mailgun
- AWS SES
- Postmark

Update `.env` with your provider's SMTP settings:

```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASSWORD=your-password
SMTP_FROM=noreply@yourdomain.com
```

## Email Provider Comparison

| Provider | Free Tier | Best For | Setup Difficulty |
|----------|-----------|----------|------------------|
| Mailtrap | 500/month | Development | ⭐ Easy |
| Gmail | Unlimited* | Small scale | ⭐⭐ Medium |
| SendGrid | 100/day | Production | ⭐⭐⭐ Medium |
| Mailgun | 5,000/month | Production | ⭐⭐⭐ Medium |
| AWS SES | 62,000/month | Large scale | ⭐⭐⭐⭐ Hard |

*Gmail has daily sending limits (~500 emails/day for free accounts)

## Testing Your Email Setup

### Method 1: Test via Application

1. Start the server: `npm run dev`
2. Navigate to `/auth`
3. Click "Forgot Password"
4. Enter a registered email
5. Check your inbox (or Mailtrap dashboard)

### Method 2: Test Script

Create `test-email.js`:

```javascript
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter.sendMail({
  from: process.env.SMTP_FROM,
  to: 'test@example.com',
  subject: 'Test Email',
  html: '<h1>Email is working!</h1>',
})
.then(() => console.log('Email sent successfully!'))
.catch((error) => console.error('Error:', error));
```

Run: `node test-email.js`

## Common Issues & Solutions

### Issue: "Authentication failed"

**Solutions:**
- ✅ Verify username and password are correct
- ✅ For Gmail, ensure you're using App Password, not regular password
- ✅ Check if 2FA is enabled (required for Gmail App Passwords)
- ✅ Verify SMTP credentials match your email provider

### Issue: "Connection timeout"

**Solutions:**
- ✅ Check SMTP host and port are correct
- ✅ Verify firewall isn't blocking port 587/465
- ✅ Try port 465 with `secure: true` (SSL)
- ✅ Check if your network allows SMTP connections

### Issue: "Email not received"

**Solutions:**
- ✅ Check spam/junk folder
- ✅ Verify recipient email is correct
- ✅ Check email provider's sending limits
- ✅ Verify SMTP_FROM address is valid
- ✅ Check Mailtrap dashboard if using Mailtrap

### Issue: Gmail "Less secure app" error

**Solution:**
- ✅ Use App Password instead of regular password
- ✅ App Passwords don't require "less secure app" access

## Security Best Practices

1. **Never commit `.env` file** to version control
2. **Use App Passwords** instead of main account passwords
3. **Rotate passwords** regularly
4. **Use environment-specific** email accounts for production
5. **Monitor email sending** for unusual activity
6. **Set up SPF/DKIM** records for your domain (production)

## Production Recommendations

For production, consider:

1. **Dedicated Email Service:**
   - SendGrid, Mailgun, or AWS SES
   - Better deliverability
   - Analytics and tracking
   - Higher sending limits

2. **Email Templates:**
   - Professional HTML templates
   - Brand consistency
   - Better user experience

3. **Email Queue:**
   - Use a queue system (Bull, BullMQ)
   - Handle failures gracefully
   - Retry failed sends

4. **Monitoring:**
   - Track email delivery rates
   - Monitor bounce rates
   - Set up alerts for failures

## Environment Variables Reference

```env
# Required
SMTP_HOST=smtp.example.com        # SMTP server hostname
SMTP_PORT=587                     # SMTP port (587 for TLS, 465 for SSL)
SMTP_USER=username                # SMTP username
SMTP_PASSWORD=password            # SMTP password
SMTP_FROM=noreply@example.com     # From email address

# Optional (for SSL/TLS)
SMTP_SECURE=false                 # true for SSL (port 465), false for TLS (port 587)
```

## Need Help?

If you're still having issues:
1. Check the application logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test with Mailtrap first to isolate the issue
4. Check your email provider's documentation

For production issues, contact your email service provider's support.
