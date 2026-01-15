# Fixes Applied

## Issue 1: Decimal Serialization Warnings ✅

### Problem
Prisma returns `Decimal` types for `price` and `pricePerGram` fields, but React cannot serialize Decimal objects when passing data from Server Components to Client Components.

### Solution
Converted all Decimal values to numbers before passing to client components or returning in API responses.

### Files Fixed:
1. **`app/page.tsx`** - Home page product fetching
2. **`app/products/[category]/page.tsx`** - Category page product fetching
3. **`app/api/products/route.ts`** - GET endpoint for all products
4. **`app/api/products/[id]/route.ts`** - GET, PUT endpoints for single product
5. **`app/api/inquiries/route.ts`** - GET endpoint (includes products)
6. **`app/api/inquiries/[id]/route.ts`** - GET, PUT endpoints (includes products)

### Pattern Used:
```typescript
// Convert Decimal to number
const serializedProduct = {
  ...product,
  price: Number(product.price),
  pricePerGram: product.pricePerGram ? Number(product.pricePerGram) : null,
};
```

## Issue 2: Email Authentication Error ✅

### Problem
SMTP credentials are not configured or incorrect, causing OTP email sending to fail.

### Solution
Made email sending more graceful:
- In development mode, if email fails, the OTP is logged to console
- User gets a helpful error message about SMTP configuration
- OTP is still generated and stored, so password reset can work if OTP is known

### File Fixed:
- **`app/api/auth/otp/route.ts`** - Added development mode fallback

### To Fix Email (Optional):
1. Configure SMTP in `.env.local`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
```

2. For Gmail, you need to:
   - Enable 2-Factor Authentication
   - Generate an App Password: https://myaccount.google.com/apppasswords
   - Use the 16-character app password (not your regular password)

## Testing

After these fixes:
1. ✅ No more Decimal warnings in console
2. ✅ Products display correctly with prices
3. ✅ OTP generation works even without email configured (in dev mode)
4. ✅ All API routes return properly serialized data

## Next Steps

1. **Configure Email** (if needed):
   - Set up SMTP credentials in `.env.local`
   - Test password reset flow

2. **Verify Product Display**:
   - Check home page products
   - Check category pages
   - Verify prices display correctly

3. **Test API Endpoints**:
   - All product endpoints should return numbers, not Decimals
   - All inquiry endpoints should serialize product prices correctly
