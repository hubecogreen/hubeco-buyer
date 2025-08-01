import { NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { Builder } from 'xml2js';
import path from 'path';

interface Category {
  _id: string;
  name: string;
  seoSlug: string;
  subCategories?: Category[];
  childCategories?: Category[];
}

interface SlugData {
  products: string[];
  vendors: string[];
  categories: Category[];
  blogs: string[];
}

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}


const staticUrls: SitemapUrl[] = [
  { 
    loc: `${process.env.NEXT_PUBLIC_PROD_URL}`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'daily', 
    priority: '1.0' 
  },
  { 
    loc: `${process.env.NEXT_PUBLIC_PROD_URL}/products`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'daily', 
    priority: '0.9' 
  },
  { 
    loc: `${process.env.NEXT_PUBLIC_PROD_URL}/categories`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'weekly', 
    priority: '0.8' 
  },
  { 
    loc: `${process.env.NEXT_PUBLIC_PROD_URL}/vendors`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'weekly', 
    priority: '0.8' 
  },
  { 
    loc: `${process.env.NEXT_PUBLIC_PROD_URL}/blogs`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'weekly', 
    priority: '0.7' 
  },
  { 
    loc: `${process.env.NEXT_PUBLIC_PROD_URL}/about`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'monthly', 
    priority: '0.6' 
  },
  { 
    loc: `${process.env.NEXT_PUBLIC_PROD_URL}/contact`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'monthly', 
    priority: '0.6' 
  },
  { 
    loc: `${process.env.NEXT_PUBLIC_PROD_URL}/faq`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'monthly', 
    priority: '0.6' 
  },
  { 
    loc: `${process.env.NEXT_PUBLIC_PROD_URL}/privacy-policy`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'monthly', 
    priority: '0.5' 
  },
  { 
    loc: `${process.env.NEXT_PUBLIC_PROD_URL}/terms-conditions`, 
    lastmod: new Date().toISOString(), 
    changefreq: 'monthly', 
    priority: '0.5' 
  },
];
// Fetch function to get the URLs dynamically
async function getSiteMapUrls(): Promise<SitemapUrl[]> {
  try {
    // Fetch category tree for hierarchical URLs
    const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/getProductCategoryTree`);
    const categoryData = await categoryResponse.json();
    
    // Fetch simple slugs for other URLs
    const slugsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAllSlugs`);
    const slugsData = await slugsResponse.json();

    const { products, vendors, blogs } = slugsData;
    const categories = categoryData.data || [];

    console.log("categories", categories);

    const dynamicUrls: SitemapUrl[] = [];

    // Generate hierarchical category URLs
    categories.forEach((category: Category) => {
      if (category) {
        // Subcategory URLs
        if (category.subCategories && Array.isArray(category.subCategories)) {
          category.subCategories.forEach((subCategory: Category) => {
            console.log("subCategory", subCategory.seoSlug);  
            if (subCategory && subCategory.seoSlug) {
              // Subcategory level URL with scid parameter
              dynamicUrls.push({
                loc: `${process.env.NEXT_PUBLIC_PROD_URL}/products/${subCategory.seoSlug}?scid=${subCategory._id}`,
                lastmod: new Date().toISOString(),
                changefreq: 'weekly',
                priority: '0.8',
              });

              // Child category URLs
              if (subCategory.childCategories && Array.isArray(subCategory.childCategories)) {
                subCategory.childCategories.forEach((childCategory: Category) => {
                  if (childCategory && childCategory.seoSlug) {
                    // Full hierarchical URL with ccid parameter
                    dynamicUrls.push({
                      loc: `${process.env.NEXT_PUBLIC_PROD_URL}/products/${category.seoSlug}/${subCategory.seoSlug}/${childCategory.seoSlug}?ccid=${childCategory._id}`,
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
      products.forEach((slug: string) => {
        if (slug && typeof slug === 'string') {
          dynamicUrls.push({
            loc: `${process.env.NEXT_PUBLIC_PROD_URL}/${slug}`,
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: '0.8',
          });
        }
      });
    }

    // Vendor URLs
    if (Array.isArray(vendors)) {
      vendors.forEach((slug: string) => {
        if (slug && typeof slug === 'string') {
          dynamicUrls.push({
            loc: `${process.env.NEXT_PUBLIC_PROD_URL}/vendors/${slug}`,
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: '0.7',
          });
        }
      });
    }

    // Blog URLs
    if (Array.isArray(blogs)) {
      blogs.forEach((slug: string) => {
        if (slug && typeof slug === 'string') {
          dynamicUrls.push({
            loc: `${process.env.NEXT_PUBLIC_PROD_URL}/blogs/${slug}`,
            lastmod: new Date().toISOString(),
            changefreq: 'monthly',
            priority: '0.5',
          });
        }
      });
    }

    return dynamicUrls;
  } catch (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    // Get the dynamic URLs
    const dynamicUrls = await getSiteMapUrls();

    if (dynamicUrls.length === 0) {
      return NextResponse.json({ error: 'No URLs found for sitemap' }, { status: 404 });
    }
    const allUrls = [...staticUrls, ...dynamicUrls];
    // Create the sitemap object
    const sitemap = {
      urlset: {
        $: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' },
        url: allUrls.map((url) => ({
          loc: url.loc,
          lastmod: url.lastmod,
          changefreq: url.changefreq,
          priority: url.priority,
        })),
      },
    };

    // Convert the JavaScript object to an XML string
    const builder = new Builder();
    const xml = builder.buildObject(sitemap);

    // Set the file path where the sitemap will be saved (public folder or any other location)
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml'); // Save it to the public directory

    // Write the XML string to a file
    writeFileSync(sitemapPath, xml, 'utf-8');

    // Return a success response
    return NextResponse.json({ message: 'Sitemap generated successfully' });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
