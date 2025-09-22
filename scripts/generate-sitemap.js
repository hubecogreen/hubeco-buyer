#!/usr/bin/env node

/**
 * Standalone script to generate sitemap with hierarchical category URLs
 * Usage: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');
const { Builder } = require('xml2js');

// Check if we're in a build environment and environment variables are not set
if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_BASE_URL) {
  console.log('Skipping sitemap generation during build - environment variables not set');
  process.exit(0);
}

// Load environment variables - try multiple possible locations
const envFiles = [
  '.env.production',
  '.env.development',
];

let envLoaded = false;
for (const envFile of envFiles) {
  try {
    require('dotenv').config({ path: path.join(process.cwd(), envFile) });
    console.log(`Loaded environment from ${envFile}`);
    envLoaded = true;
    break;
  } catch (error) {
    // Continue to next file
  }
}

if (!envLoaded) {
  console.log('No .env file found, using system environment variables');
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.hubeco.market'; 
const PROD_URL = process.env.NEXT_PUBLIC_PROD_URL || 'https://hubeco.market';

if (!API_BASE_URL) {
  console.warn('Warning: NEXT_PUBLIC_API_BASE_URL environment variable is not set');
  console.warn('Will generate sitemap with static URLs only');
}

// Static URLs that should always be included
const staticUrls = [
  { 
    loc: PROD_URL, 
    lastmod: new Date().toISOString(), 
    changefreq: 'daily', 
    priority: '1.0' 
  },
  { 
    loc: `${PROD_URL}/products`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'daily', 
    priority: '0.9' 
  },
  { 
    loc: `${PROD_URL}/categories`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'weekly', 
    priority: '0.8' 
  },
  { 
    loc: `${PROD_URL}/brands`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'weekly', 
    priority: '0.8' 
  },
  { 
    loc: `${PROD_URL}/blogs`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'weekly', 
    priority: '0.7' 
  },
  { 
    loc: `${PROD_URL}/about`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'monthly', 
    priority: '0.6' 
  },
  { 
    loc: `${PROD_URL}/contact`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'monthly', 
    priority: '0.6' 
  },
  { 
    loc: `${PROD_URL}/faq`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'monthly', 
    priority: '0.6' 
  },
  { 
    loc: `${PROD_URL}/privacy-policy`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'monthly', 
    priority: '0.5' 
  },
  { 
    loc: `${PROD_URL}/terms-conditions`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'monthly', 
    priority: '0.5' 
  },
];

async function fetchData() {
  try {
    if (!API_BASE_URL) {
      console.log('No API URL available, skipping dynamic data fetch');
      return null;
    }

    console.log('Fetching data from APIs...');
    
    // Fetch category tree for hierarchical URLs
    const categoryResponse = await fetch(`${API_BASE_URL}/categories/getProductCategoryTree`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!categoryResponse.ok) {
      console.warn(`Category API responded with status: ${categoryResponse.status}, skipping dynamic data`);
      return null;
    }

    const categoryData = await categoryResponse.json();

    // Fetch simple slugs for other URLs
    const slugsResponse = await fetch(`${API_BASE_URL}/products/getAllSlugs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!slugsResponse.ok) {
      console.warn(`Slugs API responded with status: ${slugsResponse.status}, skipping dynamic data`);
      return null;
    }

    const slugsData = await slugsResponse.json();

    console.log('Data fetched successfully:', {
      categories: categoryData?.length || 0,
      products: slugsData.products?.length || 0,
      vendors: slugsData.vendors?.length || 0,
      blogs: slugsData.blogs?.length || 0,
    });

    return {
      categories: categoryData || [],
      products: slugsData.products || [],
      vendors: slugsData.vendors || [],
      blogs: slugsData.blogs || [],
    };
  } catch (error) {
    console.warn('Error fetching data:', error.message);
    console.log('Will generate sitemap with static URLs only');
    return null;
  }
}

function generateDynamicUrls(data) {
  const dynamicUrls = [];
  const { categories, products, vendors, blogs } = data;

  console.log("categories", categories);
  console.log("categories", categories.seoSlug);

  // Generate hierarchical category URLs
  categories.forEach((category) => {
    if (category) {

      // Subcategory URLs
      if (category.subCategories && Array.isArray(category.subCategories)) {
        category.subCategories.forEach((subCategory) => {
          if (subCategory && subCategory.seoSlug) {
            // Subcategory level URL with scid parameter
            dynamicUrls.push({
              loc: `${PROD_URL}/products/${category.seoSlug}/${subCategory.seoSlug}?scid=${subCategory._id}`,
              lastmod: new Date().toISOString(),
              changefreq: 'weekly',
              priority: '0.8',
            });

            // Child category URLs
            if (subCategory.childCategories && Array.isArray(subCategory.childCategories)) {
              subCategory.childCategories.forEach((childCategory) => {
                if (childCategory && childCategory.seoSlug) {
                  // Full hierarchical URL with ccid parameter
                  dynamicUrls.push({
                    loc: `${PROD_URL}/products/${category.seoSlug}/${subCategory.seoSlug}/${childCategory.seoSlug}?ccid=${childCategory._id}`,
                    lastmod: new Date().toISOString(),
                    changefreq: 'weekly',
                    priority: '0.8',
                  });
                }
              });
            }
          }
        });
      }
    }
  });

  // Product URLs
  if (Array.isArray(products)) {
    products.forEach((slug) => {
      if (slug && typeof slug === 'string') {
        dynamicUrls.push({
          loc: `${PROD_URL}/${slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: '0.8',
        });
      }
    });
  }

  // Vendor URLs
  if (Array.isArray(vendors)) {
    vendors.forEach((slug) => {
      if (slug && typeof slug === 'string') {
        dynamicUrls.push({
          loc: `${PROD_URL}/brands/${slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: '0.7',
        });
      }
    });
  }

  // Blog URLs
  if (Array.isArray(blogs)) {
    blogs.forEach((slug) => {
      if (slug && typeof slug === 'string') {
        dynamicUrls.push({
          loc: `${PROD_URL}/blogs/${slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'monthly',
          priority: '0.5',
        });
      }
    });
  }

  return dynamicUrls;
}

async function generateSitemap() {
  try {
    console.log('Starting sitemap generation...');
    
    // Fetch dynamic data
    const data = await fetchData();
    let dynamicUrls = [];
    
    if (data) {
      dynamicUrls = generateDynamicUrls(data);
      console.log(`Generated ${dynamicUrls.length} dynamic URLs`);
    } else {
      console.log('No dynamic data fetched, generating sitemap with static URLs only');
    }

    const allUrls = [...staticUrls, ...dynamicUrls];
    console.log(`Total URLs in sitemap: ${allUrls.length}`);

    // Create the sitemap object
    const sitemap = {
      urlset: {
        $: { 
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
          'xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
          'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
          'xmlns:mobile': 'http://www.google.com/schemas/sitemap-mobile/1.0',
          'xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
          'xmlns:video': 'http://www.google.com/schemas/sitemap-video/1.1'
        },
        url: allUrls.map((url) => ({
          loc: url.loc,
          lastmod: url.lastmod,
          changefreq: url.changefreq,
          priority: url.priority,
        })),
      },
    };

    // Convert to XML
           const builder = new Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
      renderOpts: { pretty: true, indent: '  ', newline: '\n' }
    });
    const xml = builder.buildObject(sitemap);

    // Write to file
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, xml, 'utf-8');
    
    console.log(`✅ Sitemap generated successfully at ${sitemapPath}`);
    console.log(`📊 Summary:`);
    console.log(`   - Static URLs: ${staticUrls.length}`);
    console.log(`   - Dynamic URLs: ${dynamicUrls.length}`);
    console.log(`   - Total URLs: ${allUrls.length}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    // Even if there's an error, try to create a basic sitemap with static URLs
    try {
      const basicSitemap = {
        urlset: {
          $: { 
            xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
          },
          url: staticUrls.map((url) => ({
            loc: url.loc,
            lastmod: url.lastmod,
            changefreq: url.changefreq,
            priority: url.priority,
          })),
        },
      };

      const builder = new Builder({
        xmldec: { version: '1.0', encoding: 'UTF-8' },
        renderOpts: { pretty: true, indent: '  ', newline: '\n' }
      });
      const xml = builder.buildObject(basicSitemap);

      const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
      fs.writeFileSync(sitemapPath, xml, 'utf-8');
      
      console.log(`✅ Basic sitemap generated successfully at ${sitemapPath} with ${staticUrls.length} static URLs`);
      return true;
    } catch (fallbackError) {
      console.error('❌ Failed to generate even basic sitemap:', fallbackError);
      return false;
    }
  }
}

// Run the script
if (require.main === module) {
  generateSitemap().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { generateSitemap }; 