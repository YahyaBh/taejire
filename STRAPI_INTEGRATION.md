# Strapi Integration for Product Submission

## Overview

The AddEquipment page has been successfully integrated with Strapi CMS to handle product submissions according to your provided schema.

## Files Modified/Created

### 1. `shared/strapi.ts` (NEW)

- Contains TypeScript interfaces matching your Strapi schema
- API functions for creating, reading products
- Helper functions for mapping Arabic to English values
- FormData creation for file uploads

### 2. `client/pages/AddEquipment.tsx` (UPDATED)

- Form fields now match Strapi schema exactly
- Added proper form submission with error handling
- Loading states during submission
- Terms acceptance checkbox integration

### 3. Environment Variables

- `.env` updated with Strapi URL configuration
- API token set via DevServerControl (secure)

## Configuration Required

### 1. Strapi URL

Update the `VITE_STRAPI_URL` in your `.env` file:

```env
VITE_STRAPI_URL=http://your-strapi-url:1337
```

### 2. API Token

Replace the placeholder API token with your actual Strapi API token:

- Use DevServerControl tool to set: `VITE_STRAPI_API_TOKEN`
- Or update via the platform's environment variables

## Schema Mapping

### Categories (Arabic → English)

- معدات الحفر → Drill
- أدوات البناء → Other
- الأدوات الكهربائية → Other
- الأدوات الميكانيكية → Other
- معدات الرفع → Other
- أدوات القياس → Other
- معدات السلامة → Other
- أخرى → Other

### Conditions (Arabic → English)

- جديد → New
- مستعمل - حالة ممتازة → Like New
- مستعمل - حالة جيدة → Good
- مستعمل - حالة متوسطة → Used

## Form Fields Mapped to Strapi

| Form Field          | Strapi Field    | Type     | Required |
| ------------------- | --------------- | -------- | -------- |
| اسم الأداة          | name            | string   | ✓        |
| الفئة               | category        | enum     | ✓        |
| العلامة التجارية    | brand           | string   |          |
| الموديل             | model           | string   |          |
| حالة الأداة         | condition       | enum     | ✓        |
| السعر اليومي        | price_per_day   | decimal  | ✓        |
| وصف الأداة          | description     | richtext | ✓        |
| المواصفات التقنية   | specs           | richtext |          |
| المدينة             | city            | string   | ✓        |
| الحي                | district        | string   | ✓        |
| رقم الهاتف          | phone_number    | string   | ✓        |
| رقم الواتساب        | whatsapp_number | string   |          |
| صور الأداة          | images          | media[]  | ✓        |
| الموافقة على الشروط | terms_accepted  | boolean  | ✓        |

## Features Implemented

1. **Form Validation**: Client-side validation for required fields
2. **Image Upload**: Multiple image support (up to 6 images)
3. **Error Handling**: User-friendly error messages in Arabic
4. **Loading States**: Visual feedback during submission
5. **Success Page**: Confirmation page after successful submission
6. **Status Management**: Products are created with 'pending' status by default

## API Functions Available

### Create Product

```typescript
import { createProduct } from "@shared/strapi";
await createProduct(productData);
```

### Get Products

```typescript
import { getProducts } from "@shared/strapi";
const products = await getProducts({
  page: 1,
  pageSize: 20,
  filters: { category: "Drill" },
});
```

### Get Single Product

```typescript
import { getProduct } from "@shared/strapi";
const product = await getProduct(id);
```

## Next Steps

1. **Set up your Strapi instance** with the provided schema
2. **Update environment variables** with your actual Strapi URL and API token
3. **Configure Strapi permissions** to allow product creation
4. **Test the form submission** to ensure everything works correctly

## Notes

- All products are created with status 'pending' for approval workflow
- Image uploads are handled via FormData for proper file transfer
- The integration maintains the Arabic UI while using English enum values for Strapi
- Error messages are displayed in Arabic for better user experience
