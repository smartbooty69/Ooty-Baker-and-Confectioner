# Prisma-Only Database Setup

This guide shows you how to set up your database using **only Prisma** - no MySQL commands needed!

## Step 1: Create Database (One-time MySQL Command)

You only need to create an empty database once. You can do this via:

**Option A: phpMyAdmin**
- Open phpMyAdmin
- Click "New"
- Database name: `ooty_baker`
- Collation: `utf8mb4_general_ci`
- Click "Create"

**Option B: MySQL Command (if needed)**
```sql
CREATE DATABASE ooty_baker CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

## Step 2: Configure `.env.local`

Make sure your `.env.local` has:

```env
DATABASE_URL="mysql://root:yourpassword@localhost:3306/ooty_baker"
```

## Step 3: Use Prisma to Create Tables

Prisma will create all tables automatically:

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (creates all tables)
npm run db:push
```

This will:
- ✅ Create all tables (users, products, business_inquiries, etc.)
- ✅ Set up all relationships
- ✅ Create indexes
- ✅ Set up foreign keys

## Step 4: Seed Database with Data

Populate your database with initial data:

```bash
npm run db:seed
```

This will:
- ✅ Create 1 user (clancymendonca@gmail.com)
- ✅ Create 23 products
- ✅ Create 2 business inquiries
- ✅ Link products to inquiries

**Note:** The default password in the seed file is `your-password-here`. You should change this in `prisma/seed.ts` before running.

## Complete Setup Commands

Run these in order:

```bash
# 1. Install dependencies (if not done)
npm install

# 2. Generate Prisma Client
npm run db:generate

# 3. Create tables in database
npm run db:push

# 4. Seed with data
npm run db:seed
```

## Verify Setup

Check that everything worked:

```bash
# Open Prisma Studio (visual database browser)
npm run db:studio
```

This opens a web interface where you can:
- View all tables
- See your data
- Edit records
- Verify everything is correct

## Update Seed File Password

Before running `npm run db:seed`, edit `prisma/seed.ts`:

Find this line (around line 10):
```typescript
const hashedPassword = await bcrypt.hash('your-password-here', 12);
```

Change `'your-password-here'` to your desired password, or use the existing password hash from your SQL file if you know it.

## What Gets Created

After running the seed:

- **Users:** 1 user (clancymendonca@gmail.com)
- **Products:** 23 products (all from your SQL file)
- **Business Inquiries:** 2 inquiries
- **Relationships:** All properly linked

## Troubleshooting

### Issue: "Database does not exist"

**Solution:** Create the database first (Step 1)

### Issue: "Table already exists"

**Solution:** 
```bash
# Reset database (WARNING: Deletes all data)
npm run db:push -- --force-reset

# Then seed again
npm run db:seed
```

### Issue: "Cannot find module 'tsx'"

**Solution:**
```bash
npm install --save-dev tsx
```

### Issue: Seed fails with password error

**Solution:** 
- Check that bcryptjs is installed: `npm install bcryptjs @types/bcryptjs`
- Update the password in `prisma/seed.ts`

## Prisma Commands Reference

```bash
# Generate Prisma Client (after schema changes)
npm run db:generate

# Push schema to database (creates/updates tables)
npm run db:push

# Create migration (for production)
npm run db:migrate

# Seed database with data
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio
```

## Next Steps

After setup:
1. ✅ Copy images to `public/uploads/images/`
2. ✅ Start the app: `npm run dev`
3. ✅ Visit `http://localhost:3000`
4. ✅ Login with: `clancymendonca@gmail.com` and your password

## Benefits of Prisma-Only Approach

✅ **Type-safe:** All database operations are type-checked  
✅ **No SQL needed:** Prisma handles everything  
✅ **Migrations:** Easy to track schema changes  
✅ **Studio:** Visual database browser  
✅ **Consistent:** Same approach for dev and production  

---

**That's it!** You now have a fully set up database using only Prisma commands. 🎉
