# Migration Guide: PHP to Next.js

This guide will help you complete the migration from your PHP application to the new Next.js application.

## What Has Been Converted

✅ **Completed:**
- Home page with product showcase
- Product pages by category
- About page
- Business inquiry form
- Authentication system (login, OTP, password reset)
- Admin dashboard with:
  - Business inquiries management
  - Product management (CRUD)
  - Dashboard statistics
- API routes for all functionality
- Database schema with Prisma
- TypeScript types and interfaces
- Tailwind CSS styling

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. **Ensure MySQL is running** with your existing `ooty_baker` database

2. **Update `.env` file** with your database connection:
   ```env
   DATABASE_URL="mysql://root:your_password@localhost:3306/ooty_baker"
   ```

3. **Generate Prisma Client:**
   ```bash
   npm run db:generate
   ```

4. **Push schema to database:**
   ```bash
   npm run db:push
   ```
   
   Note: This will create the tables if they don't exist. Since you already have tables, Prisma will sync the schema.

### 3. Copy Images

Copy your existing images to the `public` directory:

```bash
# Copy brand images
cp -r images public/images

# Copy uploaded product images
cp -r uploads public/uploads
```

### 4. Email Configuration (for OTP)

The application uses email to send OTP codes for password reset. Update `.env` with your SMTP settings:

#### Option 1: Gmail (Recommended for Development)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
```

**Gmail Setup Steps:**
1. Go to your Google Account settings
2. Enable 2-Factor Authentication (required for App Passwords)
3. Go to Security → 2-Step Verification → App Passwords
4. Generate a new App Password for "Mail"
5. Copy the 16-character password (no spaces)
6. Use this password in `SMTP_PASSWORD`

**Note:** If you have a Google Workspace account, you may need to enable "Less secure app access" or use OAuth2.

#### Option 2: Other Email Providers

**Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
SMTP_FROM=your-email@outlook.com
```

**Yahoo Mail:**
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@yahoo.com
```

**Custom SMTP Server:**
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASSWORD=your-password
SMTP_FROM=noreply@yourdomain.com
```

#### Option 3: Development/Testing (Mailtrap)

For development and testing, use Mailtrap (free tier available):

1. Sign up at [mailtrap.io](https://mailtrap.io)
2. Create an inbox
3. Copy SMTP credentials from the inbox settings
4. Update `.env`:

```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-username
SMTP_PASSWORD=your-mailtrap-password
SMTP_FROM=noreply@ootybaker.com
```

**Benefits of Mailtrap:**
- No real emails sent (all emails are trapped)
- View emails in Mailtrap dashboard
- Perfect for development and testing
- Free tier: 500 emails/month

#### Option 4: Disable Email (Development Only)

If you want to skip email setup for now, you can modify the OTP route to log OTPs to console instead. However, this is **NOT recommended for production**.

#### Testing Email Configuration

After setting up email, test it by:
1. Starting the development server: `npm run dev`
2. Going to `/auth` page
3. Clicking "Forgot Password"
4. Entering a registered email
5. Checking your email (or Mailtrap inbox) for the OTP

**Troubleshooting Email Issues:**
- **"Authentication failed"**: Check username/password, ensure App Password is used for Gmail
- **"Connection timeout"**: Verify SMTP host and port are correct
- **"Email not received"**: Check spam folder, verify SMTP credentials
- **Gmail "Less secure app" error**: Use App Password instead of regular password

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## Key Differences from PHP Version

### 1. File Structure
- **PHP**: Files in root directory (`index.php`, `dashboard.php`, etc.)
- **Next.js**: Organized in `app/` directory with routing

### 2. Database Access
- **PHP**: Direct MySQLi/PDO connections
- **Next.js**: Prisma ORM with type-safe queries

### 3. Frontend
- **PHP**: Server-rendered HTML with inline PHP
- **Next.js**: React components with server-side rendering

### 4. API Endpoints
- **PHP**: Separate PHP files (`customer_submit.php`, `get_products.php`, etc.)
- **Next.js**: API routes in `app/api/` directory

### 5. Authentication
- **PHP**: Session-based with `session_start()`
- **Next.js**: Token-based (currently localStorage, can be upgraded to NextAuth.js)

## Migration Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Set up `.env` file with database URL
- [ ] Generate Prisma Client (`npm run db:generate`)
- [ ] Push database schema (`npm run db:push`)
- [ ] Copy images to `public/` directory
- [ ] Configure SMTP settings for email
- [ ] Test home page
- [ ] Test product pages
- [ ] Test inquiry form submission
- [ ] Test authentication (login, OTP, password reset)
- [ ] Test dashboard functionality
- [ ] Test product management
- [ ] Test inquiry management

## Important Notes

### Image Paths
- Old PHP paths: `uploads/images/product.jpg`
- New Next.js paths: `/uploads/images/product.jpg` (in `public/uploads/images/`)

You may need to update image paths in the database if they don't start with `/`:

```sql
UPDATE products SET image_path = CONCAT('/', image_path) WHERE image_path NOT LIKE '/%';
```

### Session Management
Currently using localStorage for authentication. For production, consider:
- Implementing NextAuth.js
- Using HTTP-only cookies
- Adding JWT tokens

### File Uploads
Product image uploads are not yet implemented in the Next.js version. You can:
1. Continue using the PHP upload script temporarily
2. Implement Next.js file upload using `formidable` or similar
3. Use cloud storage (AWS S3, Cloudinary)

## Testing

### Test Home Page
1. Visit `http://localhost:3000`
2. Verify products are displayed
3. Test navigation
4. Test inquiry form

### Test Authentication
1. Visit `http://localhost:3000/auth`
2. Test login with existing credentials
3. Test forgot password flow
4. Test OTP verification

### Test Dashboard
1. Login to dashboard
2. View business inquiries
3. Test product management
4. Verify statistics

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database `ooty_baker` exists

### Prisma Issues
- Run `npm run db:generate` after schema changes
- Check `prisma/schema.prisma` matches your database structure

### Image Not Loading
- Verify images are in `public/` directory
- Check image paths in database
- Ensure paths start with `/`

### Email Not Sending
- Verify SMTP credentials
- Check spam folder
- For development, consider using Mailtrap

## Next Steps

1. **Production Deployment**
   - Set up production environment variables
   - Configure production database
   - Set up CI/CD pipeline
   - Configure domain and SSL

2. **Enhancements**
   - Implement proper session management
   - Add file upload functionality
   - Add image optimization
   - Implement caching strategies
   - Add error monitoring (Sentry, etc.)

3. **Performance**
   - Optimize images
   - Implement caching
   - Add CDN for static assets
   - Optimize database queries

## Support

If you encounter any issues during migration, check:
1. Console logs in browser (F12)
2. Terminal output for server errors
3. Database connection status
4. Environment variables

For questions or issues, refer to the Next.js documentation or Prisma documentation.
