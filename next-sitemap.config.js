// /** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_PROD_URL || "https://hubeco.market", // Replace with your domain
  generateRobotsTxt: true, // Automatically generate robots.txt
  sitemapSize: 10000000, // Number of URLs per sitemap file
  sitemapBaseFileName: "sitemap",
  generateIndexSitemap: false,
  additionalPaths: async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAllSlugs`
      );
      const data = await response.json();

      const {
        products,
        vendors,
        categories,
        subcategories,
        childCategories,
        blogs,
      } = data;

      const pageSlugs = [
        "/about",
        "/buyer-plans",
        "/buyer-register",
        "/blogs",
        "/cart",
        "/coming-soon",
        "/checkout",
        "/contact",
        "/counter",
        "/categories",
        "/faq",
        "/edit-profile",
        "/home",
        "/login",
        "/order-failed",
        "/order-confirmed",
        "/order-success",
        "/forget-password",
        "/orders",
        "/payment-failed",
        "/payment-success",
        "/plans",
        "/products",
        "/profile",
        "/privacy-policy",
        "/projects",
        "/quote-request/payment/fail",
        "/quote-request",
        "/quote-request/payment/success",
        "/register",
        "/registration-success",
        "/select-buyer-type",
        "/set-password",
        "/returns-refunds-cancellations",
        "/subscriptions",
        "/shipping-delivery",
        "/tickets",
        "/thankyou-page",
        "/vendor-register",
        "/terms-of-use",
        "/terms-conditions",
        "/vendor-agreement",
        "/vendors",
        "/vendors/green-banana",
        "/vendors/hedrad",
        "/view",
        "/welcome",
        "/wishlist",
        "/vendor-terms-sale",
      ];

      // Combine all categories into a single array of slugs
      const allSlugs = [
        ...products.map((slug) => `/${slug}`),
        ...vendors.map((slug) => `/vendors/${slug}`),
        ...categories.map((slug) => `/categories/${slug}`),
        ...subcategories.map((slug) => `/subcategories/${slug}`),
        ...childCategories.map((slug) => `/childCategories/${slug}`),
        ...blogs.map((slug) => `/blogs/${slug}`),
        ...pageSlugs
      ];

      // Map the slugs to the structure expected by next-sitemap
      const additionalUrls = allSlugs.map((loc) => ({
        loc, // The URL structure based on your API response
        lastmod: new Date().toISOString(), // Optional: Add a last modified date
      }));

      return additionalUrls;
    } catch (error) {
      console.error("Error fetching slugs:", error);
      return [];
    }
  },
};
