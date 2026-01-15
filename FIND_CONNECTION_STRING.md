# How to Find Supabase Connection String

## Method 1: From "Connect" Section

1. **Click "Connect" in the left sidebar** (or click your project name at the top)
2. **Look for "ORMs" or "Connection string" section**
3. **Select "Prisma" or "Postgres"** - it will show the connection string
4. **Copy the connection string** - it should look like:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

## Method 2: From Database Settings

1. **Go to Settings → Database**
2. **Scroll down to find "Connection string" section**
3. **Look for tabs: "URI", "JDBC", "Connection pooling"**
4. **Click "URI" tab** and copy the connection string

## Method 3: Construct It Manually

Based on your project:
- Project Reference: `asvdhrajxiroovtyzsxj`
- Region: Asia-Pacific (ap-southeast-1)
- Password: `GatT76tpPX9OLmsF`

**Pooler Connection (Recommended):**
```
postgresql://postgres.asvdhrajxiroovtyzsxj:GatT76tpPX9OLmsF@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

**Direct Connection:**
```
postgresql://postgres:GatT76tpPX9OLmsF@db.asvdhrajxiroovtyzsxj.supabase.co:5432/postgres
```

## If Still Not Working

1. **Check project status** - Make sure it's "Active" (not paused)
2. **Restart project** - Settings → General → "Restart project"
3. **Reset password** - Settings → Database → "Reset database password"
4. **Check network restrictions** - Settings → Database → "Network Restrictions"
