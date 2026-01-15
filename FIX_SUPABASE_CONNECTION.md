# Fix Supabase Connection Error

The error "Tenant or user not found" means the connection string format might be wrong.

## Get the Correct Connection String from Supabase

1. **Go to your Supabase dashboard:**
   - https://supabase.com/dashboard
   - Select your project: `asvdhrajxiroovtyzsxj`

2. **Go to Settings → Database**

3. **Find "Connection string" section**

4. **Select "URI" tab** (not "Session mode" or "Transaction mode")

5. **Copy the connection string** - it should look like one of these:

**Option 1: Pooler (Recommended)**
```
postgresql://postgres.asvdhrajxiroovtyzsxj:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

**Option 2: Direct Connection**
```
postgresql://postgres.asvdhrajxiroovtyzsxj:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
```

**Option 3: Connection Pooling (Alternative)**
```
postgresql://postgres.asvdhrajxiroovtyzsxj:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

## Update Your .env File

Replace the `DATABASE_URL` in your `.env` file with the exact string from Supabase.

**Important:** 
- Make sure you're using the password you set when creating the project
- The connection string should be in quotes
- No extra spaces

## Alternative: Try Direct Connection

If pooler doesn't work, try the direct connection:

1. In Supabase: Settings → Database
2. Look for "Connection string" → "Direct connection" or "Connection pooling" → "Direct"
3. Copy that string
4. Update `.env`

## Test Connection

After updating, test:

```bash
npm run db:push
```

If it still fails, the issue might be:
- Wrong password
- Project not fully set up (wait a few more minutes)
- Network/firewall blocking connection
