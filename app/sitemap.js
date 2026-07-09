import config from "@/config/site.config.json";
import allAuthors from "@/data/author.json";
import allPosts from "@/data/posts.json";
import allVideos from "@/data/video-posts.json";
import { popularCategories } from "@/libs/functions/categories";
import { slugify } from "@/libs/utils/slugify";

export default function sitemap() {
  const baseUrl = config.siteURL;

  const staticRoutes = [
    "",
    "/about",
    "/archive",
    "/author",
    "/blog",
    "/blog/elements",
    "/category",
    "/contact",
    "/videos",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/blog" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const postRoutes = allPosts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: post.frontmatter.date
      ? new Date(post.frontmatter.date)
      : new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const videoRoutes = allVideos.map((video) => ({
    url: `${baseUrl}/videos/${video.slug}`,
    lastModified: video.frontmatter.date
      ? new Date(video.frontmatter.date)
      : new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const authorRoutes = allAuthors.map((author) => ({
    url: `${baseUrl}/author/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const categoryRoutes = popularCategories(allPosts).map((category) => ({
    url: `${baseUrl}/category/${slugify(category.name)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...postRoutes,
    ...videoRoutes,
    ...authorRoutes,
    ...categoryRoutes,
  ];
}
