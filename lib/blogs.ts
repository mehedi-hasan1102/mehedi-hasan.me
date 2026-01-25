

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogsDirectory = path.join(process.cwd(), "data", "blogs");

export interface BlogMetaData {
  slug: string;
  image: string;
  date: string;
  readTime: string;
  title: string;
  category: string;
  description: string;
}

export interface Blog extends BlogMetaData {
  fullContent: string; // raw MDX content - will be serialized on client
}

/* ===============================
Fetch all blogs and sort by date
================================ */
export async function getSortedBlogsData(): Promise<Blog[]> {
  const fileNames = fs
    .readdirSync(blogsDirectory)
    .filter((file) => file.endsWith(".mdx"));

  const allBlogsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { content, data } = matter(fileContents);

      // Ensure date is string
      const date =
        typeof data.date === "string"
          ? data.date
          : new Date(data.date).toISOString();

      return {
        slug,
        ...data,
        date,
        fullContent: content,
      } as Blog;
    })
  );

  // Sort latest first
  return allBlogsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/* ===============================
Fetch single blog by slug
================================ */
export async function getBlogData(slug: string): Promise<Blog | null> {
  if (!slug || slug.includes(".")) return null;

  const fullPath = path.join(blogsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);

  // Ensure date is string
  const date =
    typeof data.date === "string"
      ? data.date
      : new Date(data.date).toISOString();

  return {
    slug,
    ...data,
    date,
    fullContent: content,
  } as Blog;
}
