'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiChevronDown, FiArrowUpRight } from 'react-icons/fi';
import { BlogMetaData } from '@/lib/blogs';

interface BlogHomePageProps {
  latestBlogs: BlogMetaData[];
}

export default function BlogHomePage({ latestBlogs }: BlogHomePageProps) {
  return (
    <section className="max-w-3xl mx-auto px-4 py-6 font-geist text-base-content">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight">
          Blog
        </h2>
      </div>

      {/* Blog list */}
      {latestBlogs.length === 0 ? (
        <p className="py-6 text-center text-sm text-base-content/50">
          No blog posts available.
        </p>
      ) : (
        <ul className="space-y-7">
          {latestBlogs.map((blog) => {
            const blogHref = `/blog/${encodeURIComponent(blog.slug)}`;

            return (
              <li key={blog.slug} className="space-y-1">
                <Link
                  href={blogHref}
                  className="group flex gap-4 items-start px-2 py-1"
                >
                  {/* Image */}
                  <div className="relative hidden h-20 w-28 flex-shrink-0 sm:block">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="rounded-md object-cover" 
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* title  */}
<div className="group-hover:underline underline-offset-4 inline-flex items-center">
  <h3 className="text-[15px] font-medium leading-snug tracking-tight">
    {blog.title}
  </h3>
  <FiArrowUpRight
    size={13}
    className="ml-1 opacity-60 shrink-0"
  />
</div>

                    {/* Meta (resume-style) */}
                    <p className="mt-1 text-xs text-base-content/45">
                      {blog.date} • {blog.readTime} • {blog.category}
                    </p>
                    <p className="mt-2 text-sm text-base-content/80">
  <p className="mt-2 text-sm text-base-content/80">
  {blog.description?.slice(0, 50)}…
</p>

</p>

                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {/* Footer */}
      <div className="pt-6 text-center">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-medium hover:text-primary">
          See all posts
          <FiChevronDown size={14} />
        </Link>
      </div>
    </section>
  );
}
