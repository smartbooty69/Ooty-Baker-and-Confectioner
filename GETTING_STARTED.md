# Getting Started - Step by Step

Follow these steps in order to get your Next.js application up and running.

## ✅ Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages (Next.js, React, Prisma, Tailwind, etc.).

**Expected time:** 2-5 minutes

---

## ✅ Step 2: Set Up Environment Variables

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Open `.env` file** and update these values:

   ```env
   # Database - Update with your MySQL credentials
   DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/ooty_baker"
   
   # NextAuth - Generate a random secret (you can use: openssl rand -base64 32)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-random-secret-key-here
   
   # Email (Optional for now - you can skip this initially)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM=your-email@gmail.com
   
   # Node Environment
   NODE_ENV=development
   ```

   **Important:** 
   - Replace `YOUR_PASSWORD` with your MySQL root password
   - If you don't have a password, use: `mysql://root@localhost:3306/ooty_baker`
   - For `NEXTAUTH_SECRET`, generate a random string (see note above)

**Expected time:** 2 minutes

---

## ✅ Step 3: Set Up Database with Prisma

1. **Generate Prisma Client:**
   ```bash
   npm run db:generate
   ```
   This creates the Prisma Client based on your schema.

2. **Push schema to database:**
   ```bash
   npm run db:push
   ```
   This syncs your Prisma schema with your existing MySQL database.

   **Note:** Since you already have tables, Prisma will verify they match the schema.

**Expected time:** 1-2 minutes

---

## ✅ Step 4: Copy Images

Copy your existing images to the `public` directory:

**Windows (PowerShell):**
```powershell
# Copy brand images
Copy-Item -Path "images" -Destination "public\images" -Recurse -Force

# Copy uploaded product images
Copy-Item -Path "uploads" -Destination "public\uploads" -Recurse -Force
```

**Windows (Command Prompt):**
```cmd
xcopy images public\images /E /I /Y
xcopy uploads public\uploads /E /I /Y
```

**Mac/Linux:**
```bash
cp -r images public/images
cp -r uploads public/uploads
```

**Expected time:** 1 minute

---

## ✅ Step 5: Start the Development Server

Run the development server:

```bash
npm run dev
```

You should see:
```
✓ Ready in X seconds
○ Local:        http://localhost:3000
```

**Expected time:** 10-30 seconds

---

## ✅ Step 6: Test Your Application

Open your browser and visit: **http://localhost:3000**

### Test Checklist:

- [ ] **Home Page** loads correctly
- [ ] **Products** are displayed
- [ ] **Navigation** works (Products, About, Inquiry)
- [ ] **Inquiry Form** can be submitted
- [ ] **About Page** loads (`/about`)
- [ ] **Product Category Pages** work (`/products/Candy`, etc.)

---

## ✅ Step 7: Test Authentication (Optional)

1. Visit: **http://localhost:3000/auth**
2. Try logging in with your existing credentials
3. Test "Forgot Password" flow (requires email setup)

**Note:** If you haven't set up email yet, you can skip this step for now.

---

## ✅ Step 8: Test Dashboard (Optional)

1. Login at `/auth`
2. Visit: **http://localhost:3000/dashboard**
3. Check:
   - [ ] Dashboard statistics load
   - [ ] Business inquiries are displayed
   - [ ] Product management works

---

## 🎉 You're Done!

Your Next.js application should now be running. If you encounter any issues, see the troubleshooting section below.

---

## Troubleshooting

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Database connection error

**Solutions:**
1. Verify MySQL is running
2. Check database credentials in `.env`
3. Ensure database `ooty_baker` exists
4. Test connection: `mysql -u root -p ooty_baker`

### Issue: Images not loading

**Solutions:**
1. Verify images are in `public/images/` and `public/uploads/`
2. Check image paths in database start with `/`
3. Clear browser cache

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001
```

### Issue: Prisma errors

**Solutions:**
```bash
# Regenerate Prisma Client
npm run db:generate

# Reset database (WARNING: This will delete data)
npm run db:push -- --force-reset
```

---

## Next Steps After Setup

1. **Set up email** (see `EMAIL_SETUP.md`)
2. **Test all functionality** thoroughly
3. **Review the code** and customize as needed
4. **Deploy to production** when ready

---

## Need Help?

- Check `MIGRATION_GUIDE.md` for detailed migration info
- Check `EMAIL_SETUP.md` for email configuration
- Review error messages in terminal and browser console
- Check Next.js documentation: https://nextjs.org/docs

---

## Quick Command Reference

```bash
# Development
npm run dev              # Start dev server

# Database
npm run db:generate      # Generate Prisma Client
npm run db:push          # Push schema to database
npm run db:studio        # Open Prisma Studio (database GUI)

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
```

---

**Ready to start? Begin with Step 1!** 🚀
