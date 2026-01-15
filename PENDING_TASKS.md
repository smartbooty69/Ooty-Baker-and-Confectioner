# Pending Tasks & Features

## 🔴 Critical / High Priority

### 1. Product Image Upload Functionality
**Status:** ❌ Not Implemented

**What's Missing:**
- Image upload in `ProductManagement.tsx` component
- File upload API endpoint (`/api/products/upload` or similar)
- Image validation and processing
- Image storage in `public/uploads/images/`
- Image deletion when product is deleted

**Current State:**
- Product form has `image?: File` in `ProductFormData` type
- But the form doesn't actually handle file uploads
- API routes don't accept file uploads
- Products can be created/updated without images

**Files to Update:**
- `components/dashboard/ProductManagement.tsx` - Add file input and FormData handling
- `app/api/products/route.ts` - Handle multipart/form-data for POST
- `app/api/products/[id]/route.ts` - Handle file uploads for PUT
- Create `app/api/products/upload/route.ts` (optional - separate endpoint)

**Reference:**
- Original PHP: `insert_product.php`, `update_product.php`
- Original handles: file validation, unique filename generation, file storage

---

## 🟡 Medium Priority

### 2. Email Configuration (SMTP)
**Status:** ⚠️ Partially Working

**Current State:**
- OTP generation works
- Email sending fails if SMTP not configured
- In dev mode, OTP is logged to console (workaround)

**What's Needed:**
- Configure SMTP credentials in `.env.local`
- Test email sending
- See `EMAIL_SETUP.md` for instructions

**Impact:**
- Password reset requires email
- Currently works in dev mode (OTP in console)
- Production needs proper SMTP setup

---

## 🟢 Low Priority / Optional Enhancements

### 3. Password Reset Script
**Status:** ✅ Created but not tested

**What's Done:**
- Script created: `scripts/reset-password.ts`
- NPM script added: `npm run reset-password`

**What's Needed:**
- Test the script
- Document usage

### 4. Production Optimizations
**Status:** 📝 Planning Phase

**Items:**
- [ ] Image optimization (Next.js Image component is used, but could add more optimization)
- [ ] Caching strategies
- [ ] Error monitoring (Sentry, etc.)
- [ ] Performance monitoring
- [ ] SEO optimization

### 5. Enhanced Security Features
**Status:** 📝 Optional

**Items:**
- [ ] Rate limiting for login attempts
- [ ] CSRF protection (Next.js has some built-in)
- [ ] Password strength requirements
- [ ] Session timeout warnings
- [ ] 2FA support

### 6. Additional Features
**Status:** 📝 Future Enhancements

**Items:**
- [ ] Product image editing (crop, resize)
- [ ] Bulk product operations
- [ ] Product search/filtering
- [ ] Export products to Excel
- [ ] Product categories management UI
- [ ] Inquiry email notifications
- [ ] Dashboard real-time updates (SSE - Server-Sent Events)

---

## ✅ Completed Features

- ✅ Home page with product showcase
- ✅ Product pages by category
- ✅ About page
- ✅ Business inquiry form
- ✅ Authentication (login, OTP, password reset)
- ✅ Admin dashboard
- ✅ Business inquiries management
- ✅ Product management (CRUD - except image upload)
- ✅ Dashboard statistics
- ✅ API routes for all functionality
- ✅ Database schema with Prisma
- ✅ TypeScript types
- ✅ Tailwind CSS styling
- ✅ Session management (HTTP-only cookies)
- ✅ Route protection (middleware)
- ✅ Decimal serialization fixes
- ✅ Email error handling (dev mode fallback)

---

## Next Steps Recommendation

### Immediate (Before Production):
1. **Implement Product Image Upload** - Critical for product management
2. **Configure SMTP** - Required for password reset in production
3. **Test all functionality** - End-to-end testing

### Short Term:
4. Test password reset script
5. Add image validation and error handling
6. Set up production environment variables

### Long Term:
7. Add optional enhancements as needed
8. Performance optimizations
9. Additional features based on user feedback

---

## Quick Start for Image Upload

To implement image upload, you'll need to:

1. **Install file handling library:**
   ```bash
   npm install formidable @types/formidable
   ```

2. **Update ProductManagement component:**
   - Add file input to form
   - Use FormData for submission
   - Show image preview

3. **Update API routes:**
   - Parse multipart/form-data
   - Validate file type and size
   - Save to `public/uploads/images/`
   - Store path in database

4. **Add image deletion:**
   - Delete old images when updating
   - Delete images when deleting products

See `insert_product.php` and `update_product.php` for reference implementation.
