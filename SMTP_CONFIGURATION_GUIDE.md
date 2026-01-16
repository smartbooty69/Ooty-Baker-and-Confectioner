# SMTP Configuration Quick Start

## Quick Setup for Email Functionality

This guide helps you quickly configure SMTP for password reset emails.

## Option 1: Mailtrap (Recommended for Development) ⭐

**Best for:** Testing and development

1. **Sign up:** Go to [mailtrap.io](https://mailtrap.io) (free account)
2. **Create inbox:** Click "Add Inbox" → Copy SMTP credentials
3. **Add to `.env.local`:**

```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-username
SMTP_PASSWORD=your-mailtrap-password
SMTP_FROM=noreply@ootybaker.com
```

4. **Test:** Start app and try password reset - emails appear in Mailtrap dashboard

**Advantages:**
- ✅ Free (500 emails/month)
- ✅ No real emails sent
- ✅ View emails in dashboard
- ✅ Perfect for testing

---

## Option 2: Gmail (Production Ready)

**Best for:** Production with Gmail account

### Setup Steps:

1. **Enable 2-Factor Authentication:**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable "2-Step Verification"

2. **Generate App Password:**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Enter "Ooty Baker" as name
   - Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)

3. **Add to `.env.local`:**

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
SMTP_FROM=your-email@gmail.com
```

**Important:** Remove spaces from the App Password when pasting:
```env
SMTP_PASSWORD=xxxxxxxxxxxxxxxx
```

4. **Test:** Try password reset - check your email inbox

---

## Option 3: Custom SMTP (SendGrid, Mailgun, etc.)

**Best for:** Production with your own email service

1. **Get SMTP credentials** from your email service provider
2. **Add to `.env.local`:**

```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASSWORD=your-password
SMTP_FROM=noreply@yourdomain.com
```

---

## Testing Your Configuration

### Method 1: Via Application

1. Start the app: `npm run dev`
2. Navigate to: `http://localhost:3000/auth`
3. Click "Forgot Password"
4. Enter a registered email
5. Check:
   - **Mailtrap:** Dashboard inbox
   - **Gmail/Custom:** Email inbox (check spam folder)

### Method 2: Check Console (Development Mode)

If SMTP is not configured, the OTP will be logged to console:

```
[DEV] OTP for user@example.com: 123456
```

This allows testing without email setup.

---

## Troubleshooting

### "Authentication failed"

**Solutions:**
- ✅ Verify username and password are correct
- ✅ For Gmail, ensure you're using App Password (not regular password)
- ✅ Check if 2FA is enabled (required for Gmail App Passwords)
- ✅ Verify SMTP credentials match your email provider

### "Connection timeout"

**Solutions:**
- ✅ Check SMTP host and port are correct
- ✅ Verify firewall isn't blocking port 587/465
- ✅ Try port 465 with `secure: true` (SSL)
- ✅ Check if your network allows SMTP connections

### "Email not received"

**Solutions:**
- ✅ Check spam/junk folder
- ✅ Verify recipient email is correct
- ✅ Check email provider's sending limits
- ✅ Verify SMTP_FROM address is valid
- ✅ Check Mailtrap dashboard if using Mailtrap

### Gmail "Less secure app" error

**Solution:**
- ✅ Use App Password instead of regular password
- ✅ App Passwords don't require "less secure app" access

---

## Environment Variables Reference

Add these to your `.env.local` file:

```env
# Required for email functionality
SMTP_HOST=smtp.example.com        # SMTP server hostname
SMTP_PORT=587                       # SMTP port (587 for TLS, 465 for SSL)
SMTP_USER=username                  # SMTP username
SMTP_PASSWORD=password              # SMTP password
SMTP_FROM=noreply@example.com      # From email address
```

---

## Current Status

- ✅ Email sending code implemented (nodemailer)
- ✅ OTP generation works
- ✅ Development fallback (console logging)
- ⚠️ **Action Required:** Configure SMTP credentials in `.env.local`

---

## Next Steps

1. Choose an email provider (Mailtrap for dev, Gmail/custom for production)
2. Add SMTP credentials to `.env.local`
3. Test password reset functionality
4. Verify emails are received

---

## Related Documentation

- `EMAIL_SETUP.md` - Detailed email setup guide
- `ENV_SETUP.md` - Complete environment variables guide
- `PASSWORD_RESET_SCRIPT.md` - Alternative password reset method (no email needed)

---

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use App Passwords** instead of main account passwords
3. **Rotate passwords** regularly
4. **Use environment-specific** email accounts for production
5. **Monitor email sending** for unusual activity
