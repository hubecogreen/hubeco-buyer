import { NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { Builder } from 'xml2js';
import path from 'path';

interface SlugData {
  products: string[];
  vendors: string[];
  categories: string[];
  subcategories: string[];
  childCategories: string[];
  blogs: string[];
}

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}


const staticUrls = [
  { loc: `${process.env.NEXT_PUBLIC_PROD_URL}`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '1.0' },
  { loc: `${process.env.NEXT_PUBLIC_PROD_URL}`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
  { loc: `${process.env.NEXT_PUBLIC_PROD_URL}`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
  // Add more static URLs as needed
];
// Fetch function to get the URLs dynamically
async function getSiteMapUrls(): Promise<SitemapUrl[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAllSlugs`);
    const data: SlugData = await response.json();

    const { products, vendors, categories, subcategories, childCategories, blogs } = data;

    // Combine all categories into a single array of slugs
    const allSlugs = [
      ...products.map((slug) => `/${slug}`),
      ...vendors.map((slug) => `/vendors/${slug}`),
      ...categories.map((slug) => `/categories/${slug}`),
      ...subcategories.map((slug) => `/subcategories/${slug}`),
      ...childCategories.map((slug) => `/childCategories/${slug}`),
      ...blogs.map((slug) => `/blogs/${slug}`),
    ];

    // Map the slugs to the structure expected by next-sitemap
    const additionalUrls: SitemapUrl[] = allSlugs.map((loc) => ({
      loc:`${process.env.NEXT_PUBLIC_PROD_URL}${loc}`,
      lastmod: new Date().toISOString(), // Optional: Add a last modified date
      changefreq: 'weekly', // You can adjust this based on your needs
      priority: '0.5', // Adjust priority as necessary
    }));

    return additionalUrls;
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
    console.log('Sitemap generated and saved to public/sitemap.xml');

    // Return a success response
    return NextResponse.json({ message: 'Sitemap generated successfully' });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
