# Database Setup from SQL File

This guide will help you create a new database from your `ooty_baker.sql` file.

## Method 1: Using phpMyAdmin (Easiest)

1. **Open phpMyAdmin** (usually at `http://localhost/phpmyadmin`)

2. **Create a new database:**
   - Click "New" in the left sidebar
   - Database name: `ooty_baker`
   - Collation: `utf8mb4_general_ci`
   - Click "Create"

3. **Import the SQL file:**
   - Select the `ooty_baker` database
   - Click the "Import" tab
   - Click "Choose File" and select `ooty_baker.sql`
   - Click "Go" at the bottom

4. **Verify:**
   - You should see all tables created (users, products, business_inquiries, etc.)
   - Check that data was imported

## Method 2: Using MySQL Command Line

1. **Open Command Prompt or Terminal**

2. **Login to MySQL:**
   ```bash
   mysql -u root -p
   ```
   Enter your MySQL password when prompted.

3. **Create the database:**
   ```sql
   CREATE DATABASE ooty_baker CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
   ```

4. **Exit MySQL:**
   ```sql
   EXIT;
   ```

5. **Import the SQL file:**
   ```bash
   mysql -u root -p ooty_baker < ooty_baker.sql
   ```
   Enter your MySQL password when prompted.

6. **Verify:**
   ```bash
   mysql -u root -p ooty_baker
   ```
   Then run:
   ```sql
   SHOW TABLES;
   SELECT COUNT(*) FROM products;
   EXIT;
   ```

## Method 3: Using MySQL Workbench

1. **Open MySQL Workbench**

2. **Connect to your MySQL server**

3. **Create a new schema:**
   - Click the "Create Schema" icon (or right-click → Create Schema)
   - Name: `ooty_baker`
   - Default Collation: `utf8mb4 - utf8mb4_general_ci`
   - Click "Apply"

4. **Import the SQL file:**
   - Go to Server → Data Import
   - Select "Import from Self-Contained File"
   - Browse and select `ooty_baker.sql`
   - Under "Default Target Schema", select `ooty_baker`
   - Click "Start Import"

## After Importing

### 1. Update Image Paths (Important!)

Your SQL file has image paths like `uploads/images/candy1.jpg`, but Next.js needs them to start with `/`. Run this SQL:

```sql
USE ooty_baker;

-- Update product image paths to start with /
UPDATE products 
SET image_path = CONCAT('/', image_path) 
WHERE image_path NOT LIKE '/%' AND image_path IS NOT NULL;
```

### 2. Update `.env.local`

Make sure your `.env.local` points to this database:

```env
DATABASE_URL="mysql://root:yourpassword@localhost:3306/ooty_baker"
```

### 3. Test the Connection

```bash
npm run db:generate
npm run db:push
```

This will sync Prisma with your database.

## Verify Everything Works

1. **Check tables exist:**
   ```sql
   USE ooty_baker;
   SHOW TABLES;
   ```
   Should show: `users`, `products`, `business_inquiries`, `business_inquiry_products`, `business_inquiry_history`

2. **Check data:**
   ```sql
   SELECT COUNT(*) FROM products;
   SELECT COUNT(*) FROM users;
   SELECT COUNT(*) FROM business_inquiries;
   ```

3. **Test in Next.js:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` - you should see your products!

## Troubleshooting

### Issue: "Database already exists"

**Solution:**
```sql
DROP DATABASE IF EXISTS ooty_baker;
CREATE DATABASE ooty_baker CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```
Then import again.

### Issue: "Access denied"

**Solution:**
- Check MySQL username and password
- Ensure MySQL service is running
- Try: `mysql -u root` (without password if none set)

### Issue: "Foreign key constraint fails"

**Solution:**
The SQL file should handle this, but if you get errors:
1. Import tables in order (the SQL file should do this)
2. Or temporarily disable foreign key checks:
   ```sql
   SET FOREIGN_KEY_CHECKS = 0;
   -- Import SQL
   SET FOREIGN_KEY_CHECKS = 1;
   ```

### Issue: Images not showing

**Solution:**
1. Make sure you updated image paths (see "Update Image Paths" above)
2. Copy images to `public/uploads/images/`
3. Verify paths in database start with `/`

## Quick Checklist

- [ ] Database `ooty_baker` created
- [ ] SQL file imported successfully
- [ ] All tables exist (5 tables)
- [ ] Data imported (products, users, inquiries)
- [ ] Image paths updated to start with `/`
- [ ] `.env.local` configured correctly
- [ ] Prisma Client generated (`npm run db:generate`)
- [ ] Database synced (`npm run db:push`)
- [ ] Application runs (`npm run dev`)

## Next Steps

After database is set up:
1. Copy images to `public/` directory
2. Test the application
3. Verify products show on homepage
4. Test login with existing user credentials
