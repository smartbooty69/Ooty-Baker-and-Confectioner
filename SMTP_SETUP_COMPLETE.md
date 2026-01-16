# SMTP Setup - What's Done & What's Next

## ✅ What's Been Completed

### 1. Password Reset Script ✅
- **Status:** Tested and working
- **Test Result:** Successfully reset password for `clancymendonca@gmail.com`
- **Usage:** `npm run reset-password <email> <new-password>`
- **Documentation:** `PASSWORD_RESET_SCRIPT.md`

### 2. SMTP Test Script ✅
- **Status:** Created and ready to use
- **Command:** `npm run test-smtp`
- **Features:**
  - Validates all SMTP environment variables
  - Tests SMTP connection
  - Sends test email
  - Provides helpful error messages

### 3. Documentation Created ✅
- `SMTP_SETUP_STEPS.md` - Detailed step-by-step guide
- `QUICK_SMTP_SETUP.md` - 5-minute quick setup
- `SMTP_CONFIGURATION_GUIDE.md` - Complete reference
- `PASSWORD_RESET_SCRIPT.md` - Script usage guide

### 4. Package.json Updated ✅
- Added `test-smtp` script for easy testing

## ⚠️ What You Need to Do

### Step 1: Add SMTP Credentials to `.env.local`

Your `.env.local` file exists but needs actual SMTP credentials. Choose one:

#### Option A: Mailtrap (Easiest for Testing)

1. Sign up at https://mailtrap.io (free)
2. Create an inbox
3. Copy SMTP credentials
4. Add to `.env.local`:

```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-username
SMTP_PASSWORD=your-mailtrap-password
SMTP_FROM=noreply@ootybaker.com
```

#### Option B: Gmail (For Production)

1. Enable 2FA on Google Account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
SMTP_FROM=your-email@gmail.com
```

### Step 2: Test SMTP Configuration

```bash
npm run test-smtp
```

**Expected Output:**
```
✅ SMTP configuration is working correctly!
```

### Step 3: Test Password Reset

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Go to: `http://localhost:3000/auth`
3. Click "Forgot Password"
4. Enter: `clancymendonca@gmail.com`
5. Check for OTP email:
   - **Mailtrap:** Check inbox dashboard
   - **Gmail:** Check email inbox

## 📋 Quick Reference

### Test SMTP:
```bash
npm run test-smtp
```

### Reset Password (Script):
```bash
npm run reset-password clancymendonca@gmail.com newpassword123
```

### Start Dev Server:
```bash
npm run dev
```

## 📚 Documentation Files

- **Quick Start:** `QUICK_SMTP_SETUP.md` (5 minutes)
- **Detailed Guide:** `SMTP_SETUP_STEPS.md` (step-by-step)
- **Complete Reference:** `SMTP_CONFIGURATION_GUIDE.md`
- **Script Guide:** `PASSWORD_RESET_SCRIPT.md`

## 🎯 Current Status

| Task | Status |
|------|--------|
| Password Reset Script | ✅ Tested & Working |
| SMTP Test Script | ✅ Created & Ready |
| Documentation | ✅ Complete |
| SMTP Credentials | ⚠️ **Need to add to .env.local** |
| SMTP Testing | ⏳ Waiting for credentials |
| Password Reset Testing | ⏳ Waiting for SMTP setup |

## 🚀 Next Steps

1. **Add SMTP credentials** to `.env.local` (see Step 1 above)
2. **Run test:** `npm run test-smtp`
3. **Test password reset** via web interface
4. **Verify OTP emails** are received

## 💡 Tips

- **For Development:** Use Mailtrap (no real emails, free, easy)
- **For Production:** Use Gmail with App Password or custom SMTP
- **Testing:** The password reset script works without SMTP (for admin use)
- **Security:** Never commit `.env.local` to git

## 🆘 Need Help?

- **Quick Setup:** See `QUICK_SMTP_SETUP.md`
- **Detailed Steps:** See `SMTP_SETUP_STEPS.md`
- **Troubleshooting:** See `SMTP_CONFIGURATION_GUIDE.md`
- **Script Usage:** See `PASSWORD_RESET_SCRIPT.md`

---

**You're almost there!** Just add your SMTP credentials to `.env.local` and run the test. 🎉
