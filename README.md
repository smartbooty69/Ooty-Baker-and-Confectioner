# Ooty Baker & Confectioner - Next.js Application

A modern web application for Ooty Baker & Confectioner built with Next.js, TypeScript, Tailwind CSS, Prisma ORM, and Supabase.

## 🚀 Features

- 🏠 **Home Page**: Product showcase with category-based organization and banner slider
- 📝 **Business Inquiry Form**: Customer inquiry submission system
- 🔐 **Authentication**: Secure login with OTP-based password reset
- 📊 **Admin Dashboard**: 
  - Business inquiries management (view, update, delete, export)
  - Product management (CRUD operations with image uploads)
  - Banner management
  - Real-time statistics and analytics
  - Server-Sent Events (SSE) for live updates
- 🎨 **Modern UI**: Responsive design with Tailwind CSS
- 📦 **Image Storage**: Supabase Storage integration (with local fallback)

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Supabase) with Prisma ORM
- **Storage**: Supabase Storage (for images)
- **Authentication**: Cookie-based HTTP-only sessions
- **Form Handling**: React Hook Form with Zod validation
- **Email**: SMTP (for OTP and notifications)

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier available)
- SMTP credentials (Gmail App Password or Mailtrap for development)

## 🏁 Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd Ooty-Baker-and-Confectioner
npm install
```

### 2. Set Up Supabase

#### Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Project name: `ooty-baker`
4. Set a strong database password (save it!)
5. Choose region closest to your users
6. Wait 1-2 minutes for project setup

#### Get Database Connection String

1. Go to **Settings → Database**
2. Find "Connection string" section
3. Select **"Session pooler"** → **"URI"** tab (for IPv4 compatibility)
4. Copy the connection string (looks like: `postgresql://postgres.asvdhrajxiroovtyzsxj:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres`)

#### Set Up Storage Bucket

1. Go to **Storage** in Supabase dashboard
2. Click "Create a new bucket"
3. **Bucket name:** `product-images` (lowercase, no spaces)
4. **Public bucket:** ✅ Enable
5. **File size limit:** 5 MB
6. Click "Create bucket"

#### Get Supabase Keys

1. Go to **Settings → API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Configure Environment Variables

Create `.env.local` file in the root directory:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres.asvdhrajxiroovtyzsxj:[YOUR-PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"

# Supabase Storage
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-32-character-secret-key

# Email/SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
SMTP_FROM=your-email@gmail.com

# Sentry Error Tracking (Optional)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn-here
SENTRY_ORG=your-sentry-org
SENTRY_PROJECT=your-sentry-project

# Node Environment
NODE_ENV=development
```

**Note:** 
- Replace `[YOUR-PASSWORD]` with your actual Supabase database password
- Replace `xxxxx` with your Supabase project reference
- Generate `NEXTAUTH_SECRET` with: `openssl rand -base64 32`
- For Gmail, use [App Password](https://myaccount.google.com/apppasswords) (not your regular password)
- Sentry variables are optional - only add if you want error tracking in production

### 4. Set Up Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to Supabase database
npm run db:push

# (Optional) Seed database with sample data
npm run db:seed
```

### 5. Copy Images (if any)

If you have existing images:
- Copy from `images/` to `public/images/`
- Or upload directly via dashboard (they'll go to Supabase Storage)

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── products/     # Product CRUD
│   │   ├── inquiries/    # Inquiry management
│   │   ├── banners/      # Banner management
│   │   └── dashboard/    # Dashboard stats & SSE
│   ├── auth/             # Login page
│   ├── dashboard/        # Admin dashboard pages
│   ├── products/         # Public product pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── dashboard/       # Dashboard components
│   └── ...              # Shared components
├── lib/                  # Utility libraries
│   ├── auth.ts          # Authentication helpers
│   ├── prisma.ts        # Prisma client
│   ├── session.ts       # Session management
│   ├── file-upload.ts   # File upload (Supabase + local fallback)
│   └── logger.ts        # Logging utility
├── prisma/               # Prisma schema
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seeding
├── public/               # Static files
│   └── images/          # Image assets
└── types/               # TypeScript type definitions
```

## 🗄 Database Schema

Main tables:
- `users` - User authentication
- `products` - Product catalog
- `banners` - Homepage banners
- `business_inquiries` - Customer inquiries
- `business_inquiry_products` - Junction table for inquiry products
- `business_inquiry_history` - Inquiry status change history

## 🔌 API Routes

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/session` - Check session
- `POST /api/auth/otp` - OTP operations (send, verify, reset password)

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create product
- `GET /api/products/[id]` - Get product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product
- `GET /api/products/export` - Export products to Excel

### Inquiries
- `GET /api/inquiries` - List all inquiries
- `POST /api/inquiries` - Create inquiry
- `GET /api/inquiries/[id]` - Get inquiry
- `PUT /api/inquiries/[id]` - Update inquiry
- `DELETE /api/inquiries/[id]` - Delete inquiry
- `GET /api/inquiries/export` - Export inquiries to Excel

### Banners
- `GET /api/banners` - List all banners
- `POST /api/banners` - Create banner
- `PUT /api/banners/[id]` - Update banner
- `DELETE /api/banners/[id]` - Delete banner

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/events` - Server-Sent Events stream
- `GET /api/analytics` - Analytics data

## 🛠 Development Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema changes to database
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio (database GUI)
npm run db:seed      # Seed database with sample data

# Utilities
npm run reset-password  # Reset user password
npm run test-smtp       # Test SMTP configuration
```

## 🚀 Deployment to Vercel

### Prerequisites
- Code pushed to GitHub/GitLab/Bitbucket
- Vercel account ([vercel.com](https://vercel.com))
- Supabase project configured
- Production SMTP credentials

### Steps

1. **Connect Repository to Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your repository

2. **Configure Environment Variables**
   - Go to **Settings → Environment Variables**
   - Add all variables from `.env.local` (see above)
   - **Important:** 
     - Use **Session pooler** connection string for `DATABASE_URL`
     - Update `NEXTAUTH_URL` to your Vercel domain
     - Generate a new `NEXTAUTH_SECRET` for production

3. **Deploy**
   - Vercel will automatically detect Next.js
   - Click "Deploy"
   - Wait for build to complete

### Environment Variables for Vercel

```env
DATABASE_URL=postgresql://postgres.asvdhrajxiroovtyzsxj:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=production-secret-here
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
```

### Why Supabase?

✅ **Perfect for Vercel:**
- No ephemeral file system issues (images stored in Supabase Storage)
- PostgreSQL database works seamlessly
- IPv4-compatible connection pooling
- Built-in CDN for images
- Free tier available

## 📝 Important Notes

- **Authentication**: Uses HTTP-only cookies for secure session management
- **Image Storage**: Automatically uses Supabase Storage if configured, falls back to local file system in development
- **Database**: Uses PostgreSQL via Supabase. Session pooler connection is required for IPv4 compatibility.
- **Email**: SMTP required for OTP functionality. Use Mailtrap for testing.
- **Real-time Updates**: Dashboard uses Server-Sent Events (SSE) for live updates

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure you're using **Session pooler** connection string (not Direct connection)
- Verify password is correct in Supabase Settings → Database
- Check Network Restrictions allow all IP addresses

### Image Upload Issues
- Verify Supabase Storage bucket `product-images` exists and is public
- Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set correctly

### Build Errors
- Run `npm run db:generate` before building
- Ensure all environment variables are set in Vercel
- Check `NODE_ENV=production` is set

## 📄 License

All rights reserved - Ooty Baker & Confectioner

---

**Built with ❤️ using Next.js, TypeScript, and Supabase**
