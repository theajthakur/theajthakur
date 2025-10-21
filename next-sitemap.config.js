/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://dev.vijstack.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  additionalPaths: async (config) => {
    const pages = ["/", "/p/about", "/p/contact", "/p/hire", "/p/skills"];

    return pages.map((page) => config.transform(config, page));
  },
};
