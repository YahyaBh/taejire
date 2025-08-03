# Environment Variables Setup Guide

This document explains how to configure environment variables for the tool rental platform.

## Required Environment Variables

### Strapi CMS Integration

The application uses Strapi as a backend CMS for managing tool rental listings. You need to configure the following variables:

#### `VITE_STRAPI_URL`

- **Description**: The base URL of your Strapi instance
- **Required**: Yes
- **Default**: `http://localhost:1337`
- **Example**: `https://your-strapi-instance.herokuapp.com`

#### `VITE_STRAPI_API_TOKEN`

- **Description**: API token for authenticating with Strapi
- **Required**: Yes for production
- **Security Level**: **Secret** (use DevServerControl tool)
- **How to get**: Generate from Strapi Admin → Settings → API Tokens

### Builder.io Integration

#### `VITE_PUBLIC_BUILDER_KEY`

- **Description**: Public API key for Builder.io integration
- **Required**: Optional (for CMS features)
- **Default**: `__BUILDER_PUBLIC_KEY__`

### Development Variables

#### `PING_MESSAGE`

- **Description**: Test message for API health checks
- **Required**: No
- **Default**: `"ping pong"`

## Setup Instructions

### 1. Local Development

Create or update your `.env` file in the project root:

```env
# Strapi Configuration
VITE_STRAPI_URL=http://localhost:1337

# Builder.io (Optional)
VITE_PUBLIC_BUILDER_KEY=your_builder_key_here

# Development
PING_MESSAGE="ping pong"
```

### 2. Production/Cloud Deployment

For security reasons, set the API token using the DevServerControl tool instead of the .env file:

```bash
# Use the DevServerControl tool to set secrets
VITE_STRAPI_API_TOKEN=695623e94488709386ac3590aa1f431fe1ffcafd33c3b5713d27746a53e7e202d1fedbb35fb42b4c1ea56033769bd6522074fa52e44d45fbf459571edf31180a9d7a6b1da279e837c25dafcfefe92d067786666d55771919ba3c042097203d6de453208856d4e9122338cc4bc8f5273aa403cd16abd76f139a465e763a33909b
```

## Security Best Practices

### ✅ Safe for .env file (Public Variables)

- `VITE_STRAPI_URL` - Base URL is public
- `VITE_PUBLIC_BUILDER_KEY` - Public API keys
- `PING_MESSAGE` - Development helpers

### ⚠️ Use DevServerControl for Secrets

- `VITE_STRAPI_API_TOKEN` - Contains authentication credentials

## Strapi Setup Required

To use the product submission feature, you need:

1. **Strapi Instance**: Running Strapi server with the Product collection
2. **API Token**: Generated from Strapi admin panel
3. **Permissions**: Configured to allow product creation

### Strapi Product Collection Schema

Your Strapi instance should have a `products` collection with this structure:

```json
{
  "kind": "collectionType",
  "collectionName": "products",
  "info": {
    "singularName": "product",
    "pluralName": "products",
    "displayName": "Product",
    "description": "Tools for rent"
  },
  "attributes": {
    "name": { "type": "string", "required": true },
    "category": {
      "type": "enumeration",
      "enum": ["Drill", "Saw", "Hammer", "Other"],
      "required": true
    },
    "brand": { "type": "string" },
    "model": { "type": "string" },
    "condition": {
      "type": "enumeration",
      "enum": ["New", "Like New", "Good", "Used"],
      "required": true
    },
    "price_per_day": { "type": "decimal", "required": true },
    "description": { "type": "richtext", "required": true },
    "specs": { "type": "richtext" },
    "city": { "type": "string", "required": true },
    "district": { "type": "string", "required": true },
    "phone_number": { "type": "string", "required": true },
    "whatsapp_number": { "type": "string" },
    "images": {
      "type": "media",
      "multiple": true,
      "required": true,
      "allowedTypes": ["images"]
    },
    "terms_accepted": { "type": "boolean", "required": true },
    "status": {
      "type": "enumeration",
      "enum": ["pending", "approved", "rejected"],
      "default": "pending",
      "required": true
    },
    "provider": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "plugin::users-permissions.user"
    }
  }
}
```

## Testing Your Configuration

### 1. Environment Variables Check

```bash
# Check if variables are loaded
console.log('Strapi URL:', import.meta.env.VITE_STRAPI_URL);
console.log('Has API Token:', !!import.meta.env.VITE_STRAPI_API_TOKEN);
```

### 2. Strapi Connection Test

Navigate to `/add-equipment` and try submitting a product. Check the browser console for any connection errors.

### 3. API Health Check

Visit `/api/ping` to verify the backend is working.

## Troubleshooting

### Common Issues

1. **"process is not defined" Error**

   - ✅ Use `import.meta.env` instead of `process.env` in client code
   - ❌ Don't use Node.js environment patterns in browser code

2. **Strapi Connection Failed**

   - Check `VITE_STRAPI_URL` is correct
   - Verify Strapi server is running
   - Confirm API token has proper permissions

3. **Environment Variables Not Loading**
   - Restart the dev server after changing .env
   - Check variable names start with `VITE_` for client-side access
   - Verify .env file is in project root

## File Reference

- `.env` - Main environment configuration
- `.env.example` - Template for required variables
- `shared/strapi.ts` - Strapi API integration
- `client/pages/AddEquipment.tsx` - Product submission form

## Support

If you encounter issues with environment setup:

1. Check this documentation first
2. Verify your Strapi instance is properly configured
3. Test with the provided example values
4. Contact support if problems persist
