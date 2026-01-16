# Password Reset Script Guide

## Overview

The password reset script (`scripts/reset-password.ts`) allows administrators to reset user passwords directly from the command line. This is useful when:
- Email/SMTP is not configured
- Emergency password reset is needed
- Admin needs to reset a user's password manually

## Prerequisites

- Database connection configured in `.env.local`
- User must exist in the database
- `tsx` package installed (already in devDependencies)

## Usage

```bash
npm run reset-password <email> <new-password>
```

### Examples

```bash
# Reset password for a user
npm run reset-password clancymendonca@gmail.com mynewpassword123

# Reset with a strong password
npm run reset-password user@example.com SecurePass123!
```

## How It Works

1. Takes email and new password as command-line arguments
2. Hashes the password using bcrypt (12 rounds)
3. Updates the user's password in the database
4. Disconnects from the database

## Testing the Script

### Step 1: Verify Script Syntax

Test that the script shows usage when run without arguments:

```bash
npm run reset-password
```

Expected output:
```
Usage: tsx scripts/reset-password.ts <email> <new-password>
Example: tsx scripts/reset-password.ts clancymendonca@gmail.com mynewpassword123
```

### Step 2: Test with Real User (Optional)

**⚠️ Warning:** This will change the user's password!

1. **Verify user exists:**
   - Check your database or use Prisma Studio: `npm run db:studio`
   - Look for the user in the `users` table

2. **Run the script:**
   ```bash
   npm run reset-password clancymendonca@gmail.com testpassword123
   ```

3. **Expected success output:**
   ```
   ✅ Password reset successfully for clancymendonca@gmail.com
   ```

4. **Test login:**
   - Start the app: `npm run dev`
   - Navigate to `/auth`
   - Try logging in with the new password

5. **Reset back to original (if needed):**
   ```bash
   npm run reset-password clancymendonca@gmail.com originalpassword
   ```

### Step 3: Test Error Handling

Test with a non-existent user:

```bash
npm run reset-password nonexistent@example.com test123
```

Expected output:
```
❌ User with email nonexistent@example.com not found
```

## Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| `Usage: tsx scripts/reset-password.ts <email> <new-password>` | Missing arguments | Provide email and password |
| `❌ User with email X not found` | User doesn't exist | Check email spelling or create user |
| `❌ Error resetting password: ...` | Database/connection error | Check `.env.local` DATABASE_URL |

## Security Considerations

1. **Password Strength:** The script doesn't validate password strength. Use strong passwords manually.
2. **Access Control:** This script should only be run by administrators with database access.
3. **Logging:** Consider adding audit logging for production use.
4. **Environment:** Never commit `.env.local` with database credentials.

## Alternative: Using Prisma Studio

You can also reset passwords visually using Prisma Studio:

```bash
npm run db:studio
```

1. Open the `users` table
2. Find the user
3. Edit the password field (but you'll need to hash it first)

**Note:** The script is easier because it handles password hashing automatically.

## Troubleshooting

### Issue: "Cannot find module 'tsx'"

**Solution:**
```bash
npm install --save-dev tsx
```

### Issue: "Environment variable not found: DATABASE_URL"

**Solution:**
- Create `.env.local` file in project root
- Add `DATABASE_URL="mysql://user:password@host:port/database"`
- See `ENV_SETUP.md` for details

### Issue: "Error: P2025" (User not found)

**Solution:**
- Verify the email exists in the database
- Check email spelling (case-sensitive)
- Use Prisma Studio to verify: `npm run db:studio`

### Issue: Script runs but password doesn't work

**Possible causes:**
1. Password hashing mismatch (bcrypt version)
2. Database connection issue
3. Wrong user email

**Solution:**
- Verify the password was updated in database
- Check Prisma schema matches database
- Try resetting again with a simple password first

## Integration with Email Reset

This script is a **backup method** for password resets. The primary method should be:

1. User requests password reset via `/auth` page
2. System sends OTP email (if SMTP configured)
3. User verifies OTP
4. User sets new password

Use this script only when:
- Email is not configured
- Emergency access is needed
- Admin needs to reset password manually

## Related Files

- `scripts/reset-password.ts` - The script itself
- `lib/auth.ts` - Authentication helpers
- `app/api/auth/otp/route.ts` - Email-based password reset API
- `ENV_SETUP.md` - Environment variable setup
- `EMAIL_SETUP.md` - SMTP configuration guide
