# PostgreSQL Setup Guide

You're now using **PostgreSQL** - a powerful, open-source database. No MySQL needed!

## Option 1: Local PostgreSQL (Recommended)

### Install PostgreSQL

**Windows:**
1. Download from: https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember the password you set for the `postgres` user

**Mac:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Create Database

**Using psql (Command Line):**
```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE ooty_baker;

# Exit
\q
```

**Using pgAdmin (GUI):**
1. Open pgAdmin
2. Right-click "Databases" → Create → Database
3. Name: `ooty_baker`
4. Click "Save"

### Update `.env.local`

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/ooty_baker"
```

Replace `yourpassword` with your PostgreSQL password.

## Option 2: Cloud PostgreSQL (Free Tier)

### Option A: Supabase (Recommended - Free)

1. **Sign up:** https://supabase.com (free tier available)
2. **Create a new project**
3. **Get connection string** from Settings → Database
4. **Update `.env.local`:**
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
   ```

### Option B: Neon (Free Tier)

1. **Sign up:** https://neon.tech (free tier available)
2. **Create a new project**
3. **Copy connection string**
4. **Update `.env.local`** with the connection string

### Option C: Railway (Free Trial)

1. **Sign up:** https://railway.app
2. **Create PostgreSQL database**
3. **Copy connection string**
4. **Update `.env.local`**

## Setup Steps

After installing PostgreSQL and creating the database:

```bash
# 1. Generate Prisma Client
npm run db:generate

# 2. Create all tables
npm run db:push

# 3. Seed with data
npm run db:seed
```

## Connection String Format

```env
# Local PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Example with default postgres user
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/ooty_baker"

# Cloud PostgreSQL (Supabase example)
DATABASE_URL="postgresql://postgres.xxxxx:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

## Quick Start with Supabase (Easiest)

1. **Go to:** https://supabase.com
2. **Sign up** (free)
3. **Create new project**
4. **Wait for setup** (2 minutes)
5. **Go to:** Settings → Database
6. **Copy "Connection string"** (URI format)
7. **Paste in `.env.local`** as `DATABASE_URL`
8. **Run:**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

Done! No local database installation needed.

## Verify Setup

```bash
# Open Prisma Studio
npm run db:studio
```

You should see all your tables and data!

## Benefits of PostgreSQL

✅ **No MySQL needed**  
✅ **Free cloud options** (Supabase, Neon)  
✅ **Better performance** than MySQL  
✅ **Advanced features** (JSON, arrays, full-text search)  
✅ **Production-ready**  
✅ **Great with Prisma**  

## Troubleshooting

### Issue: "Connection refused"

**Solution:**
- Check PostgreSQL is running: `pg_isready`
- Verify port 5432 is correct
- Check firewall settings

### Issue: "Password authentication failed"

**Solution:**
- Verify password in connection string
- Reset PostgreSQL password if needed

### Issue: "Database does not exist"

**Solution:**
```sql
CREATE DATABASE ooty_baker;
```

## Next Steps

1. ✅ Install PostgreSQL (or use Supabase)
2. ✅ Create database
3. ✅ Update `.env.local`
4. ✅ Run `npm run db:generate`
5. ✅ Run `npm run db:push`
6. ✅ Run `npm run db:seed`
7. ✅ Start app: `npm run dev`

---

**Recommendation:** Use **Supabase** for the easiest setup - no installation needed, free tier, and works great with Prisma!
