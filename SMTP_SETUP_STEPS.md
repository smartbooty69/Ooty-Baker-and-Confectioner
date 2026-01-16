# SMTP Setup - Step by Step Guide

## ✅ Current Status

- ✅ Password reset script tested and working
- ✅ SMTP test script created (`npm run test-smtp`)
- ⚠️ SMTP credentials need to be configured in `.env.local`

## Step 1: Choose Your SMTP Provider

### Option A: Mailtrap (Recommended for Testing) ⭐

**Best for:** Development and testing (no real emails sent)

1. **Sign up for free:** Go to [https://mailtrap.io](https://mailtrap.io)
2. **Create an inbox:**
   - Click "Add Inbox" or "Create Inbox"
   - Give it a name (e.g., "Ooty Baker Dev")
3. **Copy SMTP credentials:**
   - Click on your inbox
   - Go to "SMTP Settings" tab
   - Select "Node.js - Nodemailer" from the dropdown
   - Copy the credentials shown

### Option B: Gmail (Production Ready)

**Best for:** Production with Gmail account

1. **Enable 2-Factor Authentication:**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Click "2-Step Verification" → Enable it

2. **Generate App Password:**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" as app type
   - Select "Other (Custom name)" as device
   - Enter "Ooty Baker" as name
   - Click "Generate"
   - **Copy the 16-character password** (format: `xxxx xxxx xxxx xxxx`)

## Step 2: Update `.env.local`

Open your `.env.local` file and update the SMTP section:

### For Mailtrap:

```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-username-here
SMTP_PASSWORD=your-mailtrap-password-here
SMTP_FROM=noreply@ootybaker.com
```

### For Gmail:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-character-app-password
SMTP_FROM=your-email@gmail.com
```

**Important for Gmail:**
- Remove spaces from the App Password when pasting
- Use the 16-character App Password, NOT your regular Gmail password
- The App Password format is `xxxx xxxx xxxx xxxx` but paste as `xxxxxxxxxxxxxxxx`

## Step 3: Test SMTP Configuration

Run the test script:

```bash
npm run test-smtp
```

### Expected Success Output:

```
🧪 Testing SMTP Configuration...

✅ All SMTP environment variables are set
   Host: smtp.mailtrap.io
   Port: 2525
   User: your-username
   From: noreply@ootybaker.com

🔌 Testing SMTP connection...
✅ SMTP connection successful!

📧 Sending test email to your-email@example.com...
✅ Test email sent successfully!
   Message ID: <...>

💡 Check your Mailtrap inbox dashboard to view the email
   (or check your inbox if using Gmail)

🎉 SMTP configuration is working correctly!
```

### If Test Fails:

**Authentication Error:**
- ✅ Verify username and password are correct
- ✅ For Gmail: Ensure you're using App Password (not regular password)
- ✅ For Gmail: Check that 2FA is enabled

**Connection Error:**
- ✅ Verify SMTP_HOST and SMTP_PORT are correct
- ✅ Check firewall isn't blocking the connection
- ✅ Try port 465 with `secure: true` for SSL

## Step 4: Test Password Reset Functionality

### Method 1: Via Web Interface

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to password reset:**
   - Go to: `http://localhost:3000/auth`
   - Click "Forgot Password"
   - Enter: `clancymendonca@gmail.com` (or your test user email)

3. **Check for OTP:**
   - **Mailtrap:** Check your Mailtrap inbox dashboard
   - **Gmail:** Check your email inbox (and spam folder)

### Method 2: Via API (Using curl or Postman)

```bash
# Send OTP
curl -X POST http://localhost:3000/api/auth/otp \
  -H "Content-Type: application/json" \
  -d '{"action": "send-otp", "email": "clancymendonca@gmail.com"}'
```

Expected response:
```json
{
  "success": true,
  "message": "OTP sent to your email"
}
```

## Step 5: Verify Everything Works

### ✅ Checklist:

- [ ] SMTP test script passes (`npm run test-smtp`)
- [ ] Test email received (in Mailtrap dashboard or inbox)
- [ ] Password reset OTP email received
- [ ] Can verify OTP and reset password via web interface

## Troubleshooting

### Issue: "Missing required environment variables"

**Solution:**
- Ensure `.env.local` exists in project root
- Verify all SMTP variables are set (no empty values)
- Restart your terminal/IDE after updating `.env.local`

### Issue: "Authentication failed"

**For Gmail:**
- ✅ Use App Password (not regular password)
- ✅ Ensure 2FA is enabled
- ✅ Remove spaces from App Password

**For Mailtrap:**
- ✅ Copy credentials exactly from Mailtrap dashboard
- ✅ Ensure you're using the correct inbox credentials

### Issue: "Connection timeout"

**Solution:**
- ✅ Check SMTP_HOST and SMTP_PORT are correct
- ✅ Verify firewall/antivirus isn't blocking
- ✅ Try different port (587 for TLS, 465 for SSL)

### Issue: "Email not received"

**For Mailtrap:**
- ✅ Check Mailtrap inbox dashboard (emails don't go to real inbox)
- ✅ Verify you're checking the correct inbox

**For Gmail:**
- ✅ Check spam/junk folder
- ✅ Verify recipient email is correct
- ✅ Check Gmail sending limits (500/day for free accounts)

## Quick Reference

### Test SMTP:
```bash
npm run test-smtp
```

### Reset Password via Script:
```bash
npm run reset-password <email> <new-password>
```

### Start Dev Server:
```bash
npm run dev
```

### View Database:
```bash
npm run db:studio
```

## Next Steps After Setup

1. ✅ Test password reset flow end-to-end
2. ✅ Verify OTP emails are received
3. ✅ Test with different user accounts
4. ✅ Document your SMTP provider for team members
5. ✅ Set up production SMTP (if different from dev)

## Security Reminders

- ⚠️ Never commit `.env.local` to version control
- ⚠️ Use App Passwords (not regular passwords) for Gmail
- ⚠️ Rotate SMTP passwords regularly
- ⚠️ Use different SMTP accounts for dev/production
- ⚠️ Monitor email sending for unusual activity

## Related Documentation

- `SMTP_CONFIGURATION_GUIDE.md` - Detailed SMTP setup guide
- `PASSWORD_RESET_SCRIPT.md` - Password reset script guide
- `EMAIL_SETUP.md` - Complete email configuration guide
- `ENV_SETUP.md` - Environment variables reference
