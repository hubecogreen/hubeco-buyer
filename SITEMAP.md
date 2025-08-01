# Dynamic Sitemap Generation with Hierarchical URLs

This project includes a dynamic sitemap generation system that creates hierarchical URLs for product categories with proper query parameters.

## URL Structure

The sitemap generates URLs in the following hierarchical format:

### 1. Category Level URLs
```
https://uat.hubeco.market/products/building-materials-hubeco
```

### 2. Subcategory Level URLs (with scid parameter)
```
https://uat.hubeco.market/products/bricks?scid=671a2cbeb450760ae5997954
```

### 3. Child Category URLs (with ccid parameter)
```
https://uat.hubeco.market/products/building-materials-hubeco/bricks/agrocrete-bricks?ccid=671a2d98b450760ae59979a6
```

## How it works

The sitemap generation system uses two API endpoints:

1. **`/categories/getProductCategoryTree`** - Provides the full hierarchical category structure
2. **`/products/getAllSlugs`** - Provides simple slugs for products, vendors, and blogs

## Features

- ✅ **Hierarchical Category URLs** - Full category/subcategory/child-category structure
- ✅ **Query Parameters** - Proper scid and ccid parameters for filtering
- ✅ **Dynamic Product URLs** - All product slugs are automatically included
- ✅ **Vendor Pages** - All vendor profile pages are included
- ✅ **Blog Posts** - All blog post URLs are included
- ✅ **Static Pages** - Important static pages are always included
- ✅ **SEO Optimized** - Proper priorities and change frequencies
- ✅ **Error Handling** - Robust error handling with detailed logging

## Usage

### 1. Manual Generation

Generate sitemap manually using the npm script:

```bash
npm run sitemap
# or
npm run generate-sitemap
```

### 2. API Endpoint

Access the sitemap via the API endpoint:

```bash
curl https://your-domain.com/api/sitemap
```

### 3. Direct File Access

The sitemap is saved to `public/sitemap.xml` and can be accessed at:

```
https://your-domain.com/sitemap.xml
```

## URL Priorities

### High Priority (0.8-1.0)
- **Homepage** - Priority 1.0
- **Products** - Priority 0.9
- **Category Pages** - Priority 0.8
- **Product Pages** - Priority 0.8

### Medium Priority (0.6-0.7)
- **Vendors** - Priority 0.8
- **Vendor Pages** - Priority 0.7

### Lower Priority (0.5-0.6)
- **Blogs** - Priority 0.5
- **Static Pages** - Priority 0.5-0.6

## Change Frequencies

- **Daily** - Homepage, Products page
- **Weekly** - Category pages, Product pages, Vendor pages
- **Monthly** - Blog posts, Static pages

## Environment Variables

Make sure these environment variables are set:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
NEXT_PUBLIC_PROD_URL=https://your-domain.com
```

## API Response Format

### Category Tree API (`/categories/getProductCategoryTree`)
```json
{
  "data": [
    {
      "_id": "category-id",
      "name": "Building Materials",
      "seoSlug": "building-materials-hubeco",
      "subCategories": [
        {
          "_id": "subcategory-id",
          "name": "Bricks",
          "seoSlug": "bricks",
          "childCategories": [
            {
              "_id": "child-category-id",
              "name": "Agrocrete Bricks",
              "seoSlug": "agrocrete-bricks"
            }
          ]
        }
      ]
    }
  ]
}
```

### Slugs API (`/products/getAllSlugs`)
```json
{
  "products": ["product-slug-1", "product-slug-2", ...],
  "vendors": ["vendor-slug-1", "vendor-slug-2", ...],
  "blogs": ["blog-slug-1", "blog-slug-2", ...]
}
```

## Generated URL Examples

Based on the category structure, the system generates URLs like:

```xml
<url>
  <loc>https://uat.hubeco.market/products/building-materials-hubeco/bricks/agrocrete-bricks?ccid=671a2d98b450760ae59979a6</loc>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://uat.hubeco.market/products/bricks?scid=671a2cbeb450760ae5997954</loc>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

## Automation

### Build Process

The sitemap is automatically generated during the build process via the `postbuild` script in `package.json`.

### Cron Job (Optional)

You can set up a cron job to regenerate the sitemap periodically:

```bash
# Regenerate sitemap daily at 2 AM
0 2 * * * cd /path/to/your/project && npm run sitemap
```

### GitHub Actions (Optional)

Add this to your `.github/workflows/deploy.yml`:

```yaml
- name: Generate Sitemap
  run: npm run sitemap
```

## Troubleshooting

### Common Issues

1. **API Connection Error**
   - Check `NEXT_PUBLIC_API_BASE_URL` environment variable
   - Verify the API endpoints are accessible

2. **Empty Sitemap**
   - Check API response format
   - Verify environment variables are set correctly

3. **Permission Errors**
   - Ensure write permissions to `public/` directory

### Debug Mode

Run the script with verbose logging:

```bash
DEBUG=true npm run sitemap
```

## Customization

### Adding Static Pages

Edit the `staticUrls` array in `src/app/api/sitemap/route.ts`:

```typescript
const staticUrls: SitemapUrl[] = [
  // ... existing URLs
  { 
    loc: `${process.env.NEXT_PUBLIC_PROD_URL}/new-page`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'monthly', 
    priority: '0.6' 
  },
];
```

### Modifying Priorities

Adjust the priority values in the `generateDynamicUrls` function to match your SEO strategy.

## Performance

- The sitemap generation is optimized for large datasets
- Uses efficient XML generation with proper formatting
- Includes comprehensive error handling
- Provides detailed logging for monitoring

## SEO Benefits

- **Search Engine Discovery** - Helps search engines find all your pages
- **Proper Priorities** - Indicates importance of different pages
- **Change Frequencies** - Guides crawler frequency
- **Complete Coverage** - Ensures no pages are missed
- **Dynamic Updates** - Automatically includes new content
- **Hierarchical Structure** - Proper category organization for SEO 