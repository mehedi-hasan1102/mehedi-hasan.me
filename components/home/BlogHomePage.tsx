'use client';

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { BlogMetaData } from "@/lib/blogs";
import { useMemo } from "react";

interface BlogHomePageProps {
  latestBlogs: BlogMetaData[];
}

export default function BlogHomePage({ latestBlogs }: BlogHomePageProps) {
  const blogItems = useMemo(() => {
    return latestBlogs.map((blog) => {
      const blogHref = `/blog/${encodeURIComponent(blog.slug)}`;

      return (
        <li key={blog.slug} className="space-y-1">
          <Link
            href={blogHref}
            className="group flex gap-4 items-start"
          >
            {/* Image */}
            <div className="hidden sm:block w-28 h-20 relative flex-shrink-0">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="rounded-md object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3
                className="
                  text-[15px] font-medium leading-snug tracking-tight
                  text-base-content
                  group-hover:text-primary transition-colors
                "
              >
                {blog.title}
                <ArrowUpRight
                  size={13}
                  className="inline-block ml-1 opacity-60 group-hover:opacity-100"
                />
              </h3>

              <p className="text-xs text-base-content/45 mt-4">
                {blog.date} • {blog.readTime} • {blog.category}
              </p>
            </div>
          </Link>
        </li>
      );
    });
  }, [latestBlogs]);

  return (
    <section className="max-w-3xl mx-auto px-4 text-base-content font-geist">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight">
          Blog
        </h2>
      </div>

      {/* Blog list */}
      {latestBlogs.length === 0 ? (
        <p className="text-sm text-base-content/50 text-center py-6">
          No blog posts available.
        </p>
      ) : (
        <ul className="space-y-7">
          {blogItems}
        </ul>
      )}

      {/* Footer */}
      <div className="pt-6 text-center">
        <Link
          href="/blog"
          className="
            inline-flex items-center gap-1 text-sm font-medium
            hover:text-primary 
          "
        >
          See all posts
          <ChevronDown size={14} />
        </Link>
      </div>
    </section>
  );
}
