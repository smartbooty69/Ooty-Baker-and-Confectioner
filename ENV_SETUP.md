# Environment Variables Setup Guide

## File Priority in Next.js

Next.js loads environment variables in this order (higher priority overrides lower):
1. `.env.local` - **Local overrides (ignored by git)** ✅ Use this for development
2. `.env.development` - Development environment
3. `.env` - Default values
4. `.env.production` - Production environment

**Recommendation:** Use `.env.local` for your local development setup.

---

## Complete `.env.local` Template

Copy this into your `.env.local` file and fill in your actual values:

```env
# ============================================
# DATABASE CONFIGURATION
# ============================================
# Format: mysql://username:password@host:port/database
# Example with password: mysql://root:mypassword@localhost:3306/ooty_baker
# Example without password: mysql://root@localhost:3306/ooty_baker
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/ooty_baker"

# ============================================
# NEXTAUTH CONFIGURATION
# ============================================
# URL where your app is running
NEXTAUTH_URL=http://localhost:3000

# Secret key for session encryption
# Generate one with: openssl rand -base64 32
# Or use: https://generate-secret.vercel.app/32
NEXTAUTH_SECRET=your-random-secret-key-minimum-32-characters-long

# ============================================
# EMAIL CONFIGURATION (SMTP)
# ============================================
# For Gmail:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
SMTP_FROM=your-email@gmail.com

# For Mailtrap (Development/Testing):
# SMTP_HOST=smtp.mailtrap.io
# SMTP_PORT=2525
# SMTP_USER=your-mailtrap-username
# SMTP_PASSWORD=your-mailtrap-password
# SMTP_FROM=noreply@ootybaker.com

# ============================================
# NODE ENVIRONMENT
# ============================================
NODE_ENV=development
```

---

## Step-by-Step Configuration

### 1. Database URL

**Format:** `mysql://username:password@host:port/database`

**Examples:**
```env
# With password
DATABASE_URL="mysql://root:mypassword123@localhost:3306/ooty_baker"

# Without password (if MySQL has no root password)
DATABASE_URL="mysql://root@localhost:3306/ooty_baker"

# Custom user
DATABASE_URL="mysql://ooty_user:password123@localhost:3306/ooty_baker"

# Remote database
DATABASE_URL="mysql://user:pass@db.example.com:3306/ooty_baker"
```

**How to find your values:**
- Username: Usually `root` for local MySQL
- Password: Your MySQL root password (or leave blank if none)
- Host: `localhost` for local, or your database server address
- Port: Usually `3306` (MySQL default)
- Database: `ooty_baker` (your database name)

### 2. NEXTAUTH_SECRET

Generate a random secret key:

**Option A: Using OpenSSL (if installed)**
```bash
openssl rand -base64 32
```

**Option B: Online Generator**
Visit: https://generate-secret.vercel.app/32

**Option C: Manual**
Just type any random string at least 32 characters long.

**Example:**
```env
NEXTAUTH_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

### 3. Email Configuration

#### Option A: Gmail (Production Ready)

1. Enable 2-Factor Authentication on your Google Account
2. Go to: https://myaccount.google.com/apppasswords
3. Generate App Password for "Mail"
4. Copy the 16-character password

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop  # Remove spaces when pasting
SMTP_FROM=your-email@gmail.com
```

#### Option B: Mailtrap (Development/Testing)

1. Sign up at https://mailtrap.io (free)
2. Create an inbox
3. Copy SMTP credentials

```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-username
SMTP_PASSWORD=your-mailtrap-password
SMTP_FROM=noreply@ootybaker.com
```

**Note:** You can skip email setup initially if you don't need password reset functionality right away.

---

## Quick Setup Checklist

- [ ] Set `DATABASE_URL` with your MySQL credentials
- [ ] Generate and set `NEXTAUTH_SECRET`
- [ ] Set `NEXTAUTH_URL` to `http://localhost:3000`
- [ ] (Optional) Configure email settings
- [ ] Set `NODE_ENV=development`

---

## Testing Your Configuration

After setting up `.env.local`:

1. **Test Database Connection:**
   ```bash
   npm run db:push
   ```
   If this works, your database connection is correct.

2. **Test Email (if configured):**
   - Go to `/auth`
   - Click "Forgot Password"
   - Enter a registered email
   - Check your inbox (or Mailtrap dashboard)

---

## Common Issues

### Issue: "Invalid database URL"

**Solution:**
- Check for typos in `DATABASE_URL`
- Ensure password is URL-encoded if it contains special characters
- Verify MySQL is running
- Test connection: `mysql -u root -p ooty_baker`

### Issue: "Environment variable not found"

**Solution:**
- Ensure file is named exactly `.env.local` (not `.env.local.txt`)
- Restart the development server after changing `.env.local`
- Check for typos in variable names (case-sensitive)

### Issue: Database connection fails

**Solution:**
- Verify MySQL is running: `mysql -u root -p`
- Check database exists: `SHOW DATABASES;`
- Verify credentials in `DATABASE_URL`
- Check if MySQL allows connections from localhost

---

## Security Notes

✅ **DO:**
- Use `.env.local` for local development (automatically ignored by git)
- Keep secrets private
- Use strong `NEXTAUTH_SECRET`
- Use App Passwords for Gmail (not your main password)

❌ **DON'T:**
- Commit `.env.local` to git (it's already in `.gitignore`)
- Share your `.env.local` file
- Use production credentials in development
- Use weak secrets

---

## Example Complete `.env.local`

Here's a complete example (replace with your actual values):

```env
DATABASE_URL="mysql://root:mypassword@localhost:3306/ooty_baker"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=my-super-secret-key-that-is-at-least-32-characters-long-12345
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=myemail@gmail.com
SMTP_PASSWORD=myapppassword123456
SMTP_FROM=myemail@gmail.com
NODE_ENV=development
```

---

## Next Steps

After configuring `.env.local`:

1. Save the file
2. Restart your development server (`npm run dev`)
3. Test the database connection: `npm run db:push`
4. Visit `http://localhost:3000` to see your app

---

**Need help?** Check:
- `GETTING_STARTED.md` for setup steps
- `EMAIL_SETUP.md` for detailed email configuration
- `MIGRATION_GUIDE.md` for migration information
