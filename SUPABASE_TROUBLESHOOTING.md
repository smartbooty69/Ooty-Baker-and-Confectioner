# Supabase Connection Troubleshooting

## Current Issue
Getting "Tenant or user not found" error when trying to connect.

## Possible Solutions

### 1. Project Not Fully Provisioned
- **Wait 5-10 minutes** after creating the project
- Check project status shows "Active" (green)
- Try restarting: Settings → General → "Restart project"

### 2. Wrong Connection String Format
The connection string format depends on:
- **Pooler connection** (recommended): Uses `postgres.[PROJECT-REF]` as username
- **Direct connection**: Uses `postgres` as username

### 3. Password Issue
- Verify password is correct
- Try resetting: Settings → Database → "Reset database password"
- Make sure no extra spaces or special characters

### 4. Network Restrictions
- Check Settings → Database → "Network Restrictions"
- Make sure "Your database can be accessed by all IP addresses" is enabled
- Or add your IP address to allowed list

### 5. Get Exact Connection String from Supabase

**Best way to get it:**
1. Go to your Supabase dashboard
2. Click **"Connect"** in left sidebar (or project name)
3. Look for **"ORMs"** section
4. Select **"Prisma"** - it will show the exact connection string
5. Copy that exact string

### 6. Alternative: Use Supabase Table Editor

If connection still fails, you can:
1. Use Supabase's web interface to create tables manually
2. Or wait and try again later (project might still be provisioning)

## Test Connection

You can test if the connection string works using:

```bash
# Using psql (if installed)
psql "postgresql://postgres.asvdhrajxiroovtyzsxj:GatT76tpPX9OLmsF@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
```

## Next Steps

1. **Find the exact connection string** from Supabase dashboard (Connect → ORMs → Prisma)
2. **Or wait 10 minutes** and try again (project provisioning)
3. **Or restart the project** and wait 2-3 minutes
