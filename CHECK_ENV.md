# Fix DATABASE_URL Error

The error means Prisma can't find your `DATABASE_URL` in `.env.local`.

## Quick Fix

1. **Make sure `.env.local` exists** in the root directory (same folder as `package.json`)

2. **Check `.env.local` has this exact format:**

```env
DATABASE_URL="postgresql://postgres.asvdhrajxiroovtyzsxj:GatT76tpPX9OLmsF@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-32-character-string-here
NODE_ENV=development
```

3. **Important:** Make sure:
   - File is named exactly `.env.local` (not `.env.local.txt`)
   - No extra spaces around the `=` sign
   - The connection string is in quotes

## Verify File Location

Your `.env.local` should be here:
```
C:\Users\clanc\Website\Ooty-Baker-and-Confectioner\.env.local
```

Same folder as:
- `package.json`
- `prisma/` folder
- `app/` folder

## Test Connection String

You can test if Prisma can read it:

```bash
# This should show your DATABASE_URL (password will be hidden)
npx prisma db pull --print
```

If it still says "Environment variable not found", the file isn't being read.

## Alternative: Use .env file

If `.env.local` doesn't work, create a `.env` file instead:

```bash
# Copy .env.local to .env
Copy-Item .env.local .env
```

Then try `npm run db:push` again.
