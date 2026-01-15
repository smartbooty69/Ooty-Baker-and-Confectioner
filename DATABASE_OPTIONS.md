# Database Options

You can use different database systems with this application. Here's how to switch:

## Current Setup: MySQL

The application is currently configured for MySQL. You can:

### Option 1: Keep MySQL (Recommended)

Just change the connection string in `.env.local`:

```env
DATABASE_URL="mysql://username:password@host:port/database"
```

### Option 2: Switch to PostgreSQL

1. **Update `prisma/schema.prisma`:**
   ```prisma
   datasource db {
     provider = "postgresql"  // Change from "mysql"
     url      = env("DATABASE_URL")
   }
   ```

2. **Update `.env.local`:**
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/ooty_baker"
   ```

3. **Regenerate Prisma Client:**
   ```bash
   npm run db:generate
   npm run db:push
   ```

### Option 3: Switch to SQLite (Development Only)

1. **Update `prisma/schema.prisma`:**
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

2. **Update `.env.local`:**
   ```env
   DATABASE_URL="file:./dev.db"
   ```

3. **Regenerate Prisma Client:**
   ```bash
   npm run db:generate
   npm run db:push
   ```

**Note:** SQLite is good for development but not recommended for production.

### Option 4: Switch to SQL Server

1. **Update `prisma/schema.prisma`:**
   ```prisma
   datasource db {
     provider = "sqlserver"
     url      = env("DATABASE_URL")
   }
   ```

2. **Update `.env.local`:**
   ```env
   DATABASE_URL="sqlserver://server:port;database=ooty_baker;user=user;password=password;encrypt=true"
   ```

3. **Regenerate Prisma Client:**
   ```bash
   npm run db:generate
   npm run db:push
   ```

## Quick Comparison

| Database | Best For | Pros | Cons |
|----------|----------|------|------|
| MySQL | Production | Widely used, good performance | - |
| PostgreSQL | Production | Advanced features, better for complex queries | Slightly more complex setup |
| SQLite | Development | No server needed, easy setup | Not for production, limited features |
| SQL Server | Enterprise | Windows integration, enterprise features | Windows-focused, licensing |

## Migration Between Databases

If you want to migrate existing data:

1. **Export from MySQL:**
   ```bash
   mysqldump -u root -p ooty_baker > backup.sql
   ```

2. **Import to new database** (depends on target database)

3. **Update Prisma schema** for new database

4. **Run migrations:**
   ```bash
   npm run db:generate
   npm run db:push
   ```

## Recommendation

Since you already have MySQL with data, **just change the connection string** in `.env.local`. No need to switch database systems unless you have a specific reason.
