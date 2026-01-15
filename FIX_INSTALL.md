# Fix npm Install Issues

## Problem
You're getting a dependency conflict between `nodemailer` versions.

## Solution 1: Use Updated package.json (Recommended)

I've updated `package.json` to use `nodemailer@^7.0.7`. Now run:

```bash
npm install
```

## Solution 2: Use Legacy Peer Deps (If Solution 1 doesn't work)

If you still get errors, use:

```bash
npm install --legacy-peer-deps
```

This tells npm to ignore peer dependency conflicts.

## Solution 3: Remove node_modules and reinstall

If issues persist:

```bash
# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Install fresh
npm install --legacy-peer-deps
```

## After Installation

Once `npm install` completes successfully, run:

```bash
# Generate Prisma Client
npm run db:generate

# Create tables in Supabase
npm run db:push

# Seed database
npm run db:seed
```

## Verify Installation

Check that everything installed:

```bash
# Check Prisma is installed
npx prisma --version

# Check tsx is installed
npx tsx --version
```

If these commands work, you're good to go!
