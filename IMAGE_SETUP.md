# Image Setup Guide

## Image Locations

### Static Images (Logos, Banners)
**Location:** `public/images/`
**Access:** `/images/filename.ext`

These are static assets that don't change:
- `brand-logo.png` - Main brand logo
- `gimmie-logo.jpg` - Gimmie logo
- `gimmie2logo.png` - Alternative logo
- `banner.png`, `Banne2.jpg`, `banner3.jpg` - Banner images
- `about.png`, `aboutwrap.png` - About page images

### Product Images (User Uploads)
**Location:** `public/uploads/images/`
**Access:** `/uploads/images/filename.ext`

These are product images uploaded by admins:
- `candy1.jpg` - Default product image (used in seed data)

## Next.js Image Handling

In Next.js, all static files must be in the `public/` directory:
- Files in `public/images/` are served at `/images/`
- Files in `public/uploads/images/` are served at `/uploads/images/`

## Using Images in Components

### Static Images
```tsx
import Image from 'next/image';

<Image
  src="/images/brand-logo.png"
  alt="Brand Logo"
  width={50}
  height={50}
/>
```

### Product Images (from Database)
```tsx
// If imagePath is stored as "/uploads/images/candy1.jpg"
<Image
  src={product.imagePath}
  alt={product.name}
  width={400}
  height={300}
/>
```

## Uploading New Product Images

When creating/updating products via the dashboard:
1. Images are uploaded to `public/uploads/images/`
2. The path stored in database should be: `/uploads/images/filename.jpg`
3. Next.js will serve them automatically from the `public/` directory

## Current Setup

✅ Static images copied to `public/images/`
✅ Product images copied to `public/uploads/images/`
✅ All image paths in code reference `/images/` or `/uploads/images/`
