

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const snippetsDir = path.join(process.cwd(), "data/snippets");

type Snippet = {
  title: string;
  description: string;
  language: string;
  code: string;
  slug: string;
};

export function getAllSnippets(): Snippet[] {
  const files = fs.readdirSync(snippetsDir);

  return files.map((fileName) => {
    const fullPath = path.join(snippetsDir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      title: data.title,
      description: data.description,
      language: data.language,
      code: content.trim(),
      slug: fileName.replace(/\.mdx$/, ""),
    };
  });
}
