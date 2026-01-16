# Quick SMTP Setup - 5 Minutes

## 🚀 Fastest Setup: Mailtrap (Recommended)

### 1. Sign Up (1 minute)
- Go to: https://mailtrap.io
- Sign up (free account)
- Create an inbox

### 2. Copy Credentials (30 seconds)
- Click your inbox → "SMTP Settings" → "Node.js - Nodemailer"
- Copy the credentials shown

### 3. Update `.env.local` (1 minute)

Add these lines to your `.env.local`:

```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=paste-your-mailtrap-username-here
SMTP_PASSWORD=paste-your-mailtrap-password-here
SMTP_FROM=noreply@ootybaker.com
```

### 4. Test (1 minute)

```bash
npm run test-smtp
```

If you see ✅ "SMTP configuration is working correctly!" - you're done!

### 5. Test Password Reset (1 minute)

```bash
npm run dev
```

Then go to: `http://localhost:3000/auth` → "Forgot Password"

Check your Mailtrap inbox dashboard for the OTP email.

---

## 📧 Gmail Setup (For Production)

### 1. Enable 2FA
- Go to: https://myaccount.google.com/security
- Enable "2-Step Verification"

### 2. Generate App Password
- Go to: https://myaccount.google.com/apppasswords
- Select "Mail" → "Other" → Enter "Ooty Baker"
- Copy the 16-character password

### 3. Update `.env.local`

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=paste-16-char-app-password-here
SMTP_FROM=your-email@gmail.com
```

**Important:** Remove spaces from App Password (paste as one string)

### 4. Test

```bash
npm run test-smtp
```

---

## ✅ Verification

### Test SMTP:
```bash
npm run test-smtp
```

### Test Password Reset:
1. `npm run dev`
2. Go to `/auth` → "Forgot Password"
3. Enter your email
4. Check inbox (Mailtrap dashboard or email)

---

## 🆘 Quick Troubleshooting

**"Missing environment variables"**
→ Check `.env.local` has all SMTP_* variables

**"Authentication failed" (Gmail)**
→ Use App Password, not regular password

**"Connection timeout"**
→ Check SMTP_HOST and SMTP_PORT are correct

**"Email not received" (Mailtrap)**
→ Check Mailtrap inbox dashboard (not real email)

---

## 📚 More Help

- `SMTP_SETUP_STEPS.md` - Detailed step-by-step guide
- `SMTP_CONFIGURATION_GUIDE.md` - Complete reference
- `EMAIL_SETUP.md` - Full email setup documentation
