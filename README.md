# Ooty Baker & Confectioner - Next.js Application

A modern web application for Ooty Baker & Confectioner built with Next.js, TypeScript, Tailwind CSS, and MySQL.

## Features

- 🏠 **Home Page**: Product showcase with category-based organization
- 📝 **Business Inquiry Form**: Customer inquiry submission system
- 🔐 **Authentication**: Login and password reset with OTP
- 📊 **Admin Dashboard**: 
  - Business inquiries management
  - Product management (CRUD operations)
  - Real-time statistics and analytics
- 🎨 **Modern UI**: Built with Tailwind CSS for responsive design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MySQL with Prisma ORM
- **Authentication**: Custom authentication system
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Ooty-Baker-and-Confectioner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `DATABASE_URL`: Your MySQL connection string
   - `NEXTAUTH_SECRET`: A random secret for session management
   - `SMTP_*`: Email configuration for OTP functionality

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   ```

5. **Copy images**
   - Copy your existing images from the `images/` folder to `public/images/`
   - Copy uploaded product images from `uploads/` to `public/uploads/`

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── dashboard/       # Dashboard-specific components
│   └── ...              # Shared components
├── lib/                  # Utility libraries
│   ├── auth.ts          # Authentication helpers
│   └── prisma.ts        # Prisma client
├── prisma/               # Prisma schema
│   └── schema.prisma    # Database schema
├── public/               # Static files
│   └── images/          # Image assets
└── types/               # TypeScript type definitions
```

## Database Schema

The application uses the following main tables:
- `users`: User authentication
- `products`: Product catalog
- `business_inquiries`: Customer inquiries
- `business_inquiry_products`: Junction table for inquiry products
- `business_inquiry_history`: Inquiry status history

## API Routes

- `GET /api/products` - List all products
- `POST /api/products` - Create a product
- `GET /api/products/[id]` - Get a product
- `PUT /api/products/[id]` - Update a product
- `DELETE /api/products/[id]` - Delete a product
- `GET /api/inquiries` - List all inquiries
- `POST /api/inquiries` - Create an inquiry
- `GET /api/dashboard/stats` - Get dashboard statistics
- `POST /api/auth/login` - User login
- `POST /api/auth/otp` - OTP operations (send, verify, reset password)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## Migration from PHP

This project has been migrated from a PHP application. Key changes:

1. **Backend**: PHP → Next.js API routes
2. **Frontend**: Plain HTML/CSS/JS → React with TypeScript
3. **Styling**: Custom CSS → Tailwind CSS
4. **Database**: MySQLi → Prisma ORM
5. **Authentication**: Session-based → Token-based (can be upgraded to NextAuth.js)

## Notes

- Image uploads are currently handled via file system. Consider migrating to cloud storage (AWS S3, Cloudinary) for production.
- Session management is currently using localStorage. Consider implementing proper session management with cookies or NextAuth.js for production.
- Email functionality requires SMTP configuration. For development, you can use services like Mailtrap.

## License

All rights reserved - Ooty Baker & Confectioner
